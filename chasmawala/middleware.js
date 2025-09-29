// chasmawala/middleware.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

/**
 * A reusable function to verify the token and return its payload.
 * Encapsulates the try-catch logic.
 * @param {string | undefined} token The auth token from cookies.
 * @returns {object | null} The decoded payload or null if invalid.
 */
async function verifyToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}

/**
 * A reusable function to handle redirects and clear invalid cookies.
 * @param {Request} req The incoming request.
 * @param {string} loginPath The path to redirect to (e.g., '/login').
 * @returns {NextResponse} The redirect response.
 */
function handleRedirect(req, loginPath) {
  const response = NextResponse.redirect(new URL(loginPath, req.url));
  response.cookies.delete("auth-token"); // Clear the invalid or missing token
  return response;
}


export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("auth-token")?.value;

  // Paths that are public and should be skipped by the logic below.
  if (pathname === "/admin/login" || pathname === "/login" || pathname === "/unauthorized") {
    return NextResponse.next();
  }

  const payload = await verifyToken(token);

  // Superadmin route protection
  if (pathname.startsWith("/superadmin")) {
    if (payload?.role !== "superadmin") {
      return handleRedirect(req, "/admin/login");
    }
  }

  // Admin route protection
  else if (pathname.startsWith("/admin")) {
    if (!["admin", "superadmin"].includes(payload?.role)) {
      return handleRedirect(req, "/admin/login");
    }
  }

  // Customer routes protection (profile/checkout)
  else if (["/profile", "/checkout"].includes(pathname)) {
    if (!payload) { // Any valid token is enough for customers
      return handleRedirect(req, "/login");
    }
  }

  return NextResponse.next();
}


export const config = {
  // The matcher remains the same, it's already well-configured.
  matcher: [
    "/admin/:path*",
    "/superadmin/:path*",
    "/profile",
    "/checkout",
  ],
};