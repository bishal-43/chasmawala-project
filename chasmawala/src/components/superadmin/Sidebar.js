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
  Crown,
  Zap,
  Activity,
  Circle
} from "lucide-react";

const links = [
  { 
    href: "/superadmin", 
    label: "Dashboard", 
    icon: LayoutDashboard,
    color: "from-cyan-400 to-blue-500",
    glow: "cyan"
  },
  { 
    href: "/superadmin/admins", 
    label: "Admins", 
    icon: UserCog,
    color: "from-violet-400 to-purple-500",
    glow: "violet"
  },
  { 
    href: "/superadmin/users", 
    label: "Users", 
    icon: Users,
    color: "from-emerald-400 to-teal-500",
    glow: "emerald",
    badge: "2.5k"
  },
  { 
    href: "/superadmin/orders", 
    label: "Orders", 
    icon: ShoppingCart,
    color: "from-amber-400 to-orange-500",
    glow: "amber",
    badge: "12"
  },
  { 
    href: "/superadmin/doctors", 
    label: "Doctors", 
    icon: Stethoscope,
    color: "from-pink-400 to-rose-500",
    glow: "pink"
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  const getGlowColor = (glow) => {
    const colors = {
      cyan: "shadow-cyan-500/50",
      violet: "shadow-violet-500/50",
      emerald: "shadow-emerald-500/50",
      amber: "shadow-amber-500/50",
      pink: "shadow-pink-500/50"
    };
    return colors[glow] || "shadow-blue-500/50";
  };

  return (
    <aside 
      className={`relative left-0 top-0 h-screen backdrop-blur-2xl bg-gradient-to-b from-slate-950/95 via-slate-900/95 to-slate-950/95 border-r border-white/10 rounded-r-2xl transition-all duration-500 ease-out z-40 ${
        isCollapsed ? 'w-20' : 'w-80'
      }`}
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/3 -right-20 w-56 h-56 bg-gradient-to-br from-violet-500/15 via-purple-500/15 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-gradient-to-br from-pink-500/15 via-rose-500/15 to-transparent rounded-full blur-3xl animate-float-slow"></div>
      </div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' /%3E%3C/svg%3E")`,
             backgroundSize: '128px 128px'
           }}>
      </div>

      {/* Header Section */}
      <div className="relative px-6 py-8 border-b border-white/5">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-4'}`}>
          {/* Logo */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative w-14 h-14 bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/50 transform group-hover:scale-110 transition-transform duration-300">
              <Crown className="w-7 h-7 text-white" />
            </div>
          </div>
          
          {/* Brand Text */}
          {!isCollapsed && (
            <div className="flex-1 animate-fadeIn">
              <h1 className="text-2xl font-black text-white tracking-tight mb-0.5 bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent">
                SuperAdmin
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Command Center</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Collapse Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-4 top-24 z-50 w-8 h-8 bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group backdrop-blur-xl"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white relative z-10 transition-colors" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-slate-400 group-hover:text-white relative z-10 transition-colors" />
        )}
      </button>

      {/* Navigation Section */}
      <div className="relative flex flex-col px-4 py-6 h-[calc(100vh-280px)] overflow-y-auto overflow-x-hidden custom-scrollbar">
        <nav className="space-y-2 flex flex-col">
          {links.map(({ href, label, icon: Icon, color, glow, badge }, index) => {
            const isActive = pathname === href;
            const isHovered = hoveredLink === href;
            
            return (
              <Link
                key={href}
                href={href}
                onMouseEnter={() => setHoveredLink(href)}
                onMouseLeave={() => setHoveredLink(null)}
                className="block group relative"
              >
                {/* Floating card effect */}
                <div
                  className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-br ${color} shadow-2xl ${getGlowColor(glow)} scale-105`
                      : 'bg-white/5 hover:bg-white/10 hover:scale-[1.02] backdrop-blur-sm'
                  }`}
                >
                  {/* Shimmer effect on hover */}
                  {(isActive || isHovered) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                  )}

                  <div className={`relative flex items-center gap-4 px-4 py-4 ${
                    isCollapsed ? 'justify-center' : 'justify-start px-3'
                  }`}>
                    {/* Icon */}
                    <div className={`relative ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'} transition-colors duration-200`}>
                      <Icon className={`w-6 h-6 ${isHovered ? 'animate-wiggle' : ''}`} />
                      {isActive && (
                        <>
                          <Circle className="absolute -inset-2 w-10 h-10 text-white/20 animate-ping" />
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full shadow-lg shadow-white/50"></div>
                        </>
                      )}
                    </div>

                    {/* Label */}
                    {!isCollapsed && (
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`font-bold text-sm tracking-wide ${
                            isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                          } transition-colors`}>
                            {label}
                          </span>
                          {badge && (
                            <span className={`px-2.5 py-0.5 text-xs font-black rounded-full ${
                              isActive
                                ? 'bg-white/30 text-white backdrop-blur-sm'
                                : 'bg-slate-700/80 text-slate-300 group-hover:bg-slate-600/80'
                            } transition-all`}>
                              {badge}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Active indicator bar */}
                  {isActive && !isCollapsed && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-white rounded-r-full shadow-lg shadow-white/50"></div>
                  )}
                </div>

                {/* Tooltip for collapsed state */}
                {isCollapsed && isHovered && (
                  <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-4 py-2.5 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl whitespace-nowrap z-50 animate-tooltipSlide">
                    <p className="font-bold text-sm text-white">{label}</p>
                    {badge && (
                      <span className="inline-block mt-1.5 px-2 py-0.5 text-xs font-bold bg-slate-700 text-slate-300 rounded-full">
                        {badge}
                      </span>
                    )}
                    {/* Tooltip arrow */}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-b-[6px] border-r-[6px] border-transparent border-r-slate-900/95"></div>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Stats Section */}
      {!isCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-white/5 backdrop-blur-xl bg-slate-950/50">
          <div className="space-y-4">
            {/* Performance Card */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-500/20 p-4">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-400/10 rounded-full blur-2xl"></div>
              
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">System Health</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
                    <span className="text-xs font-bold text-emerald-300">Optimal</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-emerald-400" />
                  <div className="flex-1">
                    <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm">
                      <div className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-full w-[94%] shadow-lg shadow-emerald-400/30 animate-pulse-slow"></div>
                    </div>
                  </div>
                  <span className="text-base font-black text-emerald-400">94%</span>
                </div>
              </div>
            </div>

            {/* Version Badge */}
            <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/5">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
              <span className="text-xs font-medium text-slate-400">
                v2.5.0 <span className="text-slate-600">•</span> <span className="text-blue-400 font-semibold">Latest</span>
              </span>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(20px, -20px) rotate(5deg); }
          66% { transform: translate(-15px, 15px) rotate(-5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-25px, 20px) rotate(-5deg); }
          66% { transform: translate(20px, -15px) rotate(5deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(15px, -15px) scale(1.1); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        @keyframes tooltipSlide {
          from {
            opacity: 0;
            transform: translateX(-8px) translateY(-50%);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateY(-50%);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 25s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 30s ease-in-out infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
        .animate-wiggle {
          animation: wiggle 0.5s ease-in-out;
        }
        .animate-tooltipSlide {
          animation: tooltipSlide 0.2s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        /* Custom Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(34, 211, 238, 0.4), rgba(59, 130, 246, 0.4));
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgba(34, 211, 238, 0.6), rgba(59, 130, 246, 0.6));
        }
      `}</style>
    </aside>
  );
}