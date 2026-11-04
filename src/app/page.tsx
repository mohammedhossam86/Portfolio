import Navbar from "@/components/layout/Navbar";
import FloatingSocialDock from "@/components/layout/FloatingSocialDock";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/hero/HeroSection";
import JourneyTimeline from "@/components/journey/JourneyTimeline";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import OpenSourceWidget from "@/components/opensource/OpenSourceWidget";
import ArcadeHub from "@/components/arcade/ArcadeHub";
import TeachingPlaylist from "@/components/teaching/TeachingPlaylist";

// =============================================================================
// Home Page — Single Page Application (All 5 Phases Complete)
// =============================================================================

export default function Home() {
  return (
    <>
      {/* ── Navigation & Floating Social Dock ── */}
      <Navbar />
      <FloatingSocialDock />

      <main className="relative min-h-screen overflow-x-hidden">
        {/* ── Phase 2: Hero Section ── */}
        <HeroSection />

        {/* ── Phase 3: The Interactive Journey (2D Car Timeline) ── */}
        <JourneyTimeline />

        {/* ── Phase 4: Featured Projects & Technical Blog ── */}
        <ProjectsGrid />

        {/* ── Phase 4: Open Source & GitLab Contributions ── */}
        <OpenSourceWidget />

        {/* ── Phase 5: Interactive Arcade & xterm.js Browser Terminal ── */}
        <ArcadeHub />

        {/* ── Phase 4: Teaching & Mentoring Playlist ── */}
        <TeachingPlaylist />
      </main>

      {/* ── Footer ── */}
      <Footer />
    </>
  );
}
