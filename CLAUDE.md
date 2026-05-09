# CLAUDE.md — AI with AJ

> Source of truth for the site. Read this on every run.

---

## 0. Latest user-approved decisions — 2026-05-09

These decisions override older notes in this file when they conflict.

1. **Kill scaffold surfaces.** No shipped route may show `[SCAFFOLD]`, token swatches, placeholder numerals, or internal design-system testing UI.
2. **Color direction approved.** Keep the dark cinematic / AI-lab base, but do not let matrix green become the brand. Use warmer premium course/brand accents, and reserve cooler electric colors only for hover, focus, and interactive states.
3. **Navigation approved.** Use a minimal sticky nav with brand, relevant course anchors, language toggle, and WhatsApp access. It should feel native to the course site, not generic.
4. **Booking direction approved, with details.** Keep form-to-WhatsApp as the primary conversion mechanic. The form collects tier, full name, WhatsApp phone with country picker, optional email, and work field; validates client-side; then opens a pre-filled WhatsApp registration message. No backend, no database, no payment flow. Use real sold-out/scarcity states only. Use `react-phone-number-input` rather than a raw text phone field.
5. **CMS must work.** `/admin` must load cleanly before any design polish is considered done.
6. **One content source.** Do not keep competing truths across `messages/*.json`, `src/lib/site.ts`, and CMS JSON. Choose one content model and make components read from it.
7. **Motion approved.** Use subtle reveal, marquee, countdown, and hover states. No heavy parallax, no scroll hijacking, no 3D.
8. **Instagram footer treatment.** Do not use Instagram gradient badges or gradient text. Showcase the Instagram handle as a theme-native signal/terminal strip that matches the dark cinematic interface.
9. **Typography approved.** Use `Noto Kufi Arabic` for display headings and large numerals, `IBM Plex Sans Arabic` for body/UI copy, and `IBM Plex Mono` only for Latin technical labels, tool tags, timestamps, and course codes. Do not use `Cormorant Garamond`.
10. **Dates approved.** All visible cohort/date strings must render in English month names and Latin digits, even inside Arabic copy. Do not show Arabic month names or Arabic-Indic numerals for dates.
11. **Dynamic detail approved.** Add light, site-native motion such as marquee movement, countdown/count-up states, poster hover, and subtle status pulses. Do not add a "Production Signal" card in the hero.
12. **CMS TBA state approved.** Courses use `cohort.status` with `scheduled` or `tba`. When a course is `tba`, the public site must show a clear "Date to be announced" state, hide the countdown, hide venue everywhere, hide pricing, and hide any seat-selection or seat-booking form for that course. TBA courses may show only an interest-list WhatsApp CTA. Arabic-context fallback fields should be Arabic; mono visual labels may stay English.
13. **Poster orientation approved.** Course posters are landscape artwork. Hero and hub poster frames must preserve the full image without portrait cropping; use 16:9 or slightly wider framing. Hub course cards show the course/cohort title above the landscape poster and the cohort details below it.
14. **Curriculum treatment approved.** Do not show separate `WORKSHOP` / `BONUS` group subheaders or tiny top metadata numbers on curriculum cards. Only real curriculum cards should carry the active `--course-accent` border and tool-chip outlines. Do not use a colored grid/container background that creates visible empty boxes in missing grid slots.
15. **Hub opening approved.** The multi-course hub should not render a centered intro hero/title/sentence. It should start with a slim top nav where `ai.with.aj` links to Instagram, then show the course cards directly with tight top spacing under the nav.
16. **Dot-grid treatment approved.** Keep the background dot grid flat and subtle. Do not add hard-glow spark dots, animated dot flares, drop-shadow glow, or cloudy glow washes behind the content.
17. **Status card labels approved.** The cohort/status and training details cards should not show trailing numeric codes like `01` or `02`, and individual training stat tiles should not show tiny index numbers above the big values. The stats card label is `TRAINING DETAILS`, not `TRAINING / SNAPSHOT`.
18. **Instructor labels approved.** Do not show coach/instructor index labels such as `01 / 02` above instructor names.
19. **Footer Instagram approved.** The Instagram handle treatment at the bottom should be a floating card on the normal page background. Do not place it inside a plain grey footer band or full-width elevated background.
20. **About badges approved.** Do not show bracketed mono badge keys like `[A]`, `[B]`, or `[C]` in the About section.
21. **Nav handle treatment approved.** Keep `ai.with.aj` centered in the top nav on both the hub and course pages. Do not show a green live dot beside it. Use thin rails that start beside the handle: the hub shows the AI Video blue/teal accent on one side and the Bootcamp orange accent on the other; selected course pages let the active course accent fill both rails dynamically. The handle links to Instagram; any course/back navigation sits on the left.
22. **Course back arrow approved.** The top-nav back-to-courses arrow should point left. Do not rotate it for RTL.

