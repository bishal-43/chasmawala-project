// app/api/auth/login/route.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const dummyUser = {
  id: "123",
  name: "Test User",
  email: "test@example.com",
  password: "test123",
};

export async function POST(req) {
  const { email, password } = await req.json();

  if (email === dummyUser.email && password === dummyUser.password) {
    const token = jwt.sign(
      { id: dummyUser.id, name: dummyUser.name, email: dummyUser.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const res = NextResponse.json({
      message: "Login successful",
      user: {
        id: dummyUser.id,
        name: dummyUser.name,
        email: dummyUser.email,
      },
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // false in dev
      sameSite: "Lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } else {
    return NextResponse.json(
      { message: "User doesn't exist! Signup first" },
      { status: 400 }
    );
  }
}
