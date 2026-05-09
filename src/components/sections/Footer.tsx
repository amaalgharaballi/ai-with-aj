import { GLOBAL } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative z-10"
    >
      {/* Instagram strip — styled as a site-native signal, not platform branding. */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 sm:py-20">
        <a
          href={GLOBAL.links.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block overflow-hidden rounded-md border transition-colors"
          style={{
            borderColor: "var(--border)",
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--course-accent) 9%, var(--bg-elevated)) 0%, var(--bg) 54%, var(--bg-elevated) 100%)",
            boxShadow:
              "0 20px 70px color-mix(in oklab, var(--course-accent) 12%, transparent), 0 18px 50px color-mix(in oklab, var(--bg) 82%, transparent)",
          }}
          aria-label={`Follow ${GLOBAL.brand.handle} on Instagram`}
        >
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px"
            style={{ background: "var(--course-accent)" }}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.12]"
            style={{
              background:
                "repeating-linear-gradient(90deg, transparent 0 18px, var(--course-accent) 18px 19px, transparent 19px 36px)",
            }}
          />

          <div className="relative z-10 flex flex-col gap-8 p-6 sm:p-8 lg:p-10">
            <div className="flex items-center justify-between gap-4">
              <span
                className="font-mono text-[10px] sm:text-[11px] tracking-[0.28em] uppercase"
                style={{ color: "var(--fg-muted)" }}
                dir="ltr"
              >
                SOCIAL / LIVE FEED
              </span>
              <span
                aria-hidden
                className="h-2 w-2 rounded-full transition-transform group-hover:scale-150"
                style={{ background: "var(--course-accent)" }}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div className="min-w-0">
                <p
                  className="font-arabic-display text-2xl sm:text-4xl font-bold leading-tight"
                  style={{ color: "var(--fg)" }}
                >
                  شوف التحديثات والأعمال الجديدة
                </p>
                <p
                  className="mt-3 max-w-xl text-sm sm:text-base leading-relaxed"
                  style={{ color: "var(--fg-muted)" }}
                >
                  الحساب هو المكان الأسرع للبوسترات، اللقطات، ومواعيد الورش.
                </p>
              </div>

              <div
                className="inline-flex max-w-full items-center gap-3 self-start sm:self-end rounded-sm border px-4 py-3 transition-colors group-hover:border-current"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--course-accent)",
                  background: "var(--bg)",
                }}
                dir="ltr"
              >
                <InstagramIcon />
                <span className="min-w-0 truncate font-mono text-base sm:text-xl font-medium tracking-wide">
                  @{GLOBAL.brand.handle}
                </span>
                <ArrowIcon />
              </div>
            </div>

            <span
              aria-hidden
              className="h-px w-full transition-opacity group-hover:opacity-40"
              style={{ background: "var(--fg-muted)", opacity: 0.18 }}
            />
          </div>
        </a>
      </div>

      {/* Bottom meta bar */}
      <div
        className="border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <p
            className="text-sm font-medium"
            style={{ color: "var(--fg)" }}
          >
            {GLOBAL.brand.nameAr}
            <span className="mx-2" style={{ color: "var(--fg-muted)" }}>·</span>
            <span style={{ color: "var(--fg-muted)" }}>
              {GLOBAL.brand.taglineAr}
            </span>
          </p>

          <span
            className="font-mono text-[10px] tracking-[0.22em] uppercase"
            style={{ color: "var(--fg-muted)" }}
            dir="ltr"
          >
            © {year}
          </span>
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
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
      className="shrink-0 transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
