import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CoursePage from "@/components/CoursePage";
import { getCourse } from "@/lib/site";

const course = getCourse("bootcamp");

export const metadata: Metadata = {
  title: `${course.titleEn} — AI with AJ`,
  description: course.descriptionAr,
};

export default function BootcampPage() {
  // Inactive courses 404 — CMS uses `active: false` as the "remove" path.
  if (!course.active) notFound();
  return <CoursePage course={course} />;
}
