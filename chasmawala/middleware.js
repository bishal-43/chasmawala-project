// chasmawala/middleware.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("auth-token")?.value;

  const isSuperAdminPath = pathname.startsWith("/superadmin");
  const isAdminLoginPage = pathname === "/admin/login";
  const isAdminPath = pathname.startsWith("/admin") && !isAdminLoginPage;

  // ✅ Allow login page without middleware interference
  if (isAdminLoginPage) {
    return NextResponse.next();
  }

  // ✅ Superadmin route protection
  if (isSuperAdminPath) {
    if (!token) return NextResponse.redirect(new URL("/admin/login", req.url));

    try {
      const decoded = await jwtVerify(token, secret);
      if (decoded.payload.role !== "superadmin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    } catch {
      // Clear invalid cookie
      const res = NextResponse.redirect(new URL("/admin/login", req.url));
      res.cookies.delete("auth-token");
      return res;
    }
    return NextResponse.next();
  }

  // ✅ Admin route protection
  if (isAdminPath) {
    if (!token) return NextResponse.redirect(new URL("/admin/login", req.url));

    try {
      const decoded = await jwtVerify(token, secret);
      if (!["admin", "superadmin"].includes(decoded.payload.role)) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    } catch {
      // Clear invalid cookie
      const res = NextResponse.redirect(new URL("/admin/login", req.url));
      res.cookies.delete("auth-token");
      return res;
    }
    return NextResponse.next();
  }

  // ✅ Customer routes (profile/checkout)
  if (["/profile", "/checkout"].includes(pathname)) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));

    try {
      await jwtVerify(token, secret);
    } catch {
      const res = NextResponse.redirect(new URL("/login", req.url));
      res.cookies.delete("auth-token");
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/admin",        // ✅ Removed /admin/login
    "/superadmin/:path*",
    "/superadmin",
    "/profile",
    "/checkout",
  ],
};
