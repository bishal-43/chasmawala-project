// src/app/api/superadmin/admin/route.js

import { NextResponse } from "next/server";
import { withSuperadminAuth } from "@/lib/api/withSuperAdminAuth"; // Use the HOF
import { addAdminSchema } from "@/lib/validators/admin"; // Import the Zod schema
import User from "@/models/userModel";
import { ZodError } from "zod";
import bcrypt from "bcryptjs";

// ✅ GET: Fetch all admins (Now protected by the middleware)
const getAdminsHandler = async () => {
  const admins = await User.find({ role: "admin" }).select("-password");
  return NextResponse.json({ admins });
};

// ✅ POST: Add new admin (Now protected and validated)
const addAdminHandler = async (req) => {
  try {
    const body = await req.json();

    // 1. Server-side validation using our Zod schema
    const { name, email, password } = addAdminSchema.parse(body);

    // 2. Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "An admin with this email already exists." }, { status: 409 }); // 409 Conflict is more specific
    }

    
    
    const newAdmin = await User.create({
      name,
      email,
      password,     // hasing will be handled by the pre-save hook in the User model
      role: "admin",
    });

    // 4. Return success response (don't send back the password)
    const adminResponse = { id: newAdmin._id, name: newAdmin.name, email: newAdmin.email };
    return NextResponse.json({ message: "Admin created successfully.", admin: adminResponse }, { status: 201 });

  } catch (error) {
    // Zod will throw an error if validation fails
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    // Handle other potential errors
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
};

// Export the wrapped handlers
export const GET = withSuperadminAuth(getAdminsHandler);
export const POST = withSuperadminAuth(addAdminHandler);