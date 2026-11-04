# Navbar Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the cramped full-width navbar with a floating dark-glass pill (Aceternity-style animated dropdown with project image cards), and move the Contact / Open Source destinations into the footer.

**Architecture:** Three new/rewritten client components: `src/components/ui/navbar-menu.tsx` (generic pill/dropdown primitives, framer-motion), a rewritten `src/components/Navigation.tsx` (composes the primitives; owns nav data and mobile card menu), and an extended `src/components/Footer.tsx` (two new locale-aware links). All copy flows through the existing `t()` i18n hook with new keys added to both locales.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4, framer-motion v12, clsx + tailwind-merge.

**Spec:** `docs/superpowers/specs/2026-07-04-navbar-redesign-design.md`

## Global Constraints

- Commit messages: simple one-liners, **no co-author trailer** (user preference).
- `src/translations/en/common.json` and `src/translations/hr/common.json` must stay structurally in sync (same key tree).
- `menu.contact` and `menu.openSource` keys **must NOT be removed** — they are page headings in `src/app/[lang]/contact/page.tsx:70` and `src/app/[lang]/open-source/page.tsx:28,80`.
- Site is dark-only: no `dark:` variant classes in new code.
- `t()` returns strings only — every key used here resolves to a leaf string, never `.map()` over `t()`.
- No route/page changes; `sitemap.ts` untouched. `src/translations/index.ts` (dead legacy) untouched.
- There is no test framework. Verification gates are `npm run lint`, `npm run build`, and manual dev-server checks listed per task.
- All internal links are locale-prefixed: `` `/${locale}/...` `` with `locale` from `useLanguage()`.

---

### Task 1: Dependencies + `cn()` utility

**Files:**
- Modify: `package.json` (via npm install)
- Create: `src/lib/utils.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `cn(...inputs: ClassValue[]): string` — imported as `import { cn } from "@/lib/utils"` by Task 2.

- [ ] **Step 1: Install dependencies**

Run:
```bash
npm install framer-motion clsx tailwind-merge
```
Expected: succeeds; `package.json` gains the three deps (framer-motion resolves to the v12 line, React-19 compatible).

- [ ] **Step 2: Create the `cn()` helper**

Create `src/lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 3: Verify lint and build still pass**

Run: `npm run lint && npm run build`
Expected: both succeed (utils.ts is unused so far — that's fine; `next/core-web-vitals` does not fail on unused exports).

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json src/lib/utils.ts
git commit -m "chore: add framer-motion, clsx, tailwind-merge and cn utility"
```

---

### Task 2: Navbar menu primitives (`navbar-menu.tsx`)

**Files:**
- Create: `src/components/ui/navbar-menu.tsx`

**Interfaces:**
- Consumes: `cn` from `@/lib/utils` (Task 1).
- Produces (all consumed by Task 4):
  - `Menu({ setActive: (item: string | null) => void; children: React.ReactNode; className?: string })` — the pill `<nav>`; `onMouseLeave` resets active to `null`.
  - `MenuItem({ setActive: (item: string) => void; active: string | null; item: string; children?: React.ReactNode })` — hover trigger + animated dropdown panel (renders a rotating caret after the label).
  - `ProductItem({ title: string; description: string; href: string; src: string })` — image card link for the dropdown.

This is the Aceternity `navbar-menu` component adapted per the spec: dark-only styling (no `dark:` classes), `HoveredLink` dropped (unused), all props typed (no `any`), pill styling built into `Menu`.

- [ ] **Step 1: Create the component**

Create `src/components/ui/navbar-menu.tsx`:

```tsx
"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
} as const;

export function Menu({
  setActive,
  children,
  className,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className={cn(
        "relative flex items-center gap-4 rounded-full border border-white/15 bg-gray-950/80 px-4 py-2 shadow-lg backdrop-blur-md md:gap-6 md:px-6",
        className
      )}
    >
      {children}
    </nav>
  );
}

