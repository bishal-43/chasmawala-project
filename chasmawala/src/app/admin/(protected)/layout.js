"use client";

import { useState } from "react";
import Sidebar from "./sidebar"; // Your responsive sidebar component
import Topbar from "./topbar";   // Your topbar component
import useIdleLogout from "@/hooks/useIdleLogout";

// This layout correctly uses your responsive Sidebar and Topbar
export default function ProtectedAdminLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useIdleLogout(30 * 60 * 1000); // 30 min

  return (
    <div className="grid h-screen w-full md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Sidebar Component */}
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-col">
        {/* Topbar Component */}
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Main Page Content */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40">
          {children}
        </main>
      </div>
    </div>
  );
}

