// src/app/api/auth/logout/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'; // Correct way to access cookies in Next.js App Router

export async function POST(req) {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    }, { status: 200 });

    // 1. Delete the 'admin-token' cookie
    // Set maxAge to 0 or an immediate past date to expire it immediately.
    // Ensure path, domain, secure, and httpOnly match how the cookie was set during login.
    

    // 2. If you also use a generic 'token' cookie for customers, delete that too.
    response.cookies.set("auth-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Match the setting from login
      maxAge: 0, // Expires immediately
      sameSite: "lax", // Match the setting from login (if different from admin-token)
      path: "/", // Match the setting from login
    });

    return response;

  } catch (error) {
    console.error("Logout API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
