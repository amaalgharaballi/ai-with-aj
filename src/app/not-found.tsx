import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative z-10 min-h-[100dvh] flex flex-col items-center justify-center px-5 text-center">
      <span
        className="font-mono text-[10px] tracking-[0.28em] uppercase mb-4"
        style={{ color: "var(--fg-muted)" }}
      >
        404 — NOT FOUND
      </span>
      <h1
        className="font-arabic-display text-4xl sm:text-5xl font-bold leading-tight max-w-2xl"
        style={{ color: "var(--fg)" }}
      >
        الصفحة <span style={{ color: "var(--accent)" }}>غير موجودة</span>
      </h1>
      <p
        className="mt-4 max-w-md text-base leading-relaxed"
        style={{ color: "var(--fg-muted)" }}
      >
        الرابط اللي وصلت له ما يقابل أي صفحة. تقدر ترجع للورش من هنا.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 border px-6 py-3 font-arabic text-base transition-colors"
        style={{
          borderColor: "var(--border)",
          color: "var(--fg)",
        }}
      >
        ← الرجوع للصفحة الرئيسية
      </Link>
    </main>
  );
}
