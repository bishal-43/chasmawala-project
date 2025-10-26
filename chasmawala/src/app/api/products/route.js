// src/app/api/products/route.js

import { NextResponse } from 'next/server';
import { connectDB } from '@/config/db';
import Product from '@/models/productModel';
import { withAdminAuth } from '@/lib/adminMiddleware';
import { v2 as cloudinary } from 'cloudinary';
import slugify from 'slugify';
import { z } from 'zod';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  await connectDB();

  // ✅ 1. Verify token from cookie
  const cookieHeader = req.headers.get('cookie');
  const token = cookieHeader?.split(';').find(c => c.trim().startsWith('auth-token='))?.split('=')[1];

  const isAdmin = await withAdminAuth(token);
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // ✅ 2. Parse multipart form-data
    const formData = await req.formData();
    const file = formData.get("image");

    let imageUrl = "";
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

      const uploadResponse = await cloudinary.uploader.upload(base64, {
        folder: "chasmawala_products",
      });

      imageUrl = uploadResponse.secure_url;
    }

    // ✅ 3. Save product
    const product = new Product({
      name: formData.get("name"),
      description: formData.get("description"),
      price: formData.get("price"),
      category: formData.get("category"),
      image: imageUrl,
      slug: slugify(formData.get("name"), { lower: true, strict: true })
    });

    const saved = await product.save();
    return NextResponse.json({ message: 'Product uploaded successfully', product: saved }, { status: 201 });

  } catch (err) {
    console.error('❌ Upload error:', err);
    return NextResponse.json({ error: 'Failed to upload product' }, { status: 500 });
  }
}



export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const categories = searchParams.getAll("category");
  const brands = searchParams.getAll("brand");
  const frameShapes = searchParams.getAll("frameShape");
  const maxPrice = searchParams.get("maxPrice");
  const slug = searchParams.get("slug");

  // Build query
  const query = {};

  if (slug) {
    // Convert slug (contact-lenses -> contact lenses)
    const formatted = slug.replace(/-/g, " ");
    const slugRegex = new RegExp(`^${formatted}$`, "i");

    query.$or = [
      { category: slugRegex }, // match category
      { brand: slugRegex },    // match brand
    ];
  } else {
    // Normal filtering logic
    if (categories.length > 0 && !categories.includes("new-arrivals")) {
      query.category = { $in: categories };
    }
    if (brands.length > 0) {
      query.brand = { $in: brands };
    }
    if (frameShapes.length > 0) {
      query.frameShape = { $in: frameShapes };
    }
    if (maxPrice) {
      query.price = { $lte: Number(maxPrice) };
    }
  }

  try {
    let products;

    if (!slug && categories.includes("new-arrivals")) {
      // Special case: new arrivals
      products = await Product.find({})
        .sort({ createdAt: -1 })
        .limit(10)
        .select('name price image category brand slug');
    } else {
      products = await Product.find(query)
      .select('name price image category brand slug');
    }

    return NextResponse.json(products);
  } catch (err) {
    console.error("❌ Products fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}