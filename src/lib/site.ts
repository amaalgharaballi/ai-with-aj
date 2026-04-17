// Single source of truth for every piece of editable content on the site.
//
// Data is split across four JSON files so the CMS at /admin can edit small,
// focused pieces without touching the rest:
//
//   - content/cohort.json   → dates, venue, description, per-day schedule (CMS)
//   - content/pricing.json  → tier prices + seats-left counter             (CMS)
//   - content/faq.json      → FAQ list                                     (CMS)
//   - content/site.json     → everything else                              (dev-only)
//
// The cohort file drives a lot of derived values — date labels, total hours,
// daily time range, tool marquee, curriculum day cards. Those feed into
// placeholder tokens like __TOTAL_HOURS_AR__ inside site.json strings, which
// get substituted here before components ever see the data.

import siteData from "@/content/site.json";
import cohortData from "@/content/cohort.json";
import pricingData from "@/content/pricing.json";
import faqData from "@/content/faq.json";

const AR_MONTHS = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
];

const toArabicDigits = (n: string | number) =>
  String(n).replace(/[0-9]/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]);

// Parse ISO date parts directly from the string to avoid JS timezone shifts.
// The CMS saves dates entered in Kuwait TZ; we want to display those exact dates.
function parseIsoParts(iso: string) {
  const [date] = iso.split("T");
  const [y, m, d] = date.split("-").map(Number);
  return { year: y, month: m - 1, day: d };
}

function formatCohortLabelAr(startIso: string, endIso: string): string {
  const s = parseIsoParts(startIso);
  const e = parseIsoParts(endIso);
  const sd = toArabicDigits(s.day);
  const ed = toArabicDigits(e.day);
  const y = toArabicDigits(e.year);
  const sameMonth = s.year === e.year && s.month === e.month;
  if (sameMonth) return `${sd}–${ed} ${AR_MONTHS[s.month]} ${y}`;
  return `${sd} ${AR_MONTHS[s.month]} – ${ed} ${AR_MONTHS[e.month]} ${y}`;
}

function formatCohortLabelEn(startIso: string, endIso: string): string {
  const s = parseIsoParts(startIso);
  const e = parseIsoParts(endIso);
  const sMonth = new Date(2000, s.month, 1).toLocaleString("en-US", { month: "long" });
  const eMonth = new Date(2000, e.month, 1).toLocaleString("en-US", { month: "long" });
  const sameMonth = s.year === e.year && s.month === e.month;
  if (sameMonth) return `${sMonth} ${s.day}–${e.day}, ${e.year}`;
  return `${sMonth} ${s.day} – ${eMonth} ${e.day}, ${e.year}`;
}

function formatMetaDate(startIso: string, endIso: string): string {
  const s = parseIsoParts(startIso);
  const e = parseIsoParts(endIso);
  const pad = (n: number) => String(n).padStart(2, "0");
  const sameMonth = s.year === e.year && s.month === e.month;
  if (sameMonth) {
    return `${e.year}.${pad(s.month + 1)}.${pad(s.day)} — ${pad(e.day)}`;
  }
  return `${e.year}.${pad(s.month + 1)}.${pad(s.day)} — ${pad(e.month + 1)}.${pad(e.day)}`;
}

function parseTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  return { h, m };
}

function hoursBetween(startTime: string, endTime: string): number {
  const s = parseTime(startTime);
  const e = parseTime(endTime);
  let diff = e.h + e.m / 60 - (s.h + s.m / 60);
  if (diff < 0) diff += 24;
  return diff;
}

function to12h(h: number) {
  const period: "AM" | "PM" = h < 12 ? "AM" : "PM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return { hour12, period };
}

function formatDailyTimeRangeAr(startTime: string, endTime: string): string {
  const s = to12h(parseTime(startTime).h);
  const e = to12h(parseTime(endTime).h);
  const toSuffix = (p: "AM" | "PM") => (p === "PM" ? "مساءً" : "صباحاً");
  const sH = toArabicDigits(s.hour12);
  const eH = toArabicDigits(e.hour12);
  if (s.period === e.period) return `من ${sH} إلى ${eH} ${toSuffix(s.period)}`;
  return `من ${sH} ${toSuffix(s.period)} إلى ${eH} ${toSuffix(e.period)}`;
}

function formatMetaTime(startTime: string, endTime: string): string {
  const s = to12h(parseTime(startTime).h);
  const e = to12h(parseTime(endTime).h);
  if (s.period === e.period) return `${s.hour12} — ${e.hour12} ${s.period}`;
  return `${s.hour12} ${s.period} — ${e.hour12} ${e.period}`;
}

