import type { ResolvedCourse } from "@/lib/site";
import Reveal from "@/components/motion/Reveal";

interface AboutProps {
  course: ResolvedCourse;
}

export default function About({ course }: AboutProps) {
  const c = course.copy.about;

  return (
    <section
      id="about"
      aria-label={c.labelAr}
      className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 py-12 sm:py-16"
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
        <Reveal>
          <h2
            className="font-arabic-display text-4xl sm:text-5xl font-bold leading-tight"
            style={{ color: "var(--fg)" }}
          >
            {c.headlineLine1Ar}
            <br />
            <span style={{ color: "var(--course-accent)" }}>{c.headlineLine2Ar}</span>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="space-y-5">
            <p
              className="text-lg leading-[1.9]"
              style={{ color: "var(--fg)" }}
            >
              {c.paragraph1Ar}
            </p>
            <p
              className="text-base leading-[1.9]"
              style={{ color: "var(--fg-muted)" }}
            >
              {c.paragraph2BeforeAr}
              <span style={{ color: "var(--fg)" }}>{c.paragraph2HighlightAr}</span>
              {c.paragraph2AfterAr}
            </p>

            {/* Three quick value badges */}
            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {c.badges.map((b) => (
                <li
                  key={b.k}
                  className="border px-4 py-3"
                  style={{ borderColor: "var(--border)" }}
                >
                  <span
                    className="font-arabic text-sm"
                    style={{ color: "var(--fg)" }}
                  >
                    {b.v}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
