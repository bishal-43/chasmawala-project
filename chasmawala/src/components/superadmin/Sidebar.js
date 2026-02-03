"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  LayoutDashboard, 
  UserCog, 
  Users, 
  ShoppingCart, 
  Stethoscope,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Shield,
  TrendingUp
} from "lucide-react";

const links = [
  { 
    href: "/superadmin", 
    label: "Dashboard", 
    icon: LayoutDashboard,
    description: "Overview & stats",
    badge: null
  },
  { 
    href: "/superadmin/admins", 
    label: "Admins", 
    icon: UserCog,
    description: "Manage administrators",
    badge: null
  },
  { 
    href: "/superadmin/users", 
    label: "Users", 
    icon: Users,
    description: "Customer accounts",
    badge: "2.5k"
  },
  { 
    href: "/superadmin/orders", 
    label: "Orders", 
    icon: ShoppingCart,
    description: "Order management",
    badge: "12"
  },
  { 
    href: "/superadmin/doctors", 
    label: "Doctors", 
    icon: Stethoscope,
    description: "Medical professionals",
    badge: null
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <aside 
      className={`relative h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700/50 shadow-2xl transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative p-6 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center w-full' : ''}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl blur opacity-50"></div>
              <div className="relative p-2.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">SuperAdmin</h2>
                <p className="text-xs text-slate-400 -mt-0.5">Control Center</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 z-10 p-1.5 bg-slate-800 border-2 border-slate-700 rounded-full shadow-lg hover:bg-slate-700 transition-all duration-200 hover:scale-110 group"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-white" />
        ) : (
          <ChevronLeft className="h-4 w-4 text-slate-400 group-hover:text-white" />
        )}
      </button>

      {/* Navigation */}
      <nav className="relative p-4 space-y-2">
        {links.map(({ href, label, icon: Icon, description, badge }, index) => {
          const isActive = pathname === href;
          const isHovered = hoveredLink === href;
          
          return (
            <Link
              key={href}
              href={href}
              onMouseEnter={() => setHoveredLink(href)}
              onMouseLeave={() => setHoveredLink(null)}
              className="block group relative"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded-r-full"></div>
              )}
              
              <div
                className={`relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                  isCollapsed ? 'justify-center' : ''
                } ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white shadow-lg shadow-purple-500/10'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {/* Icon container */}
                <div className={`relative flex-shrink-0 ${
                  isActive ? 'text-purple-400' : 'text-slate-500 group-hover:text-purple-400'
                } transition-colors duration-200`}>
                  <Icon className={`h-5 w-5 transition-transform duration-200 ${
                    isHovered ? 'scale-110' : ''
                  }`} />
                  {isActive && (
                    <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-400 animate-pulse" />
                  )}
                </div>

                {/* Label and description */}
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`font-medium text-sm ${
                        isActive ? 'text-white' : 'text-slate-300'
                      }`}>
                        {label}
                      </span>
                      {badge && (
                        <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                          isActive
                            ? 'bg-purple-500 text-white'
                            : 'bg-slate-700 text-slate-300'
                        }`}>
                          {badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">{description}</p>
                  </div>
                )}

                {/* Hover effect */}
                {isHovered && !isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent rounded-xl"></div>
                )}
              </div>

              {/* Tooltip for collapsed state */}
              {isCollapsed && isHovered && (
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl whitespace-nowrap z-50 animate-slideIn">
                  <p className="text-sm font-medium text-white">{label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{description}</p>
                  {badge && (
                    <span className="inline-block mt-1 px-2 py-0.5 text-xs font-bold bg-purple-500 text-white rounded-full">
                      {badge}
                    </span>
                  )}
                  {/* Arrow */}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-slate-800"></div>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Stats Section */}
      {!isCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
          <div className="space-y-3">
            {/* Performance indicator */}
            <div className="p-3 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-emerald-400">System Status</span>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-emerald-400">Healthy</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
                <div className="flex-1">
                  <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full w-[92%]"></div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-400">92%</span>
              </div>
            </div>

            {/* Version info */}
            <div className="text-center">
              <p className="text-xs text-slate-500">
                Version <span className="text-slate-400 font-semibold">2.5.0</span>
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px) translateY(-50%);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateY(-50%);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.2s ease-out;
        }
      `}</style>
    </aside>
  );
}