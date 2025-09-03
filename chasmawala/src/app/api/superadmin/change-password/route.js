// src/app/api/superadmin/change-password/route.js

import { NextResponse } from "next/server";
import { withSuperadminAuth } from "@/lib/api/withSuperAdminAuth";
import { changePasswordSchema } from "@/lib/validators/password";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

const changePasswordHandler = async (req, context, decodedToken) => {
  try {
    const body = await req.json();
    
    // 1. Validate the new password using our Zod schema
    const { password } = changePasswordSchema.parse(body);

    // 2. Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Update the user's password in the database
    // We use the user ID from the token passed by our middleware
    await User.updateOne(
      { _id: decodedToken.id },
      { $set: { password: hashedPassword } }
    );

    return NextResponse.json({ message: "Password changed successfully." });

  } catch (error) {
    // Handle validation errors from Zod
    if (error instanceof require('zod').ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    
    // Handle other potential errors
    console.error("Change password error:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
};

// Export the handler wrapped in our authentication middleware
export const POST = withSuperadminAuth(changePasswordHandler);