import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Ensure unique names
  price: { type: Number, required: true },
  category: { type: String, required: true, index: true }, // Index on category for faster searches
  image: { type: String, required: true },
  brand: { type: String, default: "Generic Brand" },
  stock: { type: Number, default: 0 }, // Default value for stock
  rating: { type: Number, default: 0 }, // Default value for rating
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
