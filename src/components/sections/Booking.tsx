"use client";

import { useMemo, useState } from "react";
import type { ResolvedCourse, ResolvedTier } from "@/lib/site";
import { buildBookingUrl, buildQuickUrl, type BookingFormData } from "@/lib/whatsapp";
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";

type TierId = BookingFormData["tierId"];

interface BookingProps {
  course: ResolvedCourse;
}

export default function Booking({ course }: BookingProps) {
  if (course.cohort.isTba) {
    return <TbaInterestBooking course={course} />;
  }

  return <ScheduledBooking course={course} />;
}

function ScheduledBooking({ course }: BookingProps) {
  const c = course.copy.booking;

  const [tierId, setTierId] = useState<TierId>("early-bird");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+965 ");
  const [email, setEmail] = useState("");
  const [field, setField] = useState<string>(c.workFieldsAr[0].value);

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const tier = useMemo(
    () => course.tiers.find((t) => t.id === tierId)!,
    [course.tiers, tierId]
  );

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (name.trim().length < 3) next.name = c.errors.nameAr;

    const cleaned = phone.replace(/\s/g, "");
    if (!cleaned || !isValidPhoneNumber(cleaned)) {
      next.phone = c.errors.phoneAr;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = c.errors.emailAr;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (!validate()) return;

    let formattedPhone = phone.replace(/\s/g, "");
    try {
      const parsed = parsePhoneNumber(formattedPhone);
      if (parsed) formattedPhone = parsed.number;
    } catch {
      // keep raw
    }

    const workFieldLabel =
      c.workFieldsAr.find((f) => f.value === field)?.label || field;

    const url = buildBookingUrl(
      {
        name: name.trim(),
        phone: formattedPhone,
        email: email.trim() || undefined,
        workField: workFieldLabel,
        tierId,
      },
      "ar",
      { course }
    );

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section
      id="booking"
      aria-label={c.labelAr}
      className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8 py-12 sm:py-16"
    >
      {/* Heading */}
      <div className="mb-8 sm:mb-10 text-center">
        <h2
          className="font-arabic-display text-4xl sm:text-5xl font-bold leading-tight"
          style={{ color: "var(--fg)" }}
        >
          {c.headlineLine1Ar}{" "}
          <span style={{ color: "var(--course-accent)" }}>{c.headlineAccentAr}</span>
        </h2>
        <p
          className="mt-5 mx-auto max-w-2xl text-base sm:text-lg leading-[1.85]"
          style={{ color: "var(--fg-muted)" }}
        >
          {c.subHeadlineAr}
        </p>
      </div>

      {/* Tier comparison cards */}
      <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 mb-6 sm:mb-8">
        {course.tiers.map((t) => (
          <TierOption
            key={t.id}
            tier={t}
            selected={tierId === t.id}
            onSelect={() => setTierId(t.id)}
          />
        ))}
      </div>

      {/* Form */}
      <form
        onSubmit={onSubmit}
        noValidate
        className="border p-6 sm:p-8 space-y-6 rounded-md"
        style={{
          borderColor: "var(--border)",
          background: "var(--bg-elevated)",
        }}
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            label={c.fieldLabels.nameAr}
            error={submitted ? errors.name : undefined}
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={c.fieldLabels.namePlaceholderAr}
              autoComplete="name"
              className="w-full bg-transparent py-3 px-3 text-base outline-none"
              style={{ color: "var(--fg)" }}
            />
          </Field>

          <Field
            label={c.fieldLabels.phoneAr}
            hint={c.fieldLabels.phoneHintAr}
            error={submitted ? errors.phone : undefined}
          >
            <input
              type="tel"
              dir="ltr"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+965 9XXXXXXX"
              autoComplete="tel"
              className="w-full bg-transparent py-3 px-3 font-mono text-base outline-none"
              style={{ color: "var(--fg)" }}
            />
          </Field>

          <Field
            label={c.fieldLabels.emailAr}
            hint={c.fieldLabels.emailHintAr}
            error={submitted ? errors.email : undefined}
          >
            <input
              type="email"
              dir="ltr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full bg-transparent py-3 px-3 font-mono text-base outline-none"
              style={{ color: "var(--fg)" }}
            />
          </Field>

          <Field label={c.fieldLabels.workFieldAr}>
            <select
              value={field}
              onChange={(e) => setField(e.target.value)}
              className="w-full bg-transparent py-3 px-3 text-base outline-none appearance-none"
              style={{ color: "var(--fg)" }}
            >
              {c.workFieldsAr.map((f) => (
                <option
                  key={f.value}
                  value={f.value}
                  style={{ background: "var(--bg-elevated)", color: "var(--fg)" }}
                >
                  {f.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div
          className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <div>
            <p
              className="text-xs sm:text-sm font-medium"
              style={{ color: "var(--fg-muted)" }}
            >
              {c.totalLabelAr}
            </p>
            <p
              className="mt-1 font-arabic-display text-3xl sm:text-4xl font-semibold tabular-nums"
              style={{ color: "var(--fg)" }}
            >
              {tier.price} {tier.currency}
            </p>
          </div>

          <button
            type="submit"
            className="inline-flex min-h-[52px] flex-1 items-center justify-center rounded-md px-6 py-4 text-center text-base font-semibold transition-colors sm:flex-initial sm:px-8"
            style={{
              background: "var(--whatsapp)",
              color: "#04140B",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--whatsapp-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--whatsapp)";
            }}
          >
            {c.submitCtaAr}
          </button>
        </div>
      </form>
    </section>
  );
}

function TbaInterestBooking({ course }: BookingProps) {
  const c = course.copy.booking;

  return (
    <section
      id="booking"
      aria-label={c.labelAr}
      className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8 py-12 sm:py-16"
    >
      <div
        className="relative overflow-hidden rounded-md border p-6 text-center sm:p-8"
        style={{
          borderColor: "var(--border)",
          background:
            "linear-gradient(135deg, color-mix(in oklab, var(--bg-elevated) 90%, var(--course-accent) 10%), var(--bg-elevated))",
        }}
      >
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: "var(--course-accent)" }}
        />

        <p
          className="font-mono text-[10px] tracking-[0.22em] uppercase"
          style={{ color: "var(--course-accent)" }}
          dir="ltr"
        >
          TBA / INTEREST LIST
        </p>
        <h2
          className="mt-4 font-arabic-display text-3xl font-bold leading-tight sm:text-5xl"
          style={{ color: "var(--fg)" }}
        >
          سجّل اهتمامك للدفعة القادمة
        </h2>
        <p
          className="mx-auto mt-5 max-w-2xl text-base leading-[1.85] sm:text-lg"
          style={{ color: "var(--fg-muted)" }}
        >
          لا نعرض الأسعار أو نموذج التسجيل قبل اعتماد موعد الدفعة. اترك لنا رسالة
          عبر واتساب، ونرسل لك التفاصيل فور الإعلان.
        </p>

        <a
          href={buildQuickUrl("interest", "ar", { course })}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex min-h-[52px] items-center justify-center rounded-md px-6 py-4 text-center text-base font-semibold transition-colors sm:px-8 sm:py-3.5"
          style={{
            background: "var(--whatsapp)",
            color: "#04140B",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--whatsapp-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--whatsapp)";
          }}
        >
          سجّل اهتمامك عبر واتساب
        </a>
      </div>
    </section>
  );
}

