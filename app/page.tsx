import HeroSection from "@/components/sections/HeroSection";
import AboutPreview from "@/components/sections/AboutPreview";
import ProjectsPreview from "@/components/sections/ProjectsPreview";
import SkillsMarquee from "@/components/sections/SkillsMarquee";
import CTASection from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutPreview />
      <ProjectsPreview />
      <SkillsMarquee />
      <CTASection />
    </>
  );
}
