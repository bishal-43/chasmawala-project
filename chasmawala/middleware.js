import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {
  const { pathname, origin } = req.nextUrl;


  const isSuperAdminPath = pathname.startsWith("/superadmin");
  const isAdminPath = pathname.startsWith("/admin") && pathname !== "/admin/login";
  const isAdminLoginPage = pathname === "/admin/login";

  const token = req.cookies.get("admin-token")?.value;

  // ✅ Allow access to admin login page if not logged in
  if (isAdminLoginPage) {
    if (token) {
      try {
        const decoded = await jwtVerify(token, secret);
        if (decoded.payload.role === "admin" || decoded.payload.role === "superadmin") {
          return NextResponse.redirect(new URL("/admin", req.url));
        }
      } catch (err) {
        // Token invalid — allow to proceed to login
      }
    }
    return NextResponse.next();
  }

  if (isSuperAdminPath){
    if (!token){
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    try{
      const decoded = await jwtVerify(token, secret);
      if (decoded.payload.role !== "superadmin"){
        return NextResponse.redirect(new URL("/Unauthorized",req.url));
      }
    }catch(err){
      return NextResponse.redirect(new URL("/admin/login",req.url));
    }
  }

  // ✅ Protect all other admin routes
  if (isAdminPath) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    try {
      const decoded = await jwtVerify(token, secret);
      if (decoded.payload.role !== "admin" && decoded.payload.role !== "superadmin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin", "/admin/login", "/profile", "/checkout"],
};
