import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import Order from "@/models/orderModel";
import { verifyAdminToken } from "@/utils/verifyToken";

export async function GET(req) {
  try {
    // Verify admin or superadmin token
    const isVerified = await verifyAdminToken(req);
    if (!isVerified) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const orders = await Order.find({})
      .populate("userId", "name email") // populate user info if needed
      .sort({ createdAt: -1 })
      .lean();

    const formattedOrders = orders.map((order) => ({
      id: order._id,
      customerName:
        order.shippingAddress?.fullName ||
        order.userId?.name ||
        "Guest",
      status: order.status || "Pending",
      total: order.totalAmount,
      date: order.createdAt,
    }));

    return NextResponse.json({ orders: formattedOrders });
  } catch (error) {
    console.error("Order Fetch Error:", error);
    return NextResponse.json(
      { error: "Something went wrong while fetching orders." },
      { status: 500 }
    );
  }
}