---

## 1. Project

Two-course site for **AI with AJ**, a Kuwait-based school for AI-powered content creation and code:

1. **Bootcamp** (priority, slug `bootcamp`) — *Claude Code & Film Making Bootcamp*. Co-instructed by AJ and Mishaal Al-Mineis. 5 days × 3 hours. Tools: Claude Code, Replit, GitHub, Vercel, Supabase, Higgsfield, Gemini, ChatGPT-5, Seedance, Kling.
2. **AI Videomaking** (slug `ai-video`) — *AI Content & Ads Workshop*. Solo with AJ. 3 days × 3 hours. Tools across Higgsfield, Gemini, Sora, Kling, Suno, ElevenLabs, etc.

The site's only job is to convert visitors into WhatsApp conversations. No payment, no auth.

**Architecture:** hub at `/` shows both courses (bootcamp prioritized visually). Each course has a deep-dive page at `/<slug>`. Sveltia CMS at `/admin` lets the instructor manage courses, instructors, global settings, shared copy, hub copy, and FAQ — no developer touch needed for routine cohort updates.

Primary CTA (every section that has a CTA): **Join the class on WhatsApp**, opening:

```
https://wa.me/{{whatsapp_number_intl_no_plus}}?text={{urlencoded_prefill}}
```

Secondary CTA: watch instructor's reel (scroll to a video section or open modal).

## 2. Audience

- Primary: `{{audience_primary}}`
- NOT for: `{{audience_not_for}}`
- Core pain: `{{pain}}`
- Promised outcome: `{{outcome}}`

## 3. Design direction (non-negotiables)

Reference: **nostalgianation.net** — we use its DNA (dark + gold, editorial Arabic typography, form-to-WhatsApp flow) but we **go beyond it**: the instructor teaches cutting-edge AI tools, so the site must feel more *technical* and *current* than a luxury-minimal landing page. Dark editorial + tech/AI overlay. Not WebGL-heavy. Not 3D-hero. But not static either.

- **Base aesthetic**: Arabic-primary, dark + gold editorial minimalism with a tech/terminal layer on top.
- **"More techy than the reference" means, concretely**:
  - **Live AI output mosaic** in the hero (not a portrait): a grid of his actual AI-generated stills + short loops that shuffle/crossfade. This IS the proof — visitors see the work before they read a word.
  - **Monospace annotations everywhere**: section labels like `[01 / 06] المحتوى`, dates like `[2026.04.26 — 28]`, file-path-style breadcrumbs. Gives a "terminal / design system" vibe without being cringe dev-aesthetic.
  - **Tool logo marquee**: an infinite-scroll strip under the hero with Gemini, Veo 3.1, Sora 2, Kling, Higgsfield, Reve, Nano Banana, Suno, Envato, ElevenLabs. Proves currency instantly — no other Kuwait course shows this.
  - **Subtle animated grid** behind hero and section breaks (dot-grid or faint lines, very low opacity). Think "blueprint underlay".
  - **Counter animations** on scroll for the stat strip (650+, 9, 5).
  - **Custom glow cursor** on desktop (small circle with gold halo, grows on interactive elements). Off on touch.
  - **Film grain / noise overlay** at ~3% opacity over the whole page. Breaks the flatness without being theatrical.
  - **Command-palette-style language toggle** in the top-right: `EN ⇄ AR` with a subtle keyboard-shortcut hint. Feels like a tool, not a button.
  - **Electric accent** alongside gold: a single cool hue (`#5EEAD4` teal or `#7DD3FC` sky) used ONLY for interactive states (hover underline, focus ring, cursor halo). Gold stays for brand/luxury. Electric stays for interaction. Never mixed in the same element.
