// src/app/api/admin/dashboard/route.js
import { connectDB } from "@/config/db";
import Product from "@/models/productModel";
import Order from "@/models/orderModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();

    const productCount = await Product.countDocuments();
    const orderCount = await Order.countDocuments();
    const totalRevenueResult = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    const totalRevenue = totalRevenueResult[0]?.total || 0;

    const recentOrders = await Order.find({})
      .populate("userId", "name")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const formattedRecentOrders = recentOrders.map((order) => ({
      _id: order._id,
      customerName:
        order.shippingAddress?.fullName ||
        order.userId?.name ||
        "Guest",
      totalAmount: order.totalAmount,
      status: order.status || "Pending",
      createdAt: order.createdAt,
    }));

    return NextResponse.json({
      productCount,
      orderCount,
      totalRevenue,
      recentOrders: formattedRecentOrders,
    });
  } catch (err) {
    console.error("Dashboard API error:", err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
