// scripts/createSuperAdmin.js

import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "../models/user.js"; // adjust path as needed

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const name = process.env.SUPERADMIN_NAME;
const email = process.env.SUPERADMIN_EMAIL;
const rawPassword = process.env.SUPERADMIN_PASSWORD;
const role = "superadmin";

const run = async () => {
  try {
    

    if (!MONGO_URI || !name || !email || !rawPassword) {
      throw new Error("Missing required environment variables.");
    }

    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const existing = await User.findOne({ email });
    if (existing) {
      console.log("⚠️ Superadmin already exists.");
      process.exit(0);
    }



    const superadmin = new User({
      name,
      email,
      password: rawPassword,
      role,
    });

    await superadmin.save();
    console.log("🎉 Superadmin created successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to create superadmin:", err.message);
    process.exit(1);
  }
};

/*const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const result = await User.deleteOne({ email: "sharban$admin@gmail.com" });
  console.log("Deleted:", result);
  process.exit(0);
};*/



run();
