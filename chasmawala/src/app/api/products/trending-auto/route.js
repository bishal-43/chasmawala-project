// src/app/api/products/trending-auto/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import Product from "@/models/productModel";

export async function GET() {
  await connectDB();

  const products = await Product.find()
    .sort({ soldCount: -1 })
    .limit(12)
    .select("name price image slug rating");

  return NextResponse.json({ products });
}