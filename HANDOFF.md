# Handoff guide — ai.with.aj

A guide for the instructor (and anyone else) to maintain and update the site
without needing a developer.

This site has two editing surfaces:

1. **`/admin`** — a friendly form-based editor (Sveltia CMS) for the three
   things that actually change between cohorts: dates, prices/seats, and FAQ.
2. **GitHub directly** — for everything else (headlines, bio, curriculum,
   images, rare code changes).

Both paths end the same way: a commit to `main` → Vercel auto-deploys within
~60 seconds. The site has no database and no server.

---

## One-time setup

Do this once, then never again.

### 1. GitHub access for the instructor

Give the instructor access to the repo so they can sign into the CMS.

- Repo → Settings → Collaborators → Add people → invite the instructor
- Grant **Write** access (not Admin)

### 2. Grant the CMS permission to push

The CMS signs in via `auth.sveltia.app` (Sveltia's free managed OAuth proxy).
The first time the instructor clicks **Sign In with GitHub** at `/admin`, GitHub
shows a permission dialog — they just click Authorize.

**Nothing for us to deploy.** No OAuth app to register. No serverless function.

### 3. Verify Vercel auto-deploys `main`

- Vercel project → Settings → Git → "Production Branch" should be `main`
- Push a trivial change and confirm Vercel deploys it within a minute

---

## What the CMS edits

The CMS intentionally exposes only three things. Everything else lives in
`src/content/site.json` and is dev-edited.

| Collection | File | Fields |
|---|---|---|
| **Next cohort** | `src/content/cohort.json` | start + end date/time, venue, workshop description, per-day schedule (title, description, start/end time, tools) |
| **Pricing** | `src/content/pricing.json` | early-bird price, standard price, seats left |
| **FAQ** | `src/content/faq.json` | list of questions + answers (AR/EN) |

Each CMS save touches **only its own file** — no cross-contamination, no data
wipes. If it's not in one of those three files, the CMS can't touch it.

**The cohort collection is the control panel for the site.** Editing it
auto-propagates everywhere it matters:

- **Date label** (hero, FAQ, meta) is built from `startIso` + `endIso` — no
  manual label. Same-month: `٢٦–٢٨ أبريل ٢٠٢٦`; cross-month: `٢٨ أبريل – ١ مايو ٢٠٢٦`.
- **Total hours** is computed from the sum of per-day `endTime − startTime` and
  substituted into the hero subtitle, the stats strip, the pricing tier
  features, and the curriculum headline.
- **Day count + sections count** in the curriculum headline auto-adjust.
- **Tool marquee** is the union of `tools` across all days (first-appearance
  order, deduped) — add a tool to Day 2, it shows in the marquee automatically.
- **About paragraph 1** reads from `descriptionAr`.
- **Curriculum day cards** are rendered from the `days` list; the three bonus
  cards (PDF / live workshop / certificate) are dev-edited in
  `src/content/site.json` under `curriculumBonus`.

---

## Editing via `/admin`

**URL:** https://your-domain.com/admin

1. Click **Sign In with GitHub** → authorize in the popup.
2. Pick a collection from the left sidebar: **Next cohort**, **Pricing**, or **FAQ**.
3. Edit the fields. Click **Save**.
4. The CMS commits directly to `main`. Vercel rebuilds within ~60 seconds.

### The most common update: a new cohort

1. `/admin` → **Next cohort** → **Workshop details**
2. Update **Workshop start** and **Workshop end** (date + time pickers, Kuwait time)
3. If the venue changed, update **Venue (Arabic)**
4. Update **Workshop description (Arabic)** if the pitch changed
5. Edit the **Workshop days** list — for each day set title, description, start
   time (24h), end time (24h), and the tools taught
6. Save

Everything on the homepage that depends on dates, hours, day count, or tools
updates automatically from these fields. No need to touch date labels, the
tool marquee, or any other string — they're derived.

### Seats-left counter

`/admin` → **Pricing** → **Early bird seats left** → set the number, or leave
blank to hide the scarcity badge entirely. Set to `0` when the tier sells out.

---

## Editing everything else (GitHub directly)

Anything not in the 3-collection CMS — headlines, the instructor bio,
curriculum cards, tool list, hero copy, section labels — lives in
`src/content/site.json` and is edited on GitHub:

1. Go to https://github.com/amaalgharaballi/ai-with-aj
2. Open `src/content/site.json`
3. Click the pencil icon (Edit)
4. Change the text you need. **Preserve the JSON structure** — quotes, commas,
   braces matter.
5. Commit to `main`. Vercel deploys the same way.

### Images

- Instructor photo: overwrite `public/instructor.jpg`
- Tool logos: upload to `public/tools/<tool-name>.svg` (monochrome SVG preferred)
- Accreditation logos: upload to `public/accred/<name>.svg`

These paths are already referenced in `src/content/site.json`. Upload a new
file with the same name and the site picks it up on the next deploy. The CMS
also has a **Media Library** under `public/uploads/` for ad-hoc images.

---

## Emergency editing — if `/admin` breaks

The CMS is a thin layer over GitHub. You can **always** edit directly:

1. Open the relevant file on GitHub:
   - Cohort → `src/content/cohort.json`
   - Pricing → `src/content/pricing.json`
   - FAQ → `src/content/faq.json`
   - Everything else → `src/content/site.json`
2. Click the pencil icon (Edit)
3. Change the text. Preserve JSON structure.
4. Commit to `main`.

Vercel deploys the same way as if the CMS did it.

---

## Architecture notes (for the next developer)

- **Framework:** Next.js 15 App Router. `pnpm dev` for local.
- **Content split (4 JSON files):**
  - `src/content/cohort.json` — CMS-editable
  - `src/content/pricing.json` — CMS-editable
  - `src/content/faq.json` — CMS-editable
  - `src/content/site.json` — dev-only (everything else)
- **Composition:** `src/lib/site.ts` imports all four and merges them into a
  single `SITE` object. Components read from `SITE.*` and don't know about the
  file split.
- **CMS:** Sveltia CMS (Decap-compatible) at `/admin`. Static HTML + YAML config
  under `public/admin/`. No server code.
- **Routing:** `next.config.ts` rewrites `/admin` → `public/admin/index.html`.
- **Auth:** Managed by `auth.sveltia.app`. No secrets in this repo. No env vars
  needed for CMS.
- **Deploy:** Vercel, automatic on push to `main`.

### Why the split?

Decap/Sveltia CMS writes **only** the fields declared in the active
collection's schema. If a single file backs multiple collections, saving one
collection wipes fields owned by the others. Splitting the data into
per-collection files makes that failure mode impossible.

### Adding a new editable field

**Option A — expose to CMS (rare):** add the field to the relevant
CMS-editable file (`cohort.json` / `pricing.json` / `faq.json`), add the field
to `public/admin/config.yml`, and read it from components via the composition
in `src/lib/site.ts`.

**Option B — dev-only (default):** add the field to `src/content/site.json`
and read it from a component via `SITE.<path>`. No CMS wiring needed.

Keep the pattern: **never hardcode user-facing strings in components.** They
all live in one of the four JSON files.

If you ever want to swap Sveltia → Decap CMS, change one `<script>` tag in
`public/admin/index.html`. The `config.yml` is compatible.
