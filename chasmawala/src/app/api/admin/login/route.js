// app/api/admin/login/route.js
import { NextResponse } from 'next/server';
import User from '@/models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/config/db';

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  // 1. Find the user and check role
  const user = await User.findOne({ email });
  if (!user || !(user.role === "admin" || user.role === "superadmin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // 3. Generate JWT
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });


  console.log("Setting admin-token cookie with value:", token);


  // 4. Set secure cookie
  const response = NextResponse.json({
    success: true,
    message: "Logged in successfully",
    role: user.role,
    redirectPath: user.role === "superadmin" ? "/superadmin" : "/admin",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  }, { status: 200 });

  response.cookies.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
    sameSite: "Strict",
    path: "/",
  });

  return response;
}
