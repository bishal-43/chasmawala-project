import { NextResponse } from 'next/server';
import { connectDB } from '@/config/db';
import Product from '@/models/productModel';

// This is a NAMED export, which is correct.
export async function GET() {
  await connectDB();

  try {
    const categories = await Product.distinct('category');
    const brands = await Product.distinct('brand');

    const highestPriceProduct = await Product.findOne().sort({ price: -1 });
    const maxPrice = highestPriceProduct ? Math.ceil(highestPriceProduct.price) : 2000;

    return NextResponse.json({
      categories: categories.filter(Boolean),
      brands: brands.filter(Boolean),
      priceRange: [0, maxPrice],
    });
  } catch (error) {
    console.error('❌ Failed to fetch filter options:', error);
    return NextResponse.json({ error: 'Failed to fetch filter options' }, { status: 500 });
  }
}