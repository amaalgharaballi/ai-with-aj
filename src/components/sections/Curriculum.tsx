"use client";

import { SITE } from "@/lib/site";
import Reveal from "@/components/motion/Reveal";

export default function Curriculum() {
  return (
    <section
      id="curriculum"
      aria-label="المنهج"
      className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 py-24 sm:py-32 border-t"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="mb-14 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span
            className="font-mono text-[10px] tracking-[0.28em] uppercase"
            style={{ color: "var(--fg-muted)" }}
          >
            [02 / 06] المنهج
          </span>
          <h2
            className="mt-3 font-arabic text-4xl sm:text-5xl font-bold leading-tight"
            style={{ color: "var(--fg)" }}
          >
            ٣ أيام · <span style={{ color: "var(--accent)" }}>٦ محاور</span>
          </h2>
        </div>
        <p
          className="max-w-sm text-sm leading-relaxed"
          style={{ color: "var(--fg-muted)" }}
        >
          كل يوم يفتح لك قدرة جديدة — ومع نهاية الورشة تخرج بمنتج فعلي،
          ما تخرج بـ&ldquo;شهادة حضور&rdquo; فقط.
        </p>
      </div>

      <div
        className="grid gap-px border sm:grid-cols-2 lg:grid-cols-3"
        style={{ borderColor: "var(--border)", background: "var(--border)" }}
      >
        {SITE.curriculum.map((item, i) => (
          <Reveal key={item.index} delay={i * 60} className="h-full">
            <CurriculumCard item={item} i={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

type Item = (typeof SITE.curriculum)[number];

function CurriculumCard({ item, i }: { item: Item; i: number }) {
  return (
    <article
      className="group relative flex flex-col justify-between p-7 sm:p-8 min-h-[260px] transition-colors h-full"
      style={{ background: "var(--bg)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "var(--bg)";
      }}
    >
      <header className="flex items-start justify-between">
        <span
          className="font-display text-6xl sm:text-7xl font-semibold leading-none"
          style={{ color: "var(--accent)" }}
        >
          {item.index}
        </span>
        <span
          className="font-mono text-[10px] tracking-[0.22em] uppercase"
          style={{ color: "var(--fg-muted)" }}
        >
          {i < 3 ? `DAY 0${i + 1}` : "BONUS"}
        </span>
      </header>

      <div className="mt-8">
        <h3
          className="font-arabic text-xl font-semibold leading-snug"
          style={{ color: "var(--fg)" }}
        >
          {item.titleAr}
        </h3>
        <p
          className="mt-3 text-sm leading-relaxed"
          style={{ color: "var(--fg-muted)" }}
        >
          {item.bodyAr}
        </p>

        {"toolNames" in item && item.toolNames && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {item.toolNames.map((tn) => (
              <span
                key={tn}
                className="font-mono text-[10px] tracking-wider uppercase px-2 py-1 border"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--fg-muted)",
                }}
              >
                {tn}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
