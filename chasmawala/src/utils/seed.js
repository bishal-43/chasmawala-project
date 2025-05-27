import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });


import mongoose from "mongoose";
import Product from "../models/productModel.js"; // Import Product model
import { products } from "./data.js"; // Import products array

// ✅ Connect to MongoDB
console.log("MONGO_URI : ",process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const seedDatabase = async () => {
  try {
    console.log("🔄 Connecting to MongoDB...");

    // ✅ Remove all existing products (if you want to clear)
    // You can also consider checking for specific conditions (e.g., duplicate products)
    await Product.deleteMany();
    console.log("🗑️ Existing products removed!");

    // ✅ Insert the new products (with a brand)
    const productsWithBrand = products.map((p) => ({
      ...p,
      brand: p.brand || "Generic Brand" // ✅ Assign a default brand if none exists
    }));

    // Check if any product already exists by name before inserting
    const existingProducts = await Product.find({ name: { $in: productsWithBrand.map(p => p.name) } });
    const existingProductNames = existingProducts.map(p => p.name);

    const productsToInsert = productsWithBrand.filter(p => !existingProductNames.includes(p.name));

    if (productsToInsert.length > 0) {
      await Product.insertMany(productsToInsert);
      console.log("✅ New products inserted successfully!");
    } else {
      console.log("✅ No new products to insert!");
    }

    mongoose.connection.close();
    process.exit(0); // Graceful exit after seeding
  } catch (error) {
    console.error("❌ Seeding Error:", error);
    mongoose.connection.close();
    process.exit(1); // Exit with error
  }
};

seedDatabase();
