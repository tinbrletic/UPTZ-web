// Njord on the same navy chart as the hero: three-quarter view, LiDAR pulse
// from its own sensor mast, drag to turn. No idle spin.
// Framework-free. The model is the team's own (public/models/njord.glb).

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

export type NjordViewer = {
  setRunning: (running: boolean) => void;
  resize: () => void;
  dispose: () => void;
};

const NAVY = new THREE.Color("#222944");
const PULSE_PERIOD = 2.4;
const PULSE_RANGE = 2.2; // metres, drawn to the boat's scale

function chartMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: { uNavy: { value: NAVY.clone() } },
    vertexShader: /* glsl */ `
      varying vec2 vXZ;
      void main() {
        vec4 w = modelMatrix * vec4(position, 1.0);
        vXZ = w.xz;
        gl_Position = projectionMatrix * viewMatrix * w;
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uNavy;
      varying vec2 vXZ;
      float gridLine(vec2 p, float step, float width) {
        vec2 g = abs(fract(p / step - 0.5) - 0.5) * step;
        vec2 fw = fwidth(p) * width;
        vec2 l = 1.0 - smoothstep(vec2(0.0), fw, g);
        return max(l.x, l.y);
      }
      void main() {
        float minor = gridLine(vXZ, 0.25, 1.0);
        float major = gridLine(vXZ, 1.25, 1.4);
        float fade = 1.0 - smoothstep(1.4, 4.0, length(vXZ));
        vec3 col = uNavy + vec3((minor * 0.045 + major * 0.08) * fade);
        gl_FragColor = vec4(col, 1.0);
        #include <colorspace_fragment>
      }`,
  });
}

export function createNjordViewer(opts: {
  canvas: HTMLCanvasElement;
  modelUrl: string;
  /** No LiDAR pulse (reduced motion); dragging still turns the boat. */
  reduceMotion?: boolean;
  onReady?: () => void;
}): NjordViewer {
  const { canvas } = opts;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.setClearColor(NAVY, 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.05, 50);
  scene.add(new THREE.HemisphereLight("#eef4ff", "#27304f", 1.6));
  const key = new THREE.DirectionalLight("#ffffff", 2.2);
  key.position.set(-3, 5, 4);
  scene.add(key);

  const chart = new THREE.Mesh(new THREE.PlaneGeometry(12, 12), chartMaterial());
  chart.rotation.x = -Math.PI / 2;
  chart.renderOrder = 1;
  scene.add(chart);

  // LiDAR pulse: a ring on the water centred under the sensor
  const ringPts: THREE.Vector3[] = [];
  for (let i = 0; i <= 96; i++) {
    const a = (i / 96) * Math.PI * 2;
    ringPts.push(new THREE.Vector3(Math.cos(a), 0, Math.sin(a)));
  }
  const ring = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(ringPts),
    new THREE.LineBasicMaterial({ color: "#c7d7ff", transparent: true, opacity: 0, depthWrite: false })
  );
  ring.renderOrder = 2;
  ring.position.y = 0.004;
  scene.add(ring);

  const pivot = new THREE.Group();
  scene.add(pivot);
  let model: THREE.Object3D | null = null;
  const lidarLocal = new THREE.Vector3();
  let disposed = false;

  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  loader.load(opts.modelUrl, (gltf) => {
    if (disposed) return;
    model = gltf.scene;
    // centre the boat over the origin, waterline (y = 0) kept
    const box = new THREE.Box3().setFromObject(model);
    const c = box.getCenter(new THREE.Vector3());
    model.position.set(-c.x, 0, -c.z);
    pivot.add(model);
    const lidar = model.getObjectByName("lidar");
    if (lidar) new THREE.Box3().setFromObject(lidar).getCenter(lidarLocal);
    const size = box.getSize(new THREE.Vector3()).length();
    camera.position.set(size * 1.0, size * 0.62, size * 1.15);
    camera.lookAt(0, size * 0.06, 0);
    draw(0);
    opts.onReady?.();
  });

  let angle = -0.6;
  let velocity = 0;
  let dragging = false;
  let lastX = 0;
  let running = false;
  let raf = 0;
  let last = performance.now();
  let clock = 0;
  const tmp = new THREE.Vector3();

  function draw(dt: number) {
    clock += dt;
    pivot.rotation.y = angle;
    if (model) {
      tmp.copy(lidarLocal).applyMatrix4(model.matrixWorld);
      ring.position.set(tmp.x, 0.004, tmp.z);
    }
    if (opts.reduceMotion) {
      ring.scale.setScalar(PULSE_RANGE * 0.6);
      (ring.material as THREE.LineBasicMaterial).opacity = 0.25;
    } else {
      const age = (clock % PULSE_PERIOD) / PULSE_PERIOD;
      ring.scale.setScalar(0.15 + age * PULSE_RANGE);
      (ring.material as THREE.LineBasicMaterial).opacity = (1 - age) * 0.6;
    }
    scene.updateMatrixWorld();
    renderer.render(scene, camera);
  }

  function loop(now: number) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    // with reduced motion nothing changes between frames unless the boat is being turned
    if (opts.reduceMotion && !dragging && !velocity) {
      raf = running ? requestAnimationFrame(loop) : 0;
      return;
    }
    if (!dragging && velocity) {
      velocity *= Math.pow(0.04, dt); // drag inertia settles in about a second
      if (Math.abs(velocity) < 0.001) velocity = 0;
      angle += velocity * dt;
    }
    if (model) draw(dt);
    raf = running ? requestAnimationFrame(loop) : 0;
  }

  const onDown = (e: PointerEvent) => {
    dragging = true;
    lastX = e.clientX;
    velocity = 0;
    canvas.setPointerCapture(e.pointerId);
  };
  const onMove = (e: PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    lastX = e.clientX;
    angle += dx * 0.01;
    velocity = dx * 0.6;
    if (!running && model) draw(0);
  };
  const onUp = (e: PointerEvent) => {
    dragging = false;
    if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
  };
  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerup", onUp);
  canvas.addEventListener("pointercancel", onUp);

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    if (model) draw(0);
  }
  resize();

  return {
    setRunning(r) {
      if (r === running) return;
      running = r;
      if (running) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      } else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    },
    resize,
    dispose() {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose?.();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        (Array.isArray(mat) ? mat : mat ? [mat] : []).forEach((x) => x.dispose());
      });
      renderer.dispose();
    },
  };
}
