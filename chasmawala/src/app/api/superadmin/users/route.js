// src/app/api/superadmin/users/route.js

import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import User from "@/models/userModel";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);

    if (!currentUser || currentUser.role !== "superadmin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const users = await User.find({ role: "customer" }); // only fetch users
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }
}
