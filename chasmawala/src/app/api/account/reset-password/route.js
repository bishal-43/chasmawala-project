// src/app/api/account/reset-password/route.js

import { NextResponse } from 'next/server';
import { connectDB } from '@/config/db';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export async function POST(req) {
  try {
    await connectDB();
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ message: "Token and new password are required." }, { status: 400 });
    }

    // Find the user by the token and check if the token is still valid
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetTokenExpiry: { $gt: Date.now() }, // Check if token has not expired
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid or expired password reset token." }, { status: 400 });
    }

    

    // Update the user's password
    user.password = password;

    // Clear the reset token fields so it can't be used again
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({ message: "Password has been reset successfully." }, { status: 200 });

  } catch (error) {
    console.error("Reset Password Error:", error);
    return NextResponse.json({ message: "An internal server error occurred." }, { status: 500 });
  }
}
