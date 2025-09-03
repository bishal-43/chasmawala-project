// /src/app/api/orders/route.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/config/db";
import Order from "@models/orderModel";
import User from "@/models/userModel";

const JWT_SECRET = process.env.JWT_SECRET ;

export async function GET(req) {
  await connectDB();

  const token = req.cookies.get("auth-token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
