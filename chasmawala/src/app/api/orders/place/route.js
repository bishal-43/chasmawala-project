import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import connectDB from "@/lib/connectDB";        // adjust path if your project uses "@/config/db"
import Order from "@/models/orderModel";  // adjust path/name to match your file
import Product from "@/models/productModel"; // ensure this exists and has `price` and `stock` fields

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  await connectDB();

  try {
    // authenticate via cookie (auth-token) -> decode JWT
    const token = req.cookies.get("auth-token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.id || decoded.userId;
    if (!userId) {
      return NextResponse.json({ error: "Invalid user in token" }, { status: 401 });
    }

    // parse body
    const body = await req.json();
    // Expect: { items: [{ productId, name, price, quantity, image }], shippingAddress: {...}, paymentMethod: "COD"|"Stripe"|..., optionally totalAmount }
    const { items, shippingAddress, paymentMethod } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Order items are required" }, { status: 400 });
    }

    // Validate shippingAddress
    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.addressLine1 || !shippingAddress.city || !shippingAddress.state || !shippingAddress.postalCode) {
      return NextResponse.json({ error: "Complete shipping address is required" }, { status: 400 });
    }

    // Start a mongoose transaction to prevent race conditions / oversell
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Validate each product and compute total server-side
      let totalAmount = 0;
      const processedItems = [];

      for (const [idx, item] of items.entries()) {
        if (!item.productId) {
          throw new Error(`Item ${idx}: productId missing`);
        }
        const prod = await Product.findById(item.productId).session(session);
        if (!prod) {
          return NextResponse.json({ error: `Product not found: ${item.productId}` }, { status: 404 });
        }

        const qty = Number(item.quantity) || 0;
        if (qty <= 0) {
          return NextResponse.json({ error: `Invalid quantity for product ${prod._id}` }, { status: 400 });
        }

        if (typeof prod.stock === "number" && prod.stock < qty) {
          return NextResponse.json({ error: `Not enough stock for ${prod.name}` }, { status: 400 });
        }

        // compute price server-side to prevent client tampering
        const unitPrice = Number(prod.price || item.price || 0);
        totalAmount += unitPrice * qty;

        processedItems.push({
          productId: prod._id,
          name: prod.name || item.name || "Product",
          price: unitPrice,
          quantity: qty,
          image: prod.image || item.image || "",
        });
      }

      // Simulate Payment (placeholder):
      // - For real integration: create Stripe/Razorpay order here and return session/url to the client.
      // For now: if paymentMethod is COD -> leave status Pending; otherwise set Paid to simulate immediate success.
      const paymentInfo = {
        method: paymentMethod || "COD",
        status: paymentMethod && paymentMethod !== "COD" ? "Paid" : "Pending",
        transactionId: paymentMethod && paymentMethod !== "COD" ? `txn_${Date.now()}` : undefined,
      };

      // Deduct stock
      for (const item of processedItems) {
        // Use $inc within transaction
        const updated = await Product.findByIdAndUpdate(
          item.productId,
          { $inc: { stock: -item.quantity } },
          { new: true, session }
        );

        // extra safety check
        if (typeof updated.stock === "number" && updated.stock < 0) {
          // rollback by throwing
          throw new Error(`Stock underflow for product ${item.productId}`);
        }
      }

      // Simulate shipping provider label creation (placeholder)
      const shipment = {
        provider: "ShipRocket",
        trackingId: `trk_${Date.now()}`,
        status: "Label Created",
        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // +5 days
      };

      // Create order document (match your orderModel fields)
      const newOrder = new Order({
        userId,
        items: processedItems,
        totalAmount,
        status: paymentInfo.status === "Paid" ? "Paid" : "Processing",
        paymentInfo,
        shippingAddress,
        shipment,
        trackingHistory: [{ status: "Order Placed", location: "Warehouse", timestamp: new Date() }],
      });

      const savedOrder = await newOrder.save({ session });

      // Commit transaction
      await session.commitTransaction();
      session.endSession();

      // Return minimal public info
      return NextResponse.json(
        { message: "Order placed successfully", orderId: savedOrder._id, orderNumber: savedOrder.orderNumber },
        { status: 201 }
      );
    } catch (errInner) {
      // abort transaction
      await session.abortTransaction();
      session.endSession();

      console.error("Order transaction aborted:", errInner);
      // Provide friendly error
      const msg = errInner.message || "Order failed during processing";
      return NextResponse.json({ error: msg }, { status: 400 });
    }
  } catch (err) {
    console.error("Order placement error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
