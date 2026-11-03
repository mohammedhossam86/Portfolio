"use client";

// =============================================================================
// Custom Hook: useScrollProgress
// =============================================================================
// Tracks scroll progress for the Journey section's car animation.
// Returns a value 0→1 based on how far the user has scrolled through
// the target element.
// =============================================================================

import { useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, RefObject } from "react";

interface ScrollProgressResult {
  ref: RefObject<HTMLElement | null>;
  scrollYProgress: MotionValue<number>;
  scrollXProgress: MotionValue<number>;
}

export function useScrollProgress(): ScrollProgressResult {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Map vertical scroll to horizontal movement (0 → 1)
  const scrollXProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return { ref, scrollYProgress, scrollXProgress };
}

