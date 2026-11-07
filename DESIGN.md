---
name: UPTZ
description: Students from Rijeka who design, build and race electric and autonomous boats; the site's world is a navy sea chart with one marine call to action.
colors:
  marine: "#2563eb"
  marine-700: "#1d4ed8"
  marine-500: "#3b82f6"
  marine-300: "#93c5fd"
  marine-200: "#bfdbfe"
  marine-50: "#eff6ff"
  chart-navy: "#222944"
  lidar-ice: "#c7d7ff"
  glass: "#030712"
  ground: "#f5f7f9"
  surface: "#ffffff"
  ink: "#111827"
  text-body: "#374151"
  text-muted: "#4b5563"
  text-quiet: "#6b7280"
  line: "#e5e7eb"
  line-strong: "#d1d5db"
  error-on-dark: "#ffc9c9"
typography:
  display:
    fontFamily: "Saira, system-ui, -apple-system, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Saira, system-ui, -apple-system, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.111
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Saira, system-ui, -apple-system, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
  lead:
    fontFamily: "Saira, system-ui, -apple-system, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.556
  body:
    fontFamily: "Saira, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Saira, system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.43
  button:
    fontFamily: "Saira, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.5
  numeral:
    fontFamily: "Saira, system-ui, -apple-system, sans-serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1
    fontFeature: "\"tnum\" 1"
  data-chip:
    fontFamily: "Saira, system-ui, -apple-system, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "0.025em"
    fontFeature: "\"tnum\" 1"
rounded:
  field: "12px"
  card: "16px"
  panel: "24px"
  pill: "9999px"
spacing:
  stack-sm: "12px"
  gutter: "20px"
  stack-md: "24px"
  gutter-wide: "32px"
  stack-lg: "40px"
  section: "64px"
  section-lg: "96px"
components:
  button-primary:
    backgroundColor: "{colors.marine}"
    textColor: "{colors.surface}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover-on-dark:
    backgroundColor: "{colors.marine-500}"
  button-primary-hover:
    backgroundColor: "{colors.marine-700}"
  button-quiet-on-dark:
    backgroundColor: "transparent"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "0 12px"
    height: "48px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.marine-700}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  button-outline-hover:
    backgroundColor: "{colors.marine-50}"
  button-white:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.glass}"
    rounded: "{rounded.pill}"
    padding: "4px 16px"
  navbar:
    backgroundColor: "rgba(3, 7, 18, 0.8)"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "8px 24px"
  join-strip:
    backgroundColor: "rgba(3, 7, 18, 0.8)"
    textColor: "{colors.surface}"
    rounded: "{rounded.panel}"
  input-on-glass:
    backgroundColor: "rgba(255, 255, 255, 0.1)"
    textColor: "{colors.surface}"
    typography: "{typography.body}"
    rounded: "{rounded.field}"
    padding: "0 16px"
    height: "48px"
  choice-pill:
    backgroundColor: "transparent"
    textColor: "{colors.surface}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "44px"
  choice-pill-selected:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.glass}"
  detection-chip:
    backgroundColor: "{colors.marine}"
    textColor: "{colors.surface}"
    typography: "{typography.data-chip}"
    rounded: "{rounded.pill}"
    padding: "2px 8px"
  label-card:
    backgroundColor: "rgba(3, 7, 18, 0.85)"
    textColor: "{colors.surface}"
    rounded: "{rounded.card}"
    padding: "16px"
    width: "256px"
  status-chip:
    backgroundColor: "{colors.marine-50}"
    textColor: "{colors.marine}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "32px"
---

# Design System: UPTZ

## Overview

**Creative North Star: "The Race Chart"**

UPTZ is a student team that builds real boats, so the site reads like the paperwork of a race team: a navy sea chart, a dated record, a short line to sign up. The dark world is chart navy with white on it; the light world is a cool grey ground with white surfaces and quiet hairlines. One saturated colour, marine blue, does all the work of saying "act here". Everything else is navy, white or grey.

The home page added the chart vocabulary that defines the dark world: a navy field under a faint grid and depth contours, a translucent white camera fan and LiDAR ring sweeping ahead of the boat, white corner brackets locking onto what the camera sees, and leader-line label cards in the navbar's dark glass. Photo pages (vessels, join, about, partners) put the photograph under a navy gradient instead, then hand off to the same light ground. A slow, pale aurora sits behind the light ground site-wide, visible only where sections leave the ground transparent.

The density is moderate and editorial: one wide container, generous section padding, long hairline lists instead of card grids for records, and tabular numerals wherever something is counted or ranked. Motion is spent once per page on an authored scroll moment; elsewhere it is short colour and opacity changes.