- **Required structural beats** (stolen from reference, sharper execution):
  - Massive Arabic display headline where ONE word/phrase is gold, rest warm off-white.
  - Three-stat strip with count-up animation.
  - Countdown timer to next cohort in a bordered card with mono digits.
  - Curriculum cards with oversized gold numerals (01–06).
  - Pricing tier comparison (Early Bird + Standard) with gold border + scarcity line.
  - Booking form → WhatsApp redirect (see §9).
- **Forbidden**: WebGL heroes, 3D shader fluids, particle explosions, default shadcn slate, purple/blue/pink gradients, pure white text (too cold — use warm off-white), Inter as display, emoji icons, stock illustrations, AI-mascot characters (no robots), autoplaying sound, scroll-hijacking. If it feels like a Vercel template, delete it.
- **Motion budget**: subtle. Fade-up, text mask reveal, marquee, count-up, cursor glow. NO parallax. NO scroll-pinning. Respect `prefers-reduced-motion`.
- **Color system** (locked — softened dark palette):
  - `--bg`: `#08090F` (deep space black)
  - `--bg-elevated`: `#10121A` (cards / elevated surfaces)
  - `--fg`: `#E4E6EB` (cool off-white — primary body text, ALWAYS this for body copy)
  - `--fg-muted`: `#8B92A3` (labels, secondary text, timestamps)
  - `--accent`: `#B6F7C8` (desaturated mint — used SPARINGLY for hub-default accents and brand-level marks like the Nav pulse dot. Never paragraphs.)
  - `--course-accent`: per-course override set inline by `<CoursePage>`. Bootcamp = `#FF8A4C` (warm orange — matches Studio AG Frame Works poster), AI Video = `#5FAEC0` (teal — matches AI Short Films Course poster). Falls back to `--accent` on the hub. Use `var(--course-accent)` in any component that lives inside a `<CoursePage>` so its accents tint per-course.
  - `--whatsapp`: `#25D366` (ONLY for WhatsApp CTA buttons)
  - `--whatsapp-hover`: `#1DA851` (WhatsApp button hover state only)
  - `--border`: `#1F2937`
  - `--grid`: `rgba(228, 230, 235, 0.04)` (dot-grid overlay fill)
  - Zero other hues. If Claude Code wants to add a color, it must ask first.
- **Typography**:
  - Arabic display: `Noto Kufi Arabic` at 600/700/800 via `next/font/google`. Use it for hero headings, section headings, and large numerals.
  - Arabic body/UI: `IBM Plex Sans Arabic` at 400/500/600/700.
  - Latin technical labels: `IBM Plex Mono` at 400/500 for dates, tool tags, course codes, and tiny system labels.
  - Do not use decorative serif numerals or `Cormorant Garamond`.

## 4. Pages and section composition

### Hub at `/` (`src/app/page.tsx`)

`HubNav → CourseCardGrid → Accreditations → Faq → Footer`. The hub intentionally skips an intro hero and shows the course cards directly under a slim Instagram-linked `ai.with.aj` nav.

### Course deep dive at `/<slug>` (`src/app/<slug>/page.tsx`)

Composed by `<CoursePage course={...}>` (in `src/components/CoursePage.tsx`):

