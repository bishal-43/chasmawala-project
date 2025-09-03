// uploads/deleteProduct.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "../src/config/db.js";
import Product from "../src/models/productModel.js";

dotenv.config({ path: ".env.local" }); // make sure to load env file

async function deleteAllProducts() {
  try {
    await connectDB();
    const result = await Product.deleteMany({});
    console.log(`🗑️ Deleted ${result.deletedCount} products from database`);
    process.exit();
  } catch (error) {
    console.error("❌ Error deleting products:", error);
    process.exit(1);
  }
}

deleteAllProducts();
