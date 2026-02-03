// src/scripts/migrate-products.js
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import mongoose from "mongoose";
import Product from "../models/productModel.js";

async function migrateProducts() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("❌ MONGO_URI is not defined in environment variables");
    }

    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    console.log("🗑️  Dropping existing indexes...");
    try {
      await Product.collection.dropIndexes();
      console.log("✅ Old indexes dropped");
    } catch (err) {
      console.log("⚠️  No indexes to drop or drop failed (this is OK)");
    }

    console.log("📌 Creating indexes...");
    await Product.createIndexes();
    console.log("✅ Indexes created");

    console.log("🧹 Normalizing existing data...");
    const products = await Product.find({});  // ❌ Remove .lean() here
    
    let updatedCount = 0;
    
    for (const product of products) {
      const updates = {};

      if (product.category && product.category !== product.category.toLowerCase()) {
        updates.category = product.category.toLowerCase().trim();
      }

      if (product.brand && product.brand !== product.brand.toLowerCase()) {
        updates.brand = product.brand.toLowerCase().trim();
      }

      if (
        product.frameShape &&
        product.frameShape !== product.frameShape.toLowerCase()
      ) {
        updates.frameShape = product.frameShape.toLowerCase().trim();
      }

      if (Object.keys(updates).length > 0) {
        await Product.updateOne({ _id: product._id }, { $set: updates });
        updatedCount++;
      }
    }

    console.log(`✅ Migration complete! Updated ${updatedCount} out of ${products.length} products.`);

  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);  // ❌ Exit with error code
  } finally {
    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected");
  }
}

migrateProducts();