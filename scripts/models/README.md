# Web models

`public/models/karolina.glb` and `public/models/njord.glb` are built from the team's own
simulation models (`modeli.zip` in the UPTZ Google Drive: `karolina_zed/` and `njord_usv/`).
The raw meshes are not in this repository; they are hundreds of megabytes.

## Rebuild

Python 3.11+ with `trimesh numpy scipy fast-simplification networkx`, and Node for compression.

```bash
# Karolina: group the STL's pieces into named parts, then reduce, colour and export
python karolina_parts.py <unzipped>/karolina_zed/karolina_model.stl <work>
python build_karolina_glb.py <work> <work>

# Njord: parts and poses come from its SDF
python build_njord_glb.py <unzipped> <work>

# Compress (meshopt); the page decodes with three's MeshoptDecoder
npx @gltf-transform/cli@4.5.1 meshopt <work>/karolina.raw.glb public/models/karolina.glb --level medium
npx @gltf-transform/cli@4.5.1 meshopt <work>/njord.raw.glb public/models/njord.glb --level medium
```

`karolina_parts.py` expects a `.ply` or `.stl` path; part names the page relies on:
Karolina `hull_port`, `hull_starboard`, `pod_lower`, `pod_upper`, `canopy`, `beams`,
`motor_port`, `motor_starboard`, `mast`; Njord `hull`, `thruster_*`, `propeller_*`,
`sensor_mount`, `lidar`, `camera`.

## Stills

`public/home/*.webp` are frames rendered from the live scenes (`src/components/home/`),
captured in development through `window.__karolinaRun.renderAt(seconds, progress)` and
converted with `ffmpeg -c:v libwebp -quality 80`.
