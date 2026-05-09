"use client";

import { useEffect, useRef } from "react";
import type { ResolvedCourse } from "@/lib/site";
import Reveal from "@/components/motion/Reveal";

interface MontageProps {
  course: ResolvedCourse;
}

export default function Montage({ course }: MontageProps) {
  const c = course.copy.montage;
  const videoSrc = course.media.promoVideoFile || "/reel/course-montage.mp4";
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Title: prefer the dedicated CMS field if set, else fall back to copy.
  const titleAr = course.media.videoTitleAr?.trim()
    ? course.media.videoTitleAr
    : `${c.headlineLine1Ar}${c.headlineAccentAr}`;

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

  // Pause when off-screen — saves mobile battery.
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
      className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 py-12 sm:py-16"
    >
      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        {/* Text column */}
        <Reveal>
          <h2
            className="font-arabic-display text-4xl sm:text-5xl font-bold leading-[1.15]"
            style={{ color: "var(--fg)" }}
          >
            {titleAr}
          </h2>
        </Reveal>

        {/* Video column */}
        <Reveal
          delay={140}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[300px]">
            <div
              className="relative aspect-[9/16] overflow-hidden border rounded-md"
              style={{
                borderColor: "var(--border)",
                background: "var(--bg-elevated)",
              }}
            >
              <video
                ref={videoRef}
                src={videoSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover object-center"
                aria-hidden
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
