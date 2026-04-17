"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";
import Reveal from "@/components/motion/Reveal";

export default function Instructor() {
  const c = SITE.copy.instructorSection;

  return (
    <section
      id="instructor"
      aria-label={c.labelAr}
      className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 py-24 sm:py-32"
    >
      <div className="grid gap-14 lg:grid-cols-[auto_1fr] lg:items-center">
        {/* Portrait */}
        <Reveal className="flex justify-center lg:justify-start">
          <InstructorPortrait />
        </Reveal>

        {/* Bio */}
        <Reveal delay={120}>
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
              {SITE.instructor.nameAr}
            </h2>
            <p
              className="mt-4 font-mono text-xs tracking-[0.18em] uppercase"
              style={{ color: "var(--accent)" }}
            >
              {SITE.instructor.titleEn}
            </p>

            <div
              className="mt-8 space-y-4 text-base leading-[1.9]"
              style={{ color: "var(--fg)" }}
            >
              {c.bioParagraphsAr.map((p, i) => (
                <p
                  key={i}
                  style={i > 0 ? { color: "var(--fg-muted)" } : undefined}
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={SITE.instructor.igUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border px-5 py-2.5 font-mono text-xs tracking-[0.2em] uppercase transition-colors"
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
                @{SITE.instructor.ig}
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────────── Avatar ────────────────────────────── */

function InstructorPortrait() {
  const [imgOk, setImgOk] = useState(true);

  return (
    <div className="relative size-[280px] sm:size-[340px]">
      {/* Orbital mono labels */}
      <OrbitalLabel text={SITE.copy.instructorSection.orbitalLabel} />

      {/* Pulsing halo */}
      <div
        aria-hidden
        className="absolute inset-6 rounded-full blur-2xl opacity-40 animate-pulse-dot"
        style={{
          background:
            "radial-gradient(circle, var(--accent) 0%, transparent 65%)",
        }}
      />

      {/* Rotating dashed ring */}
      <div
        aria-hidden
        className="absolute inset-2 rounded-full rotate-slow"
        style={{
          border: "1px dashed var(--accent)",
          opacity: 0.55,
        }}
      />

      {/* Corner crop-marks */}
      <CornerMarks />

      {/* SVG duotone filter — maps shadows → deep bg, highlights → fg,
          and kills the warm orange entirely. */}
      <svg aria-hidden className="absolute size-0">
        <filter id="duotone-aj" colorInterpolationFilters="sRGB">
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
        {imgOk ? (
          // Plain <img> so a missing file gracefully shows the fallback.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/instructor.jpg"
            alt={SITE.instructor.nameAr}
            className="h-full w-full object-cover"
            loading="lazy"
            onError={() => setImgOk(false)}
            style={{ filter: "url(#duotone-aj) contrast(1.05) brightness(1.02)" }}
          />
        ) : (
          <AvatarFallback />
        )}

        {/* accent rim-light — a faint green cast on the right edge */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(130% 110% at 85% 25%, color-mix(in oklab, var(--accent) 18%, transparent) 0%, transparent 55%)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* Live dot */}
      <div
        className="absolute bottom-6 right-6 flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[9px] tracking-[0.22em] uppercase"
        style={{
          borderColor: "var(--border)",
          background: "color-mix(in oklab, var(--bg) 80%, transparent)",
          color: "var(--fg-muted)",
        }}
      >
        <span
          className="h-1.5 w-1.5 rounded-full animate-pulse-dot"
          style={{ background: "var(--accent)" }}
        />
        {SITE.copy.instructorSection.liveBadge}
      </div>

      <style jsx>{`
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .rotate-slow { animation: rotate-slow 40s linear infinite; }
        @keyframes scan-bar {
          0%   { transform: translateY(-120%); opacity: 0; }
          10%  { opacity: 1; }
          50%  { opacity: 0.6; }
          90%  { opacity: 0.8; }
          100% { transform: translateY(520%); opacity: 0; }
        }
        .scan-bar { animation: scan-bar 5.5s cubic-bezier(.4,.1,.6,.9) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .rotate-slow, .scan-bar { animation: none; }
        }
      `}</style>
    </div>
  );
}

function CornerMarks() {
  const base =
    "absolute size-6 border-[var(--fg-muted)]";
  return (
    <>
      <span aria-hidden className={`${base} top-0 left-0 border-t border-l`} />
      <span aria-hidden className={`${base} top-0 right-0 border-t border-r`} />
      <span
        aria-hidden
        className={`${base} bottom-0 left-0 border-b border-l`}
      />
      <span
        aria-hidden
        className={`${base} bottom-0 right-0 border-b border-r`}
      />
    </>
  );
}

function OrbitalLabel({ text }: { text: string }) {
  // SVG text on a circular path — rotates slowly around the portrait
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

function AvatarFallback() {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-3"
      style={{ color: "var(--fg-muted)" }}
    >
      <span
        className="font-display text-6xl font-semibold"
        style={{ color: "var(--accent)" }}
      >
        AJ
      </span>
      <span className="font-mono text-[9px] tracking-[0.28em] uppercase">
        drop image at
      </span>
      <code
        className="font-mono text-[10px]"
        style={{ color: "var(--fg)" }}
      >
        /public/instructor.jpg
      </code>
    </div>
  );
}