`Nav(course) → Hero(course) → ToolMarquee(course) → StatsCountdown(course) → About(course) → Montage(course) → Curriculum(course) → Instructor(course) → Accreditations → Pricing(course) → Booking(course) → Faq → Footer(course)`

The wrapper sets `data-course="<slug>"` and `style={{ "--course-accent": course.accentColor }}` so every nested component picks up the per-course tint via CSS custom property.

Section breakdown:

1. **Nav** — brand name + handle on the left. Pulse dot uses `--accent` (brand-level green). Sticky, blurred on scroll.
2. **Hero** — left column: tag `[ WORKSHOP / KUWAIT / 2026 ]`, massive Arabic headline with one word in `var(--course-accent)`, sub-headline, date/venue text, and two CTAs (primary = scroll to booking, secondary = WhatsApp inquiry). Right column is a landscape poster frame that preserves the full course artwork. Scheduled courses show date/time/venue; TBA courses show date/details TBA and no venue. Do not render a production-signal card.
3. **Tool marquee** — infinite-scroll strip aggregated from `course.days[].tools`, deduped in first-appearance order.
4. **Stats + countdown** — count-up stats panel beside a bordered countdown card. If `course.cohort.isTba`, replace the live countdown with a concise "Date to be announced" status card and do not show venue.
5. **About this course** — section-specific framing. `paragraph1Ar` comes from `course.descriptionAr`; the rest is course-overridable copy.
6. **Promo video (Montage)** — short loop or embed showing course outputs. Source: `course.media.promoVideoFile` (mp4) or `course.media.promoVideoUrl` (YouTube/Vimeo) — exactly one.
7. **Curriculum** — grid of day cards (oversized accent numerals 01–05) + bonus cards (PDF guide, live workshop, accredited certificate).
8. **Instructor(s)** — single full-width row for one instructor; stacked rows for multiple (bootcamp has AJ + Mishaal). Each instructor has their own portrait disc with duotone filter, orbital label, and bio paragraphs.
9. **Accreditation strip** — 5 marks (PAAET, Civil Service Commission, Ministry of Education, A.I.A, CAAA). Same on every page.
10. **Pricing** — two tiers (Early Bird highlighted). Per-course prices + sold-out flag.
11. **Booking form** — name / phone / email / work field / tier — opens WhatsApp pre-filled with all of it, tagged with the course title.
12. **FAQ** — accordion. Same shared list across all pages.
13. **Footer** — final WhatsApp CTA + brand bottom-bar (name, tagline, IG, year).

## 5. Tech stack (locked)

- **Framework**: Next.js 15, App Router, TypeScript strict.
- **Styling**: Tailwind CSS v4 + CSS variables for design tokens. RTL support via `dir` attribute + Tailwind's `rtl:` variants.
- **Components**: shadcn/ui as a base, heavily customized — zero defaults ship.
- **Fonts**: `next/font/google` → `Noto Kufi Arabic` (600/700/800 display) + `IBM Plex Sans Arabic` (400/500/600/700 body/UI) + `IBM Plex Mono` (400/500 technical labels).
- **Motion**: Framer Motion for component-level, Lenis for smooth scroll. No GSAP unless a scroll-timeline demands it.
- **i18n**: `next-intl` — Arabic (default locale `ar`, `dir=rtl`) + English (`en`, `dir=ltr`). All copy lives in `messages/ar.json` + `messages/en.json`.
- **Phone input**: `react-phone-number-input` with `libphonenumber-js` for validation + country-code selector in the booking form. Default country = `KW`.
- **Icons**: `lucide-react` only.
- **Analytics**: Vercel Analytics + Vercel Speed Insights.
- **Deploy**: Vercel, auto-deploy from GitHub `main`.
- **Package manager**: `pnpm`.
- **What's NOT in the stack** (do not add without explicit approval): `three`, `@react-three/fiber`, `gsap`, `@splinetool/*`, any 3D/WebGL lib. We're not doing cinematic 3D.

