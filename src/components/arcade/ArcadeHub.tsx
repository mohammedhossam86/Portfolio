"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gamepad2, Terminal, LayoutGrid, Sparkles, Cpu, Code2, Bot } from "lucide-react";
import TerminalEmulator from "./TerminalEmulator";
import VisualGameCanvas from "./VisualGameCanvas";

// =============================================================================
// Arcade Hub — Mohammed Hossam's A* Search Arena
// =============================================================================

export default function ArcadeHub() {
  const [activeMode, setActiveMode] = useState<"terminal" | "visual">("terminal");

  return (
    <section id="arcade" className="relative py-24 sm:py-32 overflow-hidden border-t border-[var(--color-border)]/50">
      {/* ── Background Glow ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--color-accent), var(--color-primary), transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 text-[var(--color-primary-light)] text-xs font-mono uppercase tracking-wider mb-2">
              <Gamepad2 size={14} />
              Interactive AI Pathfinding Arena
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)]">
              Tom &amp; Jerry <span className="text-gradient">BFS · Dijkstra · A* Arena</span>
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mt-2 max-w-xl">
              Play my game directly in the browser and compare <strong className="text-[var(--color-text-primary)] font-bold">A* Search</strong>, <strong className="text-[var(--color-text-primary)] font-bold">Dijkstra</strong>, and <strong className="text-[var(--color-text-primary)] font-bold">BFS</strong> in real-time to see how heuristics drastically reduce search space!
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] shadow-sm">
            <button
              onClick={() => setActiveMode("terminal")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeMode === "terminal"
                  ? "bg-[var(--color-primary)] text-white shadow-md shadow-[var(--color-primary)]/25"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              <Terminal size={16} />
              CLI Terminal
            </button>
            <button
              onClick={() => setActiveMode("visual")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeMode === "visual"
                  ? "bg-[var(--color-primary)] text-white shadow-md shadow-[var(--color-primary)]/25"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              <LayoutGrid size={16} />
              Visual 2D Board
            </button>
          </div>
        </motion.div>

        {/* ── Key Highlights Pill Row ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="flex flex-wrap items-center gap-3 mb-8"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-text-secondary)] shadow-xs">
            <Bot size={13} className="text-emerald-500 dark:text-emerald-400" />
            A* Search Heuristic AI
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-text-secondary)] shadow-xs">
            <Cpu size={13} className="text-cyan-600 dark:text-cyan-400" />
            Dynamic Map &amp; Obstacles Generation
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-text-secondary)] shadow-xs">
            <Terminal size={13} className="text-purple-600 dark:text-purple-400" />
            High-Performance CLI Terminal
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-text-secondary)] shadow-xs">
            <Code2 size={13} className="text-amber-600 dark:text-amber-400" />
            Original Python &amp; TypeScript Engine
          </span>
        </motion.div>

        {/* ── Interactive Game View (Docks with soft scale into place) ── */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          {activeMode === "terminal" ? (
            <TerminalEmulator />
          ) : (
            <VisualGameCanvas />
          )}
        </motion.div>
      </div>
    </section>
  );
}
