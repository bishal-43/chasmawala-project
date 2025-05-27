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