## 6. File / folder convention

```
app/
  layout.tsx        # fonts, metadata, analytics
  page.tsx          # composes sections in order
  opengraph-image.tsx
components/
  sections/         # Hero, Proof, Learn, Method, Wins, Curriculum, About, FAQ, FinalCTA, Footer
  ui/               # shadcn primitives (customized)
  motion/           # reusable motion primitives (Reveal, Marquee, MagneticButton, Cursor)
  three/            # r3f scenes + shaders
lib/
  whatsapp.ts       # buildWhatsAppUrl() — single source of truth for the CTA
  site.ts           # constants: name, tagline, socials, numbers
content/
  testimonials.ts
  curriculum.ts
  faq.ts
public/
  reel/             # short-form videos (mp4 + webm)
  og/               # social cards
```

Every section is its own file, default-exported, props-less. Hero composition belongs in `app/page.tsx`, not inside a section.

## 7. Copywriting rules (for Claude Code)

- Short > long. Promise > feature. Concrete > abstract.
- Never write "Unleash", "Unlock", "Revolutionize", "In today's fast-paced world", "Elevate", "Seamless". These are AI-slop tells.
- Numbers must be real or `{{TBD}}`. Do not fabricate student counts, view counts, or testimonials.
- If intake data is missing for a section, render a visible `TODO:` placeholder — do not invent.

## 8. Performance + accessibility budget

- Lighthouse: 90+ on all four categories on mobile.
- LCP < 2.5s on 4G throttle. If the hero is WebGL, defer hydration or load after a poster image.
- All motion respects `prefers-reduced-motion`.
- Color contrast AA minimum on every text block.
- All CTAs keyboard-accessible. The WhatsApp link must be a real `<a href>` (not a `<button>` with JS).

## 9. WhatsApp CTA contract (two modes)

**Mode A — Direct CTAs (hero, final CTA, nav):**
All "quick" CTAs call `buildWhatsAppUrl({ ctx, locale })` from `lib/whatsapp.ts`. Opens `https://wa.me/<number>?text=<prefilled>` in a new tab with a short context-aware message. `ctx` values: `hero`, `nav`, `final`, `pricing-standard`, `pricing-earlybird`, `curriculum`, `about`.

**Mode B — Booking form (primary conversion, stolen from reference and improved):**

A dedicated booking section with a form that collects lead info FIRST, then opens WhatsApp pre-filled with that info as a complete registration request. This gives the instructor qualified leads, not cold "hi".

Form fields (in this order):
1. **Tier selector** — toggle between "Early Bird (75 KWD · ⚡ 10 seats left)" and "Standard (90 KWD)". Early Bird is the default focused option.
2. **Full name** — text, required, min 3 chars.
3. **WhatsApp number** — `react-phone-number-input` with country-code picker. Default country Kuwait (`KW`), but user can change the country — dropdown shows flag + dial code. Validates with `libphonenumber-js`.
4. **Email** — optional, type=email.
5. **Work field** — select: content creator / marketer / business owner / student / other. (Localized.)
6. **Submit** — green WhatsApp button (`#25D366`). Label: `أرسل طلب التسجيل عبر واتساب` / `Send registration via WhatsApp`.

On submit:
- Client-side validate all fields.
- Compose a pre-filled message in the user's current locale including all form fields, e.g.:

```
السلام عليكم،
أبغى أسجّل في دورة صناعة المحتوى والدعايات بالذكاء الاصطناعي.

الاسم: {name}
الهاتف: {phone_intl_format}
الإيميل: {email or '-'}
المجال: {work_field}
الفئة: {Early Bird | Standard}
```

- Open `https://wa.me/{instructor_number}?text={urlencoded}` in a new tab.
- Do NOT submit the form to any backend. No server, no DB. WhatsApp is the inbox.

