"use client";

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
  SiRedis,
  SiMongodb,
  SiMysql,
  SiSupabase,
  SiPrisma,
  SiDocker,
  SiKubernetes,
  SiGitlab,
  SiLinux,
  SiGnubash,
  SiGooglecloud,
  SiGithubactions,
  SiNginx,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
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
  SiRedis,
  SiMongodb,
  SiMysql,
  SiSupabase,
  SiPrisma,
  SiDocker,
  SiKubernetes,
  SiGitlab,
  SiLinux,
  SiGnubash,
  SiGooglecloud,
  SiGithubactions,
  SiNginx,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
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
  return (
    <section
      id="skills"
      className="relative py-24 sm:py-32 overflow-hidden border-t border-[var(--color-border)]/50"
    >
      {/* ── Background Aura ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full pointer-events-none opacity-15"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--color-accent), var(--color-primary), transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ── Section Title (Exact style from screenshot) ── */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Skills
          </h2>
          {/* Subtle Accent Line */}
          <div className="w-12 h-1 rounded-full bg-amber-400 mt-3 mb-4 shadow-[0_0_12px_rgba(251,191,36,0.5)]" />
          <p className="text-sm sm:text-base text-slate-400 font-mono tracking-wide">
            The languages, systems, and tools I use.
          </p>
        </div>

        {/* ── Bento Grid of Categorized Skill Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {skillGroups.map((group) => (
            <div
              key={group.id}
              className="relative rounded-3xl border border-slate-800/90 bg-[#0b0e18]/90 backdrop-blur-xl p-6 sm:p-7 shadow-xl hover:border-slate-700/80 hover:shadow-2xl hover:shadow-[var(--color-primary)]/5 transition-all duration-300 flex flex-col justify-between group/card"
            >
              {/* Category Header with colored bullet */}
              <div className="flex items-center gap-2.5 mb-6 select-none">
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

              {/* Skills Grid */}
              <div className="grid grid-cols-4 gap-y-5 gap-x-2 sm:gap-x-3 items-start">
                {group.items.map((skill) => {
                  const IconComponent =
                    iconDictionary[skill.iconName] || Cpu;

                  return (
                    <div
                      key={skill.name}
                      className="group/item flex flex-col items-center justify-center gap-2 cursor-default"
                    >
                      {/* Icon Container */}
                      <div
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-slate-900/80 border border-slate-800/90 flex items-center justify-center text-slate-400 transition-all duration-200 group-hover/item:scale-110 group-hover/item:border-slate-700 group-hover/item:bg-slate-800/70"
                        style={{
                          transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                      >
                        <span
                          className="transition-colors duration-200"
                          style={{
                            color: undefined, // will hover to skill.color
                          }}
                        >
                          <IconComponent
                            size={20}
                            className="group-hover/item:scale-105 transition-transform"
                            style={{
                              color: skill.color,
                            }}
                          />
                        </span>
                      </div>

                      {/* Skill Name */}
                      <span className="text-[10px] font-mono text-slate-400 group-hover/item:text-slate-200 text-center tracking-wider line-clamp-1 transition-colors">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

