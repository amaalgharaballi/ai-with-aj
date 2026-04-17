"use client";

import { useEffect, useRef } from "react";
import { SITE } from "@/lib/site";
import Reveal from "@/components/motion/Reveal";

export default function Montage() {
  const c = SITE.copy.montage;
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Respect reduced-motion: pause the loop and freeze on first frame.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (mq.matches) {
        v.pause();
        v.currentTime = 0;
      } else {
        v.play().catch(() => {});
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Pause when off-screen — saves mobile battery, lets the page idle.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        });
      },
      { threshold: 0.25 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="montage"
      aria-label={c.labelAr}
      className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28"
    >
      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        {/* Text column */}
        <Reveal>
          <span
            className="font-mono text-[10px] tracking-[0.28em] uppercase"
            dir="ltr"
            style={{ color: "var(--fg-muted)" }}
          >
            {c.tag}
          </span>
          <h2
            className="mt-4 font-arabic-display text-4xl sm:text-5xl font-bold leading-[1.15]"
            style={{ color: "var(--fg)" }}
          >
            {c.headlineLine1Ar}
            <span style={{ color: "var(--accent)" }}>{c.headlineAccentAr}</span>
          </h2>
        </Reveal>

        {/* Video column */}
        <Reveal
          delay={140}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[300px]">
            {/* Frame meta line */}
            <div
              className="flex items-center justify-between px-1 pb-2 font-mono text-[9px] tracking-[0.22em] uppercase"
              style={{ color: "var(--fg-muted)" }}
              dir="ltr"
            >
              <span>{c.frameLabel}</span>
              <span className="flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full animate-pulse-dot"
                  style={{ background: "var(--accent)" }}
                />
                {c.liveBadge}
              </span>
            </div>

            {/* Video frame */}
            <div
              className="relative aspect-[9/16] overflow-hidden border"
              style={{
                borderColor: "var(--border)",
                background: "var(--bg-elevated)",
              }}
            >
              <video
                ref={videoRef}
                src="/reel/course-montage.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover object-center"
                aria-hidden
              />

              {/* Scanlines — matches HeroTerminal's output frame */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, rgba(255,255,255,0.028) 0px, rgba(255,255,255,0.028) 1px, transparent 1px, transparent 3px)",
                }}
              />

              {/* Corner crop-marks */}
              <CornerMarks />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CornerMarks() {
  const base = "absolute size-3 pointer-events-none";
  const color = "var(--fg-muted)";
  return (
    <>
      <span
        aria-hidden
        className={`${base} top-1.5 left-1.5 border-t border-l`}
        style={{ borderColor: color }}
      />
      <span
        aria-hidden
        className={`${base} top-1.5 right-1.5 border-t border-r`}
        style={{ borderColor: color }}
      />
      <span
        aria-hidden
        className={`${base} bottom-1.5 left-1.5 border-b border-l`}
        style={{ borderColor: color }}
      />
      <span
        aria-hidden
        className={`${base} bottom-1.5 right-1.5 border-b border-r`}
        style={{ borderColor: color }}
      />
    </>
  );
}
