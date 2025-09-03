// app/products/[slug]/page.js

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { CheckCircle, ShoppingCart } from "lucide-react";

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (!slug) return; // prevent undefined call
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${encodeURIComponent(slug)}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);
  
  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000); // Reset after 2 seconds
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!product) return <div className="text-center py-20 text-red-500">Product Not Found</div>;

  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-8 my-10">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 bg-white p-8 rounded-lg shadow-md">
        {/* Image Column */}
        <div className="bg-gray-100 rounded-lg flex items-center justify-center p-4">
          <Image
            src={product.image || "/images/default-product.jpg"}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Details Column */}
        <div className="flex flex-col justify-center space-y-4">
          <div>
            <span className="text-sm font-semibold text-emerald-600 uppercase">{product.brand}</span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-1">{product.name}</h1>
          </div>
          <p className="text-gray-600 leading-relaxed">{product.description || "No description available."}</p>
          <p className="text-3xl font-bold text-gray-800">₹{product.price?.toLocaleString('en-IN')}</p>

          <div className="flex items-center gap-4 pt-4">
            <button
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`flex items-center justify-center w-full px-6 py-3 font-semibold text-white rounded-lg transition-all duration-300 ${
                isAdded ? "bg-green-600" : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              {isAdded ? (
                <CheckCircle size={20} className="mr-2" />
              ) : (
                <ShoppingCart size={20} className="mr-2" />
              )}
              {isAdded ? "Added to Cart!" : "Add to Cart"}
            </button>
          </div>
          <Link href="/collections" className="text-center text-sm text-emerald-600 hover:underline mt-4">
            &larr; Back to all collections
          </Link>
        </div>
      </div>
    </div>
  );
}