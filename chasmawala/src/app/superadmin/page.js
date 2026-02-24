// src/app/superadmin/page.js

"use client";

import { useSuperAdminStats } from "@/hooks/useSuperAdminStats";
import { StatCard, StatCardSkeleton } from "@/components/superadmin/StatCard";
import { Alert } from "@/components/ui/alert";
import { Users, ShoppingCart, Box, UserCog, ListOrdered, IndianRupee, TrendingUp, Activity, ArrowUpRight, Sparkles } from "lucide-react";
import Link from 'next/link';
import { useState, useEffect } from 'react';

const cardConfig = [
  { 
    label: "Admins", 
    icon: UserCog, 
    key: "totalAdmins", 
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    shadowColor: "shadow-violet-500/20",
    trend: "+12%"
  },
  { 
    label: "Users", 
    icon: Users, 
    key: "totalUsers", 
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    shadowColor: "shadow-emerald-500/20",
    trend: "+23%"
  },
  { 
    label: "Orders", 
    icon: ShoppingCart, 
    key: "totalOrders", 
    gradient: "from-amber-500 via-orange-500 to-red-500",
    shadowColor: "shadow-amber-500/20",
    trend: "+8%"
  },
  { 
    label: "Products", 
    icon: Box, 
    key: "totalProducts", 
    gradient: "from-pink-500 via-rose-500 to-red-500",
    shadowColor: "shadow-pink-500/20",
    trend: "+5%"
  },
  { 
    label: "Revenue", 
    icon: IndianRupee, 
    key: "totalRevenue", 
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
    shadowColor: "shadow-blue-500/20",
    trend: "+18%",
    isRevenue: true
  },
];

const quickActions = [
  { 
    href: "/superadmin/admins", 
    icon: UserCog, 
    label: "Manage Admins",
    description: "Add, edit, or remove admin users",
    gradient: "from-violet-500 to-purple-500"
  },
  { 
    href: "/superadmin/products", 
    icon: Box, 
    label: "Manage Products",
    description: "Update inventory and pricing",
    gradient: "from-pink-500 to-rose-500"
  },
  { 
    href: "/superadmin/orders", 
    icon: ListOrdered, 
    label: "View All Orders",
    description: "Track and manage orders",
    gradient: "from-amber-500 to-orange-500"
  },
  // { 
  //   href: "/superadmin/analytics", 
  //   icon: Activity, 
  //   label: "Analytics",
  //   description: "View detailed insights",
  //   gradient: "from-cyan-500 to-blue-500"
  // },
];

function EnhancedStatCard({ label, value, icon: Icon, gradient, shadowColor, trend, isRevenue, index }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-6 transition-all duration-500 hover:shadow-xl hover:shadow-gray-200 hover:-translate-y-1 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ 
        animationDelay: `${index * 100}ms`,
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {/* Gradient background on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
      
      {/* Icon container */}
      <div className="relative flex items-start justify-between mb-4">
        <div className={`relative p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg ${shadowColor} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="h-6 w-6 text-white" />
          {/* Sparkle effect on hover */}
          <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
          </div>
        </div>
        
        {/* Trend indicator */}
        {trend && (
          <div className="flex items-center gap-1 text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
            <TrendingUp className="h-3 w-3" />
            {trend}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="relative">
        <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
        <p className="text-3xl font-bold text-gray-900 tracking-tight">
          {isRevenue && '₹'}
          {typeof value === 'number' ? value.toLocaleString('en-IN') : value}
        </p>
      </div>

      {/* Bottom gradient line */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
    </div>
  );
}

function QuickActionCard({ href, icon: Icon, label, description, gradient, index }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link 
      href={href}
      className={`group relative overflow-hidden bg-white rounded-xl border border-gray-100 p-5 transition-all duration-300 hover:shadow-lg hover:shadow-gray-200 hover:-translate-y-0.5 ${
        mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
      }`}
      style={{ 
        animationDelay: `${index * 80}ms`,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {/* Gradient accent */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`}></div>
      
      <div className="flex items-start gap-4">
        <div className={`p-2.5 rounded-lg bg-gradient-to-br ${gradient} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
              {label}
            </h3>
            <ArrowUpRight className="h-4 w-4 text-gray-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </div>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </Link>
  );
}

export default function SuperAdminDashboard() {
  const { stats, isLoading, error } = useSuperAdminStats();
  
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const currentTime = new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="space-y-6">
          {/* Top bar with greeting and time */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  Welcome back, Super Admin
                </h1>
                <span className="text-3xl animate-wave">👋</span>
              </div>
              <div className="flex items-center gap-3 text-gray-500">
                <span className="text-sm font-medium">{today}</span>
                <span className="text-gray-300">•</span>
                <span className="text-sm font-medium">{currentTime}</span>
              </div>
            </div>

            {/* Status badge */}
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-emerald-700">All Systems Operational</span>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert type="error" className="animate-shake">
              Could not load dashboard stats: {error.message}
            </Alert>
          )}
        </div>

        {/* Stats Grid */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <h2 className="text-lg font-bold text-gray-900">Overview</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {isLoading
              ? cardConfig.map((card, index) => <StatCardSkeleton key={card.key} />)
              : cardConfig.map((card, index) => (
                  <EnhancedStatCard
                    key={card.key}
                    label={card.label}
                    value={stats[card.key]}
                    icon={card.icon}
                    gradient={card.gradient}
                    shadowColor={card.shadowColor}
                    trend={card.trend}
                    isRevenue={card.isRevenue}
                    index={index}
                  />
                ))}
          </div>
        </div>

        {/* Quick Actions Section */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <QuickActionCard
                key={action.href}
                {...action}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity Card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
              <Activity className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {[
                { action: "New order placed", time: "2 minutes ago", color: "bg-blue-500" },
                { action: "Product updated", time: "15 minutes ago", color: "bg-purple-500" },
                { action: "User registered", time: "1 hour ago", color: "bg-green-500" },
                { action: "Admin account created", time: "3 hours ago", color: "bg-orange-500" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 group hover:bg-gray-50 p-2 -mx-2 rounded-lg transition-colors">
                  <div className={`w-2 h-2 ${item.color} rounded-full mt-2`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{item.action}</p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Health Card */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-lg text-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">System Health</h3>
              <div className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-xs font-semibold text-emerald-300">
                Excellent
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: "Server Uptime", value: "99.9%", progress: 99 },
                { label: "Response Time", value: "45ms", progress: 92 },
                { label: "Database Load", value: "32%", progress: 32 },
              ].map((metric, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-300">{metric.label}</span>
                    <span className="text-sm font-bold text-white">{metric.value}</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full transition-all duration-1000"
                      style={{ width: `${metric.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-15deg); }
        }
        .animate-wave {
          display: inline-block;
          animation: wave 2.5s ease-in-out infinite;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.5s;
        }
      `}</style>
    </div>
  );
}