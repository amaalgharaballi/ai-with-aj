"use client";

import type {
  CurriculumDay as Day,
  CurriculumBonus as Bonus,
  ResolvedCourse,
} from "@/lib/site";
import Reveal from "@/components/motion/Reveal";

interface CurriculumProps {
  course: ResolvedCourse;
}

export default function Curriculum({ course }: CurriculumProps) {
  const c = course.copy.curriculumSection;
  const accentBorder =
    "color-mix(in oklab, var(--course-accent) 42%, var(--border))";
  const toolBorder =
    "color-mix(in oklab, var(--course-accent) 34%, var(--border))";

  return (
    <section
      id="curriculum"
      aria-label="المنهج"
      className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 py-12 sm:py-16 border-t"
      style={{ borderColor: accentBorder }}
    >
      <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2
          className="font-arabic-display text-4xl sm:text-5xl font-bold leading-tight"
          style={{ color: "var(--fg)" }}
        >
          {c.headlinePrefixAr}
          <span style={{ color: "var(--course-accent)" }}>{c.headlineAccentAr}</span>
        </h2>
        {c.tagline.trim() && (
          <p
            className="max-w-sm text-sm sm:text-base leading-relaxed"
            style={{ color: "var(--fg-muted)" }}
          >
            {c.tagline}
          </p>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {course.curriculum.days.map((item, i) => (
          <Reveal key={`day-${item.index}`} delay={i * 60} className="h-full">
            <DayCard
              item={item}
              cardBorder={accentBorder}
              toolBorder={toolBorder}
            />
          </Reveal>
        ))}
      </div>

      <div className="h-14" />

      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {course.curriculum.bonus.map((item, i) => (
          <Reveal key={`bonus-${item.index}`} delay={i * 60} className="h-full">
            <BonusCard item={item} cardBorder={accentBorder} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CardShell({
  children,
  borderColor,
}: {
  children: React.ReactNode;
  borderColor: string;
}) {
  return (
    <article
      className="group relative flex h-full min-h-[260px] flex-col justify-between border p-7 transition-colors sm:p-8"
      style={{ background: "var(--bg)", borderColor }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "var(--bg)";
      }}
    >
      {children}
    </article>
  );
}

function DayCard({
  item,
  cardBorder,
  toolBorder,
}: {
  item: Day;
  cardBorder: string;
  toolBorder: string;
}) {
  return (
    <CardShell borderColor={cardBorder}>
      <div>
        <span
          className="mb-8 block font-arabic-display text-6xl sm:text-7xl font-semibold leading-none"
          style={{ color: "var(--course-accent)" }}
        >
          {item.index}
        </span>
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

        {item.toolNames.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {item.toolNames.map((tn) => (
              <span
                key={tn}
                className="font-mono text-[10px] tracking-wider uppercase px-2 py-1 border"
                style={{
                  borderColor: toolBorder,
                  color: "var(--fg-muted)",
                }}
              >
                {tn}
              </span>
            ))}
          </div>
        )}
      </div>
    </CardShell>
  );
}

function BonusCard({
  item,
  cardBorder,
}: {
  item: Bonus;
  cardBorder: string;
}) {
  return (
    <CardShell borderColor={cardBorder}>
      <div>
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
      </div>
    </CardShell>
  );
}
