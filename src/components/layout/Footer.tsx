"use client";

import { useState, useEffect } from "react";
import { socialLinks } from "@/data/site";
import { SocialLink, SocialPlatform } from "@/types";
import { FaGithub, FaGitlab, FaLinkedinIn } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { Mail, FileDown } from "lucide-react";
import { type IconType } from "react-icons";
import { type LucideIcon } from "lucide-react";

// =============================================================================
// Platform → Icon Mapping (shared with FloatingSocialDock)
// =============================================================================

function getPlatformIcon(platform: SocialPlatform): IconType | LucideIcon {
  const map: Record<SocialPlatform, IconType | LucideIcon> = {
    github: FaGithub,
    gitlab: FaGitlab,
    linkedin: FaLinkedinIn,
    leetcode: SiLeetcode,
    email: Mail,
    cv: FileDown,
  };
  return map[platform];
}

const brandHoverColors: Record<SocialPlatform, string> = {
  github: "hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]",
  gitlab: "hover:text-[#FC6D26] hover:drop-shadow-[0_0_8px_rgba(252,109,38,0.5)]",
  linkedin: "hover:text-[#0A66C2] hover:drop-shadow-[0_0_8px_rgba(10,102,194,0.5)]",
  leetcode: "hover:text-[#FFA116] hover:drop-shadow-[0_0_8px_rgba(255,161,22,0.5)]",
  email: "hover:text-[#22d3ee] hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]",
  cv: "hover:text-[#818cf8] hover:drop-shadow-[0_0_8px_rgba(129,140,248,0.5)]",
};

// =============================================================================
// Footer Component
// =============================================================================

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative border-t border-transparent">
      {/* ── Gradient top border ────────────────────────────────────────────── */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-primary), var(--color-accent), transparent)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* ── Social links row ────────────────────────────────────────────── */}
        <div className="mb-6 flex items-center justify-center gap-4">
          {socialLinks.map((link: SocialLink) => {
            const Icon = getPlatformIcon(link.platform);
            const isExternal = link.platform !== "cv";
            const linkProps = isExternal
              ? { target: "_blank" as const, rel: "noopener noreferrer" }
              : { download: true as const };

            return (
              <a
                key={link.platform}
                href={link.url}
                {...linkProps}
                aria-label={link.label}
                className={`
                  text-[var(--color-text-muted)]
                  transition-all duration-200
                  ${brandHoverColors[link.platform]}
                `}
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>

        {/* ── Built with text ──────────────────────────────────────────────── */}
        <p className="text-center text-sm text-[var(--color-text-muted)]">
          Built with{" "}
          <span className="font-medium text-[var(--color-text-secondary)]">
            Next.js
          </span>
          ,{" "}
          <span className="font-medium text-[var(--color-text-secondary)]">
            TypeScript
          </span>{" "}
          &amp; ☕
        </p>

        {/* ── Copyright ────────────────────────────────────────────────────── */}
        <p className="mt-2 text-center text-xs text-[var(--color-text-muted)]">
          © {currentYear} Hossam. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
