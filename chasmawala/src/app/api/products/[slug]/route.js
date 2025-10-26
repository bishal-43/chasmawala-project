// src/app/api/products/[slug]/route.js

import { NextResponse } from "next/server";
import { connectDB } from '@/config/db';
import Product from "@/models/productModel";
import { withAdminAuth } from "@/lib/adminMiddleware"; // 1. Import the wrapper

// --- GET a single product (Publicly accessible) ---
// This handler is NOT wrapped, so anyone can access it.
export async function GET(req, context) {
  await connectDB();
  const slug = req.nextUrl.pathname.split('/').pop();
  try {
    const product = await Product.findOne({ slug });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

// --- DELETE a product (Admin only) ---
// 2. This is the core logic, separated into its own function.
async function deleteProductHandler(req, context, user) {
  await connectDB();
  const slug = req.nextUrl.pathname.split('/').pop();
  const deletedProduct = await Product.findOneAndDelete({ slug });

  if (!deletedProduct) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Product deleted successfully" });
}
// 3. Export the DELETE method wrapped in the admin middleware.
export const DELETE = withAdminAuth(deleteProductHandler);


// --- UPDATE a product (Admin only) ---
async function updateProductHandler(req, context, user) {
  await connectDB();
  const slug = req.nextUrl.pathname.split('/').pop();
  const body = await req.json(); // Remember to add Zod validation here!

  const updatedProduct = await Product.findOneAndUpdate({ slug }, body, { new: true });

  if (!updatedProduct) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json(updatedProduct);
}
// 3. Export the PUT method, also wrapped in the admin middleware.
export const PUT = withAdminAuth(updateProductHandler);