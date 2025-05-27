// /src/app/api/orders/checkout/route.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/config/db";
import Order from "@/models/order";
import mongoose from "mongoose";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret";

export async function POST(req) {
  await connectDB();

  try {
    // Authentication
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user ID from token
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;
    if (!userId) {
      return NextResponse.json({ error: "Invalid user" }, { status: 401 });
    }

    // Parse and validate request data
    const { orderItems, totalAmount } = await req.json();

    if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
      return NextResponse.json({ error: "Order items required" }, { status: 400 });
    }

    if (typeof totalAmount !== "number" || totalAmount <= 0) {
      return NextResponse.json({ error: "Valid total amount required" }, { status: 400 });
    }

    // Process order items
    const processedItems = orderItems.map(item => {
      if (!item.quantity || item.quantity <= 0) {
        throw new Error("Invalid quantity");
      }

      return {
        ...item,
        productId: new mongoose.Types.ObjectId(item.productId.toString()),
        quantity: Number(item.quantity)
      };
    });

    // Create order
    const newOrder = new Order({
      userId: new mongoose.Types.ObjectId(userId),
      items: processedItems,
      totalAmount,
      status: "Pending" // Must match enum exactly
    });

    const savedOrder = await newOrder.save();

    console.log("Cart Items:", cartItems);

    return NextResponse.json(
      { message: "Order placed", order: savedOrder },
      { status: 201 }
    );

  } catch (error) {
    console.error("❌ Order Placement Error:", error);
    
    // Enhanced error responses
    if (error.name === "JsonWebTokenError") {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    if (error.message.includes("Invalid quantity")) {
      return NextResponse.json({ error: "All items need valid quantities" }, { status: 400 });
    }
    if (error.name === "CastError") {
      return NextResponse.json({ error: "Invalid product ID format" }, { status: 400 });
    }
    if (error.name === "ValidationError") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}