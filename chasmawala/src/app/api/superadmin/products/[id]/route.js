import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import Product from "@/models/productModel";

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = await params;

  
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}

export async function PATCH(request, { params }) {
  try {
    await connectDB();

    // ✅ FIX 1: params is async in App Router
    const { id } = await params;

    // ✅ Validate MongoDB ObjectId
    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const product = await Product.findById(id);

    // ✅ FIX 2: Handle product not found
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    product.active = !product.active;
    await product.save();

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("PATCH /products/[id] error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}