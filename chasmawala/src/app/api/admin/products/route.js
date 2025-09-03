//  api/admin/products/route.js

import { connectDB } from "@config/db";
import Product from "@models/productModel";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        await connectDB();
        const products = await Product.find().sort({createdAt: -1});
        return NextResponse.json({products},{status: 200});
    }catch(error){

        return NextResponse.json({error:"failed to fetch products"},{status:500});
    }
}