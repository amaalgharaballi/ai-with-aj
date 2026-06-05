// Single source of truth for editable content on the site.
//
// Data files (CMS-editable unless noted):
//   - content/courses/<slug>.json    → per-course details (CMS folder collection)
//   - content/instructors/<id>.json  → per-instructor profile (CMS folder collection)
//   - content/hub.json               → hub-page copy
//   - content/faq.json               → shared FAQ list
//   - content/global.json            → whatsapp, brand, links, accreditations
//   - content/copy.json              → shared section copy templates (dev-only)
//
// Adding a new course:
//   1. Author the JSON file under content/courses/
//   2. Register it in COURSES_RAW below
//   3. Add a route at src/app/<slug>/page.tsx
// Adding an instructor:
//   1. Author content/instructors/<id>.json
//   2. Register it in INSTRUCTOR_REGISTRY below
// (PR 4 / future: replace these registries with build-time codegen so the CMS
// can author + go live without touching code.)

import bootcampData from "@/content/courses/bootcamp.json";
import aiVideoData from "@/content/courses/ai-video.json";
import claudecodeData from "@/content/courses/claudecode.json";
import ajData from "@/content/instructors/aj.json";
import mishaalData from "@/content/instructors/mishaal.json";
import hubData from "@/content/hub.json";
import globalData from "@/content/global.json";
import faqData from "@/content/faq.json";
import sharedCopyData from "@/content/copy.json";

import {
  toArabicDigits,
  formatCohortLabelAr,
  formatCohortLabelEn,
  formatMetaDate,
  formatMetaTime,
  formatDailyTimeRangeAr,
  hoursBetween,
  substituteDeep,
} from "@/lib/format";

// ─── Public types ──────────────────────────────────────────────────────────

export interface ResolvedDay {
  index: string;
  titleAr: string;
  bodyAr: string;
  startTime: string;
  endTime: string;
  toolNames: string[];
}

export interface CurriculumDay {
  index: string;
  titleAr: string;
  bodyAr: string;
  toolNames: string[];
}

export interface CurriculumBonus {
  index: string;
  titleAr: string;
  bodyAr: string;
}

export interface Stat {
  valueAr: string;
  valueEn: string;
  labelAr: string;
  labelEn: string;
}

export interface ResolvedTier {
  id: "early-bird" | "standard";
  nameAr: string;
  nameEn: string;
  currency: string;
  isHighlighted: boolean;
  featuresAr: string[];
  featuresEn: string[];
  price: number;
  soldOut: boolean;
}

export interface Accreditation {
  nameAr: string;
  nameEn: string;
  logo: string;
}

export interface FaqItem {
  qAr: string;
  qEn?: string;
  aAr: string;
  aEn?: string;
}

export interface ResolvedInstructor {
  id: string;
  nameAr: string;
  nameEn: string;
  titleAr: string;
  titleEn: string;
  bioParagraphsAr: string[];
  photo: string;
  ig?: string;
  igUrl?: string;
}

export interface ResolvedCohort {
  status: CohortStatus;
  isTba: boolean;
  startIso: string;
  endIso: string;
  venueAr: string;
  venueEn: string;
  labelAr: string;
  labelEn: string;
  metaDate: string;
  metaTime: string;
  timeRangeAr: string;
  totalHours: number;
  dayCount: number;
}

export interface ResolvedCourseMedia {
  posterImage: string;
  promoVideoUrl: string;
  promoVideoFile: string;
  videoTitleAr: string;
}

export type ResolvedCopy = typeof sharedCopyData;

export interface CourseSections {
  hero: boolean;
  toolMarquee: boolean;
  stats: boolean;
  about: boolean;
  montage: boolean;
  curriculum: boolean;
  instructor: boolean;
  accreditations: boolean;
  booking: boolean;
  faq: boolean;
}

export const DEFAULT_SECTIONS: CourseSections = {
  hero: true,
  toolMarquee: true,
  stats: true,
  about: true,
  montage: true,
  curriculum: true,
  instructor: true,
  accreditations: true,
  booking: true,
  faq: true,
};

export interface ResolvedCourse {
  slug: string;
  active: boolean;
  accentColor: string;
  titleAr: string;
  titleEn: string;
  taglineAr: string;
  taglineEn: string;
  cohort: ResolvedCohort;
  instructors: ResolvedInstructor[];
  days: ResolvedDay[];
  tools: { name: string }[];
  curriculum: { days: CurriculumDay[]; bonus: CurriculumBonus[] };
  tiers: ResolvedTier[];
  media: ResolvedCourseMedia;
  stats: Stat[];
  descriptionAr: string;
  whatsappNumber: string;
  sections: CourseSections;
  copy: ResolvedCopy;
  faq: FaqItem[];
}

// ─── Raw JSON shapes ───────────────────────────────────────────────────────

interface RawDay {
  titleAr: string;
  bodyAr: string;
  startTime: string;
  endTime: string;
  tools: string[];
}

interface RawTier {
  id: string;
  isHighlighted: boolean;
  price: number;
  soldOut: boolean;
  nameAr: string;
  nameEn: string;
  featuresAr: string[];
  featuresEn: string[];
}

interface RawCourse {
  slug: string;
  order: number;
  active: boolean;
  accentColor: string;
  titleAr: string;
  titleEn: string;
  taglineAr: string;
  taglineEn: string;
  instructorIds: string[];
  cohort: {
    status?: CohortStatus;
    startIso?: string;
    endIso?: string;
    venueAr?: string;
    venueEn?: string;
  };
  descriptionAr: string;
  days: RawDay[];
  pricing: { currency: string; tiers: RawTier[] };
  media: ResolvedCourseMedia;
  stats: Stat[];
  curriculumBonus: { titleAr: string; bodyAr: string }[];
  whatsappOverride: string | null;
  sections?: Partial<CourseSections>;
  copyOverrides: Record<string, unknown>;
}

interface RawInstructor {
  id: string;
  nameAr: string;
  nameEn: string;
  titleAr: string;
  titleEn: string;
  bioParagraphsAr: string[];
  photo: string;
  ig?: string;
  igUrl?: string;
}

// ─── Registries (manual — see top-of-file note) ────────────────────────────

const COURSES_RAW: RawCourse[] = [
  bootcampData as RawCourse,
  aiVideoData as RawCourse,
  claudecodeData as unknown as RawCourse,
];

const INSTRUCTOR_REGISTRY: Record<string, RawInstructor> = {
  aj: ajData as RawInstructor,
  mishaal: mishaalData as RawInstructor,
};

type CohortStatus = "scheduled" | "tba";

// ─── Resolution helpers ────────────────────────────────────────────────────

