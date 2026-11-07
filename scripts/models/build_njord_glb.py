import sys, json, numpy as np, trimesh, fast_simplification
import xml.etree.ElementTree as ET
from trimesh.visual.material import PBRMaterial
X, DEST = sys.argv[1], sys.argv[2]
root = ET.parse(f"{X}/njord_usv/model.sdf").getroot()
NAMES = {"base_link": "hull", "left_chasis_link": "thruster_port", "right_chasis_link": "thruster_starboard",
         "left_propeller_link": "propeller_port", "right_propeller_link": "propeller_starboard",
         "lidar_camera_mount_link": "sensor_mount", "lidar_link": "lidar", "zed_camera_link": "camera"}
BUDGET = {"hull": 12000, "thruster_port": 3000, "thruster_starboard": 3000, "propeller_port": 2000, "propeller_starboard": 2000,
          "sensor_mount": 2000, "lidar": 2500, "camera": 1200}
def pose(el):
    p = el.find("pose") if el is not None else None
    v = [float(x) for x in p.text.split()] if p is not None else [0] * 6
    T = trimesh.transformations.euler_matrix(v[3], v[4], v[5], "sxyz"); T[:3, 3] = v[:3]; return T
def lin2srgb(c):
    c = np.clip(np.asarray(c, float), 0, 1)
    return np.where(c <= 0.0031308, 12.92 * c, 1.055 * np.power(c, 1 / 2.4) - 0.055)
def cluster(g, cell):
    """Vertex clustering: snap to a grid of `cell` metres, merge, drop collapsed faces."""
    q = np.floor(g.vertices / cell).astype(np.int64)
    _, inv = np.unique(q, axis=0, return_inverse=True); inv = inv.ravel()
    nv = np.zeros((inv.max() + 1, 3)); cnt = np.bincount(inv)
    np.add.at(nv, inv, g.vertices); nv /= cnt[:, None]
    f = inv[g.faces]
    ok = (f[:, 0] != f[:, 1]) & (f[:, 1] != f[:, 2]) & (f[:, 0] != f[:, 2])
    out = trimesh.Trimesh(nv, f[ok], process=True); out.update_faces(out.unique_faces()); out.remove_unreferenced_vertices()
    return out
WATERLINE_Z = -0.12
MIN_PIECE = 0.012
def to_web(v):
    v = v.copy(); v[:, 2] -= WATERLINE_Z
    return np.stack([v[:, 0], v[:, 2], -v[:, 1]], 1)
scene = trimesh.Scene(); report = {}; anchors = {}; colours = {}
for link in root.iter("link"):
    vis = link.find("visual"); uri = vis.find("geometry/mesh/uri") if vis is not None else None
    if uri is None: continue
    part = NAMES[link.get("name")]; T = pose(link) @ pose(vis)
    sc = trimesh.load(f"{X}/njord_usv/meshes/{uri.text.rsplit('/', 1)[-1]}", force="scene")
    total = sum(len(g.faces) for g in sc.geometry.values())
    pieces = []
    for i, (gname, g) in enumerate(sorted(sc.geometry.items(), key=lambda kv: -len(kv[1].faces))):
        mat = g.visual.material
        g = trimesh.Trimesh(g.vertices.copy(), g.faces.copy(), process=True); g.merge_vertices(digits_vertex=5)
        # drop sub-centimetre pieces (blades' fillets, fasteners): invisible at web scale, and they block reduction
        lab = trimesh.graph.connected_component_labels(g.face_adjacency, node_count=len(g.faces))
        keep = []
        for c in range(lab.max() + 1):
            fc = np.where(lab == c)[0]
            ext = np.ptp(g.vertices[np.unique(g.faces[fc])], axis=0)
            if ext.max() >= MIN_PIECE: keep.append(fc)
        if keep: g = g.submesh([np.concatenate(keep)], append=True)
        lin = np.asarray(mat.baseColorFactor[:3], float) / 255.0 if getattr(mat, "baseColorFactor", None) is not None else np.asarray(mat.diffuse[:3], float) / 255.0
        rgb = (lin2srgb(lin) * 255).round().astype(int).tolist()
        budget = max(300, int(BUDGET[part] * len(g.faces) / total))
        cell = 0.002
        while len(g.faces) > budget * 1.15 and cell <= 0.02:
            g2 = cluster(g, cell)
            if len(g2.faces) <= budget * 1.15 or cell >= 0.02: g = g2; break
            cell *= 1.4
        g.apply_transform(T)
        g = trimesh.Trimesh(to_web(g.vertices), g.faces, process=True)
        g = g.smooth_shaded
        node = part if i == 0 else f"{part}_{i}"
        g.visual = trimesh.visual.TextureVisuals(material=PBRMaterial(name=node, baseColorFactor=rgb + [255], roughnessFactor=0.45, metallicFactor=0.1))
        scene.add_geometry(g, node_name=node, geom_name=node)
        report[node] = int(len(g.faces)); colours[node] = "#%02x%02x%02x" % tuple(rgb); pieces.append(g)
    whole = trimesh.util.concatenate(pieces); b = whole.bounds
    anchors[part] = {"centre": b.mean(0).round(3).tolist(), "top": [round(float(b.mean(0)[0]), 3), round(float(b[1][1]), 3), round(float(b.mean(0)[2]), 3)]}
allm = trimesh.util.concatenate(list(scene.geometry.values())); anchors["_bounds"] = allm.bounds.round(3).tolist()
scene.export(f"{DEST}/njord.raw.glb")
json.dump({"tris": report, "total": int(sum(report.values())), "colours": colours, "anchors": anchors}, open(f"{DEST}/njord.anchors.json", "w"), indent=1)
print("njord tris", sum(report.values()), colours)
