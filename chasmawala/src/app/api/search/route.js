// src/app/api/search/route.js

import { NextResponse } from 'next/server';
import { connectDB } from '@/config/db';
import Product from '@/models/productModel'; // Adjust this path to your Product model

export async function GET(request) {
  try {
    await connectDB();

    // Get the search query from the URL parameters
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    // If no query is provided, return an error
    if (!query) {
      return NextResponse.json(
        { message: 'Search query is required' },
        { status: 400 }
      );
    }

    // Build a search query using a case-insensitive regex.
    // This will find products where the name, category, or description contains the search term.
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    }).limit(20); // Add a limit to prevent returning too much data

    // Return the found products
    return NextResponse.json(products);

  } catch (error) {
    console.error('API Search Error:', error);
    // Return a generic server error response
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}