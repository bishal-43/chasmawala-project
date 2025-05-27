"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function OrderSuccess() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || Math.floor(Math.random() * 1000000);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md text-center w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-green-600">🎉 Order Placed Successfully!</h1>
        <p className="text-gray-600">Thank you for shopping with us.</p>
        <p className="text-gray-500">
          Your Order ID: <span className="font-semibold text-black">#{orderId}</span>
        </p>

        <div className="flex gap-4 justify-center mt-6">
          <Link
            href="/orders"
            aria-label="View Order History"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition"
          >
            📦 View Orders
          </Link>

          <Link
            href="/"
            aria-label="Continue Shopping"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
          >
            🛍️ Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
