import { NextResponse } from "next/server";
import { verifySuperadminToken } from "@/lib/auth";
import { connectDB } from "@/config/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

/**
 * A Higher-Order Function to protect API routes and handle common tasks.
 * It verifies the superadmin token, connects to the database, and provides
 * centralized error handling.
 *
 * @param {function} handler The specific API route handler logic.
 * @returns {function} The wrapped API route handler.
 */
export function withSuperadminAuth(handler) {
  return async function (req, context) {
    try {
      // 1. Authentication
      const cookieStore = await cookies();
      const cookieToken = cookieStore.get("auth-token")?.value;

      // ✅ FIX: Check for the Authorization header as a fallback
      const authHeader = req.headers.get("authorization");
      const headerToken = authHeader?.split(" ")[1];

      // Use whichever token is available
      const token = cookieToken || headerToken;

      if (!token || !(await verifySuperadminToken(token))) {
        // This will now correctly trigger if the user's role isn't 'superadmin'
        // because verifySuperadminToken (from auth.js) checks the DB role.
        return NextResponse.json({ error: "Forbidden: Access denied." }, { status: 403 });
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // 2. Database Connection
      await connectDB();

      // 3. Execute the specific route handler
      return await handler(req, context, decodedToken);
      
    } catch (err) {
      // 4. Centralized Error Handling
      console.error(`[API Superadmin Error] Path: ${req.nextUrl.pathname}`, err);
      
      if (err.name === "JsonWebTokenError") {
        return NextResponse.json({ err: "Invalid token." }, { status: 401 });
      }
      if (err.name === "TokenExpiredError") {
        return NextResponse.json({ err: "Token has expired." }, { status: 401 });
      }
      return NextResponse.json({ err: "Authentication failed." }, { status: 500 });
    }
  };
}
