import { NextResponse } from "next/server";

export async function POST() {
  // Clear the auth-token cookie
  const response = NextResponse.json({ message: "Logged out successfully" });
  response.cookies.set("auth-token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0, // expire immediately
    path: "/",
  });

  return response;
}
