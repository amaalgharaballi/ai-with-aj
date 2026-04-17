"use client";

import { SITE } from "@/lib/site";
import { buildQuickUrl } from "@/lib/whatsapp";

export default function Footer() {
  const year = new Date().getFullYear();
  const c = SITE.copy.footer;

  return (
    <footer
      className="relative z-10 border-t"
      style={{
        borderColor: "var(--border)",
        background: "var(--bg-elevated)",
      }}
    >
      {/* Final CTA strip */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div>
            <p
              className="font-mono text-[10px] tracking-[0.28em] uppercase"
              style={{ color: "var(--fg-muted)" }}
            >
              {c.finalTagAr}
            </p>
            <p
              className="mt-3 font-arabic text-3xl sm:text-4xl font-bold leading-tight max-w-2xl"
              style={{ color: "var(--fg)" }}
            >
              {c.finalBeforeAr}
              <span style={{ color: "var(--accent)" }}>{c.finalAccentAr}</span>
              {c.finalAfterAr}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#booking"
              className="inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 font-arabic text-base font-semibold transition-colors"
              style={{
                background: "var(--whatsapp)",
                color: "#04140B",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "var(--whatsapp-hover)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "var(--whatsapp)";
              }}
            >
              {c.ctaPrimaryAr}
            </a>
            <a
              href={buildQuickUrl("final", "ar")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border px-6 py-3.5 font-arabic text-base transition-colors"
              style={{
                borderColor: "var(--border)",
                color: "var(--fg)",
              }}
            >
              {c.ctaSecondaryAr}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom meta bar */}
      <div
        className="border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <p
            className="font-arabic text-sm"
            style={{ color: "var(--fg)" }}
          >
            {SITE.instructor.nameAr}
            <span className="mx-2" style={{ color: "var(--fg-muted)" }}>·</span>
            <span style={{ color: "var(--fg-muted)" }}>
              {SITE.instructor.titleEn}
            </span>
          </p>

          <div className="flex items-center gap-5 font-mono text-[10px] tracking-[0.22em] uppercase" style={{ color: "var(--fg-muted)" }}>
            <a
              href={SITE.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--electric)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--fg-muted)")
              }
            >
              @{SITE.instructor.ig}
            </a>
            <span>© {year}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
