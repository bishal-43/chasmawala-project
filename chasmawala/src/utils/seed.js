import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from '../models/productModel.js';
import { products } from './data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env variables from project root .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

console.log("MONGO_URI:", process.env.MONGO_URI);

// Connect to MongoDB
await mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

const seedDatabase = async () => {
  try {
    console.log("🔄 Clearing old products...");
    await Product.deleteMany();

    const productsWithBrand = products.map(p => ({
      ...p,
      brand: p.brand || "Generic Brand"
    }));

    const existing = await Product.find({ name: { $in: productsWithBrand.map(p => p.name) } });
    const existingNames = existing.map(p => p.name);
    const toInsert = productsWithBrand.filter(p => !existingNames.includes(p.name));

    if (toInsert.length > 0) {
      await Product.insertMany(toInsert);
      console.log(`✅ Inserted ${toInsert.length} new products!`);
    } else {
      console.log("✅ No new products to insert!");
    }
  } catch (error) {
    console.error("❌ Seeding Error:", error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

seedDatabase();
