import Navbar from "@/components/layout/Navbar";
import FloatingSocialDock from "@/components/layout/FloatingSocialDock";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/hero/HeroSection";
import AboutSection from "@/components/about/AboutSection";
import SkillsGrid from "@/components/skills/SkillsGrid";
import JourneyTimeline from "@/components/journey/JourneyTimeline";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import OpenSourceWidget from "@/components/opensource/OpenSourceWidget";
import ArcadeHub from "@/components/arcade/ArcadeHub";
import TeachingPlaylist from "@/components/teaching/TeachingPlaylist";
import ContactSection from "@/components/contact/ContactSection";
import CelestialAtmosphere from "@/components/ui/CelestialAtmosphere";

// =============================================================================
// Home Page — Single Page Application (Mohammed Hossam Portfolio)
// =============================================================================

export default function Home() {
  return (
    <>
      {/* ── Global Celestial Atmosphere (Moon/Stars vs Sun/Clouds across entire page) ── */}
      <CelestialAtmosphere />

      {/* ── Navigation & Floating Social Dock ── */}
      <Navbar />
      <FloatingSocialDock />

      <main className="relative min-h-screen overflow-x-hidden">
        {/* ── Hero Section ── */}
        <HeroSection />

        {/* ── About Me Section (Bio, Education & AI Trainer Focus) ── */}
        <AboutSection />

        {/* ── Skills Bento Grid (Languages, Backend, Cloud, DB, AI) ── */}
        <SkillsGrid />

        {/* ── Experience & The Interactive Car Journey ── */}
        <JourneyTimeline />

        {/* ── Featured Projects & Technical Blog ── */}
        <ProjectsGrid />

        {/* ── Open Source & GitLab Contributions ── */}
        <OpenSourceWidget />

        {/* ── Interactive Arcade (Tom & Jerry A* Search) ── */}
        <ArcadeHub />

        {/* ── Teaching & Mentoring Playlist ── */}
        <TeachingPlaylist />

        {/* ── Contact & Collaboration Section ── */}
        <ContactSection />
      </main>

      {/* ── Footer ── */}
      <Footer />
    </>
  );
}
