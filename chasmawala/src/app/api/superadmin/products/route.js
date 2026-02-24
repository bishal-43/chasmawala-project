import { NextResponse } from "next/server";
import {connectDB} from "@/config/db";
import Product from "@/models/productModel";

export async function GET() {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 });
  return NextResponse.json({ products });
}