import { SITE } from "@/lib/site";

export default function Accreditations() {
  return (
    <section
      aria-label="جهات الاعتماد"
      className="relative z-10 border-y py-10 sm:py-12"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in oklab, var(--bg-elevated) 50%, transparent)",
      }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-6 flex items-center gap-3 font-mono text-[10px] tracking-[0.28em] uppercase" style={{ color: "var(--fg-muted)" }}>
          <span
            className="h-1 w-6"
            style={{ background: "var(--accent)" }}
          />
          <span>معتمدة من</span>
          <span className="opacity-60">/ ACCREDITED BY</span>
        </div>

        <ul className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
          {SITE.accreditations.map((a) => (
            <li
              key={a.nameEn}
              className="flex flex-col items-start gap-1 border-t pt-4"
              style={{ borderColor: "var(--border)" }}
            >
              <span
                className="font-arabic text-sm leading-tight"
                style={{ color: "var(--fg)" }}
              >
                {a.nameAr}
              </span>
              <span
                className="font-mono text-[9px] tracking-[0.22em] uppercase"
                style={{ color: "var(--fg-muted)" }}
              >
                {a.nameEn}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
