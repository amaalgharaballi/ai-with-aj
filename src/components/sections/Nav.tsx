"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import BrandNavMark from "@/components/BrandNavMark";
import { getAllCourses, type ResolvedCourse } from "@/lib/site";
import { cn } from "@/lib/cn";

interface NavProps {
  course?: ResolvedCourse;
}

export default function Nav({ course }: NavProps = {}) {
  const [scrolled, setScrolled] = useState(false);

  // Show the back link only when there's a hub to go back to (≥2 courses).
  const showBack = Boolean(course) && getAllCourses().length > 1;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-md border-b"
          : "backdrop-blur-0 border-b border-transparent"
      )}
      style={{
        background: scrolled ? "color-mix(in oklab, var(--bg) 72%, transparent)" : "transparent",
        borderColor: scrolled ? "var(--border)" : "transparent",
      }}
    >
      <nav className="relative mx-auto flex h-14 max-w-7xl items-center justify-center px-5 sm:px-8">
        {showBack && (
          <Link
            href="/"
            className="absolute left-5 inline-flex items-center gap-2 text-sm font-medium transition-colors sm:left-8"
            style={{ color: "var(--fg-muted)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--course-accent)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--fg-muted)")
            }
          >
            <span>الورش</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className="rtl:rotate-180"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </Link>
        )}

        <BrandNavMark course={course} compact={showBack} />
      </nav>
    </header>
  );
}
