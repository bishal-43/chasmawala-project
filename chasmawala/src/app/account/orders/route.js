"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Orders() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/account/login"); // Redirect to login if not logged in
    } else {
      setUser(JSON.parse(storedUser));
      // Mock orders data (You can fetch real orders from the database)
      setOrders([
        { id: 1, product: "Sunglasses", status: "Delivered" },
        { id: 2, product: "Eyeglasses", status: "Shipped" },
      ]);
    }
  }, [router]);

  if (!user) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">My Orders</h2>
        {orders.length === 0 ? (
          <p className="text-gray-600">No orders found.</p>
        ) : (
          <ul className="space-y-2">
            {orders.map((order) => (
              <li key={order.id} className="p-2 border rounded-md">
                {order.product} - <span className="font-semibold">{order.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
