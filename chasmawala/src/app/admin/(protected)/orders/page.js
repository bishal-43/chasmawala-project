// src/app/admin/orders/page.js
"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

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
                    <th className="px-4 py-2 border">Products</th>
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
                      <td className="px-4 py-2 border">
                        <div className="flex flex-col gap-2 max-w-xs">
                          {order.items && order.items.length > 0 ? (
                            order.items.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 text-xs cursor-pointer hover:bg-gray-100 p-1.5 rounded transition duration-150 border border-transparent hover:border-gray-200"
                                onClick={() => setSelectedProduct(item)}
                                title="Click to view details"
                              >
                                {item.image ? (
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-10 h-10 object-cover rounded border border-gray-200"
                                  />
                                ) : (
                                  <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded border border-gray-200 text-[10px] text-gray-400">
                                    No Img
                                  </div>
                                )}
                                <div>
                                  <div className="font-semibold text-gray-800 line-clamp-1">
                                    {item.name}
                                  </div>
                                  <div className="text-gray-500 text-[11px]">
                                    Qty: {item.quantity} × ₹{Number(item.price).toFixed(2)}
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <span className="text-gray-400 text-xs italic">No products</span>
                          )}
                        </div>
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

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-all duration-300 animate-in fade-in"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 p-6 flex flex-col items-center gap-4 transition-all transform animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Product Image */}
            <div className="w-full aspect-square max-h-72 overflow-hidden rounded-xl bg-gray-50 border border-gray-100 shadow-inner flex items-center justify-center">
              {selectedProduct.image ? (
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <span className="text-gray-400">No Image Available</span>
              )}
            </div>

            {/* Product Info */}
            <div className="text-center w-full">
              <h3 className="text-xl font-bold text-gray-900 leading-snug break-words">
                {selectedProduct.name}
              </h3>
            </div>

            {/* Details Grid */}
            <div className="w-full grid grid-cols-2 gap-4 mt-2 border-t border-gray-150 pt-4 text-sm">
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Unit Price</span>
                <span className="text-lg font-bold text-emerald-600 mt-1">₹{Number(selectedProduct.price).toFixed(2)}</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Quantity</span>
                <span className="text-lg font-bold text-gray-800 mt-1">{selectedProduct.quantity}</span>
              </div>
            </div>

            {/* Total Item Value */}
            <div className="w-full flex justify-between items-center px-4 py-3 bg-emerald-50/50 border border-emerald-100/50 rounded-xl mt-2">
              <span className="text-gray-600 font-medium">Subtotal</span>
              <span className="text-xl font-extrabold text-emerald-700">₹{Number(selectedProduct.price * selectedProduct.quantity).toFixed(2)}</span>
            </div>

            {/* Action button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="w-full mt-2 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition duration-200 shadow-md hover:shadow-lg"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
