import { getCourse } from "@/lib/site";
import CoursePage from "@/components/CoursePage";

export default function ClaudeCodePage() {
  const course = getCourse("claude-code");
  return <CoursePage course={course} />;
}
