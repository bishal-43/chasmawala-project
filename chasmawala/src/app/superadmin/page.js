// src/app/superadmin/page.js

"use client";

import { useSuperAdminStats } from "@/hooks/useSuperAdminStats";
import { StatCard, StatCardSkeleton } from "@/components/superadmin/StatCard";
import { Alert } from "@/components/ui/alert"; // Assumed component
import { Users, ShoppingCart, Box, UserCog, ListOrdered, PlusCircle, IndianRupee } from "lucide-react";
import Link from 'next/link';

// Card configuration is defined outside the component to prevent re-creation on render
const cardConfig = [
  { label: "Admins", icon: <UserCog className="h-6 w-6 text-white" />, key: "totalAdmins", color: "bg-indigo-500" },
  { label: "Users", icon: <Users className="h-6 w-6 text-white" />, key: "totalUsers", color: "bg-green-500" },
  { label: "Orders", icon: <ShoppingCart className="h-6 w-6 text-white" />, key: "totalOrders", color: "bg-yellow-500" },
  { label: "Products", icon: <Box className="h-6 w-6 text-white" />, key: "totalProducts", color: "bg-rose-500" },
  { label: "Revenue", icon: <IndianRupee className="h-6 w-6 text-white" />, key: "totalRevenue", color: "bg-teal-500" },
];

export default function SuperAdminDashboard() {
  const { stats, isLoading, error } = useSuperAdminStats();
  
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Welcome, Super Admin!</h1>
        <p className="text-gray-500">{today}</p>
      </div>
      
      {error && <Alert type="error">Could not load dashboard stats: {error.message}</Alert>}

      {/* Grid for Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? cardConfig.map((card) => <StatCardSkeleton key={card.key} />)
          : cardConfig.map((card) => (
              <StatCard
                key={card.key}
                label={card.label}
                value={stats[card.key]}
                icon={card.icon}
                color={card.color}
              />
            ))}
      </div>

      {/* Quick Actions Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/superadmin/admins" className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm hover:bg-gray-100 transition">
                <UserCog className="h-5 w-5 text-indigo-500" />
                <span className="font-medium">Manage Admins</span>
            </Link>
            <Link href="/superadmin/products" className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm hover:bg-gray-100 transition">
                <Box className="h-5 w-5 text-rose-500" />
                <span className="font-medium">Manage Products</span>
            </Link>
            <Link href="/superadmin/orders" className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm hover:bg-gray-100 transition">
                <ListOrdered className="h-5 w-5 text-yellow-500" />
                <span className="font-medium">View All Orders</span>
            </Link>
        </div>
      </div>
    </div>
  );
}