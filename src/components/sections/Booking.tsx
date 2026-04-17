"use client";

import { useMemo, useState } from "react";
import { SITE } from "@/lib/site";
import { buildBookingUrl, type BookingFormData } from "@/lib/whatsapp";
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";

type TierId = BookingFormData["tierId"];

export default function Booking() {
  const c = SITE.copy.booking;

  const [tierId, setTierId] = useState<TierId>("early-bird");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+965 ");
  const [email, setEmail] = useState("");
  const [field, setField] = useState<string>(c.workFieldsAr[0].value);

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const tier = useMemo(
    () => SITE.tiers.find((t) => t.id === tierId)!,
    [tierId]
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
      if (parsed) formattedPhone = parsed.formatInternational();
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
      "ar"
    );

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section
      id="booking"
      aria-label={c.labelAr}
      className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 py-24 sm:py-32"
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <span
            className="font-mono text-[10px] tracking-[0.28em] uppercase"
            style={{ color: "var(--fg-muted)" }}
          >
            {c.numeral} {c.labelAr}
          </span>
          <h2
            className="mt-3 font-arabic text-4xl sm:text-5xl font-bold leading-tight"
            style={{ color: "var(--fg)" }}
          >
            {c.headlineLine1Ar}
            <br />
            <span style={{ color: "var(--accent)" }}>{c.headlineAccentAr}</span>
          </h2>
          <p
            className="mt-6 max-w-md text-base leading-relaxed"
            style={{ color: "var(--fg-muted)" }}
          >
            {c.subHeadlineAr}
          </p>

          <ul
            className="mt-8 space-y-3 text-sm"
            style={{ color: "var(--fg-muted)" }}
          >
            {c.bulletsAr.map((x) => (
              <li key={x} className="flex items-center gap-3">
                <span
                  className="h-1 w-6"
                  style={{ background: "var(--accent)" }}
                />
                <span style={{ color: "var(--fg)" }}>{x}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Form */}
        <form
          onSubmit={onSubmit}
          noValidate
          className="border p-6 sm:p-8 space-y-6"
          style={{
            borderColor: "var(--border)",
            background: "var(--bg-elevated)",
          }}
        >
          {/* Tier selector */}
          <fieldset>
            <legend
              className="font-mono text-[10px] tracking-[0.22em] uppercase mb-3"
              style={{ color: "var(--fg-muted)" }}
            >
              {c.tierLegendAr}
            </legend>
            <div className="grid grid-cols-2 gap-2">
              {SITE.tiers.map((t) => {
                const selected = tierId === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTierId(t.id as TierId)}
                    className="relative flex flex-col items-start gap-1 border p-4 text-right transition-colors"
                    style={{
                      borderColor: selected ? "var(--accent)" : "var(--border)",
                      background: selected ? "color-mix(in oklab, var(--accent) 8%, transparent)" : "transparent",
                    }}
                  >
                    <span
                      className="font-mono text-[9px] tracking-[0.22em] uppercase"
                      style={{
                        color: selected ? "var(--accent)" : "var(--fg-muted)",
                      }}
                    >
                      {t.id === "early-bird" ? "EARLY ACCESS" : "STANDARD"}
                    </span>
                    <span
                      className="font-arabic text-base font-semibold"
                      style={{ color: "var(--fg)" }}
                    >
                      {t.nameAr}
                    </span>
                    <span
                      className="font-display text-xl font-semibold tabular-nums"
                      style={{ color: "var(--fg)" }}
                    >
                      {t.price} {t.currency}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

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
              className="w-full bg-transparent py-3 px-3 font-arabic text-base outline-none"
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
              className="w-full bg-transparent py-3 px-3 font-arabic text-base outline-none appearance-none"
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

          <div
            className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t"
            style={{ borderColor: "var(--border)" }}
          >
            <div>
              <p
                className="font-mono text-[10px] tracking-[0.22em] uppercase"
                style={{ color: "var(--fg-muted)" }}
              >
                {c.totalLabelAr}
              </p>
              <p
                className="font-display text-3xl font-semibold tabular-nums"
                style={{ color: "var(--fg)" }}
              >
                {tier.price} {tier.currency}
              </p>
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-3 rounded-md px-6 py-3.5 font-arabic text-base font-semibold transition-colors"
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488" />
              </svg>
              {c.submitCtaAr}
            </button>
          </div>
        </form>
      </div>
    </section>
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
  return (
    <label className="block">
      <div className="flex items-baseline justify-between mb-1.5">
        <span
          className="font-mono text-[10px] tracking-[0.22em] uppercase"
          style={{ color: "var(--fg-muted)" }}
        >
          {label}
        </span>
        {hint && (
          <span
            className="font-mono text-[10px]"
            style={{ color: "var(--fg-muted)" }}
          >
            {hint}
          </span>
        )}
      </div>
      <div
        className="border transition-colors focus-within:border-current"
        style={{
          borderColor: error ? "#ef4444" : "var(--border)",
          background: "var(--bg)",
          color: error ? "#ef4444" : "var(--electric)",
        }}
      >
        {children}
      </div>
      {error && (
        <p
          className="mt-1.5 font-mono text-[10px] tracking-wider"
          style={{ color: "#ef4444" }}
        >
          {error}
        </p>
      )}
    </label>
  );
}
