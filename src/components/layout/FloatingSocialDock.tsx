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
// Platform → Icon Mapping
// =============================================================================

/** Returns the appropriate icon component for each social platform. */
function getPlatformIcon(
  platform: SocialPlatform
): IconType | LucideIcon {
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

// =============================================================================
// Animation Variants
// =============================================================================

/** Container stagger for the dock entrance animation. */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.6, // wait for page content to load first
    },
  },
};

/** Individual icon entrance animation. */
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
      {/* ── Desktop: Vertical dock on left side ────────────────────────────── */}
      <motion.aside
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 md:flex"
        aria-label="Social links"
      >
        {socialLinks.map((link: SocialLink) => (
          <DockItem key={link.platform} link={link} />
        ))}

        {/* Decorative line below the dock */}
        <motion.div
          variants={itemVariants}
          className="mx-auto mt-2 h-20 w-px bg-gradient-to-b from-[var(--color-border)] to-transparent"
        />
      </motion.aside>

      {/* ── Mobile: Horizontal bar at the bottom ──────────────────────────── */}
      <motion.aside
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center gap-4 border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]/90 px-4 py-3 backdrop-blur-lg md:hidden"
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
// Dock Item — Single icon with tooltip
// =============================================================================

interface DockItemProps {
  link: SocialLink;
  mobile?: boolean;
}

function DockItem({ link, mobile = false }: DockItemProps) {
  const Icon = getPlatformIcon(link.platform);

  // CV link opens in same tab (download), others open in new tab
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
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        className={`
          flex items-center justify-center rounded-xl
          border border-[var(--color-border)] bg-[var(--color-bg-tertiary)]
          text-[var(--color-text-secondary)]
          transition-all duration-200
          hover:border-[var(--color-primary)]/40
          hover:text-[var(--color-primary-light)]
          hover:shadow-[0_0_15px_rgba(99,102,241,0.2)]
          ${mobile ? "h-10 w-10" : "h-11 w-11"}
        `}
      >
        <Icon size={mobile ? 18 : 20} />
      </motion.a>

      {/* Tooltip — slides in from the left (desktop only) */}
      {!mobile && (
        <span
          className="
            pointer-events-none absolute left-full top-1/2 ml-3
            -translate-y-1/2 whitespace-nowrap
            rounded-md bg-[var(--color-bg-tertiary)] px-2.5 py-1
            text-xs font-medium text-[var(--color-text-primary)]
            opacity-0 transition-all duration-200
            group-hover:translate-x-0 group-hover:opacity-100
            -translate-x-2
            border border-[var(--color-border)]
          "
        >
          {link.label}
        </span>
      )}
    </motion.div>
  );
}
