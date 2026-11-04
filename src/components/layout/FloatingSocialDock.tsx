"use client";

import { motion } from "framer-motion";
import { socialLinks } from "@/data/site";
import { SocialLink, SocialPlatform } from "@/types";
import { FaGithub, FaGitlab, FaLinkedinIn } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { Mail, FileDown } from "lucide-react";
import { type IconType } from "react-icons";
import { type LucideIcon } from "lucide-react";

// =============================================================================
// Platform → Icon & Brand Color Configuration
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

interface BrandTheme {
  hoverText: string;
  hoverBg: string;
  hoverBorder: string;
  hoverShadow: string;
  tooltipBorder: string;
  hex: string;
}

const brandThemes: Record<SocialPlatform, BrandTheme> = {
  github: {
    hoverText: "hover:text-white",
    hoverBg: "hover:bg-white/10",
    hoverBorder: "hover:border-white/50",
    hoverShadow: "hover:shadow-[0_0_20px_rgba(255,255,255,0.35)]",
    tooltipBorder: "group-hover:border-white/40",
    hex: "#ffffff",
  },
  gitlab: {
    hoverText: "hover:text-[#FC6D26]",
    hoverBg: "hover:bg-[#FC6D26]/10",
    hoverBorder: "hover:border-[#FC6D26]/60",
    hoverShadow: "hover:shadow-[0_0_20px_rgba(252,109,38,0.4)]",
    tooltipBorder: "group-hover:border-[#FC6D26]/40",
    hex: "#FC6D26",
  },
  linkedin: {
    hoverText: "hover:text-[#0A66C2]",
    hoverBg: "hover:bg-[#0A66C2]/10",
    hoverBorder: "hover:border-[#0A66C2]/60",
    hoverShadow: "hover:shadow-[0_0_20px_rgba(10,102,194,0.4)]",
    tooltipBorder: "group-hover:border-[#0A66C2]/40",
    hex: "#0A66C2",
  },
  leetcode: {
    hoverText: "hover:text-[#FFA116]",
    hoverBg: "hover:bg-[#FFA116]/10",
    hoverBorder: "hover:border-[#FFA116]/60",
    hoverShadow: "hover:shadow-[0_0_20px_rgba(255,161,22,0.4)]",
    tooltipBorder: "group-hover:border-[#FFA116]/40",
    hex: "#FFA116",
  },
  email: {
    hoverText: "hover:text-[#22d3ee]",
    hoverBg: "hover:bg-[#22d3ee]/10",
    hoverBorder: "hover:border-[#22d3ee]/60",
    hoverShadow: "hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]",
    tooltipBorder: "group-hover:border-[#22d3ee]/40",
    hex: "#22d3ee",
  },
  cv: {
    hoverText: "hover:text-[#818cf8]",
    hoverBg: "hover:bg-[#818cf8]/10",
    hoverBorder: "hover:border-[#818cf8]/60",
    hoverShadow: "hover:shadow-[0_0_20px_rgba(129,140,248,0.4)]",
    tooltipBorder: "group-hover:border-[#818cf8]/40",
    hex: "#818cf8",
  },
};

// =============================================================================
// Animation Variants
// =============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  },
};

// =============================================================================
// Floating Social Dock Component
// =============================================================================

export default function FloatingSocialDock() {
  return (
    <>
      {/* ── Desktop: Vertical dock on left side ── */}
      <motion.aside
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3.5 md:flex"
        aria-label="Social links"
      >
        {socialLinks.map((link: SocialLink) => (
          <DockItem key={link.platform} link={link} />
        ))}

        {/* Decorative connecting line */}
        <motion.div
          variants={itemVariants}
          className="mx-auto mt-2 h-16 w-px bg-gradient-to-b from-[var(--color-border)] to-transparent"
        />
      </motion.aside>

      {/* ── Mobile: Horizontal bar at the bottom ── */}
      <motion.aside
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center gap-4 border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]/95 px-4 py-3 backdrop-blur-xl md:hidden"
        aria-label="Social links"
      >
        {socialLinks.map((link: SocialLink) => (
          <DockItem key={link.platform} link={link} mobile />
        ))}
      </motion.aside>
    </>
  );
}

// =============================================================================
// Dock Item Component with dynamic brand colors on hover
// =============================================================================

interface DockItemProps {
  link: SocialLink;
  mobile?: boolean;
}

function DockItem({ link, mobile = false }: DockItemProps) {
  const Icon = getPlatformIcon(link.platform);
  const theme = brandThemes[link.platform];

  const isExternal = link.platform !== "cv";
  const linkProps = isExternal
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : { download: true as const };

  return (
    <motion.div variants={itemVariants} className="group relative">
      <motion.a
        href={link.url}
        {...linkProps}
        aria-label={link.label}
        whileHover={{ scale: 1.18 }}
        whileTap={{ scale: 0.92 }}
        className={`
          flex items-center justify-center rounded-xl
          border border-[var(--color-border)] bg-[var(--color-bg-tertiary)]
          text-[var(--color-text-secondary)]
          transition-all duration-300
          ${theme.hoverText}
          ${theme.hoverBg}
          ${theme.hoverBorder}
          ${theme.hoverShadow}
          ${mobile ? "h-10 w-10" : "h-11 w-11"}
        `}
      >
        <Icon size={mobile ? 18 : 20} />
      </motion.a>

      {/* Tooltip on Desktop — slides smoothly from left */}
      {!mobile && (
        <span
          className={`
            pointer-events-none absolute left-full top-1/2 ml-3.5
            -translate-y-1/2 whitespace-nowrap
            rounded-lg bg-[var(--color-bg-secondary)]/95 px-3 py-1.5
            text-xs font-mono font-medium text-[var(--color-text-primary)]
            opacity-0 transition-all duration-200
            group-hover:translate-x-0 group-hover:opacity-100
            -translate-x-2 shadow-xl backdrop-blur-md
            border border-[var(--color-border)]
            ${theme.tooltipBorder}
          `}
        >
          {link.label}
        </span>
      )}
    </motion.div>
  );
}
