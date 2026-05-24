// src/app/api/products/[slug]/route.js

import { NextResponse } from "next/server";
import { connectDB } from '@/config/db';
import Product from "@/models/productModel";
import { withAdminAuth } from "@/lib/adminMiddleware";
import { v2 as cloudinary } from 'cloudinary';
import slugify from 'slugify';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- GET a single product (Publicly accessible) ---
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
async function deleteProductHandler(req, context, user) {
  await connectDB();
  const slug = req.nextUrl.pathname.split('/').pop();
  const deletedProduct = await Product.findOneAndDelete({ slug });

  if (!deletedProduct) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Product deleted successfully" });
}
export const DELETE = withAdminAuth(deleteProductHandler);


// --- UPDATE a product (Admin only) ---
async function updateProductHandler(req, context, user) {
  await connectDB();
  
  // Await context.params to prevent warnings in Next.js
  const params = await context.params;
  const slug = params?.slug || req.nextUrl.pathname.split('/').pop();

  const contentType = req.headers.get("content-type") || "";
  let updateData = {};

  try {
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      updateData = {
        name: formData.get("name"),
        description: formData.get("description"),
        price: Number(formData.get("price")),
        category: formData.get("category"),
        brand: formData.get("brand") || "Generic Brand",
      };

      // Handle file upload if present
      const file = formData.get("image");
      if (file && typeof file.arrayBuffer === "function") {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

        const uploadResponse = await cloudinary.uploader.upload(base64, {
          folder: "chasmawala_products",
          transformation: [
            { width: 800, height: 800, crop: "limit" },
            { quality: "auto:good" }
          ]
        });

        updateData.image = uploadResponse.secure_url;
      }
    } else {
      updateData = await req.json();
    }

    // Regenerate slug if name is updated
    if (updateData.name) {
      updateData.slug = slugify(updateData.name, { lower: true, strict: true });
    }

    const updatedProduct = await Product.findOneAndUpdate({ slug }, updateData, { new: true });

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Update API error:", error);
    return NextResponse.json({ error: "Failed to update product", details: error.message }, { status: 500 });
  }
}
export const PUT = withAdminAuth(updateProductHandler);