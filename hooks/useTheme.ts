"use client";

import { useThemeContext } from "@/contexts/ThemeContext";

/**
 * Custom hook for accessing theme state from Context
 * Now simply re-exports values from the Global ThemeContext
 */
export function useTheme() {
  return useThemeContext();
}
