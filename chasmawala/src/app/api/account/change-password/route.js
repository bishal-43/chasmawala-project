// src/app/api/account/change-password/route.js

import { getUserFromToken } from "@/lib/auth"; // ASSUMPTION: This now returns a full Mongoose document
import { connectDB } from "@/config/db";
import { NextResponse } from "next/server";
import { z } from "zod";

// 1. Define a schema for input validation
const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required."),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character."),
});

export async function PUT(req) {
  try {
    await connectDB();

    // Assumption: getUserFromToken now returns the full Mongoose user document to avoid a second DB call.
    const user = await getUserFromToken(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // 2. Validate the request body against the schema
    const validation = changePasswordSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const { currentPassword, newPassword } = validation.data;

    // 3. Compare the password on the user document we already fetched
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return NextResponse.json({ error: "The current password is incorrect" }, { status: 400 });
    }

    // 4. Set the new password and save (pre-save hook will hash it)
    user.password = newPassword;
    await user.save();

    return NextResponse.json({ message: "Password changed successfully" }, { status: 200 });
  } catch (error) {
    // 5. Log the actual error on the server for better debugging
    console.error("Change Password Error:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}