"use client";

import { useMemo, useState } from "react";
import type { ResolvedCourse, ResolvedTier } from "@/lib/site";
import { buildBookingUrl, type BookingFormData } from "@/lib/whatsapp";
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";

type TierId = BookingFormData["tierId"];

interface BookingProps {
  course: ResolvedCourse;
}

export default function Booking({ course }: BookingProps) {
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
            className="inline-flex items-center justify-center gap-3 rounded-md px-6 sm:px-8 py-4 text-base font-semibold transition-colors min-h-[52px] flex-1 sm:flex-initial"
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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488" />
            </svg>
            {c.submitCtaAr}
          </button>
        </div>
      </form>
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
