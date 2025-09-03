// src/app/superadmin/orders/page.js

"use client";

import { useSuperAdminOrders } from "@/hooks/useSuperAdminOrders";
import { OrdersTable } from "@/components/superadmin/OrdersTable";
import { OrdersTableSkeleton } from "@/components/superadmin/OrdersTableSkeleton";

export default function OrdersPage() {
  const { orders, isLoading, error } = useSuperAdminOrders();

  const renderContent = () => {
    if (isLoading) {
      return <OrdersTableSkeleton />;
    }
    if (error) {
      return <p className="text-red-600">Error: {error.message}</p>;
    }
    return <OrdersTable orders={orders} />;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All Orders</h1>
      {renderContent()}
    </div>
  );
}