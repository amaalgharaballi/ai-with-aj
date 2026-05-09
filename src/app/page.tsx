import Footer from "@/components/sections/Footer";
import Accreditations from "@/components/sections/Accreditations";
import Faq from "@/components/sections/Faq";
import HubNav from "@/components/hub/HubNav";
import CourseCardGrid from "@/components/hub/CourseCardGrid";
import CoursePage from "@/components/CoursePage";
import { getAllCourses } from "@/lib/site";

// If exactly one course is active, the root /  acts as that course's deep
// dive — so the site stays viable for a single-course deployment without
// needing the hub. Two or more courses → render the hub.
export default function Home() {
  const courses = getAllCourses();

  if (courses.length === 1) {
    return <CoursePage course={courses[0]} />;
  }

  return (
    <>
      <HubNav />
      <main className="relative">
        <CourseCardGrid />
        <Accreditations />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
