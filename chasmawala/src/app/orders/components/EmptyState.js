// src/app/orders/_components/EmptyState.js

import Link from "next/link";

const ShoppingBagIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.658-.463 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);

export default function EmptyState() {
  return (
    <div className="text-center bg-white border-2 border-dashed rounded-lg p-12">
      <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-xl font-semibold text-gray-900">No orders yet</h3>
      <p className="mt-1 text-sm text-gray-500">
        You haven't placed any orders with us. Let's change that!
      </p>
      <div className="mt-6">
        <Link
          href="/collections"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Start Shopping
        </Link>
      </div>
    </div>
  );
}