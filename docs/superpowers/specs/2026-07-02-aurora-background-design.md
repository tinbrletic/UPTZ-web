# Aurora Background — Design Spec

**Date:** 2026-07-02
**Branch:** `feature/aurora-background` (based on `feature/achievements-page`)
**Status:** Approved by user (palette, intensity, and mask chosen via visual-companion mockups)

## Goal

Replace the per-page animated "blob" background with a single site-wide Aurora background
(adapted from the Aceternity UI `aurora-background` component), visible on every page under
`src/app/[lang]/`.

## Decisions (locked with user)

| Decision | Choice |
|---|---|
| Palette | **Deep Marine**: `#2563eb`, `#0ea5e9`, `#93c5fd`, `#a5f3fc`, `#60a5fa` (UPTZ primary blue + ocean cyans from the achievements design tokens) |
| Intensity | **Toned down**: opacity `0.35`, blur `16px` |
| Mask | **Sea glow**: glow rises from the bottom of the viewport — `radial-gradient(ellipse 90% 65% at 50% 100%, black 15%, transparent 75%)` |
| Placement | Viewport-fixed backdrop, rendered **once** in `src/app/[lang]/layout.tsx`, behind all content |
| Scope | All pages, including `achievements` (which currently has no background) and future pages |
| Blobs | Fully removed: components, per-page usage, and CSS |
| Dependencies | **None added.** No framer-motion (demo-only), no clsx/tailwind-merge/cn (component is static) |

## New component

`src/components/ui/aurora-background.tsx` — first component in the new `ui/` folder
(shadcn-style convention). No props, no state, no children:

```tsx
"use client";

export default function AuroraBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="aurora-layer" />
    </div>
  );
}
```

Rationale for deviations from the Aceternity original:

- **`-z-10` (not `z-0`)** — a fixed element at `z-index: 0` paints above plain static content;
  negative z-index sits behind all normal-flow content unconditionally, while the `#f5f7f9`
  body background (which propagates to the canvas) still paints beneath it. Pages need no
  `z-10` wrappers for the aurora to stay behind them.
- **Not a wrapper with children** — the original wraps hero content in a `<main>`; the layout
  already has a `<main>`, and a backdrop role fits this site's use.
- **`aria-hidden` + `pointer-events-none`** — decorative only.

## CSS (in `src/app/globals.css`)

The effect lives as plain CSS (repo convention — same as the existing animation classes),
not Tailwind arbitrary values. The pasted Tailwind-v3 config extension is obsolete: this is
a Tailwind v4 project (CSS-first, no `tailwind.config.js`), keyframes live in CSS, and no
color-variable plugin is needed.

```css
/* Aurora background (site-wide backdrop; replaces blob background) */
.aurora-layer {
  position: absolute;
  inset: -14px;
  opacity: 0.35;
  filter: blur(16px) invert(1);
  --aurora-white: repeating-linear-gradient(100deg, #fff 0%, #fff 7%,
      transparent 10%, transparent 12%, #fff 16%);
  --aurora-stripes: repeating-linear-gradient(100deg,
      #2563eb 10%, #0ea5e9 15%, #93c5fd 20%, #a5f3fc 25%, #60a5fa 30%);
  background-image: var(--aurora-white), var(--aurora-stripes);
  background-size: 300%, 200%;
  background-position: 50% 50%, 50% 50%;
  -webkit-mask-image: radial-gradient(ellipse 90% 65% at 50% 100%, black 15%, transparent 75%);
  mask-image: radial-gradient(ellipse 90% 65% at 50% 100%, black 15%, transparent 75%);
}
.aurora-layer::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: var(--aurora-white), var(--aurora-stripes);
  background-size: 200%, 100%;
  mix-blend-mode: difference;
  animation: aurora-drift 60s linear infinite;
}
@keyframes aurora-drift {
  from { background-position: 50% 50%, 50% 50%; }
  to   { background-position: 350% 50%, 350% 50%; }
}
@media (prefers-reduced-motion: reduce) {
  .aurora-layer::after { animation: none; }
}
```

Dropped from the original on purpose:

- `background-attachment: fixed` — redundant inside a `position: fixed` container and broken
  on iOS Safari.
- All `dark:` variants — the site is light-mode only (dark-mode CSS is commented out).

## Layout integration

`src/app/[lang]/layout.tsx`:

```tsx
<LanguageProvider>
  <LanguageMetadata />
  <AuroraBackground />
  <Navigation />
  <main className={`${saira.className} antialiased`}>{children}</main>
  <Footer />
</LanguageProvider>
```

## Blob removal

- Delete `src/components/Blob.tsx` and `src/components/BlobContainer.tsx`.
- Edit the 11 pages that use it (all `BlobContainer` consumers found by grep) to remove the
  `import BlobContainer` line and the `fixed inset-0 pointer-events-none z-0` wrapper div
  holding the BlobContainer stack:
  - `src/app/[lang]/page.tsx` (home — wrapper also contains responsive `hidden sm:block` /
    `hidden lg:block` sub-divs; remove the whole wrapper)
  - `src/app/[lang]/about-us/page.tsx`
  - `src/app/[lang]/contact/page.tsx`
  - `src/app/[lang]/partners/page.tsx`
  - `src/app/[lang]/open-source/page.tsx`
  - `src/app/[lang]/projects/delta-one/page.tsx`
  - `src/app/[lang]/projects/hydrocontest/page.tsx`
  - `src/app/[lang]/projects/karolina/page.tsx`
  - `src/app/[lang]/projects/malo-vitra/page.tsx`
  - `src/app/[lang]/projects/teredo-navalis/page.tsx`
  - `src/app/[lang]/projects/vilson/page.tsx`

  Pages' existing `relative z-10` content wrappers stay as-is (harmless; minimal diff).
- Delete dead blob CSS from `globals.css`: the 12 blob `@keyframes` (`blob-1..4`,
  `blob-reverse-1..4`, `blob-slow-1..4`), the 12 `.animate-blob-*` classes, their
  `prefers-reduced-motion` block, and the mobile animation-duration overrides (~240 lines).
  All other animations (`fadeInUp`, `scaleIn`, `slideInLeft/Right`, `pulse`, partner scroll,
  etc.) remain untouched.

## Performance & accessibility

- Net improvement: replaces 6–12 concurrently animated, blurred, transformed divs per page
  with one static blurred layer plus one animating pseudo-element.
- Known trade-off: the drift animates `background-position` (repaint-based) rather than
  `transform`, but it is a single slow (60s linear) animation replacing a dozen.
- `prefers-reduced-motion: reduce` freezes the drift; the static gradient remains (parity
  with current blob behavior).
- Pure CSS — no mount-gating JS, no resize listeners, no hydration pop-in (improvement over
  `BlobContainer`, which rendered `null` until mounted).
- Graceful degradation: no `mask-image` support → unmasked wash; no `mix-blend-mode` →
  fainter static gradient. No runtime failure paths.

## Verification

1. `npm run lint` passes.
2. `npm run build` passes.
3. `grep -ri "blob" src/` returns no code references (only asset names, if any).
4. Playwright on the dev server: screenshot `/en` and `/hr` for home, about-us, achievements,
   contact, and one project page. Confirm: sea glow visible at the bottom of the viewport,
   stays fixed while scrolling, no content tinted/overlapped, navbar and footer unaffected.

## Out of scope (YAGNI, deferred)

- Per-page overrides of opacity/mask via CSS custom properties.
- Dark-mode variant.
- Any hero-section-specific aurora treatment.
