import sys, json, numpy as np, trimesh
SRC, OUT = sys.argv[1], sys.argv[2]
m = trimesh.load(SRC, force="mesh"); m.merge_vertices()
labels = trimesh.graph.connected_component_labels(m.face_adjacency, node_count=len(m.faces))
groups = {k: [] for k in ["hull_port", "hull_starboard", "pod", "canopy", "beams", "motor_port", "motor_starboard", "mast", "dropped"]}
for c in range(labels.max() + 1):
    f = np.where(labels == c)[0]
    v = m.vertices[np.unique(m.faces[f])]
    lo, hi = v.min(0), v.max(0); ctr = (lo + hi) / 2; ext = hi - lo
    if ext.max() < 0.015: groups["dropped"].append(f); continue           # fasteners and specks
    if ctr[2] < -0.5: groups["motor_port" if ctr[1] > 0 else "motor_starboard"].append(f); continue
    if ext[1] > 1.2: groups["beams"].append(f); continue                  # crossbeams span both hulls
    if abs(ctr[1]) > 0.7: groups["hull_port" if ctr[1] > 0 else "hull_starboard"].append(f); continue
    if ctr[2] > 0.62 and ext[0] < 0.6: groups["mast"].append(f); continue
    if ctr[2] > 0.2 and abs(ctr[1]) < 0.5 and ext[0] < 1.2: groups["canopy"].append(f); continue
    groups["pod"].append(f)
summary = {}
parts = {}
for k, fl in groups.items():
    if not fl: summary[k] = 0; continue
    faces = np.concatenate(fl); summary[k] = int(len(faces))
    if k == "dropped": continue
    sub = m.submesh([faces], append=True); parts[k] = sub
    sub.export(f"{OUT}/k_{k}.ply")
    summary[k + "_extents"] = sub.extents.round(2).tolist(); summary[k + "_centre"] = sub.bounds.mean(0).round(2).tolist()
json.dump(summary, open(f"{OUT}/karolina_parts.json", "w"), indent=1)
print(json.dumps(summary, indent=0))