export function MenuItem({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) {
  const isActive = active === item;
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="flex cursor-pointer items-center gap-1.5 text-white transition-colors hover:text-blue-300"
      >
        {item}
        <svg
          width="10"
          height="9"
          viewBox="0 0 9 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Dropdown arrow"
          className={`transition-transform duration-200 ${isActive ? "rotate-180" : ""}`}
        >
          <path d="M4.5 7.5L0.602887 0.749999L8.39711 0.75L4.5 7.5Z" fill="currentColor" />
        </svg>
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {isActive && (
            <div className="absolute left-1/2 top-[calc(100%+1.1rem)] -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active"
                className="overflow-hidden rounded-2xl border border-white/15 bg-gray-950/95 shadow-2xl backdrop-blur-md"
              >
                <motion.div layout className="h-full w-max p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export function ProductItem({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) {
  return (
    <Link href={href} className="group flex gap-3">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="h-[70px] w-[140px] shrink-0 rounded-md object-cover shadow-2xl"
      />
      <div>
        <h4 className="mb-1 text-lg font-bold text-white transition-colors group-hover:text-blue-300">
          {title}
        </h4>
        <p className="max-w-[12rem] text-sm text-gray-400">{description}</p>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Verify lint passes**

Run: `npm run lint`
Expected: PASS (component not mounted anywhere yet).

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/navbar-menu.tsx
git commit -m "feat: add navbar menu primitives"
```

---

### Task 3: Translation keys (en + hr)

**Files:**
- Modify: `src/translations/en/common.json` (menu block ~line 15, footer block ~line 1164)
- Modify: `src/translations/hr/common.json` (menu block ~line 24, footer block ~line 1306)

**Interfaces:**
- Consumes: nothing.
- Produces (leaf string keys consumed by Tasks 4 and 5 via `t()`):
  - `menu.projectsDropdown.vilson|karolina|maloVitra|teredoNavalis`
  - `footer.contactForm`, `footer.openSourceFollow`

- [ ] **Step 1: Baseline the key-sync check (before editing)**

Run:
```bash
node -e "const a=require('./src/translations/en/common.json'),b=require('./src/translations/hr/common.json');const keys=(o,p='')=>Object.entries(o).flatMap(([k,v])=>typeof v==='object'&&v!==null?keys(v,p+k+'.'):[p+k]);const ka=new Set(keys(a)),kb=new Set(keys(b));const d=[...ka].filter(k=>!kb.has(k)).concat([...kb].filter(k=>!ka.has(k)));console.log(d.length?d:'IN SYNC');"
```
Note the output. If drift already exists, record it — after your edits the output must be identical (you add zero new drift).

- [ ] **Step 2: Add English keys**

In `src/translations/en/common.json`, replace:

```json
    "openSource": "Open Source",
    "contact": "Contact",
    "achievements": "Achievements"
  },
```

with:

```json
    "openSource": "Open Source",
    "contact": "Contact",
    "achievements": "Achievements",
    "projectsDropdown": {
      "vilson": "Energy-class racing boat — bronze at Monaco 2025",
      "karolina": "Autonomous vessel for Monaco's new AI Class",
      "maloVitra": "Competition boat — endurance and slalom races",
      "teredoNavalis": "One of UPTZ's first competition boats"
    }
  },
```

Then in the same file's `"footer"` block, replace:

```json
    "email": "uptzri@gmail.com",
    "followUs": "Follow Us",
    "socialDescription": "Stay connected with us on social media for updates and news.",
```

with:

```json
    "email": "uptzri@gmail.com",
    "contactForm": "Contact form",
    "followUs": "Follow Us",
    "socialDescription": "Stay connected with us on social media for updates and news.",
    "openSourceFollow": "Also follow our open source projects",
```

- [ ] **Step 3: Add Croatian keys**

In `src/translations/hr/common.json`, replace:

```json
    "openSource": "Otvoreni kod",
    "contact": "Kontakt",
    "achievements": "Postignuća"
  },
```

with:

```json
    "openSource": "Otvoreni kod",
    "contact": "Kontakt",
    "achievements": "Postignuća",
    "projectsDropdown": {
      "vilson": "Natjecateljski brod Energy klase — bronca u Monacu 2025",
      "karolina": "Autonomno plovilo za novu AI klasu u Monacu",
      "maloVitra": "Natjecateljski brod — utrke izdržljivosti i slaloma",
      "teredoNavalis": "Jedan od prvih natjecateljskih brodova UPTZ-a"
    }
  },
```

Then in the same file's `"footer"` block, replace:

```json
    "email": "uptzri@gmail.com",
    "followUs": "Pratite nas",
    "socialDescription": "Ostanite povezani s nama na društvenim mrežama za najnovije vijesti i ažuriranja.",
```

with:

```json
    "email": "uptzri@gmail.com",
    "contactForm": "Kontakt obrazac",
    "followUs": "Pratite nas",
    "socialDescription": "Ostanite povezani s nama na društvenim mrežama za najnovije vijesti i ažuriranja.",
    "openSourceFollow": "Pratite i naše open source projekte",
```

- [ ] **Step 4: Re-run the key-sync check**

Run the same node one-liner from Step 1.
Expected: output identical to the Step 1 baseline (`IN SYNC`, or the same pre-existing drift list — no new entries).

- [ ] **Step 5: Commit**

```bash
git add src/translations/en/common.json src/translations/hr/common.json
git commit -m "feat: add navbar dropdown and footer link translations"
```

---

### Task 4: Rewrite `Navigation.tsx` (floating pill + mobile card)

**Files:**
- Rewrite: `src/components/Navigation.tsx` (full replacement of current 245-line file)

**Interfaces:**
- Consumes: `Menu`, `MenuItem`, `ProductItem` from `@/components/ui/navbar-menu` (Task 2); translation keys from Task 3; existing `LanguageSwitcher`, `useLanguage`, `useTranslation`.
- Produces: default export `Navigation` (already mounted in `src/app/[lang]/layout.tsx:25` — no layout change needed).

What disappears vs. the old file: scroll listener + `isScrolled`, `isContactPage`, `isOpenSourcePage`, the CSS `group-hover` dropdown, and the Contact / Open Source / Delta One links.

- [ ] **Step 1: Replace the file contents**

Replace the entire contents of `src/components/Navigation.tsx` with:

```tsx
"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { memo, useCallback, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

const projects = [
  {
    slug: "vilson",
    title: "Vilson",
    image: "/about_landing_images/vilson.jpg",
    descriptionKey: "menu.projectsDropdown.vilson",
  },
  {
    slug: "karolina",
    title: "Karolina",
    image: "/about_landing_images/karolina.jpg",
    descriptionKey: "menu.projectsDropdown.karolina",
  },
  {
    slug: "malo-vitra",
    title: "Malo Vitra",
    image: "/about_landing_images/malo_vitra.jpg",
    descriptionKey: "menu.projectsDropdown.maloVitra",
  },
  {
    slug: "teredo-navalis",
    title: "Teredo Navalis",
    image: "/about_landing_images/teredo_navalis.jpg",
    descriptionKey: "menu.projectsDropdown.teredoNavalis",
  },
];

const Navigation = memo(function Navigation() {
  const { t } = useTranslation();
  const { locale } = useLanguage();
  const [active, setActive] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  return (
    <div className="fixed inset-x-0 top-4 z-[60] flex justify-center px-4">
      <div className="w-full md:w-auto">
        <Menu setActive={setActive} className="justify-between md:justify-start">
          <Link
            href={`/${locale}`}
            className="flex shrink-0 items-center gap-1"
            onClick={closeMobileMenu}
          >
            <Image
              src="/adria_hydrofoil_navbar_logo.svg"
              alt="Adria Hydrofoil Logo"
              width={55}
              height={131}
              className="h-10 w-auto"
              priority
            />
            <Image
              src="/UPTZ_navbar_logo.svg"
              alt="UPTZ Logo"
              width={175}
              height={84}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-6 text-lg text-white md:flex">
            <Link
              href={`/${locale}/about-us`}
              className="transition-colors hover:text-blue-300"
            >
              {t("menu.aboutUs")}
            </Link>
            <MenuItem setActive={setActive} active={active} item={t("menu.projects")}>
              <div className="grid grid-cols-2 gap-6 p-2">
                {projects.map((project) => (
                  <ProductItem
                    key={project.slug}
                    title={project.title}
                    description={t(project.descriptionKey)}
                    href={`/${locale}/projects/${project.slug}`}
                    src={project.image}
                  />
                ))}
              </div>
            </MenuItem>
            <Link
              href={`/${locale}/achievements`}
              className="transition-colors hover:text-blue-300"
            >
              {t("menu.achievements")}
            </Link>
            <Link
              href={`/${locale}/partners`}
              className="transition-colors hover:text-blue-300"
            >
              {t("menu.partners")}
            </Link>
            <LanguageSwitcher className="rounded-full bg-blue-600 text-white hover:bg-blue-700" />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="relative flex h-8 w-8 flex-col items-center justify-center md:hidden"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={`absolute block h-0.5 w-6 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45" : "-translate-y-1.5"
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`absolute block h-0.5 w-6 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45" : "translate-y-1.5"
              }`}
            ></span>
          </button>
        </Menu>

        {/* Mobile card menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-2 space-y-3 rounded-2xl border border-white/15 bg-gray-950/95 px-6 py-4 text-white shadow-2xl backdrop-blur-md md:hidden"
            >
              <Link
                href={`/${locale}/about-us`}
                className="block transition-colors hover:text-blue-300"
                onClick={closeMobileMenu}
              >
                {t("menu.aboutUs")}
              </Link>

              <div className="space-y-2">
                <span className="block font-medium">{t("menu.projects")}</span>
                <div className="space-y-2 pl-4">
                  {projects.map((project) => (
                    <Link
                      key={project.slug}
                      href={`/${locale}/projects/${project.slug}`}
                      className="block text-gray-300 transition-colors hover:text-blue-300"
                      onClick={closeMobileMenu}
                    >
                      {project.title}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href={`/${locale}/achievements`}
                className="block transition-colors hover:text-blue-300"
                onClick={closeMobileMenu}
              >
                {t("menu.achievements")}
              </Link>

              <Link
                href={`/${locale}/partners`}
                className="block transition-colors hover:text-blue-300"
                onClick={closeMobileMenu}
              >
                {t("menu.partners")}
              </Link>

              <div className="pt-2">
                <LanguageSwitcher className="rounded-full bg-blue-600 text-white hover:bg-blue-700" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});

export default Navigation;
```

- [ ] **Step 2: Verify lint and build**

Run: `npm run lint && npm run build`
Expected: both PASS.

- [ ] **Step 3: Manual dev-server check (desktop)**

Run `npm run dev`, open `http://localhost:3000/en`:
- Floating pill centered at top, both logos visible (~40 px tall), 3 links + Projects + EN button.
- Hover "Projects": panel animates in with 4 image cards (Vilson, Karolina, Malo Vitra, Teredo Navalis), each linking to `/en/projects/<slug>`.
- No Contact, Open Source, or Delta One anywhere in the nav.
- Pill looks the same after scrolling (no style flip).
- If the pill is visibly too tall/short, adjust the two logo `h-10` classes (keep pill ≤ ~64 px tall) — visual tweak allowed here.

- [ ] **Step 4: Manual dev-server check (mobile)**

Resize to < 768 px wide (or device toolbar):
- Pill spans width (16 px side margins), logos left + hamburger right.
- Tap hamburger → rounded glass card drops below the pill with About Us, Projects (4 indented plain-text links), Achievements, Partners, EN switcher.
- Tapping any link closes the card and navigates.

- [ ] **Step 5: Commit**

```bash
git add src/components/Navigation.tsx
git commit -m "feat: replace navbar with floating glass pill design"
```

---

### Task 5: Footer links (Contact form + Open Source)

**Files:**
- Modify: `src/components/Footer.tsx`

**Interfaces:**
- Consumes: `footer.contactForm`, `footer.openSourceFollow` keys (Task 3); `useLanguage` from `@/context/LanguageContext`.
- Produces: nothing consumed downstream.

- [ ] **Step 1: Add imports and locale**

In `src/components/Footer.tsx`, replace:

```tsx
import { useTranslation } from '@/hooks/useTranslation';
import Image from 'next/image';

export default function Footer() {
  const { t } = useTranslation();
```

with:

```tsx
import { useLanguage } from '@/context/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const { t } = useTranslation();
  const { locale } = useLanguage();
```

- [ ] **Step 2: Add the "Contact form" row under the email row**

In the Contact Info column, after the closing `</p>` of the email row (the one containing `{t('footer.email')}`), insert:

```tsx
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                <Link
                  href={`/${locale}/contact`}
                  className="underline underline-offset-4 transition-colors hover:text-white"
                >
                  {t('footer.contactForm')}
                </Link>
              </p>
```

- [ ] **Step 3: Add the open-source link under the social icons**

In the Follow Us column, after the closing `</div>` of the `<div className="flex space-x-4">` social-icons row, insert:

```tsx
              <Link
                href={`/${locale}/open-source`}
                className="inline-block text-sm text-gray-300 underline underline-offset-4 transition-colors hover:text-white"
              >
                {t('footer.openSourceFollow')} →
              </Link>
```

- [ ] **Step 4: Verify lint, build, and links**

Run: `npm run lint && npm run build`
Expected: both PASS.

Then on the dev server (`/en`, scroll to footer):
- Contact column shows "Contact form" under the email; clicking navigates to `/en/contact`.
- Follow Us column shows "Also follow our open source projects →" under the icons; clicking navigates to `/en/open-source`.

- [ ] **Step 5: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: add contact form and open source links to footer"
```

---

### Task 6: Full verification pass

**Files:**
- None expected; fix-ups only if checks fail.

**Interfaces:**
- Consumes: everything above.
- Produces: verified feature branch.

- [ ] **Step 1: Gates**

Run: `npm run lint && npm run build`
Expected: both PASS.

- [ ] **Step 2: Locale matrix**

On the dev server, check `/en` and `/hr`:
- All navbar labels and the 4 dropdown descriptions render translated — no raw key strings like `menu.projectsDropdown.vilson` visible anywhere.
- Footer links show "Contact form" / "Kontakt obrazac" and "Also follow our open source projects" / "Pratite i naše open source projekte", each navigating within the current locale.

- [ ] **Step 3: Page-top sweep**

Visit the top of every page against the floating pill (pages were designed for a full-width bar): `/en`, `/en/about-us`, `/en/partners`, `/en/contact`, `/en/open-source`, `/en/achievements`, `/en/projects/vilson`, `/en/projects/karolina`, `/en/projects/malo-vitra`, `/en/projects/teredo-navalis`, `/en/projects/delta-one`, `/en/projects/hydrocontest`.
Expected: pill legible on each page top (dark glass over any background); no content awkwardly hidden behind it. Flag any page needing a top-padding tweak to the user rather than restyling pages unilaterally.

- [ ] **Step 4: Dropdown edge check at 768–1024 px**

At exactly 768 px and ~1024 px widths, hover Projects: the ~500 px-wide panel must not clip off the viewport edge. If it clips, reduce the panel to `grid-cols-1` below `lg` via the dropdown wrapper div in `Navigation.tsx` (`grid grid-cols-1 lg:grid-cols-2 gap-6 p-2`).

- [ ] **Step 5: Delta One reachability**

From `/en`, use the landing-page project gallery to reach `/en/projects/delta-one`.
Expected: works (nav removal did not orphan the page).

- [ ] **Step 6: Commit any fix-ups**

```bash
git add -A
git commit -m "fix: navbar verification fixes"
```
(Skip if no changes.)
