// chasmawala/src/app/admin/(protected)/sidebar.js

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Home, Package, ShoppingCart, Users, X, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
    { href: "/admin/dashboard", icon: Home, label: "Dashboard" },
    { href: "/admin/products", icon: Package, label: "Products" },
    { href: "/admin/orders", icon: ShoppingCart, label: "Orders" },
    { href: "/admin/customers", icon: Users, label: "Customers" },
    
];

export default function Sidebar({ isSidebarOpen, setSidebarOpen }) {
    const pathname = usePathname();

    return (
        <>
            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 flex h-full w-[240px] flex-col border-r bg-background transition-transform duration-300 ease-in-out md:static md:z-auto md:h-auto md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex h-16 items-center justify-between border-b px-6">
                    <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
                        <Package className="h-6 w-6" />
                        <span>Chasmawala</span>
                    </Link>
                    {/* Close button for mobile */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="h-6 w-6" />
                    </Button>
                </div>
                <nav className="flex-1 overflow-auto py-4">
                    <ul className="grid items-start px-4 text-sm font-medium">
                        {navItems.map(({ href, icon: Icon, label }) => (
                            <li key={label}>
                                <Link
                                    href={href}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname === href
                                        ? "bg-muted text-primary"
                                        : "text-muted-foreground"
                                        }`}
                                    onClick={() => setSidebarOpen(false)} // Close sidebar on nav click (mobile)
                                >
                                    <Icon className="h-4 w-4" />
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    );
}

