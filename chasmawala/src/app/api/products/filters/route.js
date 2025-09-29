// src/app/api/products/filters/route.js

import { NextResponse } from 'next/server';
import { connectDB } from '@/config/db';
import Product from '@/models/productModel';
import cache from 'memory-cache';

// Using environment variables is better for configuration
const CACHE_KEY = 'product-filters';
const CACHE_DURATION = process.env.FILTER_CACHE_DURATION || 5 * 60 * 1000; // 5 minutes

export async function GET() {
  // 1. Check cache first (this part was correct)
  const cachedData = cache.get(CACHE_KEY);
  if (cachedData) {
    console.log('✅ Serving filters from cache');
    return NextResponse.json(cachedData);
  }

  // 2. If not cached, fetch from DB and wrap the whole logic in try/catch
  try {
    console.log('❌ Filters not cached, fetching from DB');
    await connectDB();

    const aggregationResult = await Product.aggregate([
      {
        $facet: {
          categories: [{ $group: { _id: "$category" } }],
          brands: [{ $group: { _id: "$brand" } }],
          priceRange: [{ $group: { _id: null, maxPrice: { $max: "$price" } } }]
        }
      }
    ]);

    // 3. Prepare the data object
    const categories = aggregationResult[0].categories.map(c => c._id).filter(Boolean);
    const brands = aggregationResult[0].brands.map(b => b._id).filter(Boolean);
    const maxPrice = aggregationResult[0].priceRange[0] ? Math.ceil(aggregationResult[0].priceRange[0].maxPrice) : 2000;

    const dataToCache = {
      categories,
      brands,
      priceRange: [0, maxPrice],
    };

    // 4. ✅ IMPORTANT: Store the newly fetched data in the cache
    cache.put(CACHE_KEY, dataToCache, CACHE_DURATION);
    console.log('📦 Filters have been cached for future requests.');
    
    // 5. Return the response
    return NextResponse.json(dataToCache);

  } catch (error) {
    console.error('❌ Failed to fetch and cache filter options:', error);
    return NextResponse.json({ error: 'Failed to fetch filter options' }, { status: 500 });
  }
}