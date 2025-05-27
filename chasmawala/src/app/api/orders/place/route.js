// /src/app/api/orders/place/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import Order from "@/models/order";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const JWT_SECRET = process.env.JWT_SECRET;

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
    const { items, totalAmount } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "At least one order item is required" },
        { status: 400 }
      );
    }

    if (typeof totalAmount !== "number" || totalAmount <= 0) {
      return NextResponse.json(
        { error: "Valid positive total amount is required" },
        { status: 400 }
      );
    }

    // Process order items
    const processedItems = items.map((item, index) => {
      // Validate required fields
      if (!item.productId) {
        throw new Error(`Item ${index}: productId is required`);
      }
      if (!item.quantity || Number(item.quantity) <= 0) {
        throw new Error(`Item ${index}: valid quantity is required`);
      }

      // Convert productId to ObjectId
      let productId;
      try {
        productId = new mongoose.Types.ObjectId(item.productId.toString());
      } catch (err) {
        throw new Error(`Item ${index}: invalid productId format`);
      }

      return {
        name: item.name || `Product ${item.productId}`,
        price: Number(item.price) || 0,
        quantity: Number(item.quantity),
        image: item.image || "/default-product.jpg",
        productId: productId,
      };
    });

    // Create and save order
    const newOrder = new Order({
      userId: new mongoose.Types.ObjectId(userId),
      items: processedItems,
      totalAmount: totalAmount,
      status: "Pending", // Must match enum exactly
    });

    const savedOrder = await newOrder.save();

    return NextResponse.json(
      {
        message: "Order placed successfully",
        orderId: savedOrder._id,
        status: savedOrder.status,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Order Placement Error:", error);

    // Specific error responses
    if (error.name === "JsonWebTokenError") {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    if (error.message.includes("invalid productId format")) {
      return NextResponse.json(
        { error: "Product IDs must be valid MongoDB IDs" },
        { status: 400 }
      );
    }
    if (error.message.includes("valid quantity is required")) {
      return NextResponse.json(
        { error: "All items must have positive quantities" },
        { status: 400 }
      );
    }
    if (error.name === "ValidationError") {
      return NextResponse.json(
        { error: error.message.replace("ValidationError: ", "") },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to place order",
        details: error.message,
      },
      { status: 500 }
    );
  }
}