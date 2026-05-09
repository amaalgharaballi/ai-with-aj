// Pure formatters: dates, times, digits, and placeholder substitution.
// No imports from @/content/* — these helpers are data-agnostic and reused
// across per-course resolvers and any other call site that needs them.

export function toArabicDigits(n: string | number): string {
  return String(n).replace(/[0-9]/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]);
}

// Parse ISO date parts directly from the string to avoid JS timezone shifts.
// CMS saves dates entered in Kuwait TZ; we display those exact dates.
export function parseIsoParts(iso: string): { year: number; month: number; day: number } {
  const [date] = iso.split("T");
  const [y, m, d] = date.split("-").map(Number);
  return { year: y, month: m - 1, day: d };
}

// Intentional: the Arabic UI still uses English month names and Latin digits
// because the owner approved English-only visible date strings.
export function formatCohortLabelAr(startIso: string, endIso: string): string {
  return formatCohortLabelEn(startIso, endIso);
}

export function formatCohortLabelEn(startIso: string, endIso: string): string {
  const s = parseIsoParts(startIso);
  const e = parseIsoParts(endIso);
  const sMonth = new Date(2000, s.month, 1).toLocaleString("en-US", { month: "long" });
  const eMonth = new Date(2000, e.month, 1).toLocaleString("en-US", { month: "long" });
  const sameMonth = s.year === e.year && s.month === e.month;
  if (sameMonth) return `${sMonth} ${s.day}–${e.day}, ${e.year}`;
  return `${sMonth} ${s.day} – ${eMonth} ${e.day}, ${e.year}`;
}

export function formatMetaDate(startIso: string, endIso: string): string {
  const s = parseIsoParts(startIso);
  const e = parseIsoParts(endIso);
  const sMonth = new Date(2000, s.month, 1)
    .toLocaleString("en-US", { month: "short" })
    .toUpperCase();
  const eMonth = new Date(2000, e.month, 1)
    .toLocaleString("en-US", { month: "short" })
    .toUpperCase();
  const pad = (n: number) => String(n).padStart(2, "0");
  const sameMonth = s.year === e.year && s.month === e.month;
  if (sameMonth) {
    return `${sMonth} ${pad(s.day)} — ${pad(e.day)}, ${e.year}`;
  }
  return `${sMonth} ${pad(s.day)} — ${eMonth} ${pad(e.day)}, ${e.year}`;
}

export function parseTime(t: string): { h: number; m: number } {
  const [h, m] = t.split(":").map(Number);
  return { h, m };
}

export function hoursBetween(startTime: string, endTime: string): number {
  const s = parseTime(startTime);
  const e = parseTime(endTime);
  let diff = e.h + e.m / 60 - (s.h + s.m / 60);
  if (diff < 0) diff += 24;
  return diff;
}

export function to12h(h: number): { hour12: number; period: "AM" | "PM" } {
  const period: "AM" | "PM" = h < 12 ? "AM" : "PM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return { hour12, period };
}

export function formatDailyTimeRangeAr(startTime: string, endTime: string): string {
  const s = to12h(parseTime(startTime).h);
  const e = to12h(parseTime(endTime).h);
  const toSuffix = (p: "AM" | "PM") => (p === "PM" ? "مساءً" : "صباحاً");
  const sH = toArabicDigits(s.hour12);
  const eH = toArabicDigits(e.hour12);
  if (s.period === e.period) return `من ${sH} إلى ${eH} ${toSuffix(s.period)}`;
  return `من ${sH} ${toSuffix(s.period)} إلى ${eH} ${toSuffix(e.period)}`;
}

export function formatMetaTime(startTime: string, endTime: string): string {
  const s = to12h(parseTime(startTime).h);
  const e = to12h(parseTime(endTime).h);
  if (s.period === e.period) return `${s.hour12} — ${e.hour12} ${s.period}`;
  return `${s.hour12} ${s.period} — ${e.hour12} ${e.period}`;
}

// Token substitution. Placeholder keys are full tokens (e.g. "__TOTAL_HOURS_AR__")
// — caller owns the naming convention; this is a generic string replace.

export function substitute(s: string, placeholders: Record<string, string>): string {
  return Object.entries(placeholders).reduce(
    (acc, [k, v]) => acc.replaceAll(k, v),
    s
  );
}

// Deep walk: replace placeholder tokens in every string value of the tree.
// The runtime shape is preserved; the type system can't see through this so
// callers cast back to their concrete type.
export function substituteDeep<T>(obj: T, placeholders: Record<string, string>): T {
  if (typeof obj === "string") return substitute(obj, placeholders) as unknown as T;
  if (Array.isArray(obj)) {
    return obj.map((v) => substituteDeep(v, placeholders)) as unknown as T;
  }
  if (obj && typeof obj === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) out[k] = substituteDeep(v, placeholders);
    return out as unknown as T;
  }
  return obj;
}
