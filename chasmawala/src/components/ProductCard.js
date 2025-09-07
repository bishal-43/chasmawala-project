// src/components/ProductCard.js

"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useQuickView } from "@/contexts/QuickViewContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Heart, Eye, ShoppingBag, Check } from "lucide-react";

// --- Redesigned Product Card Component ---
export default function ProductCard({ product }) {
  // State management hooks from context (same as before)
  const { cartItems, addToCart } = useCart();
  const { openQuickView } = useQuickView();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();

  // Derived state to check if the product is in the wishlist or cart
  const isInWishlist = wishlistItems.some((item) => item.slug === product.slug);
  const isInCart = cartItems?.some((item) => item.slug === product.slug) || false;

  // Handler remains the same: add to cart and remove from wishlist if present
  const handleAddToCart = () => {
    addToCart(product);
    if (isInWishlist) {
      removeFromWishlist(product.slug);
    }
  };

  const handleWishlistToggle = (e) => {
    // Stop the click from propagating to the Link wrapper around the image
    e.preventDefault(); 
    e.stopPropagation();
    if (isInWishlist) {
        removeFromWishlist(product.slug)
    } else {
        addToWishlist(product)
    }
  }

  const handleQuickViewClick = () => {
    // ✅ ADD THESE LINES
    //console.log("--- 1. TRIGGER ---");
    //console.log("Sending this product to Quick View:", product);
    openQuickView(product);
  };

  return (
    // The 'group' class is key for Tailwind's group-hover functionality
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
      
      {/* --- Image and Hover Actions Section --- */}
      <div className="relative aspect-square w-full overflow-hidden">
        {/* Link wraps the image for navigation */}
        <Link href={`/products/${product.slug}`}>
          <Image
            src={product.image || "/images/categories/default-product.jpg"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        
        {/* Wishlist button: top-right corner, appears on hover */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white p-2 text-gray-700 shadow-md transition-all duration-300 hover:bg-red-500 hover:text-white"
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={20} className={isInWishlist ? 'fill-red-500 text-red-500' : 'fill-transparent'} />
        </button>

        {/* Quick View button: center, appears on hover */}
        <button 
            onClick={handleQuickViewClick}
            className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 p-3 text-gray-900 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:bg-white"
            aria-label="Quick view"
        >
            <Eye size={24} />
        </button>
      </div>

      {/* --- Product Information Section --- */}
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <p className="text-sm text-gray-500">{product.category}</p>
        <h3 className="text-base font-medium text-gray-900">
          {/* Product name is a separate link for better accessibility */}
          <Link href={`/products/${product.slug}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </Link>
        </h3>
        <p className="text-lg font-semibold text-emerald-600">${product.price.toFixed(2)}</p>
      </div>

      {/* --- Add to Cart Button --- */}
      {/* Slides up from the bottom on hover */}
      <div className="p-4 pt-0">
          <button
            onClick={handleAddToCart}
            disabled={isInCart}
            className={`relative flex w-full items-center justify-center rounded-md border border-transparent px-8 py-2.5 text-sm font-medium text-white transition-colors duration-300 ${
                isInCart
                ? 'cursor-not-allowed bg-gray-400'
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {isInCart ? (
                <>
                    Added <Check size={16} className="ml-2" />
                </>
            ) : (
                <>
                    Add to Cart <ShoppingBag size={16} className="ml-2" />
                </>
            )}
          </button>
      </div>
    </div>
  );
}