// chasmawala/src/app/api/auth/check-auth/route.js

export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/config/db';
import User from '@/models/userModel';
import { cookies } from 'next/headers'; // Correct way to access cookies in Next.js App Router

// Retrieve JWT secret from environment variables.
// Ensure this variable is correctly set in your .env.local file.
const JWT_SECRET = process.env.JWT_SECRET;

export async function GET() {
  console.log("Check-auth route hit.");
  try {
    // 1. Connect to the database
    console.log("Attempting to connect to DB...");
    await connectDB();
    console.log("DB connection successful.");

    // 2. Access server-side cookies
    const cookieStore = await cookies();

    // 3. Attempt to retrieve the token from either 'admin-token' or 'token' cookies.
    // 'admin-token' is expected for admin/superadmin users after their specific login.
    // 'token' might be used for regular customer logins.
    const token = cookieStore.get("auth-token")?.value;

    // Log the token status for debugging purposes.
    // This will show 'undefined' if no token is found in the cookies.
    console.log("Token retrieved in check-auth:", token ? "Token found" : "No token found");

    // 4. If no token is found, return an Unauthorized response.
    if (!token) {
      return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
    }

    // 5. Verify the retrieved token
    let decoded;
    try {
      // Use jwt.verify to decode and validate the token using the secret.
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      // If verification fails (e.g., token is invalid, expired, or tampered with),
      // return an Unauthorized response.
      console.error("Token verification failed:", err.message);
      return NextResponse.json({ error: "Unauthorized: Invalid or expired token" }, { status: 401 });
    }
    console.log("Token verified successfully for user ID:", decoded.id);

    // 6. Find the user in the database based on the decoded ID from the token.
    // Exclude the password field for security.
    const user = await User.findById(decoded.id).select("-password");

    // 7. If no user is found for the decoded ID, return an Unauthorized response.
    if (!user) {
      console.log("User not found in DB for ID:", decoded.id);
      return NextResponse.json({ error: "Unauthorized: User not found" }, { status: 401 });
    }

    console.log("User found in DB:", user.email, "Role:", user.role);

    // 8. Determine the redirection path based on the user's role.
    const roleRedirectMap = {
      admin: "/admin",
      superadmin: "/superadmin",
      customer: "/profile",
      // Add other roles and their respective paths if needed
    };

    const redirectPath = roleRedirectMap[user.role];

    // 9. If the user's role does not have a defined redirection path, return a Forbidden response.
    if (!redirectPath) {
      console.warn(`User with role '${user.role}' has no defined redirect path.`);
      return NextResponse.json({ error: "Forbidden: Unknown user role" }, { status: 403 });
    }

    // 10. If everything is successful, return the user data and their redirect path.
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
    // 11. Catch any unexpected errors during the process and return a Server Error response.
    console.error("Check-auth API route error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}