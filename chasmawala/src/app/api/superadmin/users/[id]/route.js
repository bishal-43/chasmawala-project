// app/api/superadmin/users/[id]/route.js

// delete user by id (only accessible by superadmin)

import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";


export async function DELETE(req, {params}) {
    const {id} = params;
    await connectDB();

    const cookieStore = cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token){
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if(!user || user.role !== "superadmin"){
            return NextResponse.json({error: "Forbidden"}, {status: 403});
        }

        await User.findByIdAndDelete(id);
        return NextResponse.json({message: "User deleted successfully"}, {status: 200});
    }catch (error) {
        return NextResponse.json({error: "Invalid or expired token"}, {status: 401});
    }
}