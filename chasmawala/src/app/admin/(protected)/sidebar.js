// // chasmawala/src/app/admin/(protected)/sidebar.js

// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Bell, Home, Package, ShoppingCart, Users, X, Stethoscope } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const navItems = [
//     { href: "/admin/dashboard", icon: Home, label: "Dashboard" },
//     { href: "/admin/products", icon: Package, label: "Products" },
//     { href: "/admin/orders", icon: ShoppingCart, label: "Orders" },
//     { href: "/admin/customers", icon: Users, label: "Customers" },
    
// ];

// export default function Sidebar({ isSidebarOpen, setSidebarOpen }) {
//     const pathname = usePathname();

//     return (
//         <>
//             {/* Overlay for mobile */}
//             {isSidebarOpen && (
//                 <div
//                     className="fixed inset-0 bg-black/60 z-30 md:hidden"
//                     onClick={() => setSidebarOpen(false)}
//                 ></div>
//             )}

//             {/* Sidebar */}
//             <aside
//                 className={`fixed inset-y-0 left-0 z-40 flex h-full w-[240px] flex-col border-r bg-background transition-transform duration-300 ease-in-out md:static md:z-auto md:h-auto md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//                     }`}
//             >
//                 <div className="flex h-16 items-center justify-between border-b px-6">
//                     <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
//                         <Package className="h-6 w-6" />
//                         <span>Chasmawala</span>
//                     </Link>
//                     {/* Close button for mobile */}
//                     <Button
//                         variant="ghost"
//                         size="icon"
//                         className="md:hidden"
//                         onClick={() => setSidebarOpen(false)}
//                     >
//                         <X className="h-6 w-6" />
//                     </Button>
//                 </div>
//                 <nav className="flex-1 overflow-auto py-4">
//                     <ul className="grid items-start px-4 text-sm font-medium">
//                         {navItems.map(({ href, icon: Icon, label }) => (
//                             <li key={label}>
//                                 <Link
//                                     href={href}
//                                     className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname === href
//                                         ? "bg-muted text-primary"
//                                         : "text-muted-foreground"
//                                         }`}
//                                     onClick={() => setSidebarOpen(false)} // Close sidebar on nav click (mobile)
//                                 >
//                                     <Icon className="h-4 w-4" />
//                                     {label}
//                                 </Link>
//                             </li>
//                         ))}
//                     </ul>
//                 </nav>
//             </aside>
//         </>
//     );
// }









"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, ShoppingCart, Users, X, ChevronRight } from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", icon: Home, label: "Dashboard", desc: "Overview" },
  { href: "/admin/products", icon: Package, label: "Products", desc: "Inventory" },
  { href: "/admin/orders", icon: ShoppingCart, label: "Orders", desc: "Transactions" },
  { href: "/admin/customers", icon: Users, label: "Customers", desc: "Accounts" },
];

export default function Sidebar({ isSidebarOpen, setSidebarOpen }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 flex flex-col w-[260px]
          bg-white border-r border-stone-200
          transition-transform duration-300 ease-in-out
          md:static md:translate-x-0 md:h-screen
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* ── Header ── */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-stone-200 flex-shrink-0">
          <Link href="/admin/dashboard" className="flex items-center gap-2.5 no-underline">
            <div className="w-8 h-8 rounded-xl bg-stone-900 flex items-center justify-center flex-shrink-0">
              <Package className="h-4 w-4 text-stone-100" />
            </div>
            <span className="text-[14px] font-bold tracking-wider uppercase text-stone-800">
              Chasmawala
            </span>
          </Link>

          <button
            className="md:hidden w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center text-stone-400 hover:bg-stone-50 hover:text-stone-700 transition-all"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ── Nav ── */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 scrollbar-none">
          

          <ul className="space-y-0.5">
            {navItems.map(({ href, icon: Icon, label, desc }) => {
              const isActive = pathname === href;
              return (
                <li key={label}>
                  <Link
                    href={href}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-xl
                      border transition-all duration-150 no-underline group
                      ${isActive
                        ? "bg-stone-900 border-stone-800"
                        : "border-transparent hover:bg-stone-50 hover:border-stone-100"
                      }
                    `}
                  >
                    {/* Icon */}
                    <div
                      className={`
                        w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all
                        ${isActive
                          ? "bg-white/10"
                          : "bg-stone-100 group-hover:bg-stone-200"
                        }
                      `}
                    >
                      <Icon
                        className={`h-4 w-4 ${isActive ? "text-stone-100" : "text-stone-400 group-hover:text-stone-600"}`}
                      />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-[13.5px] font-medium leading-tight ${isActive ? "text-white" : "text-stone-600 group-hover:text-stone-800"}`}
                      >
                        {label}
                      </div>
                      <div
                        className={`text-[11px] font-light ${isActive ? "text-stone-400" : "text-stone-300"}`}
                      >
                        {desc}
                      </div>
                    </div>

                    {/* Chevron */}
                    <ChevronRight
                      className={`h-3.5 w-3.5 flex-shrink-0 transition-all duration-150
                        ${isActive
                          ? "opacity-100 text-stone-400"
                          : "opacity-0 -translate-x-1 text-stone-300 group-hover:opacity-40 group-hover:translate-x-0"
                        }
                      `}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 mx-1 h-px bg-stone-100" />
        </nav>

        {/* ── Footer: user card ── */}
        <div className="p-3 border-t border-stone-100 flex-shrink-0">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-stone-50 border border-stone-100">
            <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-[11px] font-semibold text-stone-100 flex-shrink-0">
              A
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12.5px] font-medium text-stone-700 truncate">Admin</div>
              <div className="text-[11px] text-stone-400">Administrator</div>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-white flex-shrink-0" />
          </div>
        </div>
      </aside>
    </>
  );
}