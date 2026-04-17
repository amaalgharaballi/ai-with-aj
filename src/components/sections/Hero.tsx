"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import { buildQuickUrl } from "@/lib/whatsapp";
import HeroTerminal from "@/components/hero/HeroTerminal";

/**
 * Hero — AI output mosaic as a *generated* background (no real assets yet),
 * so it renders without any external files. Replace `MosaicTile` bg with
 * real images under /public/hero/*.jpg when the cousin ships them.
 */
export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden min-h-[100dvh] w-full flex items-end pb-20 pt-28 sm:pt-32"
    >
      {/* Animated mosaic background */}
      <MosaicBackground />

      {/* Gradient veil for legibility */}
      <div
        aria-hidden
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--bg) 40%, transparent) 0%, color-mix(in oklab, var(--bg) 75%, transparent) 55%, var(--bg) 100%)",
        }}
      />

      <div className="relative z-20 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          {/* Left — copy + CTAs */}
          <div>
            {/* Tag line */}
            <div
              className="mb-6 inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.28em] uppercase"
              style={{ color: "var(--fg-muted)" }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full animate-pulse-dot"
                style={{ background: "var(--accent)" }}
              />
              <span>{SITE.copy.hero.tag}</span>
            </div>

            {/* Display headline — ONE word in accent */}
            <h1
              className="font-arabic font-bold leading-[1.05] tracking-tight"
              style={{
                color: "var(--fg)",
                fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)",
              }}
            >
              <span className="block">{SITE.copy.hero.headlineLine1Ar}</span>
              <span className="block" style={{ color: "var(--accent)" }}>
                {SITE.copy.hero.headlineLine2PrefixAr}
                {SITE.copy.hero.headlineLine2AccentAr}
              </span>
            </h1>

            {/* Sub-headline */}
            <p
              className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed"
              style={{ color: "var(--fg-muted)" }}
            >
              {SITE.copy.hero.subHeadlineAr}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <a
                href="#booking"
                className="group inline-flex items-center justify-center gap-3 rounded-md px-6 py-3.5 font-arabic text-base font-semibold transition-transform"
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
                {SITE.copy.hero.ctaPrimaryAr}
                <ArrowRtl />
              </a>

              <a
                href={buildQuickUrl("hero", "ar")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border px-6 py-3.5 font-arabic text-base transition-colors"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--fg)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--electric)";
                  e.currentTarget.style.color = "var(--electric)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--fg)";
                }}
              >
                {SITE.copy.hero.ctaSecondaryAr}
              </a>
            </div>

            {/* Meta strip */}
            <div
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[11px] tracking-[0.2em] uppercase"
              style={{ color: "var(--fg-muted)" }}
            >
              <span dir="ltr">{SITE.copy.hero.metaDate}</span>
              <span aria-hidden>•</span>
              <span>{SITE.cohort.venueAr}</span>
              <span aria-hidden>•</span>
              <span dir="ltr">{SITE.copy.hero.metaTime}</span>
            </div>
          </div>

          {/* Right — live terminal showing the prompt → output loop */}
          <div className="lg:justify-self-end w-full flex lg:block justify-start" dir="ltr">
            <HeroTerminal />
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowRtl() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="rtl:rotate-180 transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/* ───────────────────────────────────────────────────────────── *
 * Mosaic — 5x3 grid of gradient "tiles" that crossfade between  *
 * three color palettes. Drop real images here later by passing  *
 * a src prop instead of `shade`.                                *
 * ───────────────────────────────────────────────────────────── */
const PALETTES = [
  ["#0a1a14", "#0e3b2d", "#103a4d", "#1b1a2e", "#221628"],
  ["#0c1a2a", "#141730", "#21152a", "#2a1b14", "#0f2a27"],
  ["#071a1a", "#12273a", "#2a1830", "#181c33", "#0a2b22"],
];

function MosaicBackground() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = window.setInterval(
      () => setPhase((p) => (p + 1) % PALETTES.length),
      4200
    );
    return () => window.clearInterval(id);
  }, []);

  const colors = PALETTES[phase];

  return (
    <div aria-hidden className="absolute inset-0 z-0 grid grid-cols-5 grid-rows-3 gap-[2px]">
      {Array.from({ length: 15 }).map((_, i) => {
        const c = colors[i % colors.length];
        const delay = (i * 90) % 1400;
        return (
          <div
            key={i}
            className="relative overflow-hidden"
            style={{
              background: `radial-gradient(120% 120% at ${i % 2 ? "30%" : "70%"} ${
                i % 3 ? "40%" : "70%"
              }, ${c} 0%, #08090F 90%)`,
              transition: `background 1.6s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
            }}
          >
            {/* faint scan-line */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 3px)",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
