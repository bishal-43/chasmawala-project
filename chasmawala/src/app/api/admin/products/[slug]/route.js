// src/app/api/admin/products/[slug]/route.js

import { connectDB } from "@config/db";
import Product from "@models/productModel";
import { NextResponse } from "next/server";


export async function PUT(req, {params}){
    await connectDB();
    const { slug } = params;
    const body = await req.json();

    try {
        const updatedProduct = await Product.findOneAndUpdate({ slug }, body, {new: true});
        return NextResponse.json({message: "Product updated successfully", product: updatedProduct });
    }catch (error){
        return NextResponse.json({error: "Failed to update product"},{status: 500});
    }
}

export async function DELETE(req, context) {
  await connectDB();

  // ✅ Await params properly
  const { slug } = await context.params;

  try {
    await Product.findOneAndDelete({ slug });
    return new Response(
      JSON.stringify({ message: "Product deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

