// app/api/superadmin/admin
import { connectDB } from "@config/db";
import { forbidden } from "next/navigation";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import User from "@models/userModel";
import jwt from "jsonwebtoken";



export async function GET(req){
    try{
        await connectDB();
        const cookieStore = cookies(); 
        const token = cookieStore.get("admin-token")?.value;

        console.log("🍪 Cookies:", cookieStore.getAll());
        console.log("📦 Token received:", token);

        if(!token) return NextResponse.json({error:"Unauthorized"},{ status: 401});

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (decoded.role !== "superadmin"){
            return NextResponse.json({error: "forbidden"},{ status: 403});

        }

        const admins = await User.find({role:"admin"}).select("-password");
        return NextResponse.json({admins},{status:200})
    }
    catch(err){
        console.error("❌ Full server error:", err);
        return NextResponse.json({error:err.message},{status:500})
    }
}