"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Gamepad2, Terminal, LayoutGrid, Sparkles, Cpu, Code2, Bot } from "lucide-react";

// =============================================================================
// Dynamic Imports for Performance & Code Splitting (Principle #2)
// =============================================================================
// Terminal emulator and xterm.js bundle are loaded lazily so initial page load
// stays ultra-fast with zero SSR blocking.
// =============================================================================

const TerminalEmulator = dynamic(() => import("./TerminalEmulator"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[450px] rounded-3xl border border-[var(--color-border)] bg-[#080a10] flex flex-col items-center justify-center gap-3">
      <div className="w-8 h-8 rounded-full border-2 border-[var(--color-primary)] border-t-transparent animate-spin" />
      <span className="font-mono text-xs text-slate-400">
        Booting xterm.js terminal environment...
      </span>
    </div>
  ),
});

const VisualGameCanvas = dynamic(() => import("./VisualGameCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[450px] rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] flex flex-col items-center justify-center gap-3">
      <div className="w-8 h-8 rounded-full border-2 border-[var(--color-accent)] border-t-transparent animate-spin" />
      <span className="font-mono text-xs text-slate-400">
        Initializing 2D grid canvas...
      </span>
    </div>
  ),
});

export default function ArcadeHub() {
  const [activeMode, setActiveMode] = useState<"terminal" | "visual">("terminal");

  return (
    <section id="arcade" className="relative py-24 sm:py-32 overflow-hidden border-t border-[var(--color-border)]/50">
      {/* ── Background Glow ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at center, #22d3ee, #6366f1, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 text-[var(--color-accent-light)] text-xs font-mono uppercase tracking-wider mb-2">
              <Gamepad2 size={14} />
              Interactive Browser Arcade
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)]">
              Tom &amp; Jerry <span className="text-gradient">A* Search Arena</span>
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mt-2 max-w-xl">
              Play my terminal game directly in your browser. Tom uses the <strong className="text-white">A* Search algorithm</strong> with Manhattan heuristics to intercept Jerry before he reaches the exit!
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
            <button
              onClick={() => setActiveMode("terminal")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeMode === "terminal"
                  ? "bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/30"
                  : "text-[var(--color-text-secondary)] hover:text-white"
              }`}
            >
              <Terminal size={16} />
              CLI Terminal (xterm.js)
            </button>
            <button
              onClick={() => setActiveMode("visual")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeMode === "visual"
                  ? "bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/30"
                  : "text-[var(--color-text-secondary)] hover:text-white"
              }`}
            >
              <LayoutGrid size={16} />
              Visual 2D Board
            </button>
          </div>
        </div>

        {/* ── Key Highlights Pill Row ── */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
            <Bot size={13} className="text-emerald-400" />
            A* Search Heuristic AI
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
            <Cpu size={13} className="text-cyan-400" />
            Dynamic Map &amp; Obstacles Generation
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
            <Terminal size={13} className="text-purple-400" />
            xterm.js Web Terminal Emulator
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
            <Code2 size={13} className="text-amber-400" />
            Original Python &amp; TypeScript Engine
          </span>
        </div>

        {/* ── Interactive Game View ── */}
        <div className="w-full">
          {activeMode === "terminal" ? (
            <TerminalEmulator />
          ) : (
            <VisualGameCanvas />
          )}
        </div>
      </div>
    </section>
  );
}