Implementation notes:
- `lib/whatsapp.ts` exports both `buildQuickUrl(ctx, locale)` and `buildBookingUrl(formData, locale)`.
- The instructor's WhatsApp number lives in `lib/site.ts` as a single constant. `TODO: replace with real number.`
- All string templates live in `messages/ar.json` + `messages/en.json`.

## 11. Internationalization (Arabic primary, English secondary)

- Default locale: `ar`. Detect via `next-intl` middleware. English at `/en`, Arabic at `/` (root).
- Layout direction: `<html dir={locale === 'ar' ? 'rtl' : 'ltr'}>`. Tailwind's `rtl:` and `ltr:` variants handle asymmetric layouts.
- Typography swaps per locale: Arabic display uses `Noto Kufi Arabic`, body/UI uses `IBM Plex Sans Arabic`, and English dates/tool labels use `IBM Plex Mono`. All are loaded via `next/font/google`.
- Language toggle in the top-right nav — pill showing `AR ⇄ EN` with a keyboard-shortcut affordance. Clicking swaps locale and persists in a cookie.
- All copy in `messages/*.json`. Components read via `useTranslations()`. NEVER hardcode Arabic or English strings in components.
- Numerals: display numbers in Arabic-Indic digits (٠١٢٣) when locale is `ar`, Latin (0123) when `en`. Helper: `formatNumber(n, locale)`.
- Test every section in both locales before committing — the RTL version must not break any layout.

## Color + Type System

### Palette (terminal / AI-lab)

| Token | Value | When to use |
|---|---|---|
| `--bg` | `#08090F` | Page background only |
| `--bg-elevated` | `#10121A` | Cards, modals, elevated surfaces |
| `--fg` | `#E4E6EB` | **All body text. Default for everything.** |
| `--fg-muted` | `#8B92A3` | Labels, secondary text, captions, subtitles |
| `--accent` | `#00FFA3` | Section numerals, ONE word/phrase per headline, decorative dots. Never paragraphs. |
| `--electric` | `#60A5FA` | Interactive states ONLY — hover underline, focus ring, link color. Never static text. |
| `--whatsapp` | `#25D366` | WhatsApp CTA buttons only |
| `--whatsapp-hover` | `#1DA851` | WhatsApp button :hover/:focus only |
| `--border` | `#1F2937` | Dividers, card borders, input borders |
| `--grid` | `rgba(228,230,235,0.04)` | DotGrid overlay fill |

### Usage rules (hard constraints)

1. Primary body text is ALWAYS `--fg`. Never `--accent`.
2. `--accent` is used sparingly — maximum one highlighted word/phrase per headline. It is the visual anchor, not a theme color.
3. `--electric` is purely interactive. If an element does not respond to user input, it must not use `--electric`.
4. `--whatsapp` never appears outside the booking form submit button and WhatsApp icon links.
5. No new colors without explicit approval. If a design need can't be met by this palette, ask.

### Typography stack

| Role | Font | Weights | Usage |
|---|---|---|---|
| Display Arabic + big numerals | Noto Kufi Arabic | 600 / 700 / 800 | Hero headings, section headings, large numbers |
| Body Arabic + UI | IBM Plex Sans Arabic | 400 / 500 / 600 / 700 | Paragraphs, forms, buttons, FAQ |
| Mono labels | IBM Plex Mono | 400 / 500 | English dates, tool tags, breadcrumbs, course codes |

No fourth font. Ever. For English display copy, IBM Plex Sans Arabic is still used.

---

## 10. What I want from Claude Code

When asked to build a section:

1. Read this file first.
2. Re-state the brief for that section in 2 sentences before coding.
3. Produce the section as a single default-exported component in `components/sections/`.
4. Mock data lives in `content/` — do not hardcode strings inside the component.
5. After implementing, list (a) what assumptions were made, (b) what's still `TODO`, (c) a screenshot command to visually verify.

When asked to make design decisions without enough info: stop and ask. Don't guess colors, fonts, or copy.
