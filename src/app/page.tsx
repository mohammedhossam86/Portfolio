import Navbar from "@/components/layout/Navbar";
import FloatingSocialDock from "@/components/layout/FloatingSocialDock";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/hero/HeroSection";

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

        {/* ── Placeholders for upcoming sections (enables smooth scrolling & active link detection) ── */}
        <section
          id="journey"
          className="min-h-[50vh] flex flex-col items-center justify-center border-t border-[var(--color-border)]/50 px-6 py-20 text-center"
        >
          <span className="text-xs uppercase tracking-widest text-[var(--color-primary-light)] font-mono mb-2">
            Coming Up in Phase 3
          </span>
          <h2 className="text-3xl font-bold mb-4">The Interactive Journey (&quot;الرحلة&quot;)</h2>
          <p className="text-[var(--color-text-secondary)] max-w-lg">
            Scroll-driven 2D car timeline moving through college milestones, ECPC contests, and graduation.
          </p>
        </section>

        <section
          id="projects"
          className="min-h-[50vh] flex flex-col items-center justify-center border-t border-[var(--color-border)]/50 px-6 py-20 text-center"
        >
          <span className="text-xs uppercase tracking-widest text-[var(--color-accent)] font-mono mb-2">
            Coming Up in Phase 4
          </span>
          <h2 className="text-3xl font-bold mb-4">Featured Projects &amp; Blog</h2>
          <p className="text-[var(--color-text-secondary)] max-w-lg">
            Bento-grid showcase for MindMate AI, Wahaj Store, Tom &amp; Jerry, and backend engineering projects.
          </p>
        </section>

        <section
          id="opensource"
          className="min-h-[50vh] flex flex-col items-center justify-center border-t border-[var(--color-border)]/50 px-6 py-20 text-center"
        >
          <span className="text-xs uppercase tracking-widest text-[var(--color-primary-light)] font-mono mb-2">
            Coming Up in Phase 4
          </span>
          <h2 className="text-3xl font-bold mb-4">Open Source &amp; GitLab Contributions</h2>
          <p className="text-[var(--color-text-secondary)] max-w-lg">
            Real-time cached Merge Requests pulled directly from the GitLab REST API.
          </p>
        </section>

        <section
          id="arcade"
          className="min-h-[50vh] flex flex-col items-center justify-center border-t border-[var(--color-border)]/50 px-6 py-20 text-center"
        >
          <span className="text-xs uppercase tracking-widest text-[var(--color-accent)] font-mono mb-2">
            Coming Up in Phase 5
          </span>
          <h2 className="text-3xl font-bold mb-4">Interactive Arcade &amp; Browser Terminal</h2>
          <p className="text-[var(--color-text-secondary)] max-w-lg">
            Playable xterm.js terminal game and interactive web games directly in the browser.
          </p>
        </section>

        <section
          id="teaching"
          className="min-h-[50vh] flex flex-col items-center justify-center border-t border-[var(--color-border)]/50 px-6 py-20 text-center"
        >
          <span className="text-xs uppercase tracking-widest text-[var(--color-primary-light)] font-mono mb-2">
            Coming Up in Phase 4
          </span>
          <h2 className="text-3xl font-bold mb-4">Teaching &amp; Mentoring Playlist</h2>
          <p className="text-[var(--color-text-secondary)] max-w-lg">
            Custom interactive player for 4 programming sessions (Loops, Arrays, Strings, Prefix Sum).
          </p>
        </section>

        <section
          id="gallery"
          className="min-h-[50vh] flex flex-col items-center justify-center border-t border-[var(--color-border)]/50 px-6 py-20 text-center"
        >
          <span className="text-xs uppercase tracking-widest text-[var(--color-primary-light)] font-mono mb-2">
            Coming Up in Phase 3
          </span>
          <h2 className="text-3xl font-bold mb-4">Achievements Gallery</h2>
          <p className="text-[var(--color-text-secondary)] max-w-lg">
            Smooth 60fps infinite marquee of ECPC contests, hackathons, and graduation moments.
          </p>
        </section>
      </main>

      {/* ── Footer ── */}
      <Footer />
    </>
  );
}
