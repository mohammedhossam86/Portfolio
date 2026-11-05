"use client";

import { motion } from "framer-motion";
import { Gamepad2, Sparkles, Cpu, Code2, Bot } from "lucide-react";
import VisualGameCanvas from "./VisualGameCanvas";

// =============================================================================
// Arcade Hub — Mohammed Hossam's A* Pathfinding Arena (Visual 2D)
// =============================================================================

export default function ArcadeHub() {
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
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 text-[var(--color-primary-light)] text-xs font-mono uppercase tracking-wider mb-2">
              <Gamepad2 size={14} />
              Interactive Pathfinding Arena
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)]">
              Tom &amp; Jerry <span className="text-gradient">BFS · Dijkstra · A* Arena</span>
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mt-2">
              Play directly in the browser and compare <strong className="text-[var(--color-text-primary)] font-bold">A* Search</strong>, <strong className="text-[var(--color-text-primary)] font-bold">Dijkstra</strong>, and <strong className="text-[var(--color-text-primary)] font-bold">BFS</strong> in real-time to visualize how heuristic pathfinding avoids obstacle traps and solves shortest routes.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-text-secondary)] shadow-xs">
            <Bot size={15} className="text-emerald-500" />
            <span>Interactive 2D Board • WASD / Arrow Keys</span>
          </div>
        </motion.div>

        {/* ── Key Highlights Pill Row ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="flex flex-wrap items-center gap-2.5 mb-8"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-text-secondary)] shadow-xs">
            <Bot size={13} className="text-emerald-500" />
            A* Search Manhattan Heuristic
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-text-secondary)] shadow-xs">
            <Cpu size={13} className="text-cyan-500" />
            Dynamic Obstacle Generation
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-text-secondary)] shadow-xs">
            <Code2 size={13} className="text-amber-500" />
            TypeScript Simulation Engine
          </span>
        </motion.div>

        {/* ── Interactive Game View ── */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <VisualGameCanvas />
        </motion.div>
      </div>
    </section>
  );
}
