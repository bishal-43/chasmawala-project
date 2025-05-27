"use client";

import {useEffect, useState } from "react";
import Image from "next/image";
import FilterSidebar from "@/components/FilterSidebar";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import QuickViewModal from "@/components/QuickViewModal";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { } from "@/utils/data"





export default function CollectionPage() {
  const [filters, setFilters] = useState({ categories: [], price: 5000 });
  const [showQuickView, setShowQuickView] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const { cartItems, addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist(); // ✅ Ensure wishlistItems is properly defined

  // Apply filters to the product list
  const filteredProducts = products.filter((product) =>
    (filters.categories.length === 0 || filters.categories.includes(product.category)) &&
    product.price <= filters.price
  );

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data); // Now each product will have a proper `_id`
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto py-12 px-6">
      {/* Hero Section */}
      <div className="w-full h-64 bg-gradient-to-r from-blue-500 to-purple-600 text-white flex flex-col justify-center items-center rounded-lg shadow-lg mb-10">
        <h1 className="text-4xl font-bold">Explore Our Collection</h1>
        <p className="text-lg mt-2">Find your perfect eyewear from our curated selection</p>
      </div>

      {/* Filter Button & Sidebar */}
      <FilterSidebar filters={filters} setFilters={setFilters} />

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-1">
        {filteredProducts.map((product) => {
          const isInWishlist = wishlistItems.some((item) => item._id === product._id); // ✅ Fix: Use wishlist

          return (
            <div key={product._id} className="relative group bg-white rounded-lg shadow-md p-4 transition-all hover:shadow-lg">
              {/* Product Image */}
              <Image src={product.image} alt={product.name} width={300} height={200} className="w-full h-60 object-cover rounded-md" />

              {/* Product Info */}
              <div className="mt-4 text-center">
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-gray-600">{product.category}</p>
                <p className="text-primary font-semibold mt-1">₹{product.price}</p>
              </div>

              {/* Hover Actions */}
              <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all">
                {/* Wishlist Button */}
                <button
                  onClick={() => (isInWishlist ? removeFromWishlist(product._id) : addToWishlist(product))}
                  className="p-2 bg-white shadow rounded-full hover:bg-gray-100 relative"
                >
                  <Heart className={`w-5 h-5 ${isInWishlist ? "text-red-500" : "text-gray-500"}`} />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                      {wishlistItems.length}
                    </span>
                  )}
                </button>

                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(product)}
                  className="p-2 bg-white shadow rounded-full hover:bg-gray-100 relative"
                >
                  <ShoppingCart className="w-5 h-5 text-green-500" />
                  {cartItems && cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1 rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                </button>
                {/* Quick View Button */}
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowQuickView(true);
                  }}
                  className="p-2 bg-white shadow rounded-full hover:bg-gray-100 transition"
                >
                  <Eye className="w-5 h-5 text-blue-500" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick View Modal */}
      {showQuickView && <QuickViewModal product={selectedProduct} onClose={() => setShowQuickView(false)} />}
    </div>
  );
}
