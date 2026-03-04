
"use client"

import { useState } from "react";
import {useCart} from "@/contexts/CartContext"
import { Cormorant_Garamond, Syne } from 'next/font/google';


const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cormorant'
});

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-syne'
});


function StarRating({ rating = 4.7, count }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <svg key={s} className="w-2.5 h-2.5" viewBox="0 0 12 12">
            <path
              d="M6 0l1.5 4h4l-3.3 2.4 1.3 4L6 8 2.5 10.4l1.3-4L.5 4h4z"
              fill={s <= Math.round(rating) ? "#c9a84c" : "#d1d5db"}
            />
          </svg>
        ))}
      </div>
      <span className="text-[0.65rem] font-medium text-stone-500 whitespace-nowrap">
        {rating} <span className="text-stone-300 mx-0.5">|</span> {count?.toLocaleString()}
      </span>
    </div>
  );
}


export default function EditorialSpotlight({ product }) {
  const addToCart = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);


  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;



  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };


  return (
    <section className="relative w-full bg-white border-b border-stone-200 group overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[450px] lg:min-h-[500px]">

        {/* Left: Product Detail */}
        <div className="lg:col-span-5 p-6 lg:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-stone-100">
          <div className="flex items-center gap-3 mb-4 lg:mb-6">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c9a84c] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c9a84c]"></span>
            </span>
            <span className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-stone-400">Current Top Pick</span>
          </div>

          <h2 className={`${cormorant.className} text-4xl lg:text-6xl font-light italic mb-4 leading-tight text-stone-900`}>
            {product.name}
          </h2>

          <div className="mb-6">
            <StarRating rating={product.rating} count={product.reviews} />
          </div>

          <p className="text-stone-500 text-xs lg:text-sm mb-6 lg:mb-8 leading-relaxed max-w-md font-['Syne']">
            {product.description || "Expertly crafted silhouette, defining this season's premium optical standard."}
          </p>

          <div className="flex items-center gap-4 lg:gap-8">
            <div className="flex-shrink-0">
              <p className="text-2xl font-bold text-stone-900">NRs {product.price}</p>
              {discount && <p className="text-[0.6rem] text-[#c9a84c] font-bold uppercase">Save {discount}%</p>}
            </div>
            <button
              onClick={handleAddToCart}
              
              className="flex-1 px-6 py-4 bg-stone-900 text-white text-[0.65rem] font-bold uppercase tracking-[0.15em] hover:bg-[#c9a84c] transition-all duration-300">
              {isAdded ? "Added" : "Add to Collection"}
            </button>
          </div>
        </div>

        {/* Right: Immersive Image */}
        <div className="lg:col-span-7 relative overflow-hidden bg-stone-50 min-h-[300px] lg:min-h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
          />
          <div className="absolute bottom-4 right-4 lg:bottom-8 lg:right-8 bg-white/90 backdrop-blur-sm p-3 lg:p-5 border border-stone-200 shadow-lg max-w-[180px] lg:max-w-xs">
            <p className={`${cormorant.className} text-sm lg:text-lg italic font-semibold`}>"A masterpiece of design."</p>
            <p className="text-[0.5rem] uppercase tracking-widest text-stone-400 mt-1">— Verified Buyer</p>
          </div>
        </div>
      </div>
    </section>
  );
}