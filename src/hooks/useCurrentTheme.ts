"use client";

import { useState, useEffect } from "react";

export type Theme = "dark" | "light";

/**
 * Reactive hook that detects whether the current theme is "dark" or "light"
 * by observing class changes on document.documentElement.
 */
export function useCurrentTheme(): Theme {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    // Initial check
    const checkTheme = (): Theme => {
      if (typeof document === "undefined") return "dark";
      return document.documentElement.classList.contains("light") ? "light" : "dark";
    };

    setTheme(checkTheme());

    // Observe changes to the "class" attribute on <html>
    const observer = new MutationObserver(() => {
      setTheme(checkTheme());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return theme;
}
