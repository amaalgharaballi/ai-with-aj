import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("scaffold");

  return (
    <main className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-10 px-6 text-center">
      {/* Mono label */}
      <span
        className="font-mono text-xs tracking-[0.2em] uppercase"
        style={{ color: "var(--fg-muted)" }}
      >
        {t("phase")}
      </span>

      {/* Single headline — fg body + one accent word */}
      <h1 className="font-arabic text-5xl font-bold leading-tight sm:text-7xl lg:text-8xl">
        <span style={{ color: "var(--fg)" }}>{t("headline")} </span>
        <span style={{ color: "var(--accent)" }}>{t("headlineAccent")}</span>
      </h1>

      {/* Cormorant numeral — accent is intentional here */}
      <span
        className="font-display text-9xl font-semibold leading-none select-none"
        style={{ color: "var(--accent)" }}
      >
        01
      </span>

      {/* Subtitle */}
      <p
        className="font-mono text-sm tracking-wider"
        style={{ color: "var(--fg-muted)" }}
      >
        {t("sub")}
      </p>

      {/* Token swatches — fg, accent, electric, whatsapp */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
        {[
          { token: "--fg", label: "fg" },
          { token: "--accent", label: "accent" },
          { token: "--electric", label: "electric" },
          { token: "--whatsapp", label: "whatsapp" },
        ].map(({ token, label }) => (
          <div key={token} className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: `var(${token})` }}
            />
            <span
              className="font-mono text-xs"
              style={{ color: "var(--fg-muted)" }}
            >
              {token}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
