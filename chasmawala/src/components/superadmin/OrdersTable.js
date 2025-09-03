// src/components/superadmin/OrdersTable.js

import React from 'react';

// A map to define badge styles, keeping JSX clean
const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  completed: "bg-green-100 text-green-700",
  shipped: "bg-blue-100 text-blue-700",
  cancelled: "bg-red-100 text-red-700",
  default: "bg-gray-200 text-gray-600",
};

// A small, dedicated component for the status badge
const OrderStatusBadge = ({ status }) => {
  const style = statusStyles[status] || statusStyles.default;
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${style}`}>
      {status}
    </span>
  );
};

// A component for a single table row
const OrderRow = ({ order }) => (
  <tr key={order._id} className="border-b hover:bg-gray-50">
    <td className="px-4 py-2 border font-mono text-xs">{order._id}</td>
    <td className="px-4 py-2 border">{order.user?.name || "N/A"}</td>
    <td className="px-4 py-2 border">₹{order.totalAmount?.toFixed(2) || "0.00"}</td>
    <td className="px-4 py-2 border">
      <OrderStatusBadge status={order.status} />
    </td>
    <td className="px-4 py-2 border">
      {new Date(order.createdAt).toLocaleDateString("en-IN")}
    </td>
  </tr>
);

// The main table component
export function OrdersTable({ orders }) {
  if (orders.length === 0) {
    return <p>No orders found.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2 border">Order ID</th>
            <th className="text-left px-4 py-2 border">Customer</th>
            <th className="text-left px-4 py-2 border">Total</th>
            <th className="text-left px-4 py-2 border">Status</th>
            <th className="text-left px-4 py-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrderRow key={order._id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
}