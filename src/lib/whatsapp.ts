// Single source of truth for every WhatsApp CTA on the site.
//
// Mode A — buildQuickUrl: short context-aware link from hero, final CTA,
//   pricing-tier inquire link, etc. Generic message when no course is given;
//   course-specific message when one is.
// Mode B — buildBookingUrl: full lead-qualified link submitted from the
//   booking form, always tied to a course.

import { GLOBAL, type ResolvedCourse, type ResolvedTier } from "@/lib/site";

type Locale = "ar" | "en";
type Ctx =
  | "hero"
  | "interest"
  | "final"
  | "pricing-early-bird"
  | "pricing-standard";

interface QuickOpts {
  course?: ResolvedCourse;
}

interface BookingOpts {
  course: ResolvedCourse;
}

export interface BookingFormData {
  name: string;
  phone: string; // already E.164 formatted by react-phone-number-input
  email?: string;
  workField: string;
  tierId: ResolvedTier["id"];
}

// Templates use a {course} placeholder; the resolver substitutes either the
// course's own title or a generic fallback ("الدورات" / "the courses").
const QUICK_TEMPLATES: Record<Locale, Record<Ctx, string>> = {
  ar: {
    hero: "السلام عليكم، أرغب بالاستفسار عن {course}.",
    interest: "السلام عليكم، أرغب بتسجيل اهتمامي في {course} وإبلاغي عند إعلان الموعد.",
    final: "السلام عليكم، جاهز أسجل في {course}.",
    "pricing-early-bird":
      "السلام عليكم، أرغب بحجز مقعد بسعر الحجز المبكر (Early Access) في {course}.",
    "pricing-standard": "السلام عليكم، أرغب بحجز مقعد في {course}.",
  },
  en: {
    hero: "Hi, I'd like to ask about {course}.",
    interest: "Hi, I'd like to register my interest in {course} and be notified when the date is announced.",
    final: "Hi, I'm ready to register for {course}.",
    "pricing-early-bird": "Hi, I'd like to book an Early Access seat in {course}.",
    "pricing-standard": "Hi, I'd like to book a seat in {course}.",
  },
};

const FALLBACK_COURSE: Record<Locale, string> = {
  ar: "الدورات",
  en: "the courses",
};

function whatsappNumber(course?: ResolvedCourse): string {
  return course?.whatsappNumber || GLOBAL.whatsapp;
}

function toUrl(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function courseRef(locale: Locale, course?: ResolvedCourse): string {
  if (!course) return FALLBACK_COURSE[locale];
  return locale === "ar" ? course.titleAr : course.titleEn;
}

/** Mode A — direct CTA from a section. Course is optional (hub-level CTAs). */
export function buildQuickUrl(
  ctx: Ctx,
  locale: Locale = "ar",
  opts: QuickOpts = {}
): string {
  const message = QUICK_TEMPLATES[locale][ctx].replace(
    "{course}",
    courseRef(locale, opts.course)
  );
  return toUrl(whatsappNumber(opts.course), message);
}

/** Mode B — booking form submission. Always carries course context. */
export function buildBookingUrl(
  data: BookingFormData,
  locale: Locale,
  opts: BookingOpts
): string {
  const { course } = opts;
  const tier = course.tiers.find((t) => t.id === data.tierId);
  const tierName = tier
    ? locale === "ar"
      ? tier.nameAr
      : tier.nameEn
    : data.tierId;
  const priceLine = tier ? `${tier.price} ${tier.currency}` : "";
  const courseTitle = locale === "ar" ? course.titleAr : course.titleEn;

  const lines =
    locale === "ar"
      ? [
          "السلام عليكم،",
          `أرغب بالتسجيل في ${courseTitle}.`,
          "",
          `الاسم: ${data.name}`,
          `الهاتف: ${data.phone}`,
          `الإيميل: ${data.email || "-"}`,
          `المجال: ${data.workField}`,
          `الفئة: ${tierName}${priceLine ? ` (${priceLine})` : ""}`,
        ]
      : [
          "Hi,",
          `I'd like to register for ${courseTitle}.`,
          "",
          `Name: ${data.name}`,
          `Phone: ${data.phone}`,
          `Email: ${data.email || "-"}`,
          `Field: ${data.workField}`,
          `Tier: ${tierName}${priceLine ? ` (${priceLine})` : ""}`,
        ];

  return toUrl(whatsappNumber(course), lines.join("\n"));
}
