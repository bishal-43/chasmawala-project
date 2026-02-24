// chasmawala/src/app/api/auth/signup/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/config/db";
import User from "@/models/userModel";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import crypto from 'crypto';
import { z } from "zod";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY);


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

    // const sentFrom = new Sender(process.env.SENDER_EMAIL, "Chasmawala");
    // const recipients = [new Recipient(email)];

    await resend.emails.send({
      from: `Chasmawala <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: "Verify your email address",
      html: `
        <h2>Welcome to Chasmawala 👓</h2>
        <p>Click the link below to verify your email:</p>
        <a href="${verificationLink}" 
           style="background:#2563eb;color:white;padding:10px 16px;border-radius:6px;text-decoration:none;">
          Verify Email
        </a>
        <p>This link expires in 1 hour.</p>
      `,
    });



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

    // MailerSend error
    if (error?.response?.body) {
      console.error("MailerSend Error:", error.response.body);

      const message =
        error.response.body?.message ||
        "Email service limit reached. Please try again later.";

      return NextResponse.json(
        { error: message },
        { status: 429 } // Rate limit / provider limit
      );
    }




    return NextResponse.json({ error: "Signup failed. Please try again later." }, { status: 500 });
  }
}
