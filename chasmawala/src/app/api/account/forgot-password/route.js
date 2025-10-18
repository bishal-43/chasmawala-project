// src/app/api/account/forgot-password/route.js

import { NextResponse } from 'next/server';
import { connectDB } from '@/config/db';
import User from '@/models/userModel';
import sgMail from '@sendgrid/mail';
import crypto from 'crypto';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req) {
  try {
    await connectDB();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required." }, { status: 400 });
    }

    const user = await User.findOne({ email });

    // Important: Do not reveal if a user exists or not for security reasons.
    // Send a success-like response even if the user is not found.
    if (user) {
      // Generate a secure, random token
      const resetToken = crypto.randomBytes(32).toString('hex');
      // Set an expiry time for the token (e.g., 10 minutes)
      const passwordResetTokenExpiry = Date.now() + 600000; // 10 minutes from now

      user.passwordResetToken = resetToken;
      user.passwordResetTokenExpiry = passwordResetTokenExpiry;
      await user.save();

      const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/${resetToken}`;

      const msg = {
        to: user.email,
        from: process.env.SENDER_EMAIL,
        subject: 'Your Password Reset Request',
        html: `
          <div style="font-family: sans-serif; text-align: center; padding: 40px;">
            <h2>Password Reset Request</h2>
            <p>You requested to reset your password. Click the button below to set a new password. This link is valid for 10 minutes.</p>
            <a href="${resetUrl}" style="background-color: #dc3545; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 20px 0; display: inline-block;">Reset Password</a>
            <p>If you did not request a password reset, please ignore this email.</p>
          </div>
        `,
      };

      await sgMail.send(msg);
    }

    return NextResponse.json({
      message: "If an account with that email exists, a password reset link has been sent."
    }, { status: 200 });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json({ message: "An internal server error occurred." }, { status: 500 });
  }
}
