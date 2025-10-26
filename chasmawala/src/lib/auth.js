// chasmawala/src/lib/auth.js

import jwt from "jsonwebtoken";
import User from "@/models/userModel";
import { connectDB } from "@/config/db";
import { cookies } from "next/headers";

/**
 * Verifies a token, finds the user, and checks their role.
 * @param {string} token - The JWT token.
 * @param {string[]} allowedRoles - Array of roles (e.g., ['admin', 'superadmin']).
 * @returns {object|null} The user object if valid and role-matched, otherwise null.
 */
export async function verifyTokenAndGetUser(token, allowedRoles = []) {
  if (!token) {
    return null;
  }

  try {
    await connectDB();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!decoded?.id) {
      return null;
    }

    const user = await User.findById(decoded.id).select("-password");

    // Check if user exists and their role is in the allowed list
    if (user && (allowedRoles.length === 0 || allowedRoles.includes(user.role))) {
      return user;
    }
    
    // User exists but role is not allowed
    if (user) {
      console.warn(`Auth Warning: User ${user.email} (Role: ${user.role}) attempted action requiring one of: ${allowedRoles.join(', ')}`);
    }

    return null;

  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      console.log('Auth Error: Token expired');
    } else if (err.name === 'JsonWebTokenError') {
      console.log('Auth Error: Invalid token signature');
    }
    return null;
  }
}

/**
 * Gets the current user from cookies or headers.
 * This is useful for GET requests or server components.
 */
export async function getUserFromToken(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    const authHeader = req.headers.get("authorization");
    const headerToken = authHeader?.split(" ")[1];

    const finalToken = token || headerToken;
    if (!finalToken) return null;

    // Use our main verification function, allowing any role
    const user = await verifyTokenAndGetUser(finalToken, []); 
    return user;

  } catch (err) {
    console.error("getUserFromToken error:", err);
    return null;
  }
}

