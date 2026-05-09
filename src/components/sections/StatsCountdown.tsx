"use client";

import { useEffect, useRef, useState } from "react";
import type { ResolvedCourse } from "@/lib/site";

interface StatsCountdownProps {
  course: ResolvedCourse;
}

// Countdown is rendered first (top), then the stats panel below.
export default function StatsCountdown({ course }: StatsCountdownProps) {
  return (
    <section
      aria-label="العدّ التنازلي والإحصاءات"
      className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 py-12 sm:py-16 space-y-8 sm:space-y-10"
    >
      <CountdownCard course={course} />
      <StatsPanel course={course} />
    </section>
  );
}

function StatsPanel({ course }: StatsCountdownProps) {
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = window.setInterval(() => setRefreshKey((k) => k + 1), 14000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className="relative flex flex-col overflow-hidden rounded-md border p-5 sm:p-7"
      style={{
        borderColor: "var(--border)",
        background:
          "linear-gradient(135deg, color-mix(in oklab, var(--bg-elevated) 90%, var(--course-accent) 10%), var(--bg-elevated))",
      }}
    >
      <CardKicker label="TRAINING DETAILS" />

      <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-6 flex-1">
        {course.stats.map((s, i) => (
          <Stat
            key={`${i}-${refreshKey}`}
            valueAr={s.valueAr}
            valueEn={s.valueEn}
            labelAr={s.labelAr}
          />
        ))}
      </ul>
    </div>
  );
}

function Stat({
  valueAr,
  valueEn,
  labelAr,
}: {
  valueAr: string;
  valueEn: string;
  labelAr: string;
}) {
  const numeric = parseInt(valueEn.replace(/\D/g, ""), 10) || 0;
  const [n, setN] = useState(0);
  const ref = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const raf = window.requestAnimationFrame(() => setN(numeric));
      return () => window.cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const duration = 1400;
          const start = performance.now();
          const tick = (t: number) => {
            const progress = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            setN(Math.round(eased * numeric));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [numeric]);

  const hasPlus = valueEn.includes("+");

  return (
    <li
      ref={ref}
      className="relative border-t pt-6 sm:pt-8"
      style={{ borderColor: "var(--border)" }}
    >
      <div
        className="absolute top-0 right-0 h-[2px] w-8"
        style={{ background: "var(--course-accent)" }}
      />
      <div className="flex items-baseline gap-1">
        <span
          className="font-arabic-display text-5xl sm:text-7xl font-bold leading-none tabular-nums"
          style={{ color: "var(--fg)" }}
        >
          {n}
        </span>
        {hasPlus && (
          <span
            className="font-arabic-display text-3xl sm:text-5xl font-bold"
            style={{ color: "var(--course-accent)" }}
          >
            +
          </span>
        )}
      </div>
      <p
        className="mt-3 text-sm sm:text-base font-medium"
        style={{ color: "var(--fg-muted)" }}
      >
        <span className="sr-only">{valueAr} </span>
        {labelAr}
      </p>
    </li>
  );
}

function CountdownCard({ course }: StatsCountdownProps) {
  if (course.cohort.isTba) {
    return <TbaCountdownCard />;
  }

  return <ScheduledCountdownCard course={course} />;
}

