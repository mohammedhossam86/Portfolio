// =============================================================================
// Home Page — Single Page Application
// =============================================================================
// Each section is a separate component that reads from /data/*.ts.
// Heavy components (Terminal, Games, Video Players) will be loaded lazily
// using Next.js dynamic() in their respective section wrappers.
// =============================================================================

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* ── Phase 2: Navigation & Floating Social Dock ── */}
      {/* <Navbar /> */}
      {/* <FloatingSocialDock /> */}

      {/* ── Phase 2: Hero Section ── */}
      <section id="hero" className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-gradient">Portfolio</h1>
          <p className="text-xl text-[var(--color-text-secondary)]">
            Phase 1 Complete — System Design & Data Layer Ready ✅
          </p>
          <p className="text-sm text-[var(--color-text-muted)] font-mono">
            Next: Phase 2 → Hero Section, Navigation & Social Dock
          </p>
        </div>
      </section>

      {/* ── Phase 3: Journey Timeline (Car Animation) ── */}
      {/* <section id="journey"><JourneyTimeline /></section> */}

      {/* ── Phase 4: Projects Bento Grid ── */}
      {/* <section id="projects"><ProjectsGrid /></section> */}

      {/* ── Phase 4: Open Source MRs ── */}
      {/* <section id="opensource"><OpenSourceWidget /></section> */}

      {/* ── Phase 5: Arcade & Terminal ── */}
      {/* <section id="arcade"><ArcadeHub /></section> */}

      {/* ── Phase 4: Teaching Playlist ── */}
      {/* <section id="teaching"><TeachingPlaylist /></section> */}

      {/* ── Phase 3: Achievements Gallery ── */}
      {/* <section id="gallery"><AchievementsGallery /></section> */}
    </main>
  );
}
