// src/app/api/orders/[id]/route.js

import { connectDB } from "@/config/db";
import { NextResponse } from "next/server";
import Order from "@/models/orderModel";
import { getUserFromToken } from "@/lib/auth";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const user = await getUserFromToken(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const order = await Order.findOne({ _id: params.id, user: user._id });
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const { status } = await req.json(); // destructure properly

    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 });
    }

    const order = await Order.findByIdAndUpdate(
      id,       // correct param
      { status },      // update only status
      { new: true }
    );

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Order Updated Successfully", order },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}



export async function DELETE(req,{params}){
    await connectDB();
    const {id} = params
    try{

        const deleted = await Order.findByIdAndDelete(id);
        if(!deleted) return NextResponse.json({error: "Order not found"}, {status: 404});
        return NextResponse.json({message:"Order deleted successfully"}, {status: 200});

    }catch(err){
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}