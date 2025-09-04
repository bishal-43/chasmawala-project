// src/app/admin/(protected)/layout.js

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext";
import { useEffect } from "react";
import Topbar from "./topbar";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const { user, loading } = useAuth(); // Removed hasChecked, it's not needed here
  const router = useRouter();

  console.log("AdminLayout - user:", user, "loading:", loading);

  useEffect(() => {
    // This effect should only run when the loading state is resolved.
    // We explicitly check if loading is false.
    if (!loading) {
      console.log("Auth check complete. User:", user);
      if (!user) {
        // If loading is finished and there's still no user, redirect to login.
        console.log("No user found, redirecting to login...");
        router.replace("/admin/login");
      } else if (!["admin", "superadmin"].includes(user.role)) {
        // If the user is not an admin, redirect to the home page.
        console.log("User is not authorized, redirecting to home...");
        router.replace("/");
      }
    }
  }, [user, loading, router]); // Dependencies are correct

  // Show a loader while the auth state is being determined.
  // This is the simplest and most effective way to handle the initial loading state.
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Checking authentication...</p>
      </div>
    );
  }

  // If loading is complete and the user is still not authenticated or authorized,
  // the useEffect above will have already initiated a redirect.
  // We can add a check here to prevent flashing the content.
  const isAuthorized = user && ["admin", "superadmin"].includes(user.role);
  if (!isAuthorized) {
    // This content will be shown briefly before the redirect completes.
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Redirecting...</p>
      </div>
    );
  }

  // If we reach this point, loading is complete and the user is authorized.
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-5 shadow-md hidden md:block">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Chasmawala Admin</h2>
        <nav className="space-y-4">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`block px-2 py-1 rounded transition ${
                pathname === href
                  ? "bg-blue-600 text-white font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />
        <main className="p-6 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

const links = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/products", label: "Products" },
];