**Key Characteristics:**
- Navy chart field (#222944) for every dark section; white type on it.
- A single marine pill as the primary action in each view.
- Dark glass (gray-950 at 80 to 95 percent, white/15 hairline, backdrop blur) for anything that floats: navbar, menus, the join strip, label cards.
- Cool grey ground (#f5f7f9) and white surfaces below the fold, divided by hairlines.
- Saira throughout, bold and slightly tight for headings.
- Tabular numerals for ranks, years, distances and counts.

## Colors

A two-world palette, navy and cool grey, with one marine accent that marks the action.

### Primary
- **Regatta Marine** (marine): the filled pill for the primary action (Join the team, Send, the join-strip submit), the label chip on a camera detection, the dot on a part leader line, the confirmation tick, `accent-color` and `caret-color` for native controls, and the band and emissive colour in the WebGL scenes. It is a call to act or a machine reading, never decoration.
- **Deep Marine** (marine-700): hover for the primary pill on light grounds; text colour for links and outline buttons on light grounds ("All results", fleet sub-lines).
- **Signal Marine** (marine-500): the 2px focus outline site-wide; hover for the primary pill on navy and glass, where lightening reads better than darkening.

### Secondary
- **Sky Wash** (marine-300) and **Foam** (marine-200): marine tints used on navy. Foam is the text-selection background and the colour of text links on navy (the hero result line, "Join the … team" links, "Add a few words"); Sky Wash marks check icons on navy and nav link hover.
- **Pale Tide** (marine-50): the default status-chip fill, the "Not sure yet" panel, and outline-button hover on light.

### Tertiary
- **Chart Navy** (chart-navy): the field of every dark section: the WebGL clear colour of both 3D scenes, the hero, the parts list, the home join section, the Njord viewer frame, the join page closing panel, and (at 95 percent fading to a slate at 10 percent) the gradient over every photo hero.
- **LiDAR Ice** (lidar-ice): the swept LiDAR ring in the Karolina run and the Njord viewer. It belongs to the 3D scenes only.

### Neutral
- **Dark Glass** (glass): never used opaque. At 80 percent it is the navbar and the join strip, at 85 percent the label cards, at 95 percent the navbar dropdown and mobile menu.
- **Cool Ground** (ground): page background and the light sections (results, Njord, partners).
- **Surface White** (surface): white sections (fleet), cards, and all text on navy and glass. On navy, secondary text is white at 85 percent and captions at 60 percent.
- **Ink** (ink): headings and strong text on light grounds; the footer field.
- **Body Grey** (text-body), **Muted Grey** (text-muted), **Quiet Grey** (text-quiet): body copy and leads, secondary lines and notes, and de-emphasised data such as the year column.
- **Hairline** (line) and **Strong Hairline** (line-strong): dividers on white and on the grey ground respectively.
- **Error on Dark** (error-on-dark): error text inside the glass strip; invalid fields take a red-300 border.

### Named Rules
**The One Pill Rule.** A view has one filled marine pill and it is the primary action. Secondary actions are outline pills, white-glass text buttons or underlined links.

**The Navy Field Rule.** Dark sections are chart navy, not ink and not black. Ink is for type on light grounds and for the footer; pure dark glass is only ever translucent.

**The Chart Ink Rule.** On the chart, overlays are white or marine only: white grid, fan, brackets and leader lines; marine chips and dots. A vessel's own livery colours (Karolina's yellow ring mark) appear on the model and nowhere else.

## Typography

**Display Font:** Saira (with system-ui, -apple-system, sans-serif)
**Body Font:** Saira (same stack)

**Character:** one squared, slightly technical sans in every role, carried by weight rather than by a second family. Headings are bold and tracked slightly tight; body is regular and roomy. Saira is self-hosted through next/font with weights 300 to 700.

### Hierarchy
- **Display** (700, 36px on phones, 48px from 640px, 60px from 1024px, line-height 1.05, tracking -0.025em): the one h1 per page, bottom-left on the hero, balanced, at most about 48rem wide.
- **Headline** (700, 30px rising to 36px from 768px, tracking -0.025em): section h2s. The home join close and the parts heading go to 48px.
- **Title** (600, 20px; 24px bold on division cards): vessel names, card titles, record event names (18px semibold).
- **Lead** (400, 18px, line-height 1.556): the line under a heading, in Body Grey on light and white/85 on navy; at most about 42rem.
- **Body** (400, 16px, line-height 1.5): running text; FAQ answers cap at 65ch.
- **Label** (500, 14px): form labels and legends (white/80 on glass), captions, notes, fact terms.
- **Numeral** (700, 48px from 640px, 36px below, line-height 1, tabular): ranks in the record ledger and stat figures.
- **Data chip** (600, 11px, tracking 0.025em, tabular): the reading on a detection chip, e.g. "Buoy · 12 m".

### Named Rules
**The Tabular Count Rule.** Ranks, years, distances, countdowns and specs set in tabular numerals so columns line up.

**The No Eyebrow Rule.** A heading stands on its own. No small uppercase label sits above a heading to introduce it; if context is needed, it goes in the lead line below.

## Layout

One centred container (max 72rem) with a 20px gutter on phones and 32px from 640px. Sections stack full-bleed, alternating Cool Ground and Surface White on light and Chart Navy on dark, with 64px vertical padding rising to 96px from 768px (80px on the join page's inner sections). Within a section: heading, lead 12 to 16px below, content 40px below.

Records are ledgers, not grids: a hairline-ruled ordered list whose rows run rank, year, event and edition, vessel (four columns from 640px; rank plus a stacked text column on phones). Two-column splits (text and media) open at 1024px with the media column slightly wider. Card grids appear only for parallel choices (the three divisions, three columns from 1024px).

Heroes are full viewport height (100svh), with the h1 block anchored bottom-left inside the container and the navbar floating 16px from the top. The home hero is a 290svh scroll track with a sticky 100svh stage. Anchored sections set a 96px scroll margin to clear the floating navbar. The narrow breakpoint for scene framing and label behaviour is 767px.

## Elevation & Depth

A hybrid: the page itself is flat, and depth belongs to things that float over imagery or the 3D scene. Light sections use tonal change (ground against white) and hairlines, not shadows. Floating glass pieces (navbar, join strip, label cards, menus) carry a long, soft black shadow plus backdrop blur so they read above a moving picture. White cards on the grey ground carry a medium shadow and a 5 percent black ring. Photo heroes get depth from the navy gradient, the 3D scenes from a hemisphere light and soft key light over the navy.

### Shadow Vocabulary
- **Glass float** (`box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.4)`): the join strip and the open menus.
- **Label lift** (`box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 10px -6px rgb(0 0 0 / 0.3)`): leader-line label cards over the scene.
- **Card rest** (`box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`, with a 1px black/5 ring): division cards on the ground.
- **Token shadows** (`--uptz-shadow-sm` to `--uptz-shadow-xl`, slate-tinted): the achievements components; the primary CTA there lifts to `--uptz-shadow-lg` on hover.

### Named Rules
**The Glass Bookend Rule.** Dark glass is the navbar's material. Reuse it only for things that float over a picture or scene and belong to the same voice (the join strip, menus, label cards), so navbar and strip bookend a hero. Glass is always translucent with a white/15 hairline and a medium backdrop blur.

## Shapes

Pills for everything you press or choose: buttons, division choices, chips, the navbar itself. Fields and small media thumbnails take a 12px radius, cards and label cards 16px, large framed panels (the join strip, the Njord viewer frame, the closing panel, still renders of the scene) 24px. The one square form is the detection bracket: four 10px corner arms in 2px white strokes, no fill, sized to the object. Part markers are 12px marine dots with a 2px white ring, or numbered 24 to 28px marine discs with the same ring when the parts become a list. Leader lines are 1.5px white at 70 percent.

## Components

### Buttons
Confident, round, colour-led.
- **Shape:** full pill (9999px), 48px tall in heroes and the strip.
- **Primary:** Regatta Marine fill, white semibold 16px, 24px side padding, a trailing 20px stroke arrow.
- **Hover / Focus:** colour only, no movement: lightens to Signal Marine on navy and glass, deepens to Deep Marine on light grounds. Focus is the global 2px Signal Marine outline at a 2px offset. While sending, the submit dims to 70 percent with a wait cursor.
- **Quiet on dark:** text-only pill, white/80 rising to white on hover, with a trailing arrow ("See the parts", "Why join").
- **Outline (light):** 1px marine border, Deep Marine text, 10px by 20px; fills Pale Tide on hover.
- **White (navbar):** the navbar's "Join" is a white pill with Dark Glass text, hovering to Pale Tide; it is the nav's only filled control apart from the marine language switcher.

### Chips
- **Detection chip:** marine pill under a bracket, white 11px tabular reading.
- **Status chip (achievements):** Pale Tide fill, marine text, 12px uppercase medium with wide tracking and a dot that pulses for a live event (pulse removed under reduced motion). Tones for success, warning and on-dark exist in the component. A status chip labels a state, never a heading.

### Cards / Containers
- **Corner Style:** 16px for cards, 24px for panels.
- **Background:** Surface White on the ground; Chart Navy for the closing panel and media frames; Dark Glass for label cards.
- **Shadow Strategy:** see Elevation (Card rest, Label lift, Glass float).
- **Border:** a white/15 hairline on glass; a black/5 ring on white cards.
- **Internal Padding:** 24px, 32px from 768px; label cards 16px at a fixed 256px width.

### Inputs / Fields
- **Style:** on glass, 48px fields (44px on phones) with a 12px radius, a white/20 border, white/10 fill and white 16px text; placeholders at white/55.
- **Focus:** the border shifts to Sky Wash and the fill to white/15, plus the global focus outline.
- **Error:** invalid fields take a red-300 border; the message sits below the row in Error on Dark, announced as an alert.
- **Choices:** single-choice options are segmented pills (white/25 border, white/90 label); the selected one fills white with Dark Glass text and a marine tick. The submit pill renames itself after the chosen division.

### Navigation
A floating dark-glass pill 16px from the top, centred on wide screens and full width on phones: white/15 hairline, medium shadow, backdrop blur, both marks (UPTZ and Adria Hydrofoil) at 40px height on the left. Links are 18px white, hovering to Sky Wash; the Projects dropdown opens a 95 percent glass panel with 140 by 70px thumbnails. On phones a three-bar toggle opens the same links in a 16px-radius glass sheet below the pill.

### Chart Scene (signature)
The dark world's signature, used for the home hero and the Njord viewer.
- **Field:** Chart Navy with an additive white grid (minor lines every 5 units at 4 percent, major every 25 at 7.5 percent) and warped depth contours at 4.5 percent, fading out with distance from the vessel.
- **Sensors:** a translucent white camera fan (edges at 35 percent, fill near 22 percent) and a LiDAR Ice ring that sweeps and fades; buoys answer with a white ping ring.
- **Detections:** white corner brackets with a marine data chip below ("Buoy · 12 m").
- **Parts:** marine dots on the model joined by white leader lines to glass label cards that name the part and the division that builds it. Card positions keep 96px clear of the top for the navbar and 16px from the edges. On phones the cards become numbered marine discs and a plain list below the stage.
- **Honesty:** a white/60 caption states that the course and detections are an illustration.

**The One Scroll Moment Rule.** Each page spends motion on one authored scroll moment (on home: chart view tilting to a three-quarter view as the boat slows and its parts are labelled). Everything else is short colour and opacity transitions (200 to 350ms; content swaps use a 6px blur-and-rise with `cubic-bezier(0.16, 1, 0.3, 1)`).

**The Poster First Rule.** A still render of the scene's first frame is the LCP image. three.js loads after first paint (idle callback, or when the section comes within a screen of the viewport) and cross-fades in over 700ms. Rendering pauses when the section is offscreen or the tab is hidden. Under reduced motion or without WebGL the page shows poster stills in normal flow and a static parts list, with no scroll track.

### Results Ledger (signature)
The dated podium record as a hairline-ruled ordered list: tabular rank numeral, year, event with class and edition, and the vessel credited on every row. **The Data-Bound Record Rule.** Results, ranks, editions and vessels render from `src/app/[lang]/achievements/data.ts` and nowhere else; a page never hardcodes a result, and a result not in that file does not appear.

## Do's and Don'ts

### Do:
- **Do** use Chart Navy (#222944) for every dark section and as the WebGL clear colour.
- **Do** give each view exactly one filled marine pill, and make it the primary action.
- **Do** reuse the navbar's dark glass (gray-950 at 80 percent, white/15 hairline, backdrop blur) for content that floats over a picture or scene.
- **Do** keep chart overlays white and marine: white brackets, fans, rings and leader lines; marine chips and dots.
- **Do** render every result from `src/app/[lang]/achievements/data.ts`, with its date and its vessel.
- **Do** set ranks, years, distances and specs in tabular numerals.
- **Do** ship a poster still first, load three.js after first paint, pause rendering offscreen, and fall back to stills under reduced motion or without WebGL.
- **Do** put photo heroes under the navy gradient (95 percent navy at the top fading to a 10 percent slate).

### Don't:
- **Don't** put an eyebrow (a small uppercase label) above a heading.
- **Don't** use ink, black or opaque gray-950 as a section field; dark sections are navy and glass is translucent.
- **Don't** add a second filled marine pill to a view, or use marine as decoration.
- **Don't** bring a vessel's livery colours into the interface; they stay on the model.
- **Don't** spend motion on more than one authored scroll moment per page; the one ambient loop, the aurora drift, stops under reduced motion.
- **Don't** hardcode a result, rank or date on a page.
