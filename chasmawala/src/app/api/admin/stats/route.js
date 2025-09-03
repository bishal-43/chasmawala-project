

import { NextResponse } from 'next/server';
import { connectDB } from '@/config/db';
import Product from '@/models/productModel';
import User from '@/models/userModel';
import Order from '@/models/orderModel';


export async function GET() {
    try {
        await connectDB();
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();
        const totalUsers = await User.countDocuments({role: "customer"});

        return NextResponse.json({ totalProducts,totalOrders,totalUsers}, { status: 200 });
    } catch (error) {
        return NextResponse.json({error: "Failed to fetch stats" }, { status: 500 });
    }
}