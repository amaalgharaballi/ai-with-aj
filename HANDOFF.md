# Handoff guide — ai.with.aj

A guide for the instructor (and anyone else) to maintain and update the site
without needing a developer.

The site has **two editing surfaces**:

1. **`/admin`** — a friendly form-based editor (Sveltia CMS) for everything
   that changes between cohorts.
2. **GitHub directly** — fallback for the rare cases where the CMS form
   doesn't expose a field, or the CMS itself breaks.

Both paths end the same way: a commit to `main` → Vercel auto-deploys within
~60 seconds. The site has no database and no server.

---

## What the site looks like

```
  /                 — Hub (lists both courses, links to deep dives)
  /bootcamp         — Claude Code & Film Making Bootcamp deep-dive
  /ai-video         — AI Content & Ads Workshop deep-dive
  /admin            — Sveltia CMS (this editor)
```

Each course has its own dates, pricing, instructors, schedule, and accent
color. The two courses are completely independent — editing one doesn't
affect the other.

---

## One-time setup

Do this once, then never again.

### 1. GitHub access for the instructor

- Repo → Settings → Collaborators → Add people → invite
- Grant **Write** access (not Admin)

### 2. Grant the CMS permission to push

The CMS signs in via `auth.sveltia.app` (Sveltia's free managed OAuth proxy
running on Cloudflare Workers). The first time the instructor clicks
**Sign In with GitHub** at `/admin`, GitHub shows a permission dialog — click
**Authorize**. **Nothing for us to deploy.** No OAuth app to register.

### 3. Verify Vercel auto-deploys `main`

- Vercel project → Settings → Git → "Production Branch" should be `main`
- Push a trivial change and confirm Vercel deploys it within a minute

---

## What the CMS edits

Six collections cover the editable site content.

| Collection | Where it lives | What you edit |
|---|---|---|
| **Courses** | `src/content/courses/<slug>.json` | Per-course details: dates, venue, days, tools, pricing, poster image, promo video, instructors. **One file per course.** |
| **Instructors** | `src/content/instructors/<id>.json` | Each trainer's name, title, bio, photo, IG. Referenced by the Courses collection. |
| **Global settings** | `src/content/global.json` | WhatsApp number, brand handle, Instagram link, and accreditation names. |
| **Shared copy** | `src/content/copy.json` | Advanced shared labels, CTA text, field labels, and error messages. |
| **Hub page** | `src/content/hub.json` | Course-card CTA label on the landing page (`/`). |
| **FAQ** | `src/content/faq.json` | Shared question list shown on every page. |

Course-specific wording should still live in **Courses** first. Use
**Shared copy** only when the same wording should change everywhere.

---

## Editing via `/admin`

**URL:** https://your-domain.com/admin

1. Click **Sign In with GitHub** → authorize in the popup.
2. Pick a collection from the left sidebar.
3. Edit the fields. Click **Save**.
4. The CMS commits directly to `main`. Vercel rebuilds within ~60 seconds.

### The most common update: a new cohort

1. `/admin` → **Courses** → pick the course (Bootcamp or AI Video)
2. Set **Cohort dates → Date status** to **Scheduled date**
3. Update **Start** and **End** (date + time pickers, Kuwait time)
4. If the venue changed, update **Venue (Arabic)**
5. Edit the **Days schedule** list — for each day set title, description,
   start time (24h), end time (24h), and the tools taught
6. Update **Pricing → Tiers** if prices or the seats-left flag changed
7. Save

Everything that depends on dates, hours, day count, or tools updates
automatically — the countdown, tool marquee, hours totals, day cards,
date labels.

### Marking a course date as TBA

`/admin` → **Courses** → pick the course → **Cohort dates**.

1. Set **Date status** to **To be announced (TBA)**
2. Clear **Start**, **End**, **Venue (Arabic)**, and **Venue (English)**
3. Save

The live site will show "Date to be announced", swap the countdown for a
status card, hide the venue everywhere, and replace pricing/seat selection
with a WhatsApp interest-list CTA for that course.

### Updating the poster image

`/admin` → **Courses** → pick the course → **Course media → Poster image**.
Upload a landscape poster, ideally 16:9 or slightly wider. It lands at
`/public/courses/<slug>/<filename>` and shows on both the hub card and course
hero without being cropped into a portrait frame.

### Adding a promo video

Two options:
- **Paste a URL** (YouTube/Vimeo) into **Promo video URL**. Easiest, no
  upload size limit.
- **Upload an mp4** via **Promo video upload**. Inline auto-play; bigger
  repo size. Use a URL above instead if you want to keep the repo small.

Don't set both — only one is used.

### Marking a tier as sold out

`/admin` → **Courses** → pick the course → **Pricing → Tiers** → the
relevant tier → toggle **Sold out**. A "مكتمل" badge appears on the
pricing card.

### Editing FAQ

`/admin` → **FAQ** → **Questions**. Add/remove/reorder questions. The same
list shows on the hub and both course pages.

---

## Adding a new course (CMS + one code change)

The CMS lets you create new course files, but a new course needs **one code
change** to register the route. This is a known limitation — see
"Architecture notes" below.

1. `/admin` → **Courses** → **+ New Courses entry**
2. Fill all fields. Pick a unique `slug` (lowercase, hyphens — e.g.
   `summer-2027`)
