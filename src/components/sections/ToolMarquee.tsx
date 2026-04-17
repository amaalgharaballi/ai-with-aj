import { SITE } from "@/lib/site";

/**
 * Since we don't have real tool SVGs yet, render monospace wordmarks
 * with a subtle divider. Swap to <img src={tool.logo} /> when assets land.
 */
export default function ToolMarquee() {
  const tools = SITE.tools;
  const loop = [...tools, ...tools]; // seamless loop

  return (
    <section
      aria-label="الأدوات المشمولة في الورشة"
      className="relative z-10 overflow-hidden border-y"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in oklab, var(--bg-elevated) 60%, transparent)",
      }}
    >
      <div className="relative">
        <div className="flex w-max animate-marquee">
          {loop.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="flex items-center gap-3 px-8 py-5 font-mono text-sm tracking-wider uppercase whitespace-nowrap"
              style={{ color: "var(--fg-muted)" }}
            >
              <span
                aria-hidden
                className="inline-block h-1 w-1 rounded-full"
                style={{ background: "var(--fg-muted)", opacity: 0.5 }}
              />
              <span>{t.name}</span>
            </div>
          ))}
        </div>

        {/* edge fades */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-24"
          style={{
            background:
              "linear-gradient(90deg, var(--bg) 0%, transparent 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-24"
          style={{
            background:
              "linear-gradient(270deg, var(--bg) 0%, transparent 100%)",
          }}
        />
      </div>
    </section>
  );
}
