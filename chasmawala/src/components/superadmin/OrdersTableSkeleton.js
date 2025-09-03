// src/components/superadmin/OrdersTableSkeleton.js

// A skeleton loader that mimics the table structure for a better UX
export function OrdersTableSkeleton() {
  const SkeletonRow = () => (
    <tr className="border-b">
      <td className="px-4 py-4 border"><div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div></td>
      <td className="px-4 py-4 border"><div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div></td>
      <td className="px-4 py-4 border"><div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div></td>
      <td className="px-4 py-4 border"><div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div></td>
      <td className="px-4 py-4 border"><div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div></td>
    </tr>
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left px-4 py-2 border">Order ID</th>
            <th className="text-left px-4 py-2 border">Customer</th>
            <th className="text-left px-4 py-2 border">Total</th>
            <th className="text-left px-4 py-2 border">Status</th>
            <th className="text-left px-4 py-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {/* Render several skeleton rows */}
          {[...Array(5)].map((_, i) => <SkeletonRow key={i} />)}
        </tbody>
      </table>
    </div>
  );
}