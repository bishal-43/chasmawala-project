import { NextResponse } from "next/server";
import { withSuperadminAuth } from "@/lib/api/withSuperAdminAuth";
import User from "@/models/userModel";
import Order from "@/models/orderModel";
import Product from "@/models/productModel";

const getStatsHandler = async (req) => {
  // Run all database queries in parallel for maximum efficiency.
  const [
    totalAdmins,
    totalUsers,
    totalOrders,
    totalProducts,
    revenueResult // Add revenue calculation here
  ] = await Promise.all([
    User.countDocuments({ role: "admin" }),
    User.countDocuments({ role: "customer" }), // Assuming 'customer' is the correct role
    Order.countDocuments(),
    Product.countDocuments(),
    Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]),
  ]);

  // Safely extract the total revenue from the aggregation result
  const totalRevenue = revenueResult[0]?.total || 0;

  return NextResponse.json({
    totalAdmins,
    totalUsers,
    totalOrders,
    totalProducts,
    totalRevenue, // Include revenue in the final response
  });
};

// Export the handler wrapped in our authentication middleware.
export const GET = withSuperadminAuth(getStatsHandler);