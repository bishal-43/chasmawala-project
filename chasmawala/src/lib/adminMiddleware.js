// src/lib/adminMiddleware.js

import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { verifyTokenAndGetUser } from "@/lib/auth"; // Import the correct function
import { cookies } from "next/headers";

/**
 * A Higher-Order Function to protect API routes for Admins and Superadmins.
 * It verifies the token, connects to the database, and provides
 * centralized error handling.
 *
 * @param {function} handler The specific API route handler logic.
 * @returns {function} The wrapped API route handler.
 */
export function withAdminAuth(handler) {
  return async function (req, context) {
    try {
      // 1. Authentication
      const cookieStore = await cookies();
      const cookieToken = cookieStore.get("auth-token")?.value;

      // Fallback: Check for Authorization header
      const authHeader = req.headers.get("authorization");
      const headerToken = authHeader?.split(" ")[1];

      const token = cookieToken || headerToken;

      if (!token) {
        return NextResponse.json({ error: "Unauthorized: No token provided." }, { status: 401 });
      }

      // Use the correct function and pass the allowed roles
      const user = await verifyTokenAndGetUser(token, ['admin', 'superadmin']);

      if (!user) {
        return NextResponse.json({ error: "Forbidden: Access denied." }, { status: 403 });
      }

      // 2. Database Connection
      await connectDB();

      // 3. Execute the specific route handler
      // We pass the authenticated 'user' object to the handler
      return await handler(req, context, user);
      
    } catch (err) {
      // 4. Centralized Error Handling
      console.error(`[API Admin Error] Path: ${req.nextUrl.pathname}`, err);
      
      if (err.name === "JsonWebTokenError") {
        return NextResponse.json({ error: "Invalid token." }, { status: 401 });
      }
      if (err.name === "TokenExpiredError") {
        return NextResponse.json({ error: "Token has expired." }, { status: 401 });
      }
      return NextResponse.json({ error: "Authentication failed." }, { status: 500 });
    }
  };
}