// ─── derivations ───────────────────────────────────────────────────────────

const days = cohortData.days;
const firstDay = days[0];

const dayCount = days.length;
const totalHours = Math.round(
  days.reduce((sum, d) => sum + hoursBetween(d.startTime, d.endTime), 0)
);

// Tools marquee = unique tool names across all workshop days (first-appearance order)
const toolsSeen = new Set<string>();
const tools: { name: string }[] = [];
for (const day of days) {
  for (const t of day.tools) {
    if (!toolsSeen.has(t)) {
      toolsSeen.add(t);
      tools.push({ name: t });
    }
  }
}
const toolCount = tools.length;

const labelAr = formatCohortLabelAr(cohortData.startIso, cohortData.endIso);
const labelEn = formatCohortLabelEn(cohortData.startIso, cohortData.endIso);
const metaDate = formatMetaDate(cohortData.startIso, cohortData.endIso);
const metaTime = formatMetaTime(firstDay.startTime, firstDay.endTime);
const timeRangeAr = formatDailyTimeRangeAr(firstDay.startTime, firstDay.endTime);

const placeholders: Record<string, string> = {
  __DATE_RANGE_AR__: labelAr,
  __DATE_RANGE_EN__: labelEn,
  __TIME_RANGE_AR__: timeRangeAr,
  __VENUE_AR__: cohortData.venueAr,
  __TOTAL_HOURS_AR__: toArabicDigits(totalHours),
  __TOTAL_HOURS_EN__: String(totalHours),
  __DAY_COUNT_AR__: toArabicDigits(dayCount),
  __DAY_COUNT_EN__: String(dayCount),
  __TOOL_COUNT_AR__: toArabicDigits(toolCount),
  __TOOL_COUNT_EN__: String(toolCount),
  __META_DATE__: metaDate,
  __META_TIME__: metaTime,
};

function substitute(s: string): string {
  return Object.entries(placeholders).reduce(
    (acc, [k, v]) => acc.replaceAll(k, v),
    s
  );
}

// Deep walk: replace placeholder tokens in every string value of the tree.
function substituteDeep<T>(obj: T): T {
  if (typeof obj === "string") return substitute(obj) as unknown as T;
  if (Array.isArray(obj)) return obj.map((v) => substituteDeep(v)) as unknown as T;
  if (obj && typeof obj === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) out[k] = substituteDeep(v);
    return out as unknown as T;
  }
  return obj;
}

// Curriculum is split into two groups so the UI can render them as distinct
// sections. Bonus cards restart their own numbering — they're not a
// continuation of the workshop-day sequence.
const curriculumDays = days.map((d, i) => ({
  index: String(i + 1).padStart(2, "0"),
  titleAr: d.titleAr,
  bodyAr: d.bodyAr,
  toolNames: d.tools,
}));

const curriculumBonus = siteData.curriculumBonus.map((b, i) => ({
  index: String(i + 1).padStart(2, "0"),
  titleAr: b.titleAr,
  bodyAr: b.bodyAr,
}));

const curriculum = { days: curriculumDays, bonus: curriculumBonus };

// Tiers: compose static metadata with dynamic price + availability
const tiers = siteData.tiersMeta.map((meta) => {
  if (meta.id === "early-bird") {
    return {
      ...meta,
      price: pricingData.earlyBirdPrice,
      soldOut: Boolean(pricingData.earlyBirdSoldOut),
    };
  }
  return {
    ...meta,
    price: pricingData.standardPrice,
    soldOut: false,
  };
});

// About paragraph 1 lives in cohort.json (editable), not in the copy file.
const about = {
  ...siteData.copy.about,
  paragraph1Ar: cohortData.descriptionAr,
};

// Compose, then run placeholder substitution over the whole tree.
const raw = {
  ...siteData,
  cohort: {
    startIso: cohortData.startIso,
    endIso: cohortData.endIso,
    venueAr: cohortData.venueAr,
    labelAr,
    labelEn,
    timeRangeAr,
    totalHours,
    dayCount,
  },
  tiers,
  tools,
  curriculum,
  faq: faqData.faq,
  copy: {
    ...siteData.copy,
    about,
  },
};

// Cast is needed because substituteDeep's generic T collapses to `unknown`
// through nested Object.entries calls. The runtime shape matches `raw`.
export const SITE = substituteDeep(raw) as typeof raw;
export type SiteData = typeof SITE;
