"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";

export default function StatsCountdown() {
  return (
    <section
      aria-label="إحصاءات والعدّ التنازلي للدورة"
      className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28"
    >
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-stretch">
        {/* Stats — live panel */}
        <StatsPanel />

        {/* Countdown */}
        <CountdownCard />
      </div>
    </section>
  );
}

function StatsPanel() {
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    // Re-animate the count-up every 14s to keep the panel feeling alive.
    const id = window.setInterval(() => setRefreshKey((k) => k + 1), 14000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className="relative flex flex-col rounded-md border p-5 sm:p-7"
      style={{
        borderColor: "var(--border)",
        background: "var(--bg-elevated)",
      }}
    >
      {/* Header row — mirrors the countdown card */}
      <div className="flex items-center justify-between">
        <span
          className="font-mono text-[10px] tracking-[0.22em] uppercase"
          style={{ color: "var(--fg-muted)" }}
        >
          [ TRAINING / STATS ]
        </span>
        <span
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase"
          style={{ color: "var(--fg-muted)" }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full animate-pulse-dot"
            style={{ background: "var(--accent)" }}
          />
          LIVE
        </span>
      </div>

      {/* Stats grid */}
      <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-6 flex-1">
        {SITE.stats.map((s, i) => (
          <Stat
            key={`${i}-${refreshKey}`}
            valueAr={s.valueAr}
            valueEn={s.valueEn}
            labelAr={s.labelAr}
            idx={i}
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
  idx,
}: {
  valueAr: string;
  valueEn: string;
  labelAr: string;
  idx: number;
}) {
  const numeric = parseInt(valueEn.replace(/\D/g, ""), 10) || 0;
  const [n, setN] = useState(0);
  const ref = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setN(numeric);
      return;
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
        style={{ background: "var(--accent)" }}
      />
      <div className="flex items-baseline gap-1">
        <span
          className="font-display text-5xl sm:text-7xl font-semibold leading-none tabular-nums"
          style={{ color: "var(--fg)" }}
        >
          {n}
        </span>
        {hasPlus && (
          <span
            className="font-display text-3xl sm:text-5xl font-semibold"
            style={{ color: "var(--accent)" }}
          >
            +
          </span>
        )}
      </div>
      <p
        className="mt-3 font-mono text-[10px] sm:text-xs tracking-[0.22em] uppercase"
        style={{ color: "var(--fg-muted)" }}
      >
        <span className="sr-only">{valueAr} </span>
        {labelAr}
      </p>
      <span
        className="absolute -top-4 left-0 font-mono text-[10px] tracking-[0.2em]"
        style={{ color: "var(--fg-muted)" }}
      >
        [0{idx + 1}]
      </span>
    </li>
  );
}

function CountdownCard() {
  const target = new Date(SITE.cohort.startIso).getTime();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const diff = Math.max(0, (now ?? target) - 0 === 0 ? 0 : target - (now ?? target));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  return (
    <div
      className="relative rounded-md border p-6 sm:p-8"
      style={{
        borderColor: "var(--border)",
        background: "var(--bg-elevated)",
      }}
    >
      <div className="flex items-center justify-between">
        <span
          className="font-mono text-[10px] tracking-[0.22em] uppercase"
          style={{ color: "var(--fg-muted)" }}
        >
          [ NEXT COHORT ]
        </span>
        <span
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase"
          style={{ color: "var(--fg-muted)" }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full animate-pulse-dot"
            style={{ background: "var(--accent)" }}
          />
          LIVE
        </span>
      </div>

      <p
        className="mt-4 font-arabic text-xl sm:text-2xl"
        style={{ color: "var(--fg)" }}
      >
        {SITE.cohort.labelAr}
      </p>
      <p
        className="mt-1 font-mono text-[11px] tracking-[0.18em]"
        style={{ color: "var(--fg-muted)" }}
      >
        [{SITE.cohort.labelEn.toUpperCase()}]
      </p>

      <div dir="ltr" className="mt-6 grid grid-cols-4 gap-2 sm:gap-3">
        <CountUnit n={days} label="يوم" />
        <CountUnit n={hours} label="ساعة" />
        <CountUnit n={mins} label="دقيقة" />
        <CountUnit n={secs} label="ثانية" />
      </div>

      <p
        className="mt-6 text-sm"
        style={{ color: "var(--fg-muted)" }}
      >
        {SITE.cohort.venueAr}
      </p>
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
        className="font-mono text-2xl sm:text-3xl tabular-nums"
        style={{ color: "var(--fg)" }}
      >
        {str}
      </div>
      <div
        className="mt-1 font-mono text-[9px] tracking-[0.2em] uppercase"
        style={{ color: "var(--fg-muted)" }}
      >
        {label}
      </div>
    </div>
  );
}
