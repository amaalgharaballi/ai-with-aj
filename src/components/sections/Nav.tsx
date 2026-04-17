"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/cn";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

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
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="group flex items-center gap-3"
          aria-label={SITE.instructor.nameAr}
        >
          <span
            className="h-2 w-2 rounded-full animate-pulse-dot"
            style={{ background: "var(--accent)" }}
          />
          <span
            className="font-arabic text-[13px] sm:text-sm font-semibold whitespace-nowrap"
            style={{ color: "var(--fg)" }}
          >
            {SITE.instructor.nameAr}
          </span>
          <span
            aria-hidden
            className="hidden sm:inline-block h-3 w-px"
            style={{ background: "var(--border)" }}
          />
          <span
            className="hidden sm:inline font-mono text-[10px] tracking-[0.22em] uppercase"
            style={{ color: "var(--fg-muted)" }}
          >
            ai.with.aj
          </span>
        </a>
      </nav>
    </header>
  );
}
