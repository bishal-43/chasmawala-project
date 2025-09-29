// src/lib/api/withSuperadminAuth.js

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
      const token = cookieStore.get("auth-token")?.value;

      if (!token || !(await verifySuperadminToken(token))) {
        return NextResponse.json({ error: "Unauthorized: Access denied." }, { status: 401 });
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      /*if (!decodedToken || decodedToken.role !== "superadmin") {
        return NextResponse.json({ error: "Unauthorized: Access denied." }, { status: 403 });
      }*/

      // 2. Database Connection
      await connectDB();

      // 3. Execute the specific route handler if auth and DB connection are successful
      return await handler(req, context, decodedToken);
      
    } catch (err) {
      // 4. Centralized Error Handling
      console.error(`[API Superadmin Error] Path: ${req.nextUrl.pathname}`, err);
      
      // Return a generic error to the client for security
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

