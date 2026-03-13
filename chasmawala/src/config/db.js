// src/config/db.js

import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "chasmawala",
      
      
    });
    console.log("🔥 MongoDB Connected: chasmawala");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1); // Stop the server if DB fails
  }
};
