import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { GLOBAL, getAllCourses, type ResolvedCourse } from "@/lib/site";

interface BrandNavMarkProps {
  course?: ResolvedCourse;
  compact?: boolean;
  className?: string;
}

function getRailColors(course?: ResolvedCourse) {
  const courses = getAllCourses();
  const aiVideo = courses.find((item) => item.slug === "ai-video");
  const bootcamp = courses.find((item) => item.slug === "bootcamp");

  if (course) {
    return {
      left: course.accentColor,
      right: course.accentColor,
    };
  }

  return {
    left: aiVideo?.accentColor ?? courses[1]?.accentColor ?? "var(--accent)",
    right: bootcamp?.accentColor ?? courses[0]?.accentColor ?? "var(--accent)",
  };
}

export default function BrandNavMark({ course, compact = false, className }: BrandNavMarkProps) {
  const rails = getRailColors(course);

  return (
    <a
      href={GLOBAL.links.instagram}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group grid max-w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center",
        compact ? "w-[min(56vw,420px)] sm:w-[min(64vw,560px)]" : "w-[min(78vw,640px)]",
        className
      )}
      aria-label={`Open ${GLOBAL.brand.handle} on Instagram`}
    >
      <span
        aria-hidden
        className="nav-brand-rail nav-brand-rail-left"
        style={{ "--rail-color": rails.left } as CSSProperties}
      />
      <span
        className="px-3 font-mono text-sm font-semibold tracking-[0.08em] transition-colors sm:text-base"
        style={{ color: "var(--fg)" }}
        dir="ltr"
      >
        {GLOBAL.brand.handle}
      </span>
      <span
        aria-hidden
        className="nav-brand-rail nav-brand-rail-right"
        style={{ "--rail-color": rails.right } as CSSProperties}
      />
    </a>
  );
}
