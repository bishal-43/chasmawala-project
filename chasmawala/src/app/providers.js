// app/providers.js
"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }) {
  // force light theme to remove dark mode
  return <ThemeProvider attribute="class" forcedTheme="light">{children}</ThemeProvider>;
}