function TierOption({
  tier,
  selected,
  onSelect,
}: {
  tier: ResolvedTier;
  selected: boolean;
  onSelect: () => void;
}) {
  const isHL = tier.isHighlighted;
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className="relative flex flex-col gap-4 border p-5 sm:p-6 text-right rounded-md transition-all min-h-[52px]"
      style={{
        borderColor: selected ? "var(--course-accent)" : "var(--border)",
        background: selected
          ? "color-mix(in oklab, var(--course-accent) 7%, var(--bg-elevated))"
          : "var(--bg-elevated)",
        boxShadow: selected
          ? "0 0 0 1px var(--course-accent) inset"
          : "none",
      }}
    >
      {isHL && (
        <span
          className="absolute -top-2.5 right-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase"
          style={{
            background: "var(--course-accent)",
            color: "#04140B",
          }}
          dir="ltr"
        >
          BEST VALUE
        </span>
      )}

      <div className="flex items-baseline justify-between gap-3">
        <span
          className="font-arabic-display text-xl sm:text-2xl font-bold"
          style={{ color: "var(--fg)" }}
        >
          {tier.nameAr}
        </span>
        {tier.soldOut && (
          <span
            className="text-xs sm:text-sm font-medium px-2 py-0.5 border rounded"
            style={{
              borderColor: "var(--fg-muted)",
              color: "var(--fg-muted)",
            }}
          >
            مكتمل
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <span
          className="font-arabic-display text-4xl sm:text-5xl font-semibold tabular-nums"
          style={{ color: "var(--fg)" }}
        >
          {tier.price}
        </span>
        <span
          className="text-sm font-medium"
          style={{ color: "var(--fg-muted)" }}
          dir="ltr"
        >
          {tier.currency}
        </span>
      </div>

      <ul className="space-y-2 mt-1">
        {tier.featuresAr.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2.5 text-sm leading-snug"
            style={{ color: "var(--fg)" }}
          >
            <span
              aria-hidden
              className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full shrink-0"
              style={{ background: "var(--course-accent)" }}
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </button>
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  // Reserve a fixed-height row for the label + hint so every Field aligns
  // (input boxes line up across the grid even when only some have hints).
  return (
    <label className="block">
      <div className="text-sm sm:text-[15px] font-semibold leading-snug mb-1" style={{ color: "var(--fg)" }}>
        {label}
      </div>
      <div className="text-xs leading-snug mb-2 min-h-[1em]" style={{ color: "var(--fg-muted)" }}>
        {hint || " "}
      </div>
      <div
        className="border rounded transition-colors focus-within:border-current"
        style={{
          borderColor: error ? "#ef4444" : "var(--border)",
          background: "var(--bg)",
          color: error ? "#ef4444" : "var(--course-accent)",
        }}
      >
        {children}
      </div>
      {error && (
        <p
          className="mt-2 text-sm font-medium"
          style={{ color: "#ef4444" }}
        >
          {error}
        </p>
      )}
    </label>
  );
}
