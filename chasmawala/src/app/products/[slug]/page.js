// app/products/[slug]/page.js

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { CheckCircle, ShoppingBag, ArrowLeft, Plus, Minus, Star, Truck, RefreshCw, Shield } from "lucide-react";

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const Router = useRouter();

  useEffect(() => {
    if (!slug) return;
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
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart({...product, quantity});
    Router.push('/checkout');
  }

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-emerald-300 rounded-full animate-spin" style={{ animationDuration: '1.5s' }}></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Product Not Found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
          <Link 
            href="/collections" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-300 font-semibold mt-4"
          >
            <ArrowLeft size={20} />
            Browse Collections
          </Link>
        </div>
      </div>
    );
  }

  // Mock image gallery (you can replace with actual product images)
  const images = product.images && product.images.length > 0 ? product.images : [product.image || "/images/default-product.jpg"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 pt-6 pb-4">
        <Link 
          href="/collections" 
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Collections
        </Link>
      </div>

      {/* Main Product Section */}
      <div className="container mx-auto px-4 py-6 md:py-12 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-lg group">
              <div className="aspect-square relative bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8 md:p-12">
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-tr-full"></div>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 ${
                    selectedImage === idx 
                      ? 'ring-4 ring-emerald-500 scale-95 shadow-xl' 
                      : 'ring-2 ring-gray-200 hover:ring-emerald-300 hover:scale-95'
                  }`}
                >
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 w-full h-full flex items-center justify-center p-4">
                    <Image
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      width={150}
                      height={150}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="flex flex-col space-y-6 lg:pt-4">
            
            {/* Brand & Rating */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-semibold">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                {product.brand || product.category || "Premium"}
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(4.8 • 124 reviews)</span>
              </div>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              {product.name}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              {product.description || "Experience premium quality and exceptional design with this carefully crafted product. Made with attention to detail and built to last."}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3 py-4">
              <span className="text-5xl sm:text-6xl font-bold text-gray-900">
                ₹{product.price?.toLocaleString('en-IN')}
              </span>
              {/* <span className="text-xl text-gray-400 line-through">
                ₹{((product.price || 0) * 1.3).toLocaleString('en-IN')}
              </span> */}
              {/* <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-bold">
                23% OFF
              </span> */}
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Quantity Selector */}
                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                  <button
                    onClick={decrementQuantity}
                    className="px-5 sm:px-6 py-3.5 sm:py-4 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={20} className="text-gray-700" />
                  </button>
                  <div className="px-6 sm:px-8 py-3.5 sm:py-4 font-bold text-lg sm:text-xl text-gray-900 min-w-[60px] text-center border-x-2 border-gray-200">
                    {quantity}
                  </div>
                  <button
                    onClick={incrementQuantity}
                    className="px-5 sm:px-6 py-3.5 sm:py-4 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={20} className="text-gray-700" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 font-bold text-base sm:text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                    isAdded 
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white scale-95" 
                      : "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <CheckCircle size={24} className="animate-bounce" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={24} />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>

              {/* Buy Now Button */}
              <button 
              onClick={handleBuyNow}
              className="w-full px-8 py-4 font-bold text-base sm:text-lg border-2 border-emerald-600 text-emerald-700 rounded-xl hover:bg-emerald-50 transition-all duration-300">
                Buy Now
              </button>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t-2 border-gray-100">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-transparent">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">Free Shipping</h3>
                  <p className="text-xs text-gray-600 mt-0.5">On orders above ₹999</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-transparent">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">Easy Returns</h3>
                  <p className="text-xs text-gray-600 mt-0.5">30-day return policy</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-transparent">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">Secure Payment</h3>
                  <p className="text-xs text-gray-600 mt-0.5">100% protected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom styles for animations */}
      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}


