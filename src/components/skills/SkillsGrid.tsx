"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { skillGroups } from "@/data/skills";
import {
  SiPython,
  SiCplusplus,
  SiJavascript,
  SiTypescript,
  SiGo,
  SiPostgresql,
  SiC,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiMongodb,
  SiMysql,
  SiDocker,
  SiGitlab,
  SiLinux,
  SiGnubash,
  SiGithubactions,
  SiNextdotjs,
  SiReact,
  SiFastapi,
  SiDjango,
  SiGit,
  SiGithub,
  SiPostman,
  SiJest,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import {
  TbTopologyComplex,
  TbNetwork,
  TbTrendingUp,
  TbApi,
  TbCpu,
  TbGauge,
  TbBrandVscode,
} from "react-icons/tb";
import {
  Bot,
  Sparkles,
  ShieldCheck,
  Network,
  Cpu,
  Trophy,
  ChevronDown,
  ChevronUp,
  type LucideIcon,
} from "lucide-react";
import { type IconType } from "react-icons";

// Icon lookup dictionary
const iconDictionary: Record<string, IconType | LucideIcon> = {
  SiPython,
  SiCplusplus,
  SiJavascript,
  SiTypescript,
  SiGo,
  SiPostgresql,
  SiC,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiMongodb,
  SiMysql,
  SiDocker,
  SiGitlab,
  SiLinux,
  SiGnubash,
  SiGithubactions,
  SiNextdotjs,
  SiReact,
  SiFastapi,
  SiDjango,
  SiGit,
  SiGithub,
  SiPostman,
  SiJest,
  FaJava,
  TbTopologyComplex,
  TbNetwork,
  TbTrendingUp,
  TbApi,
  TbCpu,
  TbGauge,
  TbBrandVscode,
  Bot,
  Sparkles,
  ShieldCheck,
  Network,
  Cpu,
  Trophy,
};

export default function SkillsGrid() {
  const [isExpanded, setIsExpanded] = useState(false);

  // On mobile, show top 6 cards by default unless expanded
  const visibleGroups = isExpanded ? skillGroups : skillGroups.slice(0, 6);

  return (
    <section
      id="skills"
      className="relative py-20 sm:py-32 overflow-hidden border-t border-[var(--color-border)]/50"
    >
      {/* ── Background Aura ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full pointer-events-none opacity-15"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--color-accent), var(--color-primary), transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* ── Section Title ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--color-text-primary)] tracking-tight">
            Skills &amp; Technologies
          </h2>
          {/* Subtle Accent Line */}
          <div className="w-12 h-1 rounded-full bg-[var(--color-primary)] mt-2.5 mb-3 shadow-sm" />
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] font-mono tracking-wide">
            The programming languages, frameworks, databases, and DevOps systems I engineer with.
          </p>
        </motion.div>

        {/* ── Bento Grid of Categorized Skill Cards (Modular blocks docking into place) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-start">
          {visibleGroups.map((group, groupIdx) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 35, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: groupIdx * 0.08,
                type: "spring",
                stiffness: 240,
                damping: 22,
              }}
              className="relative rounded-3xl border border-orange-200/80 dark:border-slate-800/90 bg-white/90 dark:bg-[#0b0e18]/90 backdrop-blur-xl p-5 sm:p-6 shadow-sm hover:border-[var(--color-primary)] hover:shadow-xl hover:shadow-orange-500/5 dark:hover:shadow-[var(--color-primary)]/5 transition-all duration-300 flex flex-col justify-start group/card"
            >
              {/* Category Header with colored bullet */}
              <div className="flex items-center gap-2.5 mb-5 select-none">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                  style={{
                    backgroundColor: group.dotColor,
                    boxShadow: `0 0 10px ${group.dotColor}`,
                  }}
                />
                <h3 className="text-xs font-mono font-bold tracking-widest text-stone-700 dark:text-slate-300 uppercase">
                  {group.title}
                </h3>
              </div>

              {/* Skills 4-Column Grid */}
              <div className="grid grid-cols-4 gap-y-4 gap-x-2 sm:gap-x-3 items-start justify-items-center w-full">
                {group.items.map((skill) => {
                  const IconComponent =
                    iconDictionary[skill.iconName] || Cpu;

                  return (
                    <div
                      key={skill.name}
                      className="group/item flex flex-col items-center justify-start gap-1.5 w-full max-w-[72px] cursor-default"
                    >
                      {/* Icon Container */}
                      <div className="w-12 h-12 rounded-2xl bg-orange-50/80 dark:bg-slate-900/90 border border-orange-200/60 dark:border-slate-800/90 flex items-center justify-center text-stone-500 dark:text-slate-400 transition-all duration-200 group-hover/item:scale-110 group-hover/item:border-[var(--color-primary)] group-hover/item:bg-white dark:group-hover/item:bg-slate-800/80 shadow-xs">
                        <IconComponent
                          size={22}
                          className="group-hover/item:scale-105 transition-transform"
                          style={{
                            color: skill.color,
                          }}
                        />
                      </div>

                      {/* Skill Name */}
                      <span className="text-[10px] sm:text-[11px] font-mono text-stone-600 dark:text-slate-300 group-hover/item:text-stone-900 dark:group-hover/item:text-white text-center tracking-tight truncate w-full transition-colors mt-0.5">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Mobile Expand/Collapse Toggle ── */}
        {skillGroups.length > 6 && (
          <div className="mt-8 flex justify-center sm:hidden">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-50 dark:bg-slate-900 border border-orange-200 dark:border-slate-700 text-xs font-mono text-stone-700 dark:text-slate-300 hover:text-stone-900 dark:hover:text-white transition-colors"
            >
              {isExpanded ? (
                <>
                  <span>Show Less</span>
                  <ChevronUp size={14} />
                </>
              ) : (
                <>
                  <span>Show All Categories</span>
                  <ChevronDown size={14} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