function ScheduledCountdownCard({ course }: StatsCountdownProps) {
  const target = new Date(course.cohort.startIso).getTime();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setNow(Date.now());
    const raf = window.requestAnimationFrame(update);
    const id = window.setInterval(update, 1000);
    return () => {
      window.cancelAnimationFrame(raf);
      window.clearInterval(id);
    };
  }, []);

  const diff = Math.max(0, (now ?? target) - 0 === 0 ? 0 : target - (now ?? target));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  return (
    <div
      className="relative overflow-hidden rounded-md border p-6 sm:p-8"
      style={{
        borderColor: "var(--border)",
        background:
          "linear-gradient(135deg, color-mix(in oklab, var(--bg-elevated) 90%, var(--course-accent) 10%), var(--bg-elevated))",
      }}
    >
      <CardKicker label="COHORT / STATUS" />

      <p
        className="mt-4 font-mono text-lg sm:text-xl font-semibold tracking-[0.08em] uppercase"
        style={{ color: "var(--fg)" }}
        dir="ltr"
      >
        {course.cohort.labelEn}
      </p>
      <p
        className="mt-1 font-mono text-[11px] tracking-[0.18em] uppercase"
        style={{ color: "var(--fg-muted)" }}
        dir="ltr"
      >
        {course.cohort.metaTime} · KUWAIT
      </p>

      <div dir="ltr" className="mt-6 grid grid-cols-4 gap-2 sm:gap-3">
        <CountUnit n={days} label="يوم" />
        <CountUnit n={hours} label="ساعة" />
        <CountUnit n={mins} label="دقيقة" />
        <CountUnit n={secs} label="ثانية" />
      </div>

      <p
        className="mt-6 text-sm sm:text-base"
        style={{ color: "var(--fg-muted)" }}
      >
        {course.cohort.venueAr}
      </p>
    </div>
  );
}

function TbaCountdownCard() {
  return (
    <div
      className="relative overflow-hidden rounded-md border p-6 sm:p-8"
      style={{
        borderColor: "var(--border)",
        background:
          "linear-gradient(135deg, color-mix(in oklab, var(--bg-elevated) 90%, var(--course-accent) 10%), var(--bg-elevated))",
      }}
    >
      <CardKicker label="COHORT / STATUS" />
      <p
        className="mt-4 font-mono text-lg sm:text-xl font-semibold tracking-[0.08em] uppercase"
        style={{ color: "var(--fg)" }}
        dir="ltr"
      >
        DATE TO BE ANNOUNCED
      </p>
      <p
        className="mt-2 max-w-xl text-sm sm:text-base leading-relaxed"
        style={{ color: "var(--fg-muted)" }}
      >
        الدفعة القادمة قيد التجهيز. سجّل اهتمامك الآن، ونرسل لك الموعد والتفاصيل فور اعتمادها.
      </p>
      <div
        className="mt-6 h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--course-accent), transparent)",
        }}
        aria-hidden
      />
    </div>
  );
}

function CardKicker({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3" dir="ltr">
      <div
        className="inline-flex shrink-0 items-center gap-2 rounded-sm border px-2.5 py-1.5"
        style={{
          borderColor: "color-mix(in oklab, var(--course-accent) 34%, var(--border))",
          background: "color-mix(in oklab, var(--course-accent) 9%, transparent)",
          color: "var(--fg)",
        }}
      >
        <span
          aria-hidden
          className="h-1.5 w-1.5 rounded-full"
          style={{
            background: "var(--course-accent)",
            boxShadow:
              "0 0 12px color-mix(in oklab, var(--course-accent) 70%, transparent)",
          }}
        />
        <span className="font-mono text-[10px] font-medium tracking-[0.18em] uppercase">
          {label}
        </span>
      </div>
      <span
        aria-hidden
        className="h-px flex-1"
        style={{
          background:
            "linear-gradient(90deg, color-mix(in oklab, var(--course-accent) 46%, transparent), transparent)",
        }}
      />
    </div>
  );
}

function CountUnit({ n, label }: { n: number; label: string }) {
  const str = String(n).padStart(2, "0");
  return (
    <div
      className="rounded-sm border text-center py-3"
      style={{
        borderColor: "var(--border)",
        background: "var(--bg)",
      }}
    >
      <div
        className="font-arabic-display text-2xl sm:text-3xl font-bold tabular-nums"
        style={{ color: "var(--fg)" }}
      >
        {str}
      </div>
      <div
        className="mt-1.5 text-[11px] sm:text-xs font-medium"
        style={{ color: "var(--fg-muted)" }}
      >
        {label}
      </div>
    </div>
  );
}
