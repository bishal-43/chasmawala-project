// app/providers.js
"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }) {
  // attribute="class" is the key to making dark mode work with Tailwind CSS
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}