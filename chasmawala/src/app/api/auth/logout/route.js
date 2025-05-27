import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out" });

  // Clear both possible tokens
  response.cookies.set("token", "", { maxAge: 0 });
  response.cookies.set("admin-token", "", { maxAge: 0 });

  return response;
}
