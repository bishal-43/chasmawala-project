import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  slug: { type: String, required: true, unique: true, lowercase: true },
  category: { type: String, required: true, lowercase: true, trim: true },
  description: { type: String, default: "", trim: true },
  image: { type: String, required: true },
  brand: { type: String, default: "Generic Brand", lowercase: true, trim: true },
  stock: { type: Number, default: 5, min: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  frameShape: { type: String, lowercase: true, trim: true }, // Added missing field from your queries
}, { timestamps: true });

// ✅ INDEXES - Critical for performance
productSchema.index({ category: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ frameShape: 1 });
productSchema.index({ price: 1 });

productSchema.index({ createdAt: -1 }); // For "new arrivals" sorting

// Compound indexes for common filter combinations
productSchema.index({ category: 1, brand: 1 });
productSchema.index({ category: 1, price: 1 });
productSchema.index({ category: 1, brand: 1, price: 1 });

// Text index for search functionality (if needed)
productSchema.index({ name: 'text', description: 'text' });

// ✅ PRE-SAVE HOOK - Optimized
productSchema.pre("save", function (next) {
  // Only log in development
  if (process.env.NODE_ENV === 'development') {
    console.log("--- PRE-SAVE HOOK TRIGGERED ---");
    console.log("Product Name:", this.name);
  }

  // Generate slug if name is modified
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
    if (process.env.NODE_ENV === 'development') {
      console.log("Generated Slug:", this.slug);
    }
  }

  // Normalize text fields to lowercase (for case-insensitive queries)
  if (this.isModified("category")) {
    this.category = this.category.toLowerCase().trim();
  }
  if (this.isModified("brand")) {
    this.brand = this.brand.toLowerCase().trim();
  }
  if (this.isModified("frameShape") && this.frameShape) {
    this.frameShape = this.frameShape.toLowerCase().trim();
  }

  next();
});

// ✅ INSTANCE METHODS (optional but useful)
productSchema.methods.isInStock = function() {
  return this.stock > 0;
};

productSchema.methods.updateRating = function(newRating) {
  this.rating = Math.min(Math.max(newRating, 0), 5); // Ensure 0-5 range
};

// ✅ STATIC METHODS for common queries
productSchema.statics.findByCategory = function(category) {
  return this.find({ category: category.toLowerCase() })
    .select('name price image category brand slug')
    .lean();
};

productSchema.statics.findNewArrivals = function(limit = 10) {
  return this.find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('name price image category brand slug')
    .lean();
};

productSchema.statics.findInPriceRange = function(min, max) {
  return this.find({ price: { $gte: min, $lte: max } })
    .select('name price image category brand slug')
    .lean();
};

// ✅ VIRTUAL PROPERTIES (optional)
productSchema.virtual('isNew').get(function() {
  const daysSinceCreated = (Date.now() - this.createdAt) / (1000 * 60 * 60 * 24);
  return daysSinceCreated <= 30; // Products less than 30 days old
});

productSchema.virtual('discountedPrice').get(function() {
  // Example: if you want to add discount logic later
  return this.price; // For now, just return regular price
});

// Ensure virtuals are included when converting to JSON
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;