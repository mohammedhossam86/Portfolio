import Navbar from "@/components/layout/Navbar";
import FloatingSocialDock from "@/components/layout/FloatingSocialDock";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/hero/HeroSection";
import JourneyTimeline from "@/components/journey/JourneyTimeline";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import OpenSourceWidget from "@/components/opensource/OpenSourceWidget";
import TeachingPlaylist from "@/components/teaching/TeachingPlaylist";

// =============================================================================
// Home Page — Single Page Application
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

        {/* ── Phase 5: Interactive Arcade & Browser Terminal (Upcoming) ── */}
        <section
          id="arcade"
          className="min-h-[50vh] flex flex-col items-center justify-center border-t border-[var(--color-border)]/50 px-6 py-20 text-center"
        >
          <span className="text-xs uppercase tracking-widest text-[var(--color-accent)] font-mono mb-2">
            Coming Up in Phase 5
          </span>
          <h2 className="text-3xl font-bold mb-4">Interactive Arcade &amp; Browser Terminal</h2>
          <p className="text-[var(--color-text-secondary)] max-w-lg">
            Playable xterm.js terminal game (Tom &amp; Jerry Python AI) and interactive web games directly in the browser.
          </p>
        </section>

        {/* ── Phase 4: Teaching & Mentoring Playlist ── */}
        <TeachingPlaylist />
      </main>

      {/* ── Footer ── */}
      <Footer />
    </>
  );
}
