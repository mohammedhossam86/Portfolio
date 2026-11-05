"use client";

import { useState } from "react";
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

  // On mobile, show top 4 cards by default unless expanded
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
        {/* ── Section Title (Exact style from screenshot) ── */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Skills
          </h2>
          {/* Subtle Accent Line */}
          <div className="w-12 h-1 rounded-full bg-amber-400 mt-2.5 mb-3 shadow-[0_0_12px_rgba(251,191,36,0.5)]" />
          <p className="text-xs sm:text-sm text-slate-400 font-mono tracking-wide">
            The languages, systems, and tools I use.
          </p>
        </div>

        {/* ── Bento Grid of Categorized Skill Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {visibleGroups.map((group) => (
            <div
              key={group.id}
              className="relative rounded-3xl border border-slate-800/90 bg-[#0b0e18]/90 backdrop-blur-xl p-5 sm:p-6 shadow-xl hover:border-slate-700/80 hover:shadow-2xl hover:shadow-[var(--color-primary)]/5 transition-all duration-300 flex flex-col justify-between group/card"
            >
              {/* Category Header with colored bullet */}
              <div className="flex items-center gap-2.5 mb-5 select-none">
                <span
                  className="w-2 h-2 rounded-full shrink-0 shadow-sm"
                  style={{
                    backgroundColor: group.dotColor,
                    boxShadow: `0 0 8px ${group.dotColor}`,
                  }}
                />
                <h3 className="text-xs font-mono font-bold tracking-widest text-slate-300 uppercase">
                  {group.title}
                </h3>
              </div>

              {/* Skills Flex Container — cleanly spaced without text clipping */}
              <div className="flex flex-wrap items-start gap-3.5 sm:gap-4">
                {group.items.map((skill) => {
                  const IconComponent =
                    iconDictionary[skill.iconName] || Cpu;

                  return (
                    <div
                      key={skill.name}
                      className="group/item flex flex-col items-center justify-center gap-1.5 w-[68px] sm:w-[74px] cursor-default"
                    >
                      {/* Icon Container */}
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-slate-900/80 border border-slate-800/90 flex items-center justify-center text-slate-400 transition-all duration-200 group-hover/item:scale-110 group-hover/item:border-slate-700 group-hover/item:bg-slate-800/70 shadow-sm">
                        <IconComponent
                          size={20}
                          className="group-hover/item:scale-105 transition-transform"
                          style={{
                            color: skill.color,
                          }}
                        />
                      </div>

                      {/* Skill Name — cleanly formatted with single line and no overlap */}
                      <span className="text-[11px] font-mono text-slate-300 group-hover/item:text-white text-center tracking-tight truncate w-full transition-colors">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ── Mobile Expand/Collapse Toggle ── */}
        {skillGroups.length > 6 && (
          <div className="mt-8 flex justify-center sm:hidden">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white transition-colors"
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
