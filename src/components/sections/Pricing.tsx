"use client";

import { SITE } from "@/lib/site";
import { buildQuickUrl } from "@/lib/whatsapp";
import Reveal from "@/components/motion/Reveal";

export default function Pricing() {
  const c = SITE.copy.pricing;

  return (
    <section
      id="pricing"
      aria-label={c.labelAr}
      className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 py-24 sm:py-32"
    >
      <div className="mb-14 flex flex-col gap-3">
        <span
          className="font-mono text-[10px] tracking-[0.28em] uppercase"
          style={{ color: "var(--fg-muted)" }}
        >
          {c.numeral} {c.labelAr}
        </span>
        <h2
          className="font-arabic text-4xl sm:text-5xl font-bold leading-tight"
          style={{ color: "var(--fg)" }}
        >
          {c.headlinePrefixAr}
          <span style={{ color: "var(--accent)" }}>{c.headlineAccentAr}</span>
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {SITE.tiers.map((tier, i) => (
          <Reveal key={tier.id} delay={i * 100} className="h-full">
            <TierCard tier={tier} />
          </Reveal>
        ))}
      </div>

      <p
        className="mt-8 text-center font-mono text-[10px] tracking-[0.22em] uppercase"
        style={{ color: "var(--fg-muted)" }}
      >
        {c.footnoteAr}
      </p>
    </section>
  );
}

type Tier = (typeof SITE.tiers)[number];

function TierCard({ tier }: { tier: Tier }) {
  const isHL = tier.isHighlighted;
  const ctx = tier.id === "early-bird" ? "pricing-early-bird" : "pricing-standard";

  return (
    <article
      className="relative flex h-full flex-col border p-7 sm:p-9 overflow-hidden"
      style={{
        borderColor: isHL ? "var(--accent)" : "var(--border)",
        background: "var(--bg-elevated)",
      }}
    >
      {isHL && (
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: "var(--accent)" }}
        />
      )}

      <header className="flex items-start justify-between">
        <div>
          <span
            className="font-mono text-[10px] tracking-[0.22em] uppercase"
            style={{ color: "var(--fg-muted)" }}
          >
            {tier.id === "early-bird" ? "EARLY ACCESS" : "STANDARD"}
          </span>
          <h3
            className="mt-2 font-arabic text-2xl font-semibold"
            style={{ color: "var(--fg)" }}
          >
            {tier.nameAr}
          </h3>
        </div>

        {isHL && "seatsLeft" in tier && tier.seatsLeft ? (
          <span
            className="inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] uppercase"
            style={{
              borderColor: "var(--accent)",
              color: "var(--accent)",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full animate-pulse-dot"
              style={{ background: "var(--accent)" }}
            />
            {tier.seatsLeft} مقاعد فقط
          </span>
        ) : null}
      </header>

      {/* Price */}
      <div className="mt-8 flex items-baseline gap-3">
        <span
          className="font-display text-7xl font-semibold leading-none tabular-nums"
          style={{ color: "var(--fg)" }}
        >
          {tier.price}
        </span>
        <span
          className="font-mono text-sm tracking-[0.2em] uppercase"
          style={{ color: "var(--fg-muted)" }}
        >
          {tier.currency}
        </span>
      </div>

      {/* Features */}
      <ul className="mt-8 space-y-3">
        {tier.featuresAr.map((f) => (
          <li
            key={f}
            className="flex items-start gap-3 text-sm leading-relaxed"
            style={{ color: "var(--fg)" }}
          >
            <span
              aria-hidden
              className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full shrink-0"
              style={{ background: "var(--accent)" }}
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-10 pt-6 border-t" style={{ borderColor: "var(--border)" }}>
        <a
          href="#booking"
          className="group inline-flex w-full items-center justify-center gap-2 rounded-md px-6 py-3.5 font-arabic text-base font-semibold transition-colors"
          style={{
            background: isHL ? "var(--whatsapp)" : "transparent",
            color: isHL ? "#04140B" : "var(--fg)",
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: isHL ? "var(--whatsapp)" : "var(--border)",
          }}
          onMouseEnter={(e) => {
            if (isHL) {
              e.currentTarget.style.background = "var(--whatsapp-hover)";
              e.currentTarget.style.borderColor = "var(--whatsapp-hover)";
            } else {
              e.currentTarget.style.borderColor = "var(--electric)";
              e.currentTarget.style.color = "var(--electric)";
            }
          }}
          onMouseLeave={(e) => {
            if (isHL) {
              e.currentTarget.style.background = "var(--whatsapp)";
              e.currentTarget.style.borderColor = "var(--whatsapp)";
            } else {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--fg)";
            }
          }}
        >
          {SITE.copy.pricing.bookPrefixAr}{tier.nameAr}
        </a>
        <a
          href={buildQuickUrl(ctx, "ar")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex w-full items-center justify-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase transition-colors"
          style={{ color: "var(--fg-muted)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--electric)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-muted)")}
        >
          {SITE.copy.pricing.inquireLinkAr}
        </a>
      </div>
    </article>
  );
}
