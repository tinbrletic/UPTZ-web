# Aurora Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the per-page animated blob background with a single site-wide Aurora backdrop (Deep Marine palette, sea-glow mask) rendered once in the `[lang]` layout.

**Architecture:** A zero-logic client component (`AuroraBackground`) renders a viewport-fixed, `-z-10`, `aria-hidden` backdrop div; the entire visual effect lives in plain CSS in `globals.css` (repo convention). It is mounted once in `src/app/[lang]/layout.tsx`, so every localized page gets it. The legacy blob system (2 components, usage in 11 pages, ~240 lines of CSS) is then deleted.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4 (CSS-first — there is **no** `tailwind.config.js`). Spec: `docs/superpowers/specs/2026-07-02-aurora-background-design.md`.

## Global Constraints

- **No new npm dependencies.** No framer-motion, no clsx/tailwind-merge, no shadcn CLI.
- **No test framework exists** (per CLAUDE.md). Gates are `npm run lint` and `npm run build`, plus Playwright visual verification in Task 4.
- **Palette (exact values):** `#2563eb`, `#0ea5e9`, `#93c5fd`, `#a5f3fc`, `#60a5fa`. Opacity `0.35`, blur `16px`.
- **Sea-glow mask (exact value):** `radial-gradient(ellipse 90% 65% at 50% 100%, black 15%, transparent 75%)`.
- Light mode only — do NOT add `dark:` variants. Do NOT add `background-attachment: fixed`.
- Do not touch translation JSON files, sitemap/robots, or anything outside the files listed per task.
- Work on branch `feature/aurora-background`. Windows environment; commands below run in PowerShell unless noted.

---

### Task 1: Aurora component, CSS, and layout wiring

**Files:**
- Create: `src/components/ui/aurora-background.tsx`
- Modify: `src/app/globals.css` (insert after the `body { ... }` rule, before the `/* Blob Animations` comment)
- Modify: `src/app/[lang]/layout.tsx`

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: default export `AuroraBackground` (no props) from `@/components/ui/aurora-background`; CSS class `.aurora-layer` and keyframes `aurora-drift` in `globals.css`. Task 4 relies on `.aurora-layer` existing in the DOM on every page.

- [ ] **Step 1: Create the component**

Create `src/components/ui/aurora-background.tsx` (the `ui/` folder does not exist yet — create it) with exactly:

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

- [ ] **Step 2: Add the effect CSS**

In `src/app/globals.css`, directly after the closing `}` of the `body { ... }` rule (around line 20) and before the `/* Blob Animations - Optimized for performance and reduced layout shifts */` comment, insert:

```css
/* ============================================================
   Aurora background — site-wide fixed backdrop
   Rendered by src/components/ui/aurora-background.tsx (mounted
   once in src/app/[lang]/layout.tsx). Deep Marine palette,
   sea-glow mask. Replaces the old blob background.
   ============================================================ */
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
  from {
    background-position: 50% 50%, 50% 50%;
  }
  to {
    background-position: 350% 50%, 350% 50%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .aurora-layer::after {
    animation: none;
  }
}
```

- [ ] **Step 3: Mount in the layout**

In `src/app/[lang]/layout.tsx`, add the import (with the other `@/` imports, alphabetical position first):

```tsx
import AuroraBackground from "@/components/ui/aurora-background";
```

and change the JSX from:

```tsx
    <LanguageProvider>
      <LanguageMetadata />
      <Navigation />
```

to:

```tsx
    <LanguageProvider>
      <LanguageMetadata />
      <AuroraBackground />
      <Navigation />
```

- [ ] **Step 4: Lint**

Run: `npm run lint`
Expected: passes with no new warnings/errors.

- [ ] **Step 5: Build**

Run: `npm run build`
Expected: compiles successfully.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/aurora-background.tsx src/app/globals.css "src/app/[lang]/layout.tsx"
git commit -m "feat(ui): add site-wide aurora background backdrop"
```

---

### Task 2: Remove blob components and all page usage

**Files:**
- Delete: `src/components/Blob.tsx`, `src/components/BlobContainer.tsx`
- Modify (11 pages): `src/app/[lang]/page.tsx`, `src/app/[lang]/about-us/page.tsx`, `src/app/[lang]/contact/page.tsx`, `src/app/[lang]/partners/page.tsx`, `src/app/[lang]/open-source/page.tsx`, `src/app/[lang]/projects/delta-one/page.tsx`, `src/app/[lang]/projects/hydrocontest/page.tsx`, `src/app/[lang]/projects/karolina/page.tsx`, `src/app/[lang]/projects/malo-vitra/page.tsx`, `src/app/[lang]/projects/teredo-navalis/page.tsx`, `src/app/[lang]/projects/vilson/page.tsx`

**Interfaces:**
- Consumes: nothing (independent of Task 1 — the aurora backdrop from Task 1 remains the site background once blobs are gone).
- Produces: a codebase with zero references to `Blob`/`BlobContainer` in `.tsx` files. Task 3 relies on this before deleting the CSS.

- [ ] **Step 1: Remove usage from the 10 standard pages**

In every listed page EXCEPT `src/app/[lang]/page.tsx`, make exactly two deletions.

Deletion A — the import line:

```tsx
import BlobContainer from "@/components/BlobContainer";
```

Deletion B — the background wrapper block. If a single `{/* ... Blob ... */}` comment line sits directly above the div, delete it too; if there is no such comment, just delete the div. The div block is identical in all 10 files:

```tsx
      {/* Global Blob Background - spans entire page */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <BlobContainer animationType="normal" />
        <BlobContainer animationType="reverse" className="opacity-50" />
        <BlobContainer animationType="slow" className="opacity-30" />
      </div>
```

Do not change anything else in these files (their `relative z-10` content wrappers stay).

- [ ] **Step 2: Remove usage from the homepage**

In `src/app/[lang]/page.tsx`, delete the same import line, and delete this wrapper (it differs from the others — nested responsive divs). Current code around lines 174–184:

```tsx
      {/* Global Blob Background - optimized for mobile */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <BlobContainer animationType="normal" />
        {/* Reduce blob layers on mobile for better performance */}
        <div className="hidden sm:block">
          <BlobContainer animationType="reverse" className="opacity-30 lg:opacity-50" />
        </div>
        <div className="hidden lg:block">
          <BlobContainer animationType="slow" className="opacity-20 lg:opacity-30" />
        </div>
      </div>
```

Note: the closing `</div>` of this wrapper is on the same line as the next section's comment (`</div>{/* Hero Section - 100vh */}`); keep the `{/* Hero Section - 100vh */}` comment and everything after it.

- [ ] **Step 3: Delete the components**

Delete `src/components/Blob.tsx` and `src/components/BlobContainer.tsx`.

```bash
git rm src/components/Blob.tsx src/components/BlobContainer.tsx
```

- [ ] **Step 4: Verify zero references remain**

Run (Git Bash): `grep -rn "Blob" src --include="*.tsx" --include="*.ts"`
Expected: no output (zero matches).

- [ ] **Step 5: Lint**

Run: `npm run lint`
Expected: passes.

- [ ] **Step 6: Build**

Run: `npm run build`
Expected: compiles successfully.

- [ ] **Step 7: Commit**

```bash
git add -A src
git commit -m "refactor: remove blob background components and per-page usage"
```

---

### Task 3: Remove dead blob CSS

**Files:**
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: Task 2 must be complete (no `.tsx` file references blob classes).
- Produces: `globals.css` with no blob keyframes/classes. Nothing downstream depends on this beyond cleanliness.

- [ ] **Step 1: Delete the blob CSS block**

In `src/app/globals.css`, delete the contiguous block that starts at the comment line:

```css
/* Blob Animations - Optimized for performance and reduced layout shifts */
```

and ends with the closing `}` of the mobile-optimizations media query — i.e. everything up to (but NOT including) the comment line:

```css
/* Fade In Up Animation */
```

This removes exactly: 12 `@keyframes` (`blob-1`…`blob-4`, `blob-reverse-1`…`blob-reverse-4`, `blob-slow-1`…`blob-slow-4`), the 12 `.animate-blob-*` classes, the `@media (prefers-reduced-motion: reduce)` block that references only `.animate-blob-*` classes, and the `@media (max-width: 768px)` block titled `/* Mobile performance optimizations */` that adjusts only blob animation durations. Roughly 240 lines. Do NOT touch the aurora block (added in Task 1), `fadeInUp`, `scaleIn`, `slideInLeft/Right`, `pulse`, partner-scroll animations, or the UPTZ design-token section.

- [ ] **Step 2: Verify no blob CSS remains**

Run (Git Bash): `grep -in "blob" src/app/globals.css`
Expected: exactly ONE match — the aurora block's header comment ("Replaces the old blob background", added in Task 1). Any other match means blob CSS survived; go back to Step 1.

- [ ] **Step 3: Lint and build**

Run: `npm run lint` then `npm run build`
Expected: both pass.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "chore: remove dead blob animation CSS"
```

---

### Task 4: Visual verification pass

**Files:**
- No source changes expected. Screenshots go to the session scratchpad or `.superpowers/` (both untracked) — NOT committed.

**Interfaces:**
- Consumes: Tasks 1–3 complete. `.aurora-layer` div present in the layout on every page.
- Produces: a written verification report (returned as the task result, not a file in the repo).

- [ ] **Step 1: Final gates**

Run: `npm run lint` then `npm run build`
Expected: both pass.

- [ ] **Step 2: Start the dev server**

Run in background: `npm run dev`
Expected: serves on `http://localhost:3000` (if the port differs, use the reported one).

- [ ] **Step 3: Verify pages with Playwright**

Using the Playwright browser tools (`browser_navigate`, `browser_evaluate`, `browser_take_screenshot`), for EACH of these URLs:

- `http://localhost:3000/en`
- `http://localhost:3000/hr`
- `http://localhost:3000/en/about-us`
- `http://localhost:3000/en/achievements`
- `http://localhost:3000/en/contact`
- `http://localhost:3000/en/projects/delta-one`

check:

1. `document.querySelector(".aurora-layer")` is non-null (via `browser_evaluate`).
2. Take a full-viewport screenshot; visually confirm a soft blue glow at the bottom of the viewport, strongest at bottom-center, absent near the top.
3. Text and white cards are NOT tinted or overlapped by the effect (the layer must be behind everything).

On `http://localhost:3000/en` additionally: scroll to mid-page and to the footer (via `browser_evaluate` with `window.scrollTo`), screenshot each position, and confirm the glow stays anchored to the viewport bottom (it is `position: fixed`) rather than scrolling with content.

- [ ] **Step 4: Stop the dev server and report**

Stop the background dev server. Report: pass/fail per URL, plus any visual anomalies (tinting, z-order issues, missing glow, console errors). Do not commit anything.
