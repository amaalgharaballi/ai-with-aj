// Drop this file at: lib/whatsapp.ts
// Single source of truth for every WhatsApp CTA on the site.
// Mode A — buildQuickUrl: short context-aware link from hero, nav, pricing, final CTA.
// Mode B — buildBookingUrl: full lead-qualified link submitted from the booking form.

import { SITE } from "@/lib/site";

type Locale = "ar" | "en";
type Ctx =
  | "hero"
  | "final"
  | "pricing-early-bird"
  | "pricing-standard";

const QUICK_MESSAGES: Record<Locale, Record<Ctx, string>> = {
  ar: {
    hero: "السلام عليكم، أرغب بالاستفسار عن دورة صناعة المحتوى والدعايات بالذكاء الاصطناعي.",
    final: "السلام عليكم، جاهز أسجل في الدورة القادمة.",
    "pricing-early-bird": "السلام عليكم، أرغب بحجز مقعد بسعر الحجز المبكر (Early Access).",
    "pricing-standard": "السلام عليكم، أرغب بحجز مقعد في الدورة.",
  },
  en: {
    hero: "Hi, I'd like to ask about the AI content & ads workshop.",
    final: "Hi, I'm ready to register for the next cohort.",
    "pricing-early-bird": "Hi, I'd like to book an Early Access seat.",
    "pricing-standard": "Hi, I'd like to book a seat in the workshop.",
  },
};

function toWaUrl(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Mode A — direct CTA from a section. */
export function buildQuickUrl(ctx: Ctx, locale: Locale = "ar"): string {
  return toWaUrl(SITE.whatsapp, QUICK_MESSAGES[locale][ctx]);
}

/** Mode B — booking form submission. Composes a full registration request. */
export interface BookingFormData {
  name: string;
  phone: string; // already E.164 formatted by react-phone-number-input
  email?: string;
  workField: string; // localized label from the select
  tierId: "early-bird" | "standard";
}

export function buildBookingUrl(data: BookingFormData, locale: Locale = "ar"): string {
  const tier = SITE.tiers.find((t) => t.id === data.tierId);
  const tierName = tier
    ? locale === "ar"
      ? tier.nameAr
      : tier.nameEn
    : data.tierId;
  const priceLine = tier ? `${tier.price} ${tier.currency}` : "";

  const message =
    locale === "ar"
      ? [
          "السلام عليكم،",
          "أرغب بالتسجيل في دورة صناعة المحتوى والدعايات بالذكاء الاصطناعي.",
          "",
          `الاسم: ${data.name}`,
          `الهاتف: ${data.phone}`,
          `الإيميل: ${data.email || "-"}`,
          `المجال: ${data.workField}`,
          `الفئة: ${tierName}${priceLine ? ` (${priceLine})` : ""}`,
        ].join("\n")
      : [
          "Hi,",
          "I'd like to register for the AI content & ads workshop.",
          "",
          `Name: ${data.name}`,
          `Phone: ${data.phone}`,
          `Email: ${data.email || "-"}`,
          `Field: ${data.workField}`,
          `Tier: ${tierName}${priceLine ? ` (${priceLine})` : ""}`,
        ].join("\n");

  return toWaUrl(SITE.whatsapp, message);
}
