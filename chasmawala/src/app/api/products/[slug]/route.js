//src/app/api/products/[slug]/route.js

import { NextResponse } from "next/server";
import { connectDB } from '@/config/db'; // Corrected import path assuming standard structure
import Product from "@/models/productModel";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// --- GET a single product (Publicly accessible) ---
export async function GET(req, { params }) {
  await connectDB();
  const { slug } =  await params;
  try {
    const product = await Product.findOne({ slug });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("GET single product error:", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

// --- DELETE a product (Admin only) ---
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    // Standardize on 'auth-token'
    const token = cookies().get("auth-token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized: No token found" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }

    if (!["admin", "superadmin"].includes(decoded.role)) {
      return NextResponse.json({ error: "Forbidden: Insufficient permissions" }, { status: 403 });
    }

    const { slug } = params;
    const deletedProduct = await Product.findOneAndDelete({ slug });

    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE product error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// --- UPDATE a product (Admin only) ---
export async function PUT(req, { params }) {
  try {
    await connectDB();

    // Standardize on 'auth-token'
    const token = cookies().get("auth-token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized: No token found" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }

    if (!["admin", "superadmin"].includes(decoded.role)) {
      return NextResponse.json({ error: "Forbidden: Insufficient permissions" }, { status: 403 });
    }

    const { slug } = params;
    const body = await req.json();

    const updatedProduct = await Product.findOneAndUpdate({ slug }, body, { new: true });

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("PUT product error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
