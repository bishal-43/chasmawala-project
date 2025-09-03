"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi"; // Example using react-icons

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // To prevent hydration mismatch, render a placeholder or null on the server.
    return <div className="w-10 h-10" />; 
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-colors duration-300 ease-in-out
                 text-gray-600 dark:text-gray-300
                 bg-gray-200/50 dark:bg-gray-800/50
                 hover:bg-gray-300/80 dark:hover:bg-gray-700/80
                 focus:outline-none focus:ring-2 focus:ring-offset-2 
                 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <FiMoon size={22} /> // 🌙
      ) : (
        <FiSun size={22} /> // ☀️
      )}
    </button>
  );
}