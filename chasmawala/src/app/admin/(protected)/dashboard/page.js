// chasmawala/src/app/admin/(protected)/dashboard/page.js

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  ShoppingBag, 
  CreditCard, 
  Layers, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ArrowRight 
} from "lucide-react";
import Link from "next/link";

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [dashboardDataLoading, setDashboardDataLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/admin/login");
      return;
    }
    if (user.role !== "admin" && user.role !== "superadmin") {
      router.replace("/unauthorized");
      return;
    }

    const fetchDashboardData = async () => {
      setDashboardDataLoading(true);
      try {
        const res = await fetch("/api/admin/dashboard");
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        
        const data = await res.json();
        setStats({
          products: data.productCount,
          orders: data.orderCount,
          revenue: data.totalRevenue,
        });
        setRecentOrders(data.recentOrders);
      } catch (error) {
        console.error("Dashboard data fetch error:", error);
      } finally {
        setDashboardDataLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, authLoading, router]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getStatusPill = (status) => {
    switch (status) {
      case "Delivered":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30">
            <CheckCircle2 className="h-3 w-3" />
            Delivered
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30">
            <Clock className="h-3 w-3" />
            Pending
          </span>
        );
      case "Cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/30">
            <XCircle className="h-3 w-3" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-zinc-50 text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800">
            <AlertTriangle className="h-3 w-3" />
            {status}
          </span>
        );
    }
  };

  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 min-h-[300px] gap-3">
        <div className="w-8 h-8 rounded-full border-4 border-zinc-200 border-t-amber-500 animate-spin" />
        <p className="text-zinc-500 text-sm font-medium">Loading user session...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Redirecting...
  }
  
  if (dashboardDataLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 min-h-[300px] gap-3">
        <div className="w-8 h-8 rounded-full border-4 border-zinc-200 border-t-amber-500 animate-spin" />
        <p className="text-zinc-500 text-sm font-medium">Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Welcome Header */}
      <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight dark:text-zinc-50">
            {getGreeting()}, {user?.name || "Admin"}
          </h1>
          <p className="text-[14px] text-zinc-500 font-medium">
            Here's what's happening with Chasmawala today.
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0 text-xs font-semibold bg-white border border-zinc-150 rounded-xl px-4 py-2 text-zinc-600 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Live updates active
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Products */}
        <Card className="relative overflow-hidden border border-zinc-100 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 dark:border-zinc-800">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-amber-400 to-amber-600" />
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Total Products</p>
                <h3 className="text-3xl font-extrabold text-zinc-900 mt-2 tracking-tight dark:text-zinc-50">{stats.products}</h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform duration-300 dark:bg-amber-500/20 dark:text-amber-400">
                <Layers className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-4 text-xs font-medium text-amber-600 dark:text-amber-400">
              <TrendingUp className="h-3.5 w-3.5 animate-pulse" />
              <span>Active inventory items</span>
            </div>
          </CardContent>
        </Card>

        {/* Total Orders */}
        <Card className="relative overflow-hidden border border-zinc-100 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 dark:border-zinc-800">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-indigo-500 to-violet-600" />
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Total Orders</p>
                <h3 className="text-3xl font-extrabold text-zinc-900 mt-2 tracking-tight dark:text-zinc-50">{stats.orders}</h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform duration-300 dark:bg-indigo-500/20 dark:text-indigo-400">
                <ShoppingBag className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-4 text-xs font-medium text-indigo-600 dark:text-indigo-400">
              <TrendingUp className="h-3.5 w-3.5 animate-pulse" />
              <span>Transactions processed</span>
            </div>
          </CardContent>
        </Card>

        {/* Revenue */}
        <Card className="relative overflow-hidden border border-zinc-100 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 dark:border-zinc-800">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-emerald-400 to-teal-600" />
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Revenue</p>
                <h3 className="text-3xl font-extrabold text-zinc-900 mt-2 tracking-tight dark:text-zinc-50">₹{stats.revenue.toLocaleString("en-IN")}</h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform duration-300 dark:bg-emerald-500/20 dark:text-emerald-400">
                <CreditCard className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-4 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="h-3.5 w-3.5 animate-pulse" />
              <span>Total earnings to date</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Section */}
      <Card className="border border-zinc-100 dark:border-zinc-800 shadow-sm rounded-2xl overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 py-5 bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <CardTitle className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Recent Orders</CardTitle>
            <CardDescription className="text-xs text-zinc-400 mt-1">Check recent purchases and client logs.</CardDescription>
          </div>
          <Link 
            href="/admin/orders" 
            className="inline-flex items-center gap-1 text-xs font-bold text-amber-500 hover:text-amber-600 hover:underline transition-colors"
          >
            View all orders
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          
          {/* Mobile View (List of Cards) */}
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800 md:hidden">
            {recentOrders.length === 0 ? (
              <p className="p-6 text-center text-sm text-zinc-400">No recent orders found.</p>
            ) : (
              recentOrders.map((order) => (
                <div key={order._id} className="p-5 flex flex-col gap-3 hover:bg-zinc-50/40 transition duration-150">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-sm text-zinc-800 dark:text-zinc-200">{order.customerName}</p>
                      <p className="text-[11px] font-semibold text-zinc-400 mt-0.5">#{order._id.slice(-6).toUpperCase()}</p>
                    </div>
                    <p className="font-extrabold text-zinc-900 dark:text-zinc-50">₹{order.totalAmount}</p>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-zinc-50 dark:border-zinc-900">
                    {getStatusPill(order.status)}
                    <span className="text-xs font-medium text-zinc-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desktop View (Table) */}
          <div className="hidden md:block">
            <Table>
              <TableHeader className="bg-zinc-50/50 dark:bg-zinc-900/50">
                <TableRow className="border-b border-zinc-100 hover:bg-transparent dark:border-zinc-800">
                  <TableHead className="px-6 py-3.5 text-xs font-bold text-zinc-400 uppercase tracking-wider">Order ID</TableHead>
                  <TableHead className="px-6 py-3.5 text-xs font-bold text-zinc-400 uppercase tracking-wider">Customer</TableHead>
                  <TableHead className="px-6 py-3.5 text-xs font-bold text-zinc-400 uppercase tracking-wider">Date</TableHead>
                  <TableHead className="px-6 py-3.5 text-xs font-bold text-zinc-400 uppercase tracking-wider">Status</TableHead>
                  <TableHead className="px-6 py-3.5 text-xs font-bold text-zinc-400 uppercase tracking-wider text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="p-6 text-center text-sm text-zinc-400">
                      No recent orders found.
                    </TableCell>
                  </TableRow>
                ) : (
                  recentOrders.map((order) => (
                    <TableRow key={order._id} className="border-b border-zinc-100 hover:bg-zinc-50/30 transition dark:border-zinc-800">
                      <TableCell className="px-6 py-4 text-xs font-bold text-zinc-400">#{order._id.slice(-6).toUpperCase()}</TableCell>
                      <TableCell className="px-6 py-4 font-semibold text-zinc-800 dark:text-zinc-200">{order.customerName}</TableCell>
                      <TableCell className="px-6 py-4 text-sm text-zinc-500 font-medium">{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="px-6 py-4">{getStatusPill(order.status)}</TableCell>
                      <TableCell className="px-6 py-4 text-right font-bold text-zinc-900 dark:text-zinc-50">₹{order.totalAmount.toLocaleString("en-IN")}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;