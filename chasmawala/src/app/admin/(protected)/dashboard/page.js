// chasmawala/src/app/admin/(protected)/dashboard/page.js

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

  if (authLoading) {
    return <div className="flex items-center justify-center p-6"><p>Loading user session...</p></div>;
  }

  if (!user) {
    return null; // Redirecting...
  }
  
  if (dashboardDataLoading) {
    return <div className="flex items-center justify-center p-6"><p>Loading dashboard data...</p></div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader><CardTitle>Total Products</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-semibold">{stats.products}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Total Orders</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-semibold">{stats.orders}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Revenue</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-semibold">₹{stats.revenue.toLocaleString("en-IN")}</p></CardContent>
        </Card>
      </div>

      {/* Recent Orders Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>A list of the most recent orders.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* ✨ KEY CHANGE: Mobile View (List of Cards) ✨ */}
          <div className="space-y-4 md:hidden">
            {recentOrders.map((order) => (
              <div key={order._id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{order.customerName}</p>
                    <p className="text-sm text-muted-foreground">#{order._id.slice(-6).toUpperCase()}</p>
                  </div>
                  <p className="font-bold text-lg">₹{order.totalAmount}</p>
                </div>
                <div className="flex justify-between items-center mt-2 pt-2 border-t">
                  <span className={`font-medium text-sm ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ✨ KEY CHANGE: Desktop View (Table) ✨ */}
          <div className="hidden rounded-md border md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>#{order._id.slice(-6).toUpperCase()}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <span className={`font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">₹{order.totalAmount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case "Delivered": return "text-green-600";
    case "Pending": return "text-yellow-600";
    case "Cancelled": return "text-red-600";
    default: return "text-gray-600";
  }
};

export default Dashboard;