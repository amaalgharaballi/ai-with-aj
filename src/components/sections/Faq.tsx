"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const c = SITE.copy.faqSection;

  return (
    <section
      id="faq"
      aria-label={c.labelAr}
      className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8 py-24 sm:py-32 border-t"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="mb-12">
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
          <span style={{ color: "var(--accent)" }}>{c.headlineAccentAr}</span>{" "}
          {c.headlineSuffixAr}
        </h2>
      </div>

      <ul className="divide-y border-y" style={{ borderColor: "var(--border)" }}>
        {SITE.faq.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={item.qAr} style={{ borderColor: "var(--border)" }}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-5 text-right transition-colors"
                style={{
                  color: isOpen ? "var(--fg)" : "var(--fg)",
                }}
              >
                <span className="flex items-center gap-4">
                  <span
                    className="font-mono text-[10px] tracking-[0.22em]"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    0{i + 1}
                  </span>
                  <span className="font-arabic text-lg">{item.qAr}</span>
                </span>
                <span
                  className="shrink-0 font-mono text-lg select-none transition-transform"
                  style={{
                    color: isOpen ? "var(--accent)" : "var(--fg-muted)",
                    transform: isOpen ? "rotate(45deg)" : "rotate(0)",
                  }}
                  aria-hidden
                >
                  +
                </span>
              </button>
              <div
                className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out"
                style={{
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                }}
              >
                <div className="min-h-0">
                  <p
                    className="pb-6 pr-10 text-base leading-[1.9]"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    {item.aAr}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
