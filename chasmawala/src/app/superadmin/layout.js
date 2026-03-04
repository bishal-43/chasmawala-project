// src/app/superadmin/layout.js
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext";
import Sidebar from "@/components/superadmin/Sidebar";
import Topbar from "@/components/superadmin/Topbar";
import useIdleLogout from "@/hooks/useIdleLogout";

export default function SuperAdminLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useIdleLogout(15 * 60 * 1000); // 15 min (stricter)

  useEffect(() => {
    if (!loading) {
      if (!user || user.role !== "superadmin") {
        router.replace("/"); // ⛔ redirect unauthorized users to home
      }
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== "superadmin") return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar />

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
