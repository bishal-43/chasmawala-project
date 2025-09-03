import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Ensure unique names
  price: { type: Number, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true, index: true }, // Index on category for faster searches
  description: { type: String, default: "" },
  image: { type: String, required: true },
  brand: { type: String, default: "Generic Brand" },
  stock: { type: Number, default: 5 }, // Default value for stock
  rating: { type: Number, default: 0 }, // Default value for rating
}, { timestamps: true });


productSchema.pre("save", function (next) {

  console.log("--- PRE-SAVE HOOK TRIGGERED ---");
  console.log("Product Name:", this.name);

  if (!this.isModified("name")) return next();
  this.slug = slugify(this.name, { lower: true, strict: true });
  console.log("Generated Slug:", this.slug);
  next();
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
