//src/app/orders/page.js
/*
"use client";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders", { credentials: "include" });
        const data = await res.json();
        if (res.ok) {
          setOrders(data.orders);
        } else {
          console.error("❌ Failed to fetch orders");
        }
      } catch (err) {
        console.error("❌ Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!orders.length)
    return <p className="text-center mt-10">No orders found yet.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🧾 Order History</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white shadow rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>🆔 #{order._id.slice(-6)}</span>
              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="text-gray-700">Status: {order.status}</div>
            <div className="text-gray-700 font-semibold">
              ₹ {order.totalAmount.toFixed(2)}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 border rounded p-2">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover" />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
*/


// src/app/orders/page.js

"use client";

import { useEffect, useState } from "react";
import OrderCard from "./components/OrderCard";
import OrderSkeleton from "./components/OrderSkeleton";
import EmptyState from "./components/EmptyState";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders", { credentials: "include" });
        if (!res.ok) {
          throw new Error(`Failed to fetch orders: ${res.statusText}`);
        }
        const data = await res.json();
        // Sort orders by most recent first
        const sortedOrders = data.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sortedOrders);
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const renderContent = () => {
    if (loading) {
      // Show 3 skeleton cards while loading
      return Array.from({ length: 3 }).map((_, i) => <OrderSkeleton key={i} />);
    }

    if (error) {
      return <p className="text-center text-red-500 mt-10">Error: {error}</p>;
    }
    
    if (orders.length === 0) {
      return <EmptyState />;
    }

    return orders.map((order) => <OrderCard key={order._id} order={order} />);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Order History
          </h1>
          <p className="mt-1 text-gray-500">
            Check the status of your recent orders.
          </p>
        </header>
        <main className="space-y-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}