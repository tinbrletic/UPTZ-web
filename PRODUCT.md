# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: prospective members.** Students, young engineers and enthusiasts who are deciding whether to join UPTZ and where they would fit. UPTZ describes itself as "a team of young engineers, students and enthusiasts from Rijeka", with members from various fields, including the Faculty of Maritime Studies in Rijeka. Their job on the site: understand what UPTZ builds and races, see what each division does, and get in touch.

**How joining works today:** anyone interested writes to UPTZ at any time of year (contact form, email or social media) and the team replies. There are no recruitment rounds, deadlines or application form.

**Secondary audiences:**
- **Sponsors and partners:** companies and institutions deciding whether to fund or partner with UPTZ. The partners page groups them in Diamond, Platinum, Gold and Silver tiers.
- **Public, press and the competition community:** people following what UPTZ builds and how it places.

**Not a target audience:** individual donors. The site shows PayPal and IBAN donation details in the footer of every page, but donors were not named as an audience to design for.

## Product Purpose

The website of UPTZ: Udruga primijenjenih tehničkih znanosti (Association of Applied Technical Sciences), Rijeka, Croatia, founded in 2018. UPTZ designs, builds and races electric and autonomous boats in international student competitions.

The site exists first to turn interested people into members: they should come away knowing what UPTZ does, what joining involves, and how to make contact. It also gives sponsors, partners and the public an accurate record of the vessels and results.

## Positioning

Two claims UPTZ makes about itself, both confirmed as central:

1. **A podium record.** International results with its own vessels since 2021, including (source: `src/app/[lang]/achievements/data.ts`):
   - 3rd overall, Energy Class, Monaco Energy Boat Challenge, 12th edition, 2025 (Vilson)
   - 2nd overall, Sardinia Innovative Boat Week, Olbia, 2024 (Vilson)
   - 2nd in slalom/elimination, Monaco Energy Boat Challenge, 11th edition, 2024 (Vilson)
2. **Students build it all.** Members design, build and race real vessels end to end: composite hulls, electric propulsion, electronics and, for Karolina, autonomy software.

Facts that exist on the site but were not chosen as central positioning: Karolina's entry in the new Monaco AI Class, and the Croatian and Rijeka identity (for example, the Croatian flag in Vilson's design).

## Operating Context

- **Competitions:** Monaco Energy Boat Challenge (Port Hercule; Energy Class, and the AI Class with Karolina), Sardinia Innovative Boat Week (Olbia), Adria Energy Boat Class (Rijeka, 2023), HydroContest (Lake Geneva, 2021, with Delta One).
- **Vessels with their own pages:** Vilson, Karolina, Malo Vitra, Teredo Navalis, Delta One, and HydroConX (`/[lang]/projects/hydrocontest`).
- **Team divisions** shown on the About page: Project Managers, Engineering Team, Electrical Team, Marketing and Web. The translations also define "Development Team" and "Volunteers", which the page does not currently show.
- **Contact channels:** contact form (EmailJS), uptzri@gmail.com, +385 98 9176039, Ante Kovačića 17, 51000 Rijeka. Social: Facebook (`uptz18`), Instagram (`uptz_aats`), LinkedIn (`uptz`), YouTube.
- **How content changes:** site copy lives in `src/translations/en/common.json` and `src/translations/hr/common.json`. Results and upcoming events live in `src/app/[lang]/achievements/data.ts`. Changes go through pull requests into the protected `development` branch of `tinbrletic/UPTZ-web`.

## Capabilities and Constraints

- **Bilingual, English first.** Every visitor-facing string exists in English and Croatian. English is the default language; Croatian is second. The translation hook does not fall back per key, so a string missing in one language shows its raw key.
- **Contact form** sends through EmailJS from the browser. The keys are public by design, and the recipient is fixed in the EmailJS template. Real abuse limits are EmailJS dashboard settings.
- **Joining** has no dedicated flow. "Join Our Team" on the About page links to the general contact form.
- **Domain:** uptz.hr.
- **Open decisions:**
  - Production hosting. Vercel's free plan only deploys commits by the account owner, and production currently deploys from `Marko132001/uptz_web`. Who owns the production deployment is not decided.
  - The 2026 Monaco Energy Boat Challenge results are not yet on the site. The Achievements narrative is still written as upcoming.

## Brand Commitments

- **Name:** UPTZ, written in full as "Udruga primijenjenih tehničkih znanosti" (the spelling on the logo). In English: Association of Applied Technical Sciences.
- **Two marks, used together:** the UPTZ logo and **Adria Hydrofoil**, UPTZ's own racing team brand (callsign "ADRIA RACING" in the achievements data). Assets: `public/UPTZ_navbar_logo.svg`, `public/adria_hydrofoil_navbar_logo.svg`, `public/footer/UPTZ_footer_logo.svg`.
- **Vessel name "Vilson"**, renamed from "Wilson" in June 2025. The old spelling must not come back.
- **Known inconsistencies to correct** (not commitments): the SEO metadata in `src/app/layout.tsx` still says "Wilson", spells the name "Primjenjenih", and says "Founded in 2020". The About page says 2018, matching the Facebook handle `uptz18`.

## Evidence on Hand

- **Results:** trophies, past contests per race, and 2026 entries in `src/app/[lang]/achievements/data.ts`.
- **Vessel specifications and build details:** project pages and their translation keys (`projects.detail.*`).
- **Photography:** hero slides, vessel galleries and some team portraits in `public/`.
- **Partners:** logos by tier on `/[lang]/partners`. Media partner: Burza Nautike. Website credit: RitehWebTeam.
- **Open source:** one downloadable project, "Self-construction of electric bicycle" by Mislav Selec (`/[lang]/open-source`).
- **Absent, must not be invented:** member testimonials or quotes, member counts, the 2026 Monaco results, portraits for most team members, recruitment dates or an application process.

## Product Principles

1. **Recruitment comes first.** When needs compete, a prospective member understanding UPTZ and getting in touch outranks sponsor and community needs, which come second.
2. **The work is the argument.** Real vessels, specifications, photos and dated results carry the claims (the podium record, students building end to end), not adjectives.
3. **Joining stays honest and simple.** "Write to us, anytime" is the process. Never imply rounds, deadlines or selection steps that don't exist.
4. **Results are factual and dated.** Never present a past event as upcoming, and never state a result, ranking or participation that isn't confirmed.
5. **Both languages stay complete.** English first, Croatian complete: no visitor ever sees a missing or raw translation.
