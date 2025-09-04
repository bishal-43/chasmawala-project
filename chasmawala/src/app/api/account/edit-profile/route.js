// src/app/api/account/edit-profile/route.js

import { getUserFromToken } from "@/lib/auth";
import { connectDB } from "@/config/db";
import { NextResponse } from "next/server";
import User from "@/models/userModel";


export async function GET(req) {
  try {
    await connectDB();
    const user = await getUserFromToken(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await User.findById(user._id).select("-password");
    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ profile: dbUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req){
    try{
        await connectDB();
        const user = await getUserFromToken(req);
        if(!user){
            return NextResponse.json({error: "Unauthorized"},{status: 401});
        }

        const {name,  phone, address} = await req.json();

        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            {name, phone, address},
            {new: true, runValidators: true}
        ).select("-password");

        return NextResponse.json({message:"user updated Successfully",user: updatedUser},{status:200});
    }catch(error){
        return NextResponse.json({error: "Internal Server Error"},{status: 500});
    }
}