// app/superadmin/page.js (Server Component)
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SuperAdminDashboard from "./SuperAdminDashboard";
import { verifySuperAdminToken } from "@/lib/auth";

export default async function SuperAdminPage() {
  const token = cookies().get("admin-token")?.value;
  const isSuperAdmin = await verifySuperAdminToken(token);

  if (!isSuperAdmin) redirect("/admin/login");

  return <SuperAdminDashboard />;
}
