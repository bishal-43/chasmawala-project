// /src/app/api/auth/check-auth/route.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/config/db';
import User from '@/models/userModel';

const JWT_SECRET = process.env.JWT_SECRET ;

export async function GET(req) {
  try {
    await connectDB(); // ✅ Ensure DB is connected
    const cookieStore = cookies();
    const token = cookieStore.get("admin-token")?.value || cookieStore.get("token")?.value;

    console.log("Token in check-auth:", token);

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("✅ Decoded token:", decoded);

    // ✅ Fetch user from DB
    const user = await User.findById(decoded.id)
    console.log("👤 User fetched from DB:", user);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!["customer","admin", "superadmin"].includes(user.role)) {
      console.warn("🚫 Invalid role or user not allowed:", user?.role);
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    let redirectPath = "/";
    if (user.role === "admin") redirectPath = "/admin";
    else if (user.role === "superadmin") redirectPath = "/superadmin";
    else if (user.role === "customer") redirectPath = "/profile";

    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      redirectPath,
    });
     
  } catch (error) {
    // console.error("❌ Auth Check Failed:", error);
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }
}
