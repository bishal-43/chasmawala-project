// src/app/api/admin/customers/route.js

import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import User from "@/models/userModel"; // Assuming your user model is named User

export async function GET() {
  try {
    await connectDB();

    // Find all users with the role 'user' to list as customers
    // .select() ensures you only send non-sensitive data to the frontend
    const customers = await User.find({ role: 'user' })
      .select("name email createdAt")
      .sort({ createdAt: -1 });

    return NextResponse.json(customers, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching customers." },
      { status: 500 }
    );
  }
}