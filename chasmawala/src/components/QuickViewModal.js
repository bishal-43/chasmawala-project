// src/components/QuickViewModal.js

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useQuickView } from "@/contexts/QuickViewContext";
import { FiX, FiShoppingCart, FiHeart, FiCheckCircle } from "react-icons/fi";

export default function QuickViewModal() {
  const { cart, addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { isOpen, product, closeQuickView } = useQuickView();

  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Check if the product is already in the wishlist
  const isInWishlist = wishlist?.some((item) => item.slug === product?.slug);

  //console.log("--- 3. MODAL STATE ---", { isOpen, product, wishlist });

  // Effect for handling the 'Escape' key to close the modal



  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") closeQuickView();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [closeQuickView]);

  useEffect(() => {
    if (product) {
      setQuantity(1);
    }
  }, [product]);

  if (!isOpen || !product) {
    return null;
  }

  // Handler for adding items to the cart
  const handleAddToCart = () => {
    setIsAddingToCart(true);
    addToCart({ ...product, quantity });
    // Provide visual feedback for 2 seconds
    setTimeout(() => {
      setIsAddingToCart(false);
      closeQuickView(); // Optionally close modal after adding to cart
    }, 2000);
  };

  // Handler for toggling wishlist status
  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(product.slug);
    } else {
      addToWishlist(product);
    }
  };

  console.log("Product data in Quick View:", product);

  return (
    // Modal Overlay
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 transition-opacity duration-300"
      onClick={closeQuickView} // Close modal on overlay click
    >
      {/* Modal Content */}
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-sm md:max-w-4xl grid md:grid-cols-2 gap-8 p-6 md:p-8 relative animate-scale-in"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside content
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors rounded-full p-2"
          onClick={closeQuickView}
          aria-label="Close quick view"
        >
          <FiX size={24} />
        </button>

        {/* Product Image Column */}
        <div className="w-full h-64 md:h-full flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">

          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-full object-contain mix-blend-multiply"
          />
        </div>

        {/* Product Details & Actions Column */}
        <div className="flex flex-col justify-center space-y-4">
          <div>
            <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">
              {product.category}
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mt-1">{product.name}</h2>
          </div>

          <p className="text-gray-600 text-base leading-relaxed">
            {product.description || "A premium quality product from our exclusive collection, designed for comfort and style."}
          </p>

          <p className="text-4xl font-extrabold text-gray-800">
            ₹{product.price.toFixed(2)}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-l-lg">-</button>
              <span className="px-5 py-2 text-lg font-semibold text-gray-900">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-2 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-r-lg">+</button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className={`w-full sm:w-auto flex-grow flex items-center justify-center px-6 py-3 font-semibold text-white rounded-lg transition-all duration-300 ease-in-out ${isAddingToCart
                ? "bg-green-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {isAddingToCart ? (
                <>
                  <FiCheckCircle className="mr-2" /> Added!
                </>
              ) : (
                <>
                  <FiShoppingCart className="mr-2" /> Add to Cart
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-4 pt-4 text-sm">
            {/* Wishlist Button */}
            <button
              onClick={handleWishlistToggle}
              className="flex items-center font-medium text-gray-600 hover:text-red-500 transition-colors"
            >
              <FiHeart className={`mr-2 ${isInWishlist ? 'text-red-500 fill-current' : ''}`} />
              {isInWishlist ? 'Added to Wishlist' : 'Add to Wishlist'}
            </button>
            <span className="text-gray-300">|</span>
            {/* View Full Details Link */}
            {product && product.slug && (
              <Link
                href={`/products/${product.slug}`}
                onClick={closeQuickView}
                className="font-medium text-gray-600 hover:text-blue-600"
              >
                View Full Details
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

