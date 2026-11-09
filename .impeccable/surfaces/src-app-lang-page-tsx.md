---
version: 1
slug: "src-app-lang-page-tsx"
primary_target: "src/app/[lang]/page.tsx"
related_targets: ["src/app/[lang]/join/page.tsx","src/app/[lang]/achievements/data.ts","src/translations/en/common.json","src/translations/hr/common.json"]
---

# Home page (`/[lang]`)

- **Mode:** Persuade.
- **Audience:** prospective members first (students of any faculty, young engineers, enthusiasts, mostly arriving on phones from Instagram and links); sponsors, press and the competition community second.
- **Action:** join. "Write to us, anytime": the page closes on the same working entry strip as `/[lang]/join` (name, email, division), and the hero's primary pill jumps to it.
- **Proof:** students build it all, including Karolina's autonomy software (WaSR-T obstacle segmentation, ROS2, Jetson); Karolina won the AI Class at the Monaco Energy Boat Challenge 2026, 1st of 9 and first in all four races (official MEBC 2026 general ranking); the podium record with dates, each result credited to its vessel (Vilson: Monaco 2025 3rd overall Energy Class, Sardinia 2024 2nd overall, Monaco 2024 2nd slalom). Results render from `achievements/data.ts`, never hardcoded on the home page.
- **Constraints:** every string in en and hr. The course and detections are an illustration, never presented as Monaco's real course or as recorded footage. Each result names its own vessel. The Monaco 2026 win appears on the home page only after it is in `achievements/data.ts`. The new vessel is public (owner confirmed) but its name, status and specs come only from the owner. 3D is progressive: a poster still is the LCP, three.js loads after, pauses offscreen, drops to the still under reduced motion.
- **Unresolved:** where Karolina's computer and battery sit and which team owns the electrics (for two more part labels); Njord's real dimensions and LiDAR coverage (not shown until the owner confirms); the new vessel is Njord (name provisional): its facts, model and project page are still to come; the Njord 2026 result is not published on the Njord Challenge website as of 2026-11-07; current home copy errors (Vilson "this year" text, wrong competition tags on project cards) fixed in the same build.

## Direction contract

THESIS: The first screen shows Karolina steering itself between buoys, so "students build it all" is demonstrated rather than claimed. Refuses the photo slideshow under a slogan and the spinning showroom boat.

OWN-WORLD: The site's world: navy #222944 field, Saira, marine #2563eb pill as the primary action, white on navy, the navbar's dark glass (gray-950/80, white/15 hairline, blur). The chart is that navy with a fine white/8 grid and thin depth contours; the camera cone is translucent white; detections are white corner brackets with a #2563eb label chip. Karolina's own livery (white and blue hulls, yellow ring mark) appears only on the model. Below the fold: #f5f7f9 ground, white surfaces, the existing section rhythm.

STORY: The visitor watches a boat find its way around buoys with nobody aboard, learns it won the AI Class in Monaco in 2026, reads that UPTZ students wrote the code that steers it and built the hulls and electrics, sees the dated podium record and the next boat, and writes to join without leaving the page.

FIRST VIEWPORT: Full-viewport WebGL chart under the navbar. Karolina seen from above and behind, about a third of the viewport wide, looping a slow course through three or four buoys; the sensor coverage from the SDF (camera FOV and the lidar ring) sweeps ahead and a bracket locks on each buoy as it enters. Lower left: h1 near 60px about students writing the code that steers this boat, one-line subtitle (autonomous electric catamaran built in Rijeka) and the result line "1st · AI Class · Monaco 2026" read from the results data, primary pill "Join the team", quiet scroll cue. Signature interaction: on scroll the camera tilts from chart view to a three-quarter side view, the boat slows, and its real parts (camera and LiDAR, hulls, a motor in each hull) are labelled with the division behind each one, then the page hands off to the record. Departure, for truth: the computer and battery are not labelled, because their positions are not in the team's model or the repo and the electrics team is not recruiting; they join when the owner supplies both.

FORM: Autonomous run, position 4 of 7 on the ordered list, dealt from a degraded roll. seed:f22cce838bfa9703

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
