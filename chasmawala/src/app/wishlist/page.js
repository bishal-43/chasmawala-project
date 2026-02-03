"use client"; 

import React from "react";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import { ShoppingBag, Trash2 } from "lucide-react";

export default function WishlistPage() {
  const { wishlistItems = [], removeFromWishlist } = useWishlist() || {}; // ✅ Corrected variable name
  const { addToCart } = useCart() || {};

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <div key={product._id} className="relative bg-white rounded-lg shadow-md p-4">
              <Image src={product.image} alt={product.name} width={300} height={200} className="w-full h-60 object-cover rounded-md" />
              
              <div className="mt-4 text-center">
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-gray-600">{product.category}</p>
                <p className="text-primary font-semibold mt-1">₹{product.price}</p>
              </div>

              <div className="flex justify-center mt-4 space-x-4">
                <button 
                  onClick={() => addToCart(product)} 
                  className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center space-x-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>

                <button 
                  onClick={() => removeFromWishlist(product._id)} 
                  className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center space-x-2"
                >
                  <Trash2 className="w-5 h-5" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
