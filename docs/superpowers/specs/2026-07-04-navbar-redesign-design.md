# Navbar Redesign — Design Spec

**Date:** 2026-07-04
**Status:** Approved by user (visual companion session: layout option A, mobile option A)

## Goal

The navbar is cramped since Achievements was added. Reduce it to four destinations by
moving Contact and Open Source into the footer, and replace the flat full-width bar
with a floating dark-glass pill navbar based on the Aceternity `navbar-menu`
component (framer-motion animated dropdown with image cards for projects).

## Decisions made during brainstorming

| Decision | Choice |
|---|---|
| Navbar shell | Floating dark-glass pill, centered, `fixed top-4` (option A) |
| Logos | Both logos stay, resized to fit the pill (hydrofoil ≈35 px, UPTZ wordmark ≈110 px wide) |
| Nav items | About Us · Projects ▾ · Achievements · Partners · language switcher |
| Projects dropdown | 2×2 grid of image cards: **Vilson, Karolina, Malo Vitra, Teredo Navalis** only |
| Delta One / Hydrocontest | Removed from nav entirely; pages stay live (reachable via direct URL / in-page links) |
| Mobile | Pill everywhere: compacts to logos + hamburger; menu opens as a rounded glass card below the pill (option A) |
| Contact in nav | Removed → footer Contact column gets a "Contact form" link |
| Open Source in nav | Removed → footer Follow Us column gets an "Also follow our open source projects" link |
| Scroll behavior | Constant glass style; delete `isScrolled` / `isContactPage` / `isOpenSourcePage` logic |

## New dependencies

- `framer-motion` (v12 line — React 19 compatible)
- `clsx` + `tailwind-merge` (for the `cn()` helper)

## Files

### New

- **`src/lib/utils.ts`** — standard shadcn `cn()`: `twMerge(clsx(inputs))`.
- **`src/components/ui/navbar-menu.tsx`** — Aceternity primitives adapted to this site:
  - `Menu` — the pill: `rounded-full bg-gray-950/80 border border-white/15 backdrop-blur-md shadow-lg`, flex row, `onMouseLeave` resets active item.
  - `MenuItem` — hover-activated dropdown trigger with the `layoutId="active"` morph
    animation. Panel restyled dark: `bg-gray-950/95 border-white/15 rounded-2xl`.
  - `ProductItem` — image card (next/image, 140×70, rounded, `object-cover`) + title + one-line description; white title, `text-gray-400` description.
  - Changes vs. the source component: all `dark:` dual-theme classes removed (site
    is dark-only), `HoveredLink` dropped (unused — plain `Link`s suffice), the
    `any`-typed props properly typed.

### Rewritten

- **`src/components/Navigation.tsx`**
  - Desktop (`md+`): floating pill — `fixed top-4 inset-x-0 mx-auto w-fit z-[60]`.
    Inside, left to right: home-link with both logos (resized), About Us,
    Projects (`MenuItem` dropdown), Achievements, Partners, `LanguageSwitcher`
    (reused as-is).
  - Projects dropdown: 2×2 grid of `ProductItem`s. Images (already exist, no new assets):
    - `/about_landing_images/vilson.jpg`
    - `/about_landing_images/karolina.jpg`
    - `/about_landing_images/malo_vitra.jpg`
    - `/about_landing_images/teredo_navalis.jpg`
  - Titles are proper nouns, hardcoded (as today). Descriptions from new
    translation keys (below).
  - Mobile (`<md`): pill shows logos + hamburger (existing animated 3-bar button
    style). Tap opens a rounded glass card (`rounded-2xl bg-gray-950/95
    border-white/15`) directly below the pill, animated with framer-motion
    (`AnimatePresence`, fade + slide). Contents: About Us, "Projects" heading with
    the 4 project links indented as plain text, Achievements, Partners, language
    switcher. Any link tap closes the card.
  - Deleted: scroll listener, `isScrolled`, `isContactPage`, `isOpenSourcePage`,
    the CSS-only `group-hover` dropdown, Contact / Open Source / Delta One links.

- **`src/components/Footer.tsx`**
  - Gains `useLanguage()` for locale-aware hrefs.
  - Contact column: new row under email — icon + `Link` to `/{locale}/contact`,
    label `t('footer.contactForm')`.
  - Follow Us column: under the social icons — `Link` to `/{locale}/open-source`,
    label `t('footer.openSourceFollow')`, styled as a text link with trailing →.

### Translations (`src/translations/{en,hr}/common.json`, keep structurally in sync)

New keys:

```jsonc
"menu": {
  "projectsDropdown": {
    "vilson": "Energy-class racing boat — bronze at Monaco 2025",      // hr: "Natjecateljski brod Energy klase — bronca u Monacu 2025"
    "karolina": "Autonomous vessel for Monaco's new AI Class",         // hr: "Autonomno plovilo za novu AI klasu u Monacu"
    "maloVitra": "Competition boat — endurance and slalom races",      // hr: "Natjecateljski brod — utrke izdržljivosti i slaloma"
    "teredoNavalis": "One of UPTZ's first competition boats"           // hr: "Jedan od prvih natjecateljskih brodova UPTZ-a"
  }
},
"footer": {
  "contactForm": "Contact form",                                       // hr: "Kontakt obrazac"
  "openSourceFollow": "Also follow our open source projects"           // hr: "Pratite i naše open source projekte"
}
```

> **Copy fact-check (user):** the four dropdown descriptions are drafts written from
> the achievements-page copy. The existing per-project `description` fields in
> common.json are placeholder text (Vilson is described as a forest robot; Karolina
> is lorem ipsum) and must NOT be reused. User confirms/edits the four lines at
> spec review or implementation review.

Removed keys: `menu.contact` and `menu.openSource` — only if a grep confirms the
navbar was their sole consumer; otherwise they stay.

## Explicitly out of scope

- No route/page changes → `sitemap.ts` untouched.
- `src/translations/index.ts` (dead legacy code) untouched.
- No changes to Delta One / Hydrocontest pages themselves.
- Keyboard access to the desktop dropdown matches the current site (hover-only, a
  limitation shared with today's CSS `group-hover` menu; all top-level links remain
  tab-navigable, and every project stays reachable through the mobile card menu).

## Error handling

Static presentational UI — no new error paths. All dropdown images are local files
in `public/`, so no remote image loader configuration is involved.

## Verification (no test framework exists)

1. `npm run lint` and `npm run build` must pass.
2. Manual pass on the dev server:
   - Desktop: hover Projects → panel morph animation, 4 cards, correct links.
   - Mobile viewport: hamburger → glass card, all links work, card closes on tap.
   - Both locales (`/en`, `/hr`): all new strings render, no raw key names visible.
   - Footer: "Contact form" → `/{locale}/contact`; "Also follow our open source
     projects" → `/{locale}/open-source`.
   - Top of every page checked against the floating pill (pages were designed for a
     full-width bar; the aurora backdrop shows through around the pill now).
