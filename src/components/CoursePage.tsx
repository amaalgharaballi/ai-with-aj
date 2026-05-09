import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import ToolMarquee from "@/components/sections/ToolMarquee";
import StatsCountdown from "@/components/sections/StatsCountdown";
import About from "@/components/sections/About";
import Montage from "@/components/sections/Montage";
import Curriculum from "@/components/sections/Curriculum";
import Instructor from "@/components/sections/Instructor";
import Accreditations from "@/components/sections/Accreditations";
import Booking from "@/components/sections/Booking";
import Faq from "@/components/sections/Faq";
import Footer from "@/components/sections/Footer";
import type { ResolvedCourse } from "@/lib/site";
import type { CSSProperties } from "react";

interface CoursePageProps {
  course: ResolvedCourse;
}

// Each section is conditional on course.sections.<name> — toggleable via CMS.
// Nav and Footer always render; everything else can be hidden per course.
export default function CoursePage({ course }: CoursePageProps) {
  const accentVar = { "--course-accent": course.accentColor } as CSSProperties;
  const s = course.sections;
  return (
    <div data-course={course.slug} data-page-course={course.slug} style={accentVar}>
      <Nav course={course} />
      <main className="relative">
        {s.hero && <Hero course={course} />}
        {s.toolMarquee && <ToolMarquee course={course} />}
        {s.stats && <StatsCountdown course={course} />}
        {s.about && <About course={course} />}
        {s.montage && <Montage course={course} />}
        {s.curriculum && <Curriculum course={course} />}
        {s.instructor && <Instructor course={course} />}
        {s.accreditations && <Accreditations />}
        {s.booking && <Booking course={course} />}
        {s.faq && <Faq course={course} />}
      </main>
      <Footer />
    </div>
  );
}
