"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext"; // ✅ Import Cart Context
import { useWishlist } from "@/contexts/WishlistContext"; // ✅ Import Wishlist Context

export default function QuickViewModal({ product, onClose }) {
  const { addToCart } = useCart(); // ✅ Get addToCart function
  const { addToWishlist } = useWishlist(); // ✅ Get addToWishlist function

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        {/* Close Button */}
        <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>
          ✕
        </button>

        {/* Product Image */}
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={200}
          className="w-full h-56 object-cover rounded-md"
        />

        {/* Product Details */}
        <h2 className="text-xl font-bold mt-4">{product.name}</h2>
        <p className="text-gray-600">{product.category}</p>
        <p className="text-primary font-semibold">{product.price}</p>

        {/* Actions */}
        <div className="flex gap-3 mt-4">
          {/* ✅ Fix: Add to Cart Button */}
          console.log("🧪 Product sent to QuickViewModal:", product);

          <button
            
            onClick={() => addToCart(product)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Add to Cart
          </button>

          {/* ✅ Fix: Add to Wishlist Button */}
          <button
            onClick={() => addToWishlist(product)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
