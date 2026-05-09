"use client";

import { useState } from "react";
import type { ResolvedCourse, ResolvedInstructor } from "@/lib/site";
import Reveal from "@/components/motion/Reveal";

interface InstructorProps {
  course: ResolvedCourse;
}

export default function Instructor({ course }: InstructorProps) {
  const c = course.copy.instructorSection;
  const instructors = course.instructors;

  return (
    <section
      id="instructor"
      aria-label={c.labelAr}
      className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 py-12 sm:py-16"
    >
      <div className="space-y-20">
        {instructors.map((instructor) => (
          <InstructorRow
            key={instructor.id}
            instructor={instructor}
            orbitalLabel={c.orbitalLabel}
          />
        ))}
      </div>
    </section>
  );
}

interface InstructorRowProps {
  instructor: ResolvedInstructor;
  orbitalLabel: string;
}

function InstructorRow({
  instructor,
  orbitalLabel,
}: InstructorRowProps) {
  return (
    <div className="grid gap-14 lg:grid-cols-[auto_1fr] lg:items-center">
      {/* Portrait */}
      <Reveal className="flex justify-center lg:justify-start">
        <InstructorPortrait
          instructor={instructor}
          orbitalLabel={orbitalLabel}
          filterId={`duotone-${instructor.id}`}
        />
      </Reveal>

      {/* Bio */}
      <Reveal delay={120}>
        <div>
          <h3
            className="font-arabic-display text-3xl sm:text-4xl font-bold leading-tight"
            style={{ color: "var(--fg)" }}
          >
            {instructor.nameAr}
          </h3>
          <p
            className="mt-4 font-mono text-xs tracking-[0.18em] uppercase"
            style={{ color: "var(--course-accent)" }}
          >
            {instructor.titleEn}
          </p>

          <div
            className="mt-8 space-y-4 text-base leading-[1.9]"
            style={{ color: "var(--fg)" }}
          >
            {instructor.bioParagraphsAr.map((p, i) => (
              <p
                key={i}
                style={i > 0 ? { color: "var(--fg-muted)" } : undefined}
              >
                {p}
              </p>
            ))}
          </div>

          {instructor.igUrl && instructor.ig && (
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={instructor.igUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border px-5 py-2.5 font-mono text-xs tracking-[0.2em] uppercase transition-colors"
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
                @{instructor.ig}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                  className="rtl:rotate-180"
                >
                  <polyline points="7 17 17 7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
}

/* ───────────────────────────── Portrait ────────────────────────────── */

interface InstructorPortraitProps {
  instructor: ResolvedInstructor;
  orbitalLabel: string;
  filterId: string;
}

function InstructorPortrait({
  instructor,
  orbitalLabel,
  filterId,
}: InstructorPortraitProps) {
  const [imgOk, setImgOk] = useState(Boolean(instructor.photo));

  return (
    <div className="relative size-[280px] sm:size-[340px]">
      {/* Orbital mono labels */}
      <OrbitalLabel text={orbitalLabel} />

      {/* Pulsing halo */}
      <div
        aria-hidden
        className="absolute inset-6 rounded-full blur-2xl opacity-40 animate-pulse-dot"
        style={{
          background:
            "radial-gradient(circle, var(--course-accent) 0%, transparent 65%)",
        }}
      />

      {/* Rotating dashed ring */}
      <div
        aria-hidden
        className="absolute inset-2 rounded-full rotate-slow"
        style={{
          border: "1px dashed var(--course-accent)",
          opacity: 0.55,
        }}
      />

      {/* Corner crop-marks */}
      <CornerMarks />

      {/* SVG duotone filter — shadows → deep bg, highlights → fg.
          Each instructor needs its own filter id since they coexist on bootcamp. */}
      <svg aria-hidden className="absolute size-0">
        <filter id={filterId} colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="
              0.33 0.33 0.33 0 0
              0.33 0.33 0.33 0 0
              0.33 0.33 0.33 0 0
              0    0    0    1 0
            "
          />
          <feComponentTransfer>
            <feFuncR tableValues="0.03 0.894" />
            <feFuncG tableValues="0.05 0.902" />
            <feFuncB tableValues="0.08 0.921" />
          </feComponentTransfer>
        </filter>
      </svg>

      {/* Avatar disc */}
      <div
        className="absolute inset-8 rounded-full overflow-hidden border"
        style={{
          borderColor: "var(--border)",
          background: "var(--bg-elevated)",
        }}
      >
        {imgOk && instructor.photo ? (
          // Plain <img> so a missing file gracefully shows the fallback.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={instructor.photo}
            alt={instructor.nameAr}
            className="h-full w-full object-cover"
            loading="lazy"
            onError={() => setImgOk(false)}
            style={{
              filter: `url(#${filterId}) contrast(1.05) brightness(1.02)`,
              objectPosition: "center 42%",
            }}
          />
        ) : (
          <AvatarFallback instructor={instructor} />
        )}

        {/* accent rim-light */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(130% 110% at 85% 25%, color-mix(in oklab, var(--course-accent) 18%, transparent) 0%, transparent 55%)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .rotate-slow { animation: rotate-slow 40s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .rotate-slow { animation: none; }
        }
      `}</style>
    </div>
  );
}

function CornerMarks() {
  const base = "absolute size-6 border-[var(--fg-muted)]";
  return (
    <>
      <span aria-hidden className={`${base} top-0 left-0 border-t border-l`} />
      <span aria-hidden className={`${base} top-0 right-0 border-t border-r`} />
      <span aria-hidden className={`${base} bottom-0 left-0 border-b border-l`} />
      <span aria-hidden className={`${base} bottom-0 right-0 border-b border-r`} />
    </>
  );
}

function OrbitalLabel({ text }: { text: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 300 300"
      className="absolute inset-0 size-full orbit-slow"
      style={{ color: "var(--fg-muted)" }}
    >
      <defs>
        <path
          id="orbit"
          d="M 150,150 m -138,0 a 138,138 0 1,1 276,0 a 138,138 0 1,1 -276,0"
        />
      </defs>
      <text
        fontFamily="var(--font-plex-mono), monospace"
        fontSize="10"
        letterSpacing="4"
        fill="currentColor"
      >
        <textPath href="#orbit" startOffset="0">
          {text} {text}
        </textPath>
      </text>
      <style>{`
        @keyframes orbit-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        .orbit-slow {
          transform-origin: center;
          animation: orbit-slow 60s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .orbit-slow { animation: none; }
        }
      `}</style>
    </svg>
  );
}

function AvatarFallback({ instructor }: { instructor: ResolvedInstructor }) {
  // Derive initials from the English name, falling back to the first
  // two letters of the Arabic name for monogram display.
  const initials =
    instructor.nameEn
      .split(" ")
      .filter((p) => /^[A-Za-z]/.test(p))
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || instructor.nameAr.slice(0, 2);

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-3"
      style={{ color: "var(--fg-muted)" }}
    >
      <span
        className="font-arabic-display text-6xl font-semibold"
        style={{ color: "var(--course-accent)" }}
      >
        {initials}
      </span>
      <span className="font-mono text-[9px] tracking-[0.28em] uppercase">
        upload photo in CMS
      </span>
      <code
        className="font-mono text-[10px]"
        style={{ color: "var(--fg)" }}
      >
        {instructor.id}
      </code>
    </div>
  );
}
