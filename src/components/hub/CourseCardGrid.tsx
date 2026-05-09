import { getAllCourses } from "@/lib/site";
import CourseCard from "@/components/hub/CourseCard";

export default function CourseCardGrid() {
  const courses = getAllCourses();

  return (
    <section
      id="courses"
      aria-label="الورش"
      className="relative z-10 mx-auto w-full max-w-7xl overflow-hidden px-5 pb-24 pt-20 sm:px-8 sm:pb-32 sm:pt-24"
    >
      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-6 xl:gap-8">
        {courses.map((course) => (
          <CourseCard
            key={course.slug}
            course={course}
          />
        ))}
      </div>
    </section>
  );
}
