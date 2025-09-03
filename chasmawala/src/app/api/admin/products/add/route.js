// src/app/api/admin/products/add/route.js


import { connectDB } from "@config/db";
import Product from "@models/productModel";
import {Cookies} from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@models/userModel";

export async function POST(req){
    await connectDB();
    const body = await req.json();
    const cookies = await Cookies();
    const token = cookies.get("admin-token")?.value;

    if(!token) return NextResponse.json({error: "Unauthorized"}, {status: 401});

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!["admin", "superadmin"].includes(decoded.role)){
            return NextResponse.json({error: "Forbidden"}, {status: 403});
        }

        const newProduct = await Product.create(body);
        return NextResponse.json({message: "Product Added Successfully", product: newProduct}, {status: 201});
    }catch(error){
        return NextResponse.json({error: "Invalid token or server error"}, {status: 500});
    }
}