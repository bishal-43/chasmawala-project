import { NextResponse } from "next/server";
import { withSuperadminAuth } from "@/lib/api/withSuperAdminAuth";
import Order from "@/models/orderModel";
import User from "@/models/userModel"; // Still needed for Mongoose to know about the model for population

// The core logic for this route, assuming authentication has passed.
const getOrdersHandler = async () => {
  const orders = await Order.find({})
    .populate({
      path: 'userId',
      model: User,
      select: 'name email' // Select specific fields from the User model
    })
    .sort({ createdAt: -1 }); // Sort by newest first

  return NextResponse.json({ orders });
};

// Export the handler wrapped in our authentication middleware.
export const GET = withSuperadminAuth(getOrdersHandler);