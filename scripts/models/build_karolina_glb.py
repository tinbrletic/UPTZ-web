import sys, json, numpy as np, trimesh, fast_simplification
from trimesh.visual.material import PBRMaterial
OUT, DEST = sys.argv[1], sys.argv[2]
def srgb(h): h = h.lstrip("#"); return [int(h[i:i+2], 16) for i in (0, 2, 4)] + [255]
# part: (triangle budget, base colour, roughness, metalness)
SPEC = {
  "hull_port": (7000, "#e8ecf0", 0.45, 0.0), "hull_starboard": (7000, "#e8ecf0", 0.45, 0.0),
  "pod": (22000, None, 0.4, 0.0), "canopy": (5000, "#2e3542", 0.6, 0.0), "beams": (616, "#15181d", 0.35, 0.2),
  "motor_port": (2500, "#2b3038", 0.5, 0.3), "motor_starboard": (2500, "#2b3038", 0.5, 0.3), "mast": (4000, "#252a33", 0.5, 0.3),
}
POD_BLUE, POD_WHITE, POD_SPLIT_Z = np.array(srgb("#1f8fe0")), np.array(srgb("#eef2f6")), 0.30
WATERLINE_Z = -0.30
def to_web(v):  # STL frame: x bow, y port, z up  ->  web frame: x bow, y up, z starboard; origin on the waterline
    v = v.copy(); v[:, 2] -= WATERLINE_Z
    return np.stack([v[:, 0], v[:, 2], -v[:, 1]], 1)
scene = trimesh.Scene(); anchors = {}; report = {}
cx = None
for name, (budget, colour, rough, metal) in SPEC.items():
    m = trimesh.load(f"{OUT}/k_{name}.ply", force="mesh"); m.merge_vertices()
    if len(m.faces) > budget:
        v, f = fast_simplification.simplify(m.vertices.astype(np.float32), m.faces.astype(np.int32), target_reduction=1 - budget / len(m.faces))
        m = trimesh.Trimesh(v, f, process=True)
    zs = m.vertices[:, 2].copy()
    m = trimesh.Trimesh(to_web(m.vertices), m.faces, process=True)
    m = m.smooth_shaded if hasattr(m, "smooth_shaded") else m
    if name == "pod":
        # Karolina's livery: blue below the split line, white above; split by face height into two parts
        fz = m.triangles_center[:, 1] + WATERLINE_Z
        for sub, mask, col in (("pod_lower", fz < POD_SPLIT_Z, "#1f8fe0"), ("pod_upper", fz >= POD_SPLIT_Z, "#eef2f6")):
            pm = m.submesh([np.where(mask)[0]], append=True)
            pm.visual = trimesh.visual.TextureVisuals(material=PBRMaterial(name=sub, baseColorFactor=srgb(col), roughnessFactor=rough, metallicFactor=metal))
            scene.add_geometry(pm, node_name=sub, geom_name=sub)
        b = m.bounds; report[name] = int(len(m.faces))
        anchors[name] = {"centre": b.mean(0).round(3).tolist(), "top": [round(float(b.mean(0)[0]), 3), round(float(b[1][1]), 3), round(float(b.mean(0)[2]), 3)]}
        continue
    m.visual = trimesh.visual.TextureVisuals(material=PBRMaterial(name=name, baseColorFactor=srgb(colour), roughnessFactor=rough, metallicFactor=metal))
    scene.add_geometry(m, node_name=name, geom_name=name)
    b = m.bounds; report[name] = int(len(m.faces))
    anchors[name] = {"centre": b.mean(0).round(3).tolist(), "top": [round(float(b.mean(0)[0]), 3), round(float(b[1][1]), 3), round(float(b.mean(0)[2]), 3)]}
whole = trimesh.util.concatenate([g for g in scene.geometry.values()])
anchors["_bounds"] = whole.bounds.round(3).tolist()
# The camera sits at the top of the sensor mast (URDF: ZED X at 1.07 m on the mast); keep the mast top as its anchor.
anchors["camera"] = anchors["mast"]["top"]
scene.export(f"{DEST}/karolina.raw.glb")
json.dump({"tris": report, "total": int(sum(report.values())), "anchors": anchors}, open(f"{DEST}/karolina.anchors.json", "w"), indent=1)
print("karolina tris", sum(report.values()), report)
