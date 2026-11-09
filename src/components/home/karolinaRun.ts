// Karolina's autonomous run: the home hero's WebGL scene.
//
// Framework-free so the page can load it after first paint. Units are metres.
// Karolina's hull is the team's own model (public/models/karolina.glb); the
// course, buoys and detections are an illustration. Sensor geometry is real:
// a 110° camera field of view and a 40 m LiDAR range.

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { toCreasedNormals } from "three/examples/jsm/utils/BufferGeometryUtils.js";

export type PartId = "sensors" | "hulls" | "motors";

export type Projection = { x: number; y: number; visible: boolean };

export type FrameInfo = {
  /** Buoys inside the camera's field of view, with their on-screen position and distance in metres. */
  detections: { id: number; x: number; y: number; size: number; distance: number }[];
  /** On-screen anchors for the part labels. */
  parts: Record<PartId, Projection>;
};

export type Point = { x: number; y: number };
export type Framing = { run: Point; parts: Point };

export type KarolinaRunOptions = {
  canvas: HTMLCanvasElement;
  modelUrl: string;
  /** Called once the model is in and the first frame is drawn. */
  onReady?: () => void;
  onFrame?: (info: FrameInfo) => void;
  /** Where the boat sits on screen (fractions of the viewport from the left and top), in the run and in the parts view. */
  framing?: Framing;
  /** Render a single still frame instead of running (reduced motion, captures). */
  still?: boolean;
  /** Course clock (seconds) the run starts at; matched to the poster frame so the swap is seamless. */
  startAt?: number;
};

export type KarolinaRun = {
  /** 0 = chart view of the run, 1 = close three-quarter view of the parts. */
  setProgress: (p: number) => void;
  setFraming: (f: Framing) => void;
  setRunning: (running: boolean) => void;
  /** Jump the course clock (seconds) and draw one frame; used for stills. */
  renderAt: (seconds: number, progress: number) => void;
  resize: () => void;
  dispose: () => void;
};

const NAVY = new THREE.Color("#222944");
const MARINE = new THREE.Color("#2563eb");
const CAMERA_HFOV = THREE.MathUtils.degToRad(110);
const CAMERA_RANGE = 20; // the ZED X's stated depth range
const LIDAR_RANGE = 40;
const LIDAR_PERIOD = 2.6;
const LAP_SECONDS = 38;

// Figure-of-eight course (lemniscate of Bernoulli), lobes centred near x = ±13 m.
const LOBE = 21;
function coursePoint(t: number, out: THREE.Vector3) {
  const s = Math.sin(t), c = Math.cos(t), d = 1 + s * s;
  return out.set((LOBE * c) / d, 0, (LOBE * s * c) / d);
}

// Four buoys: a gate either side of the crossing and a mark past each lobe's tip,
// placed where the boat heads toward them, so her camera has something to find for most of the lap.
const BUOYS: [number, number][] = [
  [0, 4.2],
  [0, -4.2],
  [25.5, 0],
  [-25.5, 0],
];

const ease = (x: number) => 1 - Math.pow(1 - THREE.MathUtils.clamp(x, 0, 1), 3);
const smooth = (a: number, b: number, x: number) => THREE.MathUtils.smoothstep(x, a, b);

function chartMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uNavy: { value: NAVY.clone() },
      uOpacity: { value: 1 },
      uCenter: { value: new THREE.Vector2() },
    },
    vertexShader: /* glsl */ `
      varying vec2 vXZ;
      void main() {
        vec4 w = modelMatrix * vec4(position, 1.0);
        vXZ = w.xz;
        gl_Position = projectionMatrix * viewMatrix * w;
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uNavy;
      uniform float uOpacity;
      uniform vec2 uCenter;
      varying vec2 vXZ;
      float gridLine(vec2 p, float step, float width) {
        vec2 g = abs(fract(p / step - 0.5) - 0.5) * step;
        vec2 fw = fwidth(p) * width;
        vec2 l = 1.0 - smoothstep(vec2(0.0), fw, g);
        return max(l.x, l.y);
      }
      void main() {
        float minor = gridLine(vXZ, 5.0, 1.0);
        float major = gridLine(vXZ, 25.0, 1.4);
        // depth contours: slow rings around an offshore deep, warped so they read as soundings
        float r = length((vXZ - vec2(60.0, -40.0)) * vec2(1.0, 1.35));
        float warp = sin(vXZ.x * 0.045) * 3.0 + sin(vXZ.y * 0.06 + 1.3) * 2.5;
        float contour = 1.0 - smoothstep(0.0, fwidth(r) * 1.2, abs(fract((r + warp) / 9.0 - 0.5) - 0.5) * 9.0);
        float dist = length(vXZ - uCenter);
        float fade = 1.0 - smoothstep(35.0, 120.0, dist);
        float ink = (minor * 0.04 + major * 0.075 + contour * 0.045) * fade;
        vec3 col = uNavy + vec3(ink);
        gl_FragColor = vec4(col, uOpacity);
        #include <colorspace_fragment>
      }`,
  });
}

function makeShadowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(64, 64, 4, 64, 64, 64);
  grd.addColorStop(0, "rgba(8,10,24,0.55)");
  grd.addColorStop(1, "rgba(8,10,24,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeFan(angle: number, radius: number) {
  const segments = 48;
  const positions: number[] = [0, 0, 0];
  for (let i = 0; i <= segments; i++) {
    const a = -angle / 2 + (angle * i) / segments;
    positions.push(Math.cos(a) * radius, 0, Math.sin(a) * radius);
  }
  const index: number[] = [];
  for (let i = 1; i <= segments; i++) index.push(0, i, i + 1);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(index);
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    uniforms: { uOpacity: { value: 0.13 }, uRadius: { value: radius } },
    vertexShader: /* glsl */ `
      varying vec2 vP;
      void main() { vP = position.xz; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: /* glsl */ `
      uniform float uOpacity; uniform float uRadius; varying vec2 vP;
      void main() {
        float r = length(vP) / uRadius;
        float a = uOpacity * pow(1.0 - clamp(r, 0.0, 1.0), 2.2) * smoothstep(0.0, 0.05, r);
        gl_FragColor = vec4(vec3(1.0), a);
      }`,
  });
  const fan = new THREE.Mesh(geo, mat);
  // the field of view's two edges
  const edgePts: THREE.Vector3[] = [];
  for (const a of [-angle / 2, angle / 2]) edgePts.push(new THREE.Vector3(0, 0, 0), new THREE.Vector3(Math.cos(a) * radius * 0.85, 0, Math.sin(a) * radius * 0.85));
  const edges = new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints(edgePts),
    new THREE.LineBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.35, depthWrite: false })
  );
  edges.renderOrder = 4;
  fan.add(edges);
  return fan;
}

function makeRing(radius: number, color: THREE.Color, opacity: number) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= 96; i++) {
    const a = (i / 96) * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
  }
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false });
  return new THREE.Line(geo, mat);
}

function makeBuoy() {
  const g = new THREE.Group();
  // transparent so the course can fade out of the parts view
  const white = new THREE.MeshStandardMaterial({ color: "#dde4ee", roughness: 0.55, transparent: true });
  const band = new THREE.MeshStandardMaterial({ color: MARINE, roughness: 0.45, transparent: true });
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.38, 0.9, 20), white);
  body.position.y = 0.3;
  const stripe = new THREE.Mesh(new THREE.CylinderGeometry(0.335, 0.345, 0.22, 20), band);
  stripe.position.y = 0.45;
  const top = new THREE.Mesh(new THREE.ConeGeometry(0.26, 0.4, 20), white);
  top.position.y = 0.95;
  g.add(body, stripe, top);
  return g;
}

export function createKarolinaRun(opts: KarolinaRunOptions): KarolinaRun {
  const { canvas } = opts;
  let framing: Framing = opts.framing ?? { run: { x: 0.62, y: 0.42 }, parts: { x: 0.6, y: 0.5 } };
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.setClearColor(NAVY, 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 400);
  scene.add(new THREE.HemisphereLight("#e6efff", "#1a2040", 1.6));
  const sun = new THREE.DirectionalLight("#ffffff", 2.2);
  sun.position.set(-18, 30, 14);
  scene.add(sun);

  // Water chart
  const chartMat = chartMaterial();
  const chart = new THREE.Mesh(new THREE.PlaneGeometry(600, 600), chartMat);
  chart.rotation.x = -Math.PI / 2;
  chart.renderOrder = 2;
  scene.add(chart);

  // Buoys
  const buoys = BUOYS.map(([x, z]) => {
    const b = makeBuoy();
    b.position.set(x, 0, z);
    scene.add(b);
    const ping = makeRing(1, new THREE.Color("#ffffff"), 0);
    ping.position.set(x, 0.02, z);
    ping.renderOrder = 3;
    scene.add(ping);
    return { group: b, ping, pingAge: 99 };
  });

  // Planned path ahead (dashed) and wake behind
  const PLAN_POINTS = 40;
  const planGeo = new THREE.BufferGeometry().setFromPoints(Array.from({ length: PLAN_POINTS }, () => new THREE.Vector3()));
  const plan = new THREE.Line(planGeo, new THREE.LineDashedMaterial({ color: "#93b4f5", dashSize: 0.6, gapSize: 0.5, transparent: true, opacity: 0.55, depthWrite: false }));
  plan.renderOrder = 3;
  scene.add(plan);

  const WAKE_POINTS = 90;
  const wakePositions = new Float32Array(WAKE_POINTS * 3);
  const wakeColors = new Float32Array(WAKE_POINTS * 3);
  const wakeGeo = new THREE.BufferGeometry();
  wakeGeo.setAttribute("position", new THREE.BufferAttribute(wakePositions, 3));
  wakeGeo.setAttribute("color", new THREE.BufferAttribute(wakeColors, 3));
  const wake = new THREE.Line(wakeGeo, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.9, depthWrite: false }));
  wake.renderOrder = 3;
  scene.add(wake);

  // Boat
  const boat = new THREE.Group();
  scene.add(boat);
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(6.4, 3.6), new THREE.MeshBasicMaterial({ map: makeShadowTexture(), transparent: true, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.01;
  shadow.renderOrder = 3;
  boat.add(shadow);

  // Sensor visuals ride on the boat
  const fan = makeFan(CAMERA_HFOV, CAMERA_RANGE);
  fan.position.y = 0.03;
  fan.renderOrder = 4;
  boat.add(fan);
  const lidar = makeRing(1, new THREE.Color("#c7d7ff"), 0);
  lidar.renderOrder = 4;
  scene.add(lidar);

  const anchorsLocal: Record<PartId, THREE.Vector3> = {
    sensors: new THREE.Vector3(1.2, 1.4, 0),
    hulls: new THREE.Vector3(1.6, 0.4, 1.0),
    motors: new THREE.Vector3(-1.5, -0.35, 1.0),
  };
  let model: THREE.Object3D | null = null;
  const motorMaterials: THREE.MeshStandardMaterial[] = [];

  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  let disposed = false;
  loader.load(
    opts.modelUrl,
    (gltf) => {
      if (disposed) return;
      model = gltf.scene;
      const parts: Record<string, THREE.Box3> = {};
      model.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (!mesh.isMesh) return;
        // smooth the faceting left by mesh reduction, keeping the hull's real hard edges
        mesh.geometry = toCreasedNormals(mesh.geometry, THREE.MathUtils.degToRad(62));
        parts[mesh.name] = new THREE.Box3().setFromObject(mesh);
      });
      const top = (b?: THREE.Box3) => (b ? new THREE.Vector3((b.min.x + b.max.x) / 2, b.max.y, (b.min.z + b.max.z) / 2) : null);
      const centre = (b?: THREE.Box3) => (b ? b.getCenter(new THREE.Vector3()) : null);
      anchorsLocal.sensors = top(parts.mast) ?? anchorsLocal.sensors;
      const hull = parts.hull_starboard;
      if (hull) anchorsLocal.hulls = new THREE.Vector3(hull.min.x + (hull.max.x - hull.min.x) * 0.72, hull.max.y, (hull.min.z + hull.max.z) / 2);
      anchorsLocal.motors = centre(parts.motor_starboard) ?? anchorsLocal.motors;
      model.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (mesh.isMesh && mesh.name.startsWith("motor")) {
          mesh.material = (mesh.material as THREE.MeshStandardMaterial).clone();
          motorMaterials.push(mesh.material as THREE.MeshStandardMaterial);
        }
      });
      // the camera fan and LiDAR start at the mast
      fan.position.x = anchorsLocal.sensors.x;
      boat.add(model);
      renderFrame(0);
      opts.onReady?.();
    },
    undefined,
    (err) => console.error("Karolina model failed to load", err)
  );

  // State
  let progress = 0;
  let running = !opts.still;
  let clock = opts.startAt ?? 0;
  let last = performance.now();
  let raf = 0;
  const camPos = new THREE.Vector3();
  const camTarget = new THREE.Vector3();
  let camAzimuth = 0;
  let firstFrame = true;
  const tmp = new THREE.Vector3(), tmp2 = new THREE.Vector3(), ahead = new THREE.Vector3();

  const project = (world: THREE.Vector3): Projection => {
    const v = world.clone().project(camera);
    const w = canvas.clientWidth, h = canvas.clientHeight;
    return { x: (v.x * 0.5 + 0.5) * w, y: (-v.y * 0.5 + 0.5) * h, visible: v.z < 1 && Math.abs(v.x) < 1.1 && Math.abs(v.y) < 1.1 };
  };

  function boatPose(t: number, pos: THREE.Vector3) {
    const phase = (t / LAP_SECONDS) * Math.PI * 2;
    coursePoint(phase, pos);
    coursePoint(phase + 0.004, ahead);
    return Math.atan2(-(ahead.z - pos.z), ahead.x - pos.x);
  }

  function renderFrame(dt: number) {
    const p = progress;
    const run = 1 - smooth(0.12, 0.62, p); // boat slows as the view closes in
    clock += dt * (0.15 + 0.85 * run);

    // Boat on the course
    const pos = tmp;
    const heading = boatPose(clock, pos);
    boat.position.set(pos.x, Math.sin(clock * 1.7) * 0.02, pos.z);
    // in the parts view, swing gently to a fixed heading so the side reads
    const showHeading = THREE.MathUtils.lerp(heading, heading + Math.sin(clock * 0.35) * 0.08, 1 - run);
    boat.rotation.set(0, showHeading, Math.sin(clock * 1.3) * 0.012 * run);

    // Planned path ahead
    const phase = (clock / LAP_SECONDS) * Math.PI * 2;
    const pp = planGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < PLAN_POINTS; i++) {
      coursePoint(phase + 0.03 + i * 0.012, tmp2);
      pp.setXYZ(i, tmp2.x, 0.04, tmp2.z);
    }
    pp.needsUpdate = true;
    plan.computeLineDistances();
    (plan.material as THREE.LineDashedMaterial).opacity = 0.55 * run;

    // Wake behind
    for (let i = 0; i < WAKE_POINTS; i++) {
      coursePoint(phase - 0.015 - i * 0.006, tmp2);
      wakePositions.set([tmp2.x, 0.03, tmp2.z], i * 3);
      const a = (1 - i / WAKE_POINTS) * 0.45 * run;
      wakeColors.set([0.13 + a, 0.16 + a, 0.27 + a], i * 3);
    }
    wakeGeo.attributes.position.needsUpdate = true;
    wakeGeo.attributes.color.needsUpdate = true;

    // Sensors: camera fan and LiDAR pulse
    (fan.material as THREE.ShaderMaterial).uniforms.uOpacity.value = 0.13 * run;
    ((fan.children[0] as THREE.LineSegments).material as THREE.LineBasicMaterial).opacity = 0.22 * run;
    const lidarAge = (clock % LIDAR_PERIOD) / LIDAR_PERIOD;
    const lidarR = 1 + lidarAge * LIDAR_RANGE;
    lidar.scale.setScalar(lidarR);
    const mastWorld = tmp2.copy(anchorsLocal.sensors).applyMatrix4(boat.matrixWorld);
    lidar.position.set(mastWorld.x, 0.05, mastWorld.z);
    (lidar.material as THREE.LineBasicMaterial).opacity = (1 - lidarAge) * 0.5 * (0.35 + 0.65 * run);

    // Buoys: LiDAR pings, and which ones the camera sees (projected once the camera has moved, below)
    const seen: { id: number; d: number }[] = [];
    const fwd = new THREE.Vector3(Math.cos(showHeading), 0, -Math.sin(showHeading));
    buoys.forEach((b, id) => {
      const dx = b.group.position.x - mastWorld.x, dz = b.group.position.z - mastWorld.z;
      const d = Math.hypot(dx, dz);
      if (Math.abs(d - lidarR) < 0.9 && b.pingAge > 1) b.pingAge = 0;
      b.pingAge += dt;
      // the course belongs to the run; it fades out as the view closes in on the boat
      b.group.visible = run > 0.02;
      b.group.traverse((o) => {
        const m = (o as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined;
        if (m) {
          m.opacity = run;
          m.depthWrite = run > 0.98;
        }
      });
      const pa = Math.min(b.pingAge / 0.9, 1);
      b.ping.scale.setScalar(0.6 + pa * 2.2);
      (b.ping.material as THREE.LineBasicMaterial).opacity = (1 - pa) * 0.7 * run;
      const cosA = (dx * fwd.x + dz * fwd.z) / Math.max(d, 1e-3);
      if (d < CAMERA_RANGE && cosA > Math.cos(CAMERA_HFOV / 2) && run > 0.5) seen.push({ id, d });
    });

    // Camera: chart view (follows from above and behind) blending into the parts view
    const k = ease(smooth(0.1, 0.7, p));
    const targetAz = showHeading + Math.PI; // behind the boat
    let diff = targetAz - camAzimuth;
    diff = Math.atan2(Math.sin(diff), Math.cos(diff));
    camAzimuth += diff * (firstFrame ? 1 : Math.min(1, dt * 0.35));
    // portrait screens stand further back, so the water ahead of the boat fits above the text
    const portrait = canvas.clientWidth < canvas.clientHeight * 0.8;
    const chartDist = portrait ? 30 : 19, chartElev = THREE.MathUtils.degToRad(58);
    const chartCam = new THREE.Vector3(
      boat.position.x + Math.cos(camAzimuth) * Math.cos(chartElev) * chartDist,
      Math.sin(chartElev) * chartDist,
      boat.position.z - Math.sin(camAzimuth) * Math.cos(chartElev) * chartDist
    );
    const sideAz = showHeading + THREE.MathUtils.degToRad(-128); // three-quarter from the starboard bow
    // portrait screens see a narrow horizontal slice, so stand further back to fit the whole boat
    const aspect = canvas.clientWidth / Math.max(1, canvas.clientHeight);
    const sideDist = aspect < 0.8 ? 17 : 12.5, sideElev = THREE.MathUtils.degToRad(18);
    const sideCam = new THREE.Vector3(
      boat.position.x + Math.cos(sideAz) * Math.cos(sideElev) * sideDist,
      0.9 + Math.sin(sideElev) * sideDist,
      boat.position.z - Math.sin(sideAz) * Math.cos(sideElev) * sideDist
    );
    const desiredPos = chartCam.lerp(sideCam, k);
    // in the chart view the camera looks ahead of the boat, where her own camera is looking
    // portrait screens keep the boat high above the text, so they look less far ahead
    const lookAhead = (portrait ? 4 : 6) * (1 - k);
    const desiredTarget = tmp.set(
      boat.position.x + Math.cos(showHeading) * lookAhead,
      THREE.MathUtils.lerp(0, 0.55, k),
      boat.position.z - Math.sin(showHeading) * lookAhead
    );
    if (firstFrame) {
      camPos.copy(desiredPos);
      camTarget.copy(desiredTarget);
      firstFrame = false;
    } else {
      const f = Math.min(1, dt * 4);
      camPos.lerp(desiredPos, f);
      camTarget.lerp(desiredTarget, f);
    }
    camera.position.copy(camPos);
    camera.lookAt(camTarget);

    // Place the boat on screen: shift the frustum so the boat sits at the framing point
    const w = Math.max(1, canvas.clientWidth), h = Math.max(1, canvas.clientHeight);
    const fx = THREE.MathUtils.lerp(framing.run.x, framing.parts.x, k);
    const fy = THREE.MathUtils.lerp(framing.run.y, framing.parts.y, k);
    camera.setViewOffset(w, h, (0.5 - fx) * w, (0.5 - fy) * h, w, h);
    camera.updateProjectionMatrix();

    // Water: transparent enough in the parts view to show the motors under the waterline
    chartMat.uniforms.uOpacity.value = THREE.MathUtils.lerp(1, 0.32, k);
    for (const m of motorMaterials) {
      m.emissive.copy(MARINE);
      m.emissiveIntensity = 1.4 * k;
    }
    chartMat.uniforms.uCenter.value.set(boat.position.x, boat.position.z);

    scene.updateMatrixWorld();
    renderer.render(scene, camera);

    const detections: FrameInfo["detections"] = [];
    for (const { id, d } of seen) {
      const p = buoys[id].group.position;
      const c = project(tmp.set(p.x, 0.6, p.z));
      const topP = project(tmp.set(p.x, 1.25, p.z));
      const size = Math.max(22, Math.abs(c.y - topP.y) * 2.2);
      if (c.visible) detections.push({ id, x: c.x, y: c.y, size, distance: d });
    }

    if (opts.onFrame) {
      const parts = {} as FrameInfo["parts"];
      (Object.keys(anchorsLocal) as PartId[]).forEach((id) => {
        parts[id] = project(tmp.copy(anchorsLocal[id]).applyMatrix4(boat.matrixWorld));
      });
      opts.onFrame({ detections, parts });
    }
  }

  function loop(now: number) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (model) renderFrame(dt);
    raf = running ? requestAnimationFrame(loop) : 0;
  }

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    const cap = w < 768 ? 1.5 : 1.75;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, cap));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = w < 768 ? 42 : 32;
    camera.updateProjectionMatrix();
    if (model && !running) renderFrame(0);
  }

  resize();
  if (running) {
    last = performance.now();
    raf = requestAnimationFrame(loop);
  }

  return {
    setProgress(p) {
      progress = THREE.MathUtils.clamp(p, 0, 1);
      if (!running && model) {
        // no frames are running to ease the camera there, so place it directly
        firstFrame = true;
        renderFrame(0);
      }
    },
    setFraming(f) {
      framing = f;
      if (!running && model) renderFrame(0);
    },
    setRunning(r) {
      if (r === running || opts.still) return;
      running = r;
      if (running) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      } else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    },
    renderAt(seconds, p) {
      clock = seconds;
      progress = p;
      firstFrame = true;
      if (model) renderFrame(0);
    },
    resize,
    dispose() {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
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
