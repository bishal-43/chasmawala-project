// src/app/order-success/page.js

"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// A dedicated SVG icon component for better visuals and reusability
const CheckCircleIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);


export default function OrderSuccess() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    // Read orderId from URL. If it's missing, generate a random one.
    // This now happens client-side, avoiding server/client mismatches.
    const idFromParams = searchParams.get("orderId");
    if (idFromParams) {
      setOrderId(idFromParams);
    } else {
      setOrderId(Math.floor(100000 + Math.random() * 900000).toString());
    }
  }, [searchParams]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        {/* Animated Icon */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 animate-pop-in">
          <CheckCircleIcon className="h-10 w-10 text-green-600" />
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">Order Confirmed!</h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your items will be on their way shortly.
          </p>
          {orderId ? (
            <p className="pt-2 text-sm text-gray-500">
              Your Order ID is:
              <span className="ml-1 font-semibold text-gray-900">#{orderId}</span>
            </p>
          ) : (
            // A simple loading state while orderId is being set
            <div className="h-6 w-48 mx-auto mt-2 animate-pulse rounded-md bg-gray-200" />
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/collections"
            className="w-full rounded-lg bg-blue-600 px-5 py-3 text-base font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Continue Shopping
          </Link>
          <Link
            href="/orders"
            className="w-full rounded-lg border border-gray-300 bg-white px-5 py-3 text-base font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            View Order History
          </Link>
        </div>
      </div>
    </div>
  );
}