function normalizePublicPath(value: string | undefined): string {
  const path = (value || "").trim();
  if (!path) return "";
  if (/^(https?:)?\/\//.test(path) || path.startsWith("/")) return path;

  const publicPath = path
    .replace(/^public\//, "")
    .replace(/^src\/content\/(?:courses|instructors)\/public\//, "");

  return `/${publicPath}`;
}

function deepMerge<T>(base: T, overrides: unknown): T {
  if (overrides === undefined || overrides === null) return base;
  if (
    typeof base !== "object" ||
    base === null ||
    typeof overrides !== "object" ||
    Array.isArray(base) ||
    Array.isArray(overrides)
  ) {
    return overrides as T;
  }
  const out = { ...(base as Record<string, unknown>) };
  for (const [k, v] of Object.entries(overrides as Record<string, unknown>)) {
    out[k] = deepMerge(out[k], v);
  }
  return out as T;
}

function resolveInstructor(id: string): ResolvedInstructor {
  const raw = INSTRUCTOR_REGISTRY[id];
  if (!raw) {
    const known = Object.keys(INSTRUCTOR_REGISTRY).join(", ");
    throw new Error(`Unknown instructor "${id}". Known: ${known}`);
  }
  return {
    id: raw.id,
    nameAr: raw.nameAr,
    nameEn: raw.nameEn,
    titleAr: raw.titleAr,
    titleEn: raw.titleEn,
    bioParagraphsAr: raw.bioParagraphsAr,
    photo: normalizePublicPath(raw.photo),
    ig: raw.ig || undefined,
    igUrl: raw.igUrl || undefined,
  };
}

function resolveCourse(raw: RawCourse): ResolvedCourse {
  // Validate
  const status: CohortStatus = raw.cohort.status === "tba" ? "tba" : "scheduled";
  const isTba = status === "tba";
  if (!isTba) {
    const startMs = new Date(raw.cohort.startIso || "").getTime();
    const endMs = new Date(raw.cohort.endIso || "").getTime();
    if (!(endMs > startMs)) {
      throw new Error(
        `Course "${raw.slug}": cohort.endIso (${raw.cohort.endIso}) must be after startIso (${raw.cohort.startIso})`
      );
    }
  }
  if (raw.media.promoVideoUrl && raw.media.promoVideoFile) {
    throw new Error(
      `Course "${raw.slug}": only one of media.promoVideoUrl / promoVideoFile may be set`
    );
  }
  if (raw.days.length === 0) {
    throw new Error(`Course "${raw.slug}": days[] cannot be empty`);
  }

  // Derivations
  const days = raw.days;
  const firstDay = days[0];
  const dayCount = days.length;
  const totalHours = Math.round(
    days.reduce((sum, d) => sum + hoursBetween(d.startTime, d.endTime), 0)
  );

  const toolsSeen = new Set<string>();
  const toolsList: { name: string }[] = [];
  for (const d of days) {
    for (const t of d.tools) {
      if (!toolsSeen.has(t)) {
        toolsSeen.add(t);
        toolsList.push({ name: t });
      }
    }
  }
  const toolCount = toolsList.length;

  const venueAr = isTba ? "" : raw.cohort.venueAr || "";
  const venueEn = isTba ? "" : raw.cohort.venueEn || "";
  const labelAr = isTba
    ? "تاريخ يعلن قريباً"
    : formatCohortLabelAr(raw.cohort.startIso || "", raw.cohort.endIso || "");
  const labelEn = isTba
    ? "Date to be announced"
    : formatCohortLabelEn(raw.cohort.startIso || "", raw.cohort.endIso || "");
  const metaDate = isTba
    ? "TBA"
    : formatMetaDate(raw.cohort.startIso || "", raw.cohort.endIso || "");
  const metaTime = isTba
    ? "TIME TBA"
    : formatMetaTime(firstDay.startTime, firstDay.endTime);
  const timeRangeAr = isTba
    ? "الوقت يعلن قريباً"
    : formatDailyTimeRangeAr(firstDay.startTime, firstDay.endTime);
  const whenWhereAr = isTba
    ? "التاريخ والوقت والمكان يعلنون قريباً."
    : `${labelAr}، ${timeRangeAr}، في ${venueAr}.`;
  const whenWhereEn = isTba
    ? "Date, time, and location will be announced soon."
    : `${labelEn}, ${metaTime}, ${venueEn || venueAr}.`;

  const placeholders: Record<string, string> = {
    __DATE_RANGE_AR__: labelAr,
    __DATE_RANGE_EN__: labelEn,
    __TIME_RANGE_AR__: timeRangeAr,
    __VENUE_AR__: venueAr,
    __VENUE_EN__: venueEn,
    __WHEN_WHERE_AR__: whenWhereAr,
    __WHEN_WHERE_EN__: whenWhereEn,
    __TOTAL_HOURS_AR__: toArabicDigits(totalHours),
    __TOTAL_HOURS_EN__: String(totalHours),
    __DAY_COUNT_AR__: toArabicDigits(dayCount),
    __DAY_COUNT_EN__: String(dayCount),
    __TOOL_COUNT_AR__: toArabicDigits(toolCount),
    __TOOL_COUNT_EN__: String(toolCount),
    __META_DATE__: metaDate,
    __META_TIME__: metaTime,
  };

  // Compose copy: shared default + per-course override + token substitution
  const mergedCopy = deepMerge(sharedCopyData, raw.copyOverrides);
  const resolvedCopy = substituteDeep(mergedCopy, placeholders) as ResolvedCopy;
  const resolvedFaq = substituteDeep(faqData.faq, placeholders) as FaqItem[];

  // about.paragraph1Ar comes from the course's descriptionAr (not copy)
  resolvedCopy.about = {
    ...resolvedCopy.about,
    paragraph1Ar: raw.descriptionAr,
  };

  if (isTba) {
    resolvedCopy.hero = {
      ...resolvedCopy.hero,
      ctaPrimaryAr: "سجّل اهتمامك",
    };
    resolvedCopy.booking = {
      ...resolvedCopy.booking,
      headlineLine1Ar: "سجّل اهتمامك للدفعة القادمة",
      headlineAccentAr: "",
      subHeadlineAr:
        "لا نعرض الأسعار أو نموذج التسجيل قبل اعتماد موعد الدفعة. اترك لنا رسالة عبر واتساب، ونرسل لك التفاصيل فور الإعلان.",
      tierLegendAr: "",
      totalLabelAr: "",
      submitCtaAr: "سجّل اهتمامك عبر واتساب",
    };
    resolvedCopy.pricing = {
      ...resolvedCopy.pricing,
      headlinePrefixAr: "",
      headlineAccentAr: "",
      footnoteAr: "",
      inquireLinkAr: "",
      bookPrefixAr: "",
    };
    resolvedCopy.footer = {
      ...resolvedCopy.footer,
      finalBeforeAr: "التفاصيل ",
      finalAccentAr: "قريباً",
      finalAfterAr: ". سجّل اهتمامك الآن.",
      ctaPrimaryAr: "سجّل اهتمامك",
      ctaSecondaryAr: "تواصل مباشر",
    };
  }

  const curriculumDays: CurriculumDay[] = days.map((d, i) => ({
    index: String(i + 1).padStart(2, "0"),
    titleAr: d.titleAr,
    bodyAr: d.bodyAr,
    toolNames: d.tools,
  }));

  const curriculumBonus: CurriculumBonus[] = raw.curriculumBonus.map((b, i) => ({
    index: String(i + 1).padStart(2, "0"),
    titleAr: b.titleAr,
    bodyAr: b.bodyAr,
  }));

  const tiers: ResolvedTier[] = raw.pricing.tiers.map((t) => ({
    ...t,
    id: t.id as "early-bird" | "standard",
    currency: raw.pricing.currency,
    featuresAr: t.featuresAr.map((f) => substituteDeep(f, placeholders)),
    featuresEn: t.featuresEn.map((f) => substituteDeep(f, placeholders)),
  }));

  const instructors = raw.instructorIds.map((id) => resolveInstructor(id));

  return {
    slug: raw.slug,
    active: raw.active,
    accentColor: raw.accentColor,
    titleAr: raw.titleAr,
    titleEn: raw.titleEn,
    taglineAr: raw.taglineAr,
    taglineEn: raw.taglineEn,
    cohort: {
      status,
      isTba,
      startIso: raw.cohort.startIso || "",
      endIso: raw.cohort.endIso || "",
      venueAr,
      venueEn,
      labelAr,
      labelEn,
      metaDate,
      metaTime,
      timeRangeAr,
      totalHours,
      dayCount,
    },
    instructors,
    days: days.map((d, i) => ({
      index: String(i + 1).padStart(2, "0"),
      titleAr: d.titleAr,
      bodyAr: d.bodyAr,
      startTime: d.startTime,
      endTime: d.endTime,
      toolNames: d.tools,
    })),
    tools: toolsList,
    curriculum: { days: curriculumDays, bonus: curriculumBonus },
    tiers: isTba ? [] : tiers,
    media: {
      ...raw.media,
      posterImage: normalizePublicPath(raw.media.posterImage),
      promoVideoFile: normalizePublicPath(raw.media.promoVideoFile),
    },
    stats: raw.stats,
    descriptionAr: raw.descriptionAr,
    whatsappNumber: raw.whatsappOverride || globalData.whatsapp,
    sections: { ...DEFAULT_SECTIONS, ...(raw.sections ?? {}) },
    copy: resolvedCopy,
    faq: resolvedFaq,
  };
}

const HUB_FAQ_PLACEHOLDERS: Record<string, string> = {
  __DATE_RANGE_AR__: "See each course page",
  __DATE_RANGE_EN__: "See each course page",
  __TIME_RANGE_AR__: "See each course page",
  __VENUE_AR__: "",
  __VENUE_EN__: "",
  __WHEN_WHERE_AR__: "افتح صفحة الدورة لعرض الموعد والمكان الحاليين.",
  __WHEN_WHERE_EN__: "Open a course page to see its current date and venue.",
};

const RESOLVED_COURSES = COURSES_RAW.map(resolveCourse);

// Build a quick slug → order lookup so getAllCourses doesn't iterate twice.
const ORDER_BY_SLUG: Record<string, number> = Object.fromEntries(
  COURSES_RAW.map((c) => [c.slug, c.order])
);

// ─── Public API ────────────────────────────────────────────────────────────

export function getCourse(slug: string): ResolvedCourse {
  const c = RESOLVED_COURSES.find((c) => c.slug === slug);
  if (!c) {
    const known = RESOLVED_COURSES.map((c) => c.slug).join(", ");
    throw new Error(`getCourse: unknown course "${slug}". Known: ${known}`);
  }
  return c;
}

export function getAllCourses(): ResolvedCourse[] {
  return RESOLVED_COURSES.filter((c) => c.active).sort(
    (a, b) => (ORDER_BY_SLUG[a.slug] ?? 99) - (ORDER_BY_SLUG[b.slug] ?? 99)
  );
}

export function getInstructor(id: string): ResolvedInstructor {
  return resolveInstructor(id);
}

export const GLOBAL = {
  whatsapp: globalData.whatsapp,
  accreditations: globalData.accreditations as Accreditation[],
  faq: substituteDeep(faqData.faq, HUB_FAQ_PLACEHOLDERS) as FaqItem[],
  brand: globalData.brand,
  links: globalData.links,
  copy: {
    footer: sharedCopyData.footer,
    faqSection: sharedCopyData.faqSection,
    hub: hubData,
  },
};
