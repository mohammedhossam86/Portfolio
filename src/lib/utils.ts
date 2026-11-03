import { type ClassValue, clsx } from "clsx";

// ─── Utility Functions ───────────────────────────────────────────────────────

/**
 * Merge Tailwind CSS class names safely (handles conflicts).
 * We use clsx for now; if we need tailwind-merge later, we add it.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Format a date string to a human-readable format.
 * Handles both "YYYY-MM" and full ISO date strings.
 */
export function formatDate(dateStr: string): string {
  // Handle "YYYY-MM" format
  if (/^\d{4}-\d{2}$/.test(dateStr)) {
    const [year, month] = dateStr.split("-");
    const date = new Date(Number(year), Number(month) - 1);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  }

  // Handle full ISO date strings
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Generate a YouTube thumbnail URL from a video ID.
 */
export function getYouTubeThumbnail(
  videoId: string,
  quality: "default" | "hqdefault" | "maxresdefault" = "hqdefault"
): string {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

/**
 * Generate a lightweight YouTube embed URL (no-cookie for privacy).
 */
export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}`;
}

