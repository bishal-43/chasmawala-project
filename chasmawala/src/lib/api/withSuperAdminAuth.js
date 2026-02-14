// src/lib/api/withSuperadminAuth.js

import { NextResponse } from "next/server";
import { verifyTokenAndGetUser } from "@/lib/auth"; // <-- Import new function
import { connectDB } from "@/config/db";
import { cookies } from "next/headers";

/**
 * A Higher-Order Function to protect API routes for Superadmins.
 * It verifies the token, connects to the DB, and provides error handling.
 */
export function withSuperadminAuth(handler) {
  return async function (req, context) {
    let user;
    try {
      // 1. Database Connection
      await connectDB();

      // 2. Authentication
      const cookieStore = await cookies();
      const cookieToken = cookieStore.get("auth-token")?.value;

      const authHeader = req.headers.get("authorization");
      const headerToken = authHeader?.split(" ")[1];

      const token = cookieToken || headerToken;

      if (!token) {
        return NextResponse.json({ error: "Unauthorized: No token provided." }, { status: 401 });
      }

      // 3. Verify Token and User Role
      // We check for 'superadmin' role specifically
      user = await verifyTokenAndGetUser(token, ['superadmin']);

      if (!user) {
        // This will now correctly trigger if the user's role isn't 'superadmin'
        // or if the token is invalid/expired.
        return NextResponse.json({ error: "Forbidden: Access denied." }, { status: 403 });
      }

      // 4. Execute the specific route handler
      // We pass the verified user object to the handler
      return await handler(req, context, user);
      
    } catch (err) {
      // 5. Centralized Error Handling
      console.error(`[API Superadmin Error] Path: ${req.nextUrl.pathname}`, err);

      // We don't need to check for JWT errors here anymore,
      // verifyTokenAndGetUser handles them and returns null.
      
      return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    }
  };
}
