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

const productSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().min(10).max(2000),
  price: z.string().transform(Number).pipe(z.number().positive()),
  category: z.string().min(1),
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
    

    // Validate input
    const validatedData = productSchema.parse({
      name: formData.get("name"),
      description: formData.get("description"),
      price: formData.get("price"),
      category: formData.get("category"),
    });

    let imageUrl = "";
    const file = formData.get("image");
    if (file) {
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

      imageUrl = uploadResponse.secure_url;
    }

    // ✅ 3. Save product
    const product = new Product({
      ...validatedData,
      
      image: imageUrl,
      brand: formData.get("brand") || "Generic Brand",
      frameShape: formData.get("frameShape"),
      slug: slugify(validatedData.name, { lower: true, strict: true }),
    });

    const saved = await product.save();
    return NextResponse.json({ message: 'Product uploaded successfully', product: saved }, { status: 201 });

  } catch (err) {
    console.error('❌ Upload error:', err);
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: err.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to upload product' }, { status: 500 });
  }
}



export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  // Pagination
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const skip = (page - 1) * limit;

  const categories = searchParams.getAll("category");
  const brands = searchParams.getAll("brand");
  const frameShapes = searchParams.getAll("frameShape");
  const maxPrice = searchParams.get("maxPrice");
  const slug = searchParams.get("slug");

  // Build query
  const query = {};
  let sortOptions = {};
  let limitOverride = null;

  if (slug) {
    // Convert slug (contact-lenses -> contact lenses)
    const formatted = slug.replace(/-/g, " ").toLowerCase();
    

    query.$or = [
      { category: formatted },
      { brand: formatted },
    ];
  } else {
    // Normal filtering logic
    if (categories.includes("new-arrivals")) {
      sortOptions = { createdAt: -1 };
      limitOverride = 10;
      
      const filteredCategories = categories.filter(c => c !== "new-arrivals");
      if (filteredCategories.length > 0) {
        query.category = { $in: filteredCategories.map(c => c.toLowerCase()) };
      }
    } else if (categories.length > 0) {
      query.category = { $in: categories.map(c => c.toLowerCase()) };
    }

    if (brands.length > 0) {
      query.brand = { $in: brands.map(b => b.toLowerCase()) };
    }
    if (frameShapes.length > 0) {
      query.frameShape = { $in: frameShapes.map(f => f.toLowerCase()) };
    }
    if (maxPrice) {
      query.price = { $lte: Number(maxPrice) };
    }
  }


  try {
    // Build query
    let queryBuilder = Product.find(query)
      .select('name price image category brand slug frameShape stock rating')
      .lean();

    if (Object.keys(sortOptions).length > 0) {
      queryBuilder = queryBuilder.sort(sortOptions);
    }

    // Execute queries in parallel for better performance
    let products, total;

    if (limitOverride) {
      // New arrivals - no pagination
      products = await queryBuilder.limit(limitOverride);
      total = null;
    } else {
      // Regular query with pagination
      [products, total] = await Promise.all([
        queryBuilder.skip(skip).limit(limit),
        Product.countDocuments(query)
      ]);
    }

    const response = {
      products,
      ...(total !== null && {
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      })
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    });

  } catch (err) {
    console.error("❌ Products fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}