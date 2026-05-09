"use client";

import { useState } from "react";
import type { ResolvedCourse } from "@/lib/site";
import { buildQuickUrl } from "@/lib/whatsapp";

/**
 * Hero — poster-first layout for course deep-dives.
 *
 * Mobile: landscape poster on top, then tag → headline → sub → meta strip → CTAs.
 * Desktop (lg+): two columns. Left has copy + meta + CTAs, right has a
 * cinematic landscape poster frame.
 *
 * The poster comes from course.media.posterImage (CMS-uploaded). Falls back
 * gracefully to a simple placeholder when missing.
 */
interface HeroProps {
  course: ResolvedCourse;
}

export default function Hero({ course }: HeroProps) {
  const c = course.copy.hero;
  return (
    <section
      id="top"
      className="relative w-full pt-20 sm:pt-24 lg:pt-28 pb-10 sm:pb-12 lg:pb-16"
    >
      <div className="relative z-20 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid gap-7 sm:gap-10 lg:gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          {/* Poster — first on mobile, right column on desktop */}
          <div className="order-1 lg:order-2 w-full min-w-0">
            <PosterFrame
              src={course.media.posterImage}
              alt={course.titleAr}
              accentColor={course.accentColor}
            />
          </div>

          {/* Copy + CTAs */}
          <div className="order-2 lg:order-1 flex min-w-0 flex-col text-center lg:text-right">
            <BigDate course={course} />

            <h1
              className="w-full min-w-0 max-w-full font-arabic-display font-bold leading-[1.1] tracking-tight"
              style={{
                color: "var(--fg)",
                fontSize: "clamp(1.55rem, 6.8vw, 4.75rem)",
                overflowWrap: "anywhere",
                wordBreak: "break-word",
              }}
            >
              <span
                className="block min-w-0 max-w-full"
                style={{ overflowWrap: "anywhere", wordBreak: "break-word" }}
              >
                {c.headlineLine1Ar}
              </span>
              <span
                className="block min-w-0 max-w-full"
                style={{
                  color: "var(--course-accent)",
                  overflowWrap: "anywhere",
                  wordBreak: "break-word",
                }}
              >
                {c.headlineLine2PrefixAr}
                {c.headlineLine2AccentAr}
              </span>
            </h1>

            <p
              className="mt-5 sm:mt-6 max-w-xl text-base sm:text-lg leading-[1.85]"
              style={{ color: "var(--fg-muted)" }}
            >
              {c.subHeadlineAr}
            </p>

            {!course.cohort.isTba && course.cohort.venueAr && (
              <p
                className="mt-5 text-sm sm:text-base font-medium"
                style={{ color: "var(--fg-muted)" }}
              >
                {course.cohort.venueAr}
              </p>
            )}

            <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <a
                href="#booking"
                className="group inline-flex items-center justify-center gap-3 rounded-md px-6 py-4 sm:py-3.5 text-base font-semibold transition-colors min-h-[52px]"
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
                {c.ctaPrimaryAr}
                <ArrowRtl />
              </a>

              <a
                href={buildQuickUrl("hero", "ar", { course })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border px-6 py-4 sm:py-3.5 text-base transition-colors min-h-[52px]"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--fg)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--course-accent)";
                  e.currentTarget.style.color = "var(--course-accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--fg)";
                }}
              >
                {c.ctaSecondaryAr}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BigDate({ course }: { course: ResolvedCourse }) {
  return (
    <div
      className="mb-5 inline-flex max-w-full items-center gap-3 self-center border-r-4 py-1 pr-4 sm:mb-6 lg:self-start"
      style={{ borderColor: "var(--course-accent)" }}
    >
      <div className="min-w-0">
        <p
          className="font-mono font-semibold leading-tight tracking-[0.08em] uppercase"
          style={{
            color: "var(--course-accent)",
            fontSize: "clamp(1rem, 2.2vw, 1.35rem)",
            overflowWrap: "anywhere",
            wordBreak: "break-word",
          }}
          dir="ltr"
        >
          {course.cohort.labelEn}
        </p>
        <p
          className="mt-0.5 font-mono text-[11px] sm:text-xs tracking-[0.18em] uppercase"
          style={{ color: "var(--fg-muted)" }}
          dir="ltr"
        >
          {course.cohort.isTba ? "DETAILS TBA" : `${course.cohort.metaTime} · KUWAIT`}
        </p>
      </div>
    </div>
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

function PosterFrame({
  src,
  alt,
  accentColor,
}: {
  src: string;
  alt: string;
  accentColor: string;
}) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <div
      className="relative mx-auto lg:mx-0 w-full max-w-3xl lg:max-w-none overflow-hidden border rounded-md"
      style={{
        borderColor: "var(--border)",
        background:
          "linear-gradient(135deg, color-mix(in oklab, var(--bg-elevated) 86%, var(--course-accent) 14%), var(--bg))",
        aspectRatio: "16 / 9",
        boxShadow: "0 28px 80px color-mix(in oklab, var(--bg) 72%, transparent)",
      }}
    >
      {imgOk ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-contain object-center"
          style={{ color: "transparent" }}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          onError={() => setImgOk(false)}
        />
      ) : (
        <PosterFallback accentColor={accentColor} />
      )}

      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: accentColor }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          boxShadow:
            "inset 0 0 0 1px color-mix(in oklab, var(--fg) 7%, transparent), inset 0 -32px 64px color-mix(in oklab, var(--bg) 35%, transparent)",
        }}
      />
    </div>
  );
}

function PosterFallback({ accentColor }: { accentColor: string }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-3"
      style={{
        background: `radial-gradient(ellipse at center, ${accentColor}22 0%, var(--bg) 75%)`,
      }}
    >
      <span
        className="font-mono text-[10px] tracking-[0.28em] uppercase"
        style={{ color: "var(--fg-muted)" }}
      >
        POSTER · UPLOAD VIA /admin
      </span>
    </div>
  );
}
