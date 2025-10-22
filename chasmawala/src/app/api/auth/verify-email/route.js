// /app/api/auth/verify-email/route.js

import { NextResponse } from 'next/server';
import User from '@/models/userModel';
import {connectDB} from '@/config/db';

export async function POST(request) {
  await connectDB();
  try {
    const { token } = await request.json();
    if (!token) {
      return NextResponse.json({ message: 'Token is missing.' }, { status: 400 });
    }

    // Find user with the matching token and ensure it has not expired
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid or expired token.' },
        { status: 400 }
      );
    }

    // Update user's status
    user.isVerified = true;
    user.verifyToken = undefined; // Clear the token
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({ message: 'Email verified successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Verification Error:', error);
    return NextResponse.json({ message: 'Error verifying email.' }, { status: 500 });
  }
}