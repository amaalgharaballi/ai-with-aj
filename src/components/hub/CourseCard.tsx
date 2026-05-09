"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import type { ResolvedCourse } from "@/lib/site";
import { GLOBAL } from "@/lib/site";

interface CourseCardProps {
  course: ResolvedCourse;
}

export default function CourseCard({ course }: CourseCardProps) {
  const cardVars = {
    "--course-accent": course.accentColor,
    "--card-border": "color-mix(in oklab, var(--course-accent) 54%, var(--border))",
    "--card-border-soft": "color-mix(in oklab, var(--course-accent) 28%, var(--border))",
    borderColor: "var(--card-border)",
  } as CSSProperties;
  const cta = GLOBAL.copy.hub.courseCardCta;

  const instructorNames = course.instructors.map((i) => i.nameAr).join(" · ");

  return (
    <Link
      data-course={course.slug}
      href={`/${course.slug}`}
      style={cardVars}
      className="group relative block w-full min-w-0 max-w-full overflow-hidden rounded-md border transition-all hover:-translate-y-0.5"
      aria-label={course.titleAr}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{ background: "var(--bg-elevated)" }}
      />

      <div className="relative z-10 flex min-w-0 flex-col">
        {/* Title */}
        <div className="min-w-0 p-5 sm:p-7">
          <h3
            className="font-arabic-display font-bold leading-tight"
            style={{
              color: "var(--fg)",
              fontSize: "clamp(1.35rem, 6.1vw, 2.25rem)",
              overflowWrap: "anywhere",
              wordBreak: "break-word",
            }}
          >
            {course.titleAr}
          </h3>
        </div>

        {/* Poster */}
        <Poster
          src={course.media.posterImage}
          alt={course.titleAr}
          accentColor={course.accentColor}
        />

        {/* Body */}
        <div className="grid min-w-0 gap-6 p-5 sm:p-7 lg:grid-cols-[1.18fr_0.82fr] lg:items-end">
          <div className="min-w-0">
            {/* Cohort details */}
            <div className="flex items-start gap-3">
              <span
                aria-hidden
                className="mt-2 inline-block h-2 w-2 rounded-full shrink-0"
                style={{
                  background: "var(--course-accent)",
                  boxShadow:
                    "0 0 14px color-mix(in oklab, var(--course-accent) 68%, transparent)",
                }}
              />
              <div className="min-w-0">
                <p
                  className="font-mono text-xs font-semibold leading-tight tracking-[0.08em] uppercase sm:text-base"
                  style={{
                    color: "var(--course-accent)",
                    overflowWrap: "anywhere",
                    wordBreak: "break-word",
                  }}
                  dir="ltr"
                >
                  {course.cohort.labelEn}
                </p>
                <p
                  className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] sm:text-[11px]"
                  style={{
                    color: "var(--fg-muted)",
                    overflowWrap: "anywhere",
                    wordBreak: "break-word",
                  }}
                  dir="ltr"
                >
                  {course.cohort.isTba
                    ? "DETAILS TBA"
                    : `${course.cohort.metaTime} · KUWAIT`}
                </p>
              </div>
            </div>

            {/* Tagline */}
            <p
              className="mt-5 max-w-2xl text-sm leading-relaxed sm:text-base"
              style={{ color: "var(--fg-muted)" }}
            >
              {course.taglineAr}
            </p>

            {/* Tools row */}
            {course.tools.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-1.5">
                {course.tools.map((t) => (
                  <span
                    key={t.name}
                    className="font-mono text-[10px] tracking-wider uppercase px-2 py-1 border rounded"
                    style={{
                      borderColor: "var(--card-border-soft)",
                      color: "var(--fg-muted)",
                      background: "var(--bg)",
                    }}
                    dir="ltr"
                  >
                    {t.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex min-w-0 flex-col gap-5 lg:items-stretch">
            {/* Stat row */}
            <div
              className="grid grid-cols-3 gap-2 border-y py-4 text-center"
              style={{ borderColor: "var(--card-border-soft)" }}
            >
              <Stat value={String(course.cohort.dayCount)} label="أيام" />
              <Stat value={String(course.cohort.totalHours)} label="ساعة" />
              <Stat
                value={String(course.instructors.length)}
                label={course.instructors.length > 1 ? "مدرّبين" : "مدرّب"}
              />
            </div>

            {/* Instructor names */}
            <p className="text-sm font-medium" style={{ color: "var(--fg)" }}>
              {instructorNames}
            </p>

            {/* CTA */}
            <div
              className="mt-auto flex items-center justify-between gap-2"
              style={{ color: "var(--course-accent)" }}
            >
              <span className="text-sm font-semibold">
                {cta}
              </span>
              <ArrowRtl />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex min-w-0 items-baseline justify-center gap-1">
      <span
        className="font-arabic-display text-xl font-semibold tabular-nums sm:text-2xl"
        style={{ color: "var(--fg)" }}
      >
        {value}
      </span>
      <span
        className="text-xs sm:text-sm"
        style={{ color: "var(--fg-muted)" }}
      >
        {label}
      </span>
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
      style={{ color: "var(--course-accent)" }}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function Poster({
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
      className="relative aspect-[16/9] overflow-hidden border-b"
      style={{
        borderColor: "var(--card-border-soft)",
        background:
          "linear-gradient(135deg, color-mix(in oklab, var(--bg-elevated) 84%, var(--course-accent) 16%), var(--bg))",
      }}
    >
      {imgOk ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-contain object-center transition-transform duration-700 group-hover:scale-[1.015]"
          style={{ color: "transparent" }}
          loading="lazy"
          decoding="async"
          onError={() => setImgOk(false)}
        />
      ) : (
        <PosterFallback accentColor={accentColor} />
      )}

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 65%, color-mix(in oklab, var(--bg) 18%, transparent) 100%)",
        }}
      />
    </div>
  );
}

function PosterFallback({ accentColor }: { accentColor: string }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        background: `radial-gradient(ellipse at center, ${accentColor}22 0%, var(--bg) 70%)`,
      }}
    >
      <span
        className="font-mono text-[10px] tracking-[0.28em] uppercase"
        style={{ color: "var(--fg-muted)" }}
      >
        POSTER · TBD
      </span>
    </div>
  );
}
