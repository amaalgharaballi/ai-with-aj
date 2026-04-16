# CLAUDE.md — AI Video Class Landing Page

> Drop this file at the root of the repo as `CLAUDE.md`. Claude Code reads it automatically on every run and treats it as the project's source of truth. Fill the `{{placeholders}}` after the cousin sends back his intake answers.

---

## 1. Project

Single-page, cinematic landing page for `{{instructor_name}}`, who teaches `{{offer_one_liner}}`. The site's only job is to convert visitors into WhatsApp conversations. No payment, no auth, no CMS.

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
- **Color system** (locked — terminal / AI-lab palette):
  - `--bg`: `#08090F` (deep space black)
  - `--bg-elevated`: `#10121A` (cards / elevated surfaces)
  - `--fg`: `#E4E6EB` (cool off-white — primary body text, ALWAYS this for body copy)
  - `--fg-muted`: `#8B92A3` (labels, secondary text, timestamps)
  - `--accent`: `#00FFA3` (matrix green — use SPARINGLY: section numerals, one word per headline max, dots/icons. NEVER whole paragraphs or full headlines.)
  - `--electric`: `#60A5FA` (blue — reserved ONLY for interactive states: hover underlines, focus rings, link color. Never static.)
  - `--whatsapp`: `#25D366` (ONLY for WhatsApp CTA buttons)
  - `--whatsapp-hover`: `#1DA851` (WhatsApp button hover state only)
  - `--border`: `#1F2937`
  - `--grid`: `rgba(228, 230, 235, 0.04)` (dot-grid overlay fill)
  - Zero other hues. If Claude Code wants to add a color, it must ask first.
- **Typography**:
  - Arabic display: `IBM Plex Sans Arabic` at weight 700 via `next/font/google` as the default. If a premium budget exists, upgrade to `29LT Bukra Bold` or `Boutros Ads Bold` via self-hosted woff2. Weight must be heavy — 600 minimum, 800 for hero.
  - Arabic body: same family at weight 400–500.
  - Latin/numbers: `Cormorant Garamond` for the big stat numerals (serif contrast with the sans Arabic). `Inter` for form labels and tiny UTF-8 bits only.
  - No third font. Ever.

## 4. Sections (single page, in this order)

1. **Nav** — minimal: logo/name (left), language toggle `AR ⇄ EN` (right), and a small "WhatsApp" icon link. Sticky, blurred bg on scroll.
2. **Hero** — AI-output mosaic background (grid of his AI stills + short loops, crossfading). Overlay: tiny mono tag (`[WORKSHOP / KUWAIT / 2026]`), massive Arabic headline with ONE word in gold, sub-headline, two CTAs (primary = "احجز مقعدك" scrolls to booking form; secondary = "شاهد الأعمال" scrolls to student work).
3. **Tool marquee** — infinite-scroll strip of tools he teaches (Gemini, Veo 3.1, Sora 2, Kling, Higgsfield, Reve, Nano Banana, Suno, Envato, ElevenLabs). Monochrome logos. Proves currency.
4. **Stats + countdown** — three gold count-up numbers (650+ متدرب · 9 ساعات · 5 جهات اعتماد) beside a bordered countdown card to the next cohort date.
5. **About the workshop** — "مو كورس تقني"-style opener (copy TBD from cousin). Short paragraph + one cinematic still from his work.
6. **Curriculum** — 2x3 grid of cards numbered 01–06, oversized gold numerals. Day 1 / Day 2 / Day 3 / PDF guide / Live practice / Accredited certificate.
7. **The instructor** — photo + bio + KOC engineer credential + his own short-form reel (phone-mockup frame, since source video is vertical). Links to IG `@ai.with.aj`.
8. **Student work** — mosaic/grid of alumni outputs (once we have them). Stub with his own outputs for now.
9. **Accreditation strip** — 5 accreditation marks: PAAET, Civil Service Commission, Ministry of Education, A.I.A, CAAA. Monochrome, small, builds trust.
10. **Pricing** — two tiers (Early Bird 75 / Standard 90 KWD — confirm with cousin). Early Bird highlighted with gold border + "⚡ 10 seats only".
11. **Booking form** — the conversion section (see §9 mode B). Form → WhatsApp.
12. **FAQ** — accordion. ~5 questions derived from intake Q18.
13. **Footer** — name, one-line bio ("Eng. Abdullatif Al-Gharballi — AI Content Educator · KOC Engineer"), IG link, year, tiny legal. No sitemap — this is one page.

## 5. Tech stack (locked)

- **Framework**: Next.js 15, App Router, TypeScript strict.
- **Styling**: Tailwind CSS v4 + CSS variables for design tokens. RTL support via `dir` attribute + Tailwind's `rtl:` variants.
- **Components**: shadcn/ui as a base, heavily customized — zero defaults ship.
- **Fonts**: `next/font/google` → `IBM Plex Sans Arabic` (400/500/700) + `IBM Plex Mono` (400/500) + `Cormorant Garamond` (500/600) for stat numerals.
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
- Typography swaps per locale: Arabic uses `IBM Plex Sans Arabic`, English uses `IBM Plex Sans` + `Cormorant Garamond` for display accents. Both loaded via `next/font/google`.
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
| Arabic display + body | IBM Plex Sans Arabic | 400 / 500 / 700 | All Arabic text |
| Mono labels | IBM Plex Mono | 400 / 500 | Section tags, dates, breadcrumbs, code |
| Stat numerals | Cormorant Garamond | 500 / 600 | Large display numbers only |

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
