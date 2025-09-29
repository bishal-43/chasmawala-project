// src/app/api/account/edit-profile/route.js

import { getUserFromToken } from "@/lib/auth";
import { connectDB } from "@/config/db";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { z } from "zod";

// Define a schema for validating the incoming profile data
const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long."),
  phone: z.string().optional(), // Make fields optional if they aren't required
  address: z.string().optional(),
});

// GET handler optimized to use a single database call
export async function GET(req) {
  try {
    await connectDB();

    // 1. Get the full user document from the token in one DB call
    // ASSUMPTION: getUserFromToken is modified to return the Mongoose doc without the password
    const user = await getUserFromToken(req); 
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. The user object is already what we need, so we can return it directly.
    return NextResponse.json({ profile: user }, { status: 200 });
  } catch (error) {
    console.error("GET Profile Error:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PUT handler optimized for one DB call and added validation
export async function PUT(req){
    try{
        await connectDB();

        // 1. Get the full user document from the token in one DB call
        const user = await getUserFromToken(req);
        if(!user){
            return NextResponse.json({error: "Unauthorized"},{status: 401});
        }

        const body = await req.json();

        // 2. Validate the request body against the schema
        const validation = updateProfileSchema.safeParse(body);
        if (!validation.success) {
          return NextResponse.json({ error: validation.error.errors[0].message }, { status: 400 });
        }

        const { name, phone, address } = validation.data;

        // 3. Update the user document we already have in memory
        user.name = name;
        user.phone = phone;
        user.address = address;

        // 4. Save the updated document. This is our single database write operation.
        const updatedUser = await user.save();
        
        // We need to manually remove the password if the document has it
        updatedUser.password = undefined;

        return NextResponse.json({ message:"User updated Successfully", user: updatedUser }, { status: 200 });
    } catch(error) {
        console.error("PUT Profile Error:", error.message);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}