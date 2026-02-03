// src/scripts/test-performance.js
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import mongoose from "mongoose";
import Product from "../models/productModel.js";

async function testPerformance() {
  await mongoose.connect(process.env.MONGO_URI);
  
  console.log("\n🧪 Testing Query Performance...\n");

  // Test 1: Find by category
  console.time("⏱️  Find by category");
  const eyeglasses = await Product.find({ category: "eyeglasses" })
    .select('name price image category brand slug')
    .lean();
  console.timeEnd("⏱️  Find by category");
  console.log(`   Found: ${eyeglasses.length} products\n`);

  // Test 2: Find new arrivals
  console.time("⏱️  Find new arrivals");
  const newArrivals = await Product.find({})
    .sort({ createdAt: -1 })
    .limit(10)
    .select('name price image category brand slug')
    .lean();
  console.timeEnd("⏱️  Find new arrivals");
  console.log(`   Found: ${newArrivals.length} products\n`);

  // Test 3: Complex filter
  console.time("⏱️  Complex filter");
  const filtered = await Product.find({
    category: "sunglasses",
    price: { $lte: 5000 }
  })
    .select('name price image category brand slug')
    .lean();
  console.timeEnd("⏱️  Complex filter");
  console.log(`   Found: ${filtered.length} products\n`);

  // Test 4: Check indexes
  console.log("📊 Checking Indexes:");
  const indexes = await Product.collection.getIndexes();
  Object.keys(indexes).forEach(name => {
    console.log(`   ✅ ${name}: ${JSON.stringify(indexes[name].key)}`);
  });

  await mongoose.disconnect();
  console.log("\n✅ Performance test complete!\n");
}

testPerformance();