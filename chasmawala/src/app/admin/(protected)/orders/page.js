// src/app/admin/orders/page.js
"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all orders
  useEffect(() => {
    fetch("/api/admin/orders")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
      })
      .then((data) => {
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Something went wrong while fetching orders.");
        setLoading(false);
      });
  }, []);

  // Update order status
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update order status");

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Error updating order:", err);
    }
  };

  if (loading) return <div className="p-4 text-gray-500">Loading orders...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Manage Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <p className="text-gray-500">No orders found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-200 rounded-md shadow-sm">
                <thead className="bg-gray-100 text-gray-700 text-sm">
                  <tr>
                    <th className="px-4 py-2 border">Order ID</th>
                    <th className="px-4 py-2 border">Customer</th>
                    <th className="px-4 py-2 border">Status</th>
                    <th className="px-4 py-2 border">Total</th>
                    <th className="px-4 py-2 border">Date</th>
                    <th className="px-4 py-2 border">Update</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-2 border">{order.id}</td>
                      <td className="px-4 py-2 border">
                        {order.customerName ||
                          order.user?.name ||
                          order.shippingAddress?.fullName ||
                          "Unknown"}
                      </td>
                      <td className="px-4 py-2 border">{order.status}</td>
                      <td className="px-4 py-2 border">
                        ₹{Number(order.total).toFixed(2)}
                      </td>
                      <td className="px-4 py-2 border">
                        {order.date
                          ? new Date(order.date).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="px-4 py-2 border">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value)
                          }
                          className="border rounded px-2 py-1"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for Delivery">
                            Out for Delivery
                          </option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
