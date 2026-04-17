import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import ToolMarquee from "@/components/sections/ToolMarquee";
import StatsCountdown from "@/components/sections/StatsCountdown";
import About from "@/components/sections/About";
import Curriculum from "@/components/sections/Curriculum";
import Instructor from "@/components/sections/Instructor";
import Accreditations from "@/components/sections/Accreditations";
import Pricing from "@/components/sections/Pricing";
import Booking from "@/components/sections/Booking";
import Faq from "@/components/sections/Faq";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative">
        <Hero />
        <ToolMarquee />
        <StatsCountdown />
        <About />
        <Curriculum />
        <Instructor />
        <Accreditations />
        <Pricing />
        <Booking />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
