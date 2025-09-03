"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { useAuth } from "@/contexts/authContext"; // Import useAuth
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth(); // Get user and authLoading from context
  const router = useRouter();

  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    revenue: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [dashboardDataLoading, setDashboardDataLoading] = useState(true); // Separate loading for dashboard data

  // Effect to handle authentication and redirection
  useEffect(() => {
    // 1. If authentication is still loading, do nothing.
    // Show a general loading indicator for the entire page.
    if (authLoading) {
      return;
    }

    // 2. If authentication has finished (authLoading is false) but no user is found,
    // redirect to the admin login page.
    if (!user) {
      router.replace("/admin/login");
      return; // Stop further execution of this useEffect instance
    }

    // 3. If a user is found, but their role is not 'admin' or 'superadmin',
    // redirect to an unauthorized page (or home).
    if (user.role !== "admin" && user.role !== "superadmin") {
      router.replace("/unauthorized"); // Create this page if it doesn't exist
      return; // Stop further execution
    }

    // If we reach here, the user is authenticated and authorized.
    // Now, fetch the dashboard specific data.
    const fetchDashboardData = async () => {
      setDashboardDataLoading(true); // Start loading for dashboard data
      try {
        // Ensure this API route is protected by your middleware as well
        const res = await fetch("/api/admin/dashboard");
        if (!res.ok) {
          // Handle cases where dashboard data fetch fails (e.g., server error)
          console.error("Failed to fetch dashboard data:", res.statusText);
          // Optionally, redirect or show an error message
          // router.replace("/error-page");
          return;
        }
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
        setDashboardDataLoading(false); // Finish loading for dashboard data
      }
    };

    fetchDashboardData();

  }, [user, authLoading, router]); // Dependencies: user, authLoading, and router

  // Display a loading message while authentication is being checked
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading user session...</p>
        {/* You can replace this with a more sophisticated spinner */}
      </div>
    );
  }

  // If authLoading is false but no user is found (meaning user is not authenticated),
  // this component won't render its content because the useEffect above will redirect.
  // However, if for some reason it falls through, you might want a fallback.
  // This check is mostly redundant due to the useEffect, but good for clarity.
  if (!user) {
    return null; // Or a message like "You are not authorized to view this page."
  }

  // Display a loading message while dashboard data is being fetched (after auth is confirmed)
  if (dashboardDataLoading) {
    return <p className="p-6 text-lg text-gray-600">Loading dashboard data...</p>;
  }

  // Render the dashboard content once both authentication and data loading are complete
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-muted-foreground">Manage products, orders, users, and view performance.</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{stats.products}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{stats.orders}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">₹{stats.revenue.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="rounded-md border">
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
                  <TableCell>#{order._id.slice(-5).toUpperCase()}</TableCell>
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
      </div>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case "Delivered":
      return "text-green-600";
    case "Pending":
      return "text-yellow-600";
    case "Cancelled":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

export default Dashboard;
