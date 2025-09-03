// src/models/orderModel.js

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderNumber: {
      type: String,
      unique: true,
      default: () =>
        `ORD-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        name: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        quantity: { type: Number, required: true, min: 1 },
        image: { type: String, required: true },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Processing", "Paid", "Shipped", "Delivered", "Cancelled"],
    },

    paymentInfo: {
      method: {
        type: String,
        enum: ["COD", "Stripe", "Razorpay", "Card", "UPI", "NetBanking", "Wallet"],
        default: "COD",
      },
      status: {
        type: String,
        enum: ["Pending", "Paid", "Failed", "Refunded"],
        default: "Pending",
      },
      transactionId: { type: String },
    },

    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      addressLine1: { type: String, required: true },
      addressLine2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true, default: "India" },
    },

    shipment: {
      provider: { type: String, enum: ["DHL", "FedEx", "UPS", "IndianPost", "ShipRocket"] },
      trackingId: { type: String },
      status: {
        type: String,
        enum: ["Not Shipped", "Label Created", "In Transit", "Out for Delivery", "Delivered"],
        default: "Not Shipped",
      },
      estimatedDelivery: { type: Date },
    },

    trackingHistory: [
      {
        status: String,
        location: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
