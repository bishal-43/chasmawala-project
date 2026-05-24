"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => { setMounted(true); }, []);

  // Prevent hydration mismatch — render a same-size placeholder on server
  if (!mounted) {
    return <div className="w-10 h-10 rounded-xl" aria-hidden="true" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="
        relative flex items-center justify-center
        w-10 h-10 rounded-xl
        text-gray-500 dark:text-gray-400
        hover:text-emerald-600 dark:hover:text-emerald-400
        hover:bg-emerald-50 dark:hover:bg-emerald-950/40
        transition-all duration-200
        overflow-hidden
      "
    >
      {/* Sun icon — visible in light mode */}
      <Sun
        size={19}
        className={`
          absolute transition-all duration-300
          ${isDark ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}
        `}
      />
      {/* Moon icon — visible in dark mode */}
      <Moon
        size={19}
        className={`
          absolute transition-all duration-300
          ${isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"}
        `}
      />
    </button>
  );
}
