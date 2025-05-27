// src/app/admin/page.js (Server Component)
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminPageClient from "./AdminPageClient";
import { verifyAdminToken } from "@/lib/auth"; // 🔐 A helper to validate admin JWT

export default async function AdminPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("admin-token")?.value;

  const isAdmin = await verifyAdminToken(token);
  if (!isAdmin) {
    redirect("/admin/login");
  }

  return <AdminPageClient />; // The actual form lives here
}