3. Save. The new file lands at `src/content/courses/<slug>.json`
4. **Code step (one-time per course):**
   - Open `src/lib/site.ts`
   - Find the `COURSES_RAW` array and add the new course's import
   - Open `src/app/`
   - Create a folder `src/app/<slug>/` with a `page.tsx` modeled after
     `src/app/bootcamp/page.tsx`
5. Commit those changes; Vercel redeploys.

Adding a new **instructor** is CMS-only — the only code touch is registering
them in `INSTRUCTOR_REGISTRY` inside `src/lib/site.ts` so courses can
reference them.

---

### Images on disk

- Course posters → `public/courses/<slug>/poster.jpg` (landscape, 16:9 or slightly wider)
- Instructor photos → `public/instructors/<id>.jpg`
- Tool logos → `public/tools/<tool-name>.svg` (currently rendered as text marquee — swap to images later)
- Accreditation logos → `public/accred/<name>.svg`

The CMS's image widget uploads to the right folder automatically. If you're
adding files via Git, drop them at the path the JSON file references.

---

## Emergency editing — if `/admin` breaks

The CMS is a thin layer over GitHub. You can **always** edit directly:

1. Open the relevant file on GitHub:
   - Course → `src/content/courses/<slug>.json`
   - Instructor → `src/content/instructors/<id>.json`
   - Hub → `src/content/hub.json`
   - FAQ → `src/content/faq.json`
  - Global settings → `src/content/global.json`
  - Shared copy → `src/content/copy.json`
2. Click the pencil icon (Edit)
3. Change the text. Preserve JSON structure.
4. Commit to `main`.

Vercel deploys the same way as if the CMS did it.

---

## Architecture notes (for the next developer)

- **Framework:** Next.js 16 (App Router, Turbopack). `pnpm dev` for local.
- **Routing:** static routes — `/` (hub), `/bootcamp`, `/ai-video`. The
  `/admin` rewrite in `next.config.ts` resolves before file routing.
- **Content split:**
  - `src/content/courses/<slug>.json` — per-course (CMS folder collection)
  - `src/content/instructors/<id>.json` — per-instructor (CMS folder collection)
  - `src/content/hub.json` — hub copy (CMS file collection)
  - `src/content/faq.json` — FAQ list (CMS file collection)
  - `src/content/global.json` — site-wide chrome (CMS file collection)
  - `src/content/copy.json` — shared section copy templates (CMS file collection)
- **Composition:** `src/lib/site.ts` exports:
  - `getCourse(slug)` → `ResolvedCourse` (throws on unknown slug; throws if
    `endIso <= startIso` for scheduled cohorts, both promoVideoUrl and
    promoVideoFile are set, or instructor refs don't resolve — these are
    build-time guardrails. TBA cohorts may leave date and venue fields blank.
  - `getAllCourses()` → ordered, active courses for the hub
  - `getInstructor(id)` → `ResolvedInstructor`
  - `GLOBAL` → site-wide constants (whatsapp, accreditations, brand, faq, hub copy)
- **Token substitution:** course copy can include placeholders like
  `__TOTAL_HOURS_AR__`, `__DATE_RANGE_AR__`, `__VENUE_AR__`, etc. The
  resolver substitutes these from each course's own dates/days, so the
  values are always consistent. Use `__WHEN_WHERE_AR__` / `__WHEN_WHERE_EN__`
  when copy needs a full date-time-location sentence because those tokens
  collapse cleanly for TBA courses without leaking a venue.
- **Per-course accent:** `src/components/CoursePage.tsx` sets
  `--course-accent` inline from `course.accentColor`. Components use
  `var(--course-accent)` so the same UI tints differently per course.
- **CMS:** Sveltia CMS (Decap-compatible) at `/admin`. Static HTML + YAML
  config under `public/admin/`. No server code.
- **Auth:** Managed by `auth.sveltia.app` via the Cloudflare Workers proxy
  at `sveltia-cms-auth.amaalgharaballi.workers.dev`. No secrets in this
  repo. No env vars needed for the CMS.
- **Deploy:** Vercel, automatic on push to `main`.

### Why the per-file split for courses?

Sveltia/Decap CMS writes **only** the fields declared in the active
collection's schema. If a single file backs multiple collections, saving
one collection wipes fields owned by the others. Splitting the data into
per-collection files (and folder collections for things that have many
instances) makes that failure mode impossible.

### Why a manual `COURSES_RAW` registry?

We use static JSON imports (`import bootcampData from "..."`), which means
the bundler statically resolves all course files at build time. The trade-off
is that creating a new course in the CMS doesn't make it appear on the live
site automatically — a developer needs to register it in `src/lib/site.ts`
and add a route under `src/app/`. A future improvement: replace the manual
registry with a build-time codegen step that scans `src/content/courses/`.

### Adding an editable field (rare)

**Option A — expose to CMS:**
1. Add the field to the relevant JSON shape (e.g. `src/content/courses/bootcamp.json`)
2. Add a matching field definition in `public/admin/config.yml`
3. Update the `RawCourse` / `ResolvedCourse` interfaces in `src/lib/site.ts`
4. Read it from the components that need it via the resolved course

**Option B — dev-only (default):**
Add the field to `src/content/global.json` or `src/content/copy.json`,
import via `GLOBAL` or the per-course copy. No CMS wiring needed.

Keep the rule: **never hardcode user-facing strings in components.** They
all live in one of the JSON files.
