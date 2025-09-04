// src/lib/auth.js
import jwt from "jsonwebtoken";
import User from "@/models/userModel";
import { connectDB } from "@/config/db";
import { cookies } from "next/headers";

export async function verifyToken(token, allowedRoles = []) {
  try {
    await connectDB();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    return user && allowedRoles.includes(user.role);
  } catch {
    return false;
  }
}


export async function getUserFromToken(req) {
  try {
    // 1. Get cookies (App Router way, async)
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    // 2. Or check Authorization header (fallback)
    const authHeader = req.headers.get("authorization");
    const headerToken = authHeader?.split(" ")[1];

    const finalToken = token || headerToken;
    if (!finalToken) return null;

    // 3. Verify token
    const decoded = jwt.verify(finalToken, process.env.JWT_SECRET);
    if (!decoded?.id) return null;

    // 4. Fetch user from DB
    const user = await User.findById(decoded.id).select("-password");
    return user || null;
  } catch (err) {
    console.error("getUserFromToken error:", err);
    return null;
  }
}

export const verifyAdminToken = (token) => verifyToken(token, ['admin', 'superadmin']);
export const verifySuperadminToken = (token) => verifyToken(token, ['superadmin']);

