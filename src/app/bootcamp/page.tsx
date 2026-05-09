import type { Metadata } from "next";
import CoursePage from "@/components/CoursePage";
import { getCourse } from "@/lib/site";

const course = getCourse("bootcamp");

export const metadata: Metadata = {
  title: `${course.titleEn} — AI with AJ`,
  description: course.descriptionAr,
};

export default function BootcampPage() {
  return <CoursePage course={course} />;
}
