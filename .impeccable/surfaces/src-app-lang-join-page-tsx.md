---
version: 1
slug: "src-app-lang-join-page-tsx"
primary_target: "src/app/[lang]/join/page.tsx"
related_targets: ["src/components/Navigation.tsx","src/app/[lang]/about-us/page.tsx"]
---

# Join page (`/[lang]/join`)

- **Mode:** Persuade.
- **Audience:** prospective members (University of Rijeka students of any faculty; non-students: graduates, working engineers, enthusiasts), arriving curious but uncommitted from the navbar, the About page or social links.
- **Action:** send a join message (name, email, division, optional few words). Joining is "write to us, anytime"; the team replies by email.
- **Proof:** members build everything themselves; the podium record (Monaco Energy Boat Challenge 2025, 3rd overall Energy Class; Sardinia Innovative Boat Week 2024, 2nd overall; Monaco 2024, 2nd in slalom); free to join; flexible time.
- **Constraints:** every string in en and hr (English first). Open divisions come from one list (Engineering Team, Development Team, Marketing and Web this season) plus "Not sure yet", pre-selected. Join requests use their own EmailJS template (`NEXT_PUBLIC_EMAILJS_JOIN_TEMPLATE_ID`) and fall back to the contact template until it exists. Same protections as the contact form.
- **Unresolved:** Croatian copy needs a native speaker's review; the owner must create the EmailJS join template; the Development Team opened for new members in November 2026, and its card copy (drawn from Karolina's autonomy stack) needs the team's review.

## Direction contract

THESIS: Joining is one line long, so the first screen is the form. Refuses the recruitment poster whose "Apply" button points somewhere else.

OWN-WORLD: The site's own world: full-bleed workshop photo under the navy #222944 gradient, Saira, marine #2563eb pill as the primary action, white on navy. The navbar's dark glass (gray-950/80, white/15 hairline, backdrop blur) is reused for the entry strip, so navbar and strip bookend the photo. Below the fold: #f5f7f9 ground, white surfaces, the existing section rhythm.

STORY: The visitor sees members building a hull, reads one true line, learns joining is free, flexible and open to them, and writes to the team without leaving the first screen. Anyone unconvinced scrolls to what each division does, the results, and plain answers.

FIRST VIEWPORT: Photo fills the viewport, hull work right of centre. Left column: h1 "Build boats that race in Monaco." near 60px, one-line subtitle, facts line. Lower third: one glass strip across the container with Name, Email, the division as segmented radios, and a primary pill whose label names the chosen recipient; beneath it "Add a few words", the language note, and the "Why join" cue. Signature interaction: the send button renames itself to the chosen division, and on success the strip itself becomes the confirmation in place.

FORM: The entry strip, position 4 of 7 on the ordered list, dealt as lead. seed:5102ade2a2556931

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
