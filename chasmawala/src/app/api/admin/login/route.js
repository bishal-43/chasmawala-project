// /app/api/admin/login/route.js
import { NextResponse } from 'next/server';
import User from '@/models/userModel'; // Assuming this is your User model
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/config/db';

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  // Find the admin user by email
  const user = await User.findOne({ email });

  // If the user doesn't exist or is not an admin, return Unauthorized
  if (!user || !(user.role == "admin" || user.role == "superadmin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check if the password matches
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Generate the admin JWT token
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d", // Token expires in 1 day
  });

  // Set the token in the cookies and return the response
  const response = NextResponse.json({
    message: "Logged in successfully",
    role: user.role  // <-- add this!
  });

  response.cookies.set("admin-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Ensure this is true in production
    maxAge: 60 * 60 * 24, // 1 day
    sameSite: "Strict", // Ensure the cookie is sent only in a same-site context
    path: "/",
  });

  return response;
}
