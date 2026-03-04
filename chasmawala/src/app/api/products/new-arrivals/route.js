// app/api/products/new-arrivals/route.js

import { connectDB } from "@config/db";
import Product from "@/models/productModel";
import { NextResponse } from "next/server";



export async function GET() {
    await connectDB();

    const products = await Product.find({})
    .sort({ createdAt: -1})
    .limit(12)
    .select("name price image slug");

    return NextResponse.json({products});
    
}