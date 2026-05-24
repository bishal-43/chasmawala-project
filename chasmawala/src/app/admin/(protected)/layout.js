"use client";

import { useState, useEffect } from "react";
import Sidebar from "./sidebar"; // Your responsive sidebar component
import Topbar from "./topbar";   // Your topbar component
import useIdleLogout from "@/hooks/useIdleLogout";

// This layout correctly uses your responsive Sidebar and Topbar
export default function ProtectedAdminLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useIdleLogout(30 * 60 * 1000); // 30 min

  useEffect(() => {
    const originalPadding = document.body.style.paddingTop;
    document.body.style.paddingTop = "0px";
    return () => {
      document.body.style.paddingTop = originalPadding;
    };
  }, []);

  return (
    <div className="grid h-screen w-full md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Sidebar Component */}
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-col">
        {/* Topbar Component */}
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Main Page Content */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-gradient-to-tr from-stone-50 via-white to-stone-50/50 dark:from-zinc-950 dark:to-zinc-900 overflow-y-auto">
          <div className="w-full max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-3 duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

