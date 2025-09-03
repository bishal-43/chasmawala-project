// src/app/api/account/change-password/route.js

import { getUserFromToken } from "@/lib/auth";
import { connectDB } from "@config/db";
import { NextResponse } from "next/server";
import User from "@/models/userModel"; 
import { cookies } from "next/headers"; 



export async function PUT(req){
    try{
        await connectDB();
        const user = await getUserFromToken(req);
        if(!user){
            console.log("No user from token");
            return NextResponse.json({error: "Unauthorized"},{status: 401});
        }


        const {currentPassword, newPassword} = await req.json();

        if(!currentPassword || !newPassword){
            return NextResponse.json({error: "Both fields are required"},{status: 400});
        }

        const dbUser = await User.findById(user._id);
        const isMatch = await dbUser.comparePassword(currentPassword);

        if(!isMatch){
            return NextResponse.json({error: "Current password is incorrect"}, {status: 400});
        }

        dbUser.password = newPassword;
        await dbUser.save();

        return NextResponse.json({message:"Password Changed Successfully"},{status:200});
    }catch(error){
        return NextResponse.json({error: "Internal Server Error"},{status: 500});
    }
}