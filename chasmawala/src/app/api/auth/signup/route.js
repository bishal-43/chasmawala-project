// chasmawala/src/app/api/auth/signup/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/config/db";
import User from "@/models/userModel";
import sgMail from '@sendgrid/mail';
import crypto from 'crypto';
import { z } from "zod";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "10 s"),
  analytics: true,
});

const signupSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

export async function POST(req) {
  let newUser = null;
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";


    // ✅ Apply rate limit
    const { success } = await ratelimiter.limit(ip);
    if (!success) {
      return NextResponse.json(
        { error: "Too many signup attempts. Please wait a moment and try again." },
        { status: 429 }
      );
    }
    
    await connectDB();

    const body = await req.json();

    // 3. Validate the request body
    const validation = signupSchema.safeParse(body);

    if (!validation.success) {
      // Get the first error message for a simple response
      const errorMessage = validation.error.errors[0].message;
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const { name, email, password } = validation.data;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const verifyToken = crypto.randomBytes(32).toString('hex');
    const verifyTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour

    // Create user
    newUser = await User.create({
      name,
      email,
      password,
      role: "customer",
      verifyToken,
      verifyTokenExpiry,
      isVerified: false,
    });


    const verificationLink = `${process.env.BASE_URL}/verify-email/${verifyToken}`;

    const msg = {
      to: email,
      from: process.env.SENDER_EMAIL, // Your verified SendGrid sender
      subject: 'Verify Your Email Address',
      html: `
        <h1>Welcome to Chasmawala!</h1>
        <p>Click the link below to verify your email address. This link will expire in 1 hour.</p>
        <a href="${verificationLink}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
      `,
    };

    await sgMail.send(msg);


    return NextResponse.json(
      { message: 'Signup successful! Please check your email to verify your account.' },
      { status: 201 }
    );

  } catch (error) {
    console.error("Signup error:", error);

    // BEST PRACTICE: If email fails to send after user is created, delete the user to allow them to try again.
    if (newUser) {
      await User.findByIdAndDelete(newUser._id);
    }

    // Check if it was a SendGrid error for a more specific message
    if (error.response) {
      console.error('SendGrid Error Body:', error.response.body);
      return NextResponse.json({ error: "Could not send verification email. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
}
