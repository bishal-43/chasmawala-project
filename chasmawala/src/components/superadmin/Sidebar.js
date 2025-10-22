"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/superadmin", label: "Dashboard" },
  { href: "/superadmin/admins", label: "Admins" },
  { href: "/superadmin/users", label: "Users" },
  { href: "/superadmin/orders", label: "Orders" },
  { href: "/superadmin/doctors", label: "Doctors" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r p-5 shadow-md">
      <h2 className="text-xl font-bold mb-6">SuperAdmin</h2>
      <nav className="space-y-4">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`block px-2 py-1 rounded ${
              pathname === href ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
