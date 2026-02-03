// // src/components/ProductCard.js

// "use client";

// import { useState, useCallback, memo } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { motion, AnimatePresence } from "framer-motion";
// import { useCart } from "@/contexts/CartContext";
// import { useQuickView } from "@/contexts/QuickViewContext";
// import { useWishlist } from "@/contexts/WishlistContext";
// import { Heart, Eye, ShoppingBag, Check, Star, Sparkles, ShoppingCart } from "lucide-react";
// import { cn } from "@/lib/utils";

// // Memoized Product Card for better performance
// const ProductCard = memo(({ product }) => {
//   const { cartItems = [], addToCart } = useCart();
//   const { openQuickView } = useQuickView();
//   const { wishlistItems = [], addToWishlist, removeFromWishlist } = useWishlist();

//   // Local state for interaction feedback
//   const [isImageLoaded, setIsImageLoaded] = useState(false);
//   const [addingToCart, setAddingToCart] = useState(false);

//   // Derived state
//   const isInWishlist = wishlistItems.some((item) => item.slug === product.slug);
//   const isInCart = cartItems.some((item) => item.slug === product.slug);

//   // Check if product has discount
//   const hasDiscount = product.originalPrice && product.originalPrice > product.price;
//   const discountPercentage = hasDiscount
//     ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
//     : 0;

//   // Handlers
//   const handleAddToCart = useCallback(async () => {
//     if (isInCart || addingToCart) return;

//     setAddingToCart(true);
//     try {
//       await addToCart(product);
//       if (isInWishlist) {
//         await removeFromWishlist(product.slug);
//       }
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     } finally {
//       // Small delay for visual feedback
//       setTimeout(() => setAddingToCart(false), 600);
//     }
//   }, [product, addToCart, isInCart, isInWishlist, removeFromWishlist, addingToCart]);

//   const handleWishlistToggle = useCallback((e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (isInWishlist) {
//       removeFromWishlist(product.slug);
//     } else {
//       addToWishlist(product);
//     }
//   }, [isInWishlist, product, addToWishlist, removeFromWishlist]);

//   const handleQuickView = useCallback((e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     openQuickView(product);
//   }, [product, openQuickView]);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4, ease: "easeOut" }}
//       className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-2xl border border-gray-100 dark:border-gray-800 dark:bg-gray-900"
//     >
//       {/* Badges Section */}
//       <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
//         {/* Discount Badge */}
//         {hasDiscount && (
//           <motion.div
//             initial={{ scale: 0, rotate: -180 }}
//             animate={{ scale: 1, rotate: 0 }}
//             className="flex items-center space-x-1 rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-3 py-1 shadow-lg"
//           >
//             <Sparkles size={12} className="text-white" />
//             <span className="text-xs font-bold text-white">-{discountPercentage}%</span>
//           </motion.div>
//         )}

//         {/* New/Featured Badge (if product has these properties) */}
//         {product.isNew && (
//           <div className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-1 shadow-lg">
//             <span className="text-xs font-bold text-white">NEW</span>
//           </div>
//         )}

//         {product.isFeatured && (
//           <div className="rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 px-3 py-1 shadow-lg">
//             <span className="text-xs font-bold text-white">⭐ Featured</span>
//           </div>
//         )}
//       </div>

//       {/* Image Section with Hover Actions */}
//       <div className="relative aspect-square w-full overflow-hidden bg-gray-50 dark:bg-gray-800">
//         <Link
//           href={`/products/${product.slug}`}
//           className="block h-full w-full"
//         >
//           <Image
//             src={product.image || "/images/categories/default-product.jpg"}
//             alt={product.name}
//             fill
//             sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
//             className={cn(
//               "h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-110",
//               isImageLoaded ? "blur-0" : "blur-sm"
//             )}
//             onLoad={() => setIsImageLoaded(true)}
//             quality={85}
//           />

//           {/* Gradient Overlay on Hover */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
//         </Link>

//         {/* Wishlist Button - Always Visible on Mobile, Hover on Desktop */}
//         <motion.button
//           onClick={handleWishlistToggle}
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           className={cn(
//             "absolute top-3 right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg transition-all duration-300",
//             "md:opacity-0 md:group-hover:opacity-100", // Hide on desktop until hover
//             isInWishlist
//               ? "text-red-500 ring-2 ring-red-500"
//               : "text-gray-700 hover:bg-red-50 hover:text-red-500"
//           )}
//           aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
//         >
//           {/* Fallback if Heart doesn't render */}
//           {typeof Heart === 'function' ? (
//             <Heart
//               size={20}
//               strokeWidth={2}
//               className={isInWishlist ? "fill-current" : "fill-none"}
//             />
//           ) : (
//             <span className="text-xl">{isInWishlist ? "❤️" : "🤍"}</span>
//           )}
//         </motion.button>

//         {/* Quick View Button - Center, appears on hover */}
//         <motion.button
//           onClick={handleQuickView}
//           initial={{ opacity: 0, scale: 0.8 }}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/95 backdrop-blur-sm p-3.5 text-gray-900 shadow-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-emerald-50 hover:text-emerald-600 hover:ring-2 hover:ring-emerald-500"
//           aria-label="Quick view"
//         >
//           <Eye size={24} />
//         </motion.button>

//         {/* Stock Status Indicator */}
//         {product.stock !== undefined && product.stock < 10 && product.stock > 0 && (
//           <div className="absolute bottom-3 left-3 rounded-full bg-orange-500/90 backdrop-blur-sm px-3 py-1">
//             <span className="text-xs font-semibold text-white">
//               Only {product.stock} left!
//             </span>
//           </div>
//         )}

//         {product.stock === 0 && (
//           <div className="absolute bottom-3 left-3 rounded-full bg-gray-900/90 backdrop-blur-sm px-3 py-1">
//             <span className="text-xs font-semibold text-white">Out of Stock</span>
//           </div>
//         )}
//       </div>

//       {/* Product Information Section */}
//       <div className="flex flex-1 flex-col p-4 space-y-2">
//         {/* Category */}
//         <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
//           {product.category || "Eyewear"}
//         </p>

//         {/* Product Name */}
//         <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white line-clamp-2 min-h-[2.5rem] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
//           <Link href={`/products/${product.slug}`} className="hover:underline">
//             {product.name}
//           </Link>
//         </h3>

//         {/* Rating (if available) */}
//         {product.rating && (
//           <div className="flex items-center space-x-1">
//             <div className="flex items-center">
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   size={14}
//                   className={cn(
//                     "transition-colors",
//                     i < Math.floor(product.rating)
//                       ? "fill-yellow-400 text-yellow-400"
//                       : "fill-gray-200 text-gray-200"
//                   )}
//                 />
//               ))}
//             </div>
//             <span className="text-xs text-gray-600 dark:text-gray-400">
//               ({product.reviews || 0})
//             </span>
//           </div>
//         )}

//         {/* Price Section */}
//         <div className="flex items-baseline space-x-2 pt-1">
//           <span className="text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400">
//             NRs {product.price.toFixed(2)}
//           </span>
//           {hasDiscount && (
//             <span className="text-sm text-gray-400 line-through">
//               NRs {product.originalPrice.toFixed(2)}
//             </span>
//           )}
//         </div>

//         {/* Product Features/Tags (if available) */}
//         {product.features && product.features.length > 0 && (
//           <div className="flex flex-wrap gap-1 pt-2">
//             {product.features.slice(0, 2).map((feature, index) => (
//               <span
//                 key={index}
//                 className="rounded-full bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs text-gray-600 dark:text-gray-300"
//               >
//                 {feature}
//               </span>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Add to Cart Button */}
//       <div className="p-4 pt-0">
//         <AnimatePresence mode="wait">
//           <motion.button
//             key={isInCart ? "added" : "add"}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             onClick={handleAddToCart}
//             disabled={isInCart || addingToCart || product.stock === 0}
//             className={cn(
//               "relative flex w-full items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg",
//               isInCart
//                 ? "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 cursor-not-allowed"
//                 : product.stock === 0
//                   ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
//                   : "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 hover:scale-[1.02] active:scale-[0.98]"
//             )}
//           >
//             {addingToCart ? (
//               <span className="flex items-center space-x-2">
//                 <motion.div
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                   className="h-4 w-4 rounded-full border-2 border-white border-t-transparent"
//                 />
//                 <span>Adding...</span>
//               </span>
//             ) : isInCart ? (
//               <span className="flex items-center space-x-2">
//                 <Check size={18} />
//                 <span>Added to Cart</span>
//               </span>
//             ) : product.stock === 0 ? (
//               <span>Out of Stock</span>
//             ) : (
//               <span className="flex items-center space-x-2">
//                 <ShoppingCart size={18} />
//                 <span>Add to Cart</span>
//               </span>
//             )}
//           </motion.button>
//         </AnimatePresence>
//       </div>

//       {/* Hover Effect Border Glow */}
//       <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
//         <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20" />
//       </div>
//     </motion.div>
//   );
// });

// ProductCard.displayName = 'ProductCard';

// export default ProductCard;








// src/components/ProductCard.js

"use client";

import { useState, useCallback, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { useQuickView } from "@/contexts/QuickViewContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Heart, Eye, ShoppingBag, Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────
   Tiny reusable ripple that plays once on tap
   ───────────────────────────────────────────── */
const Ripple = () => (
  <motion.span
    className="absolute inset-0 rounded-full bg-white/30 pointer-events-none"
    initial={{ scale: 0, opacity: 0.6 }}
    animate={{ scale: 2.4, opacity: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  />
);

/* ─────────────────────────────────────────────
   Memoised ProductCard  –  compact & refined
   ───────────────────────────────────────────── */
const ProductCard = memo(({ product }) => {
  const { cartItems = [], addToCart } = useCart();
  const { openQuickView } = useQuickView();
  const { wishlistItems = [], addToWishlist, removeFromWishlist } = useWishlist();

  /* ── local state ── */
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [rippleWish, setRippleWish] = useState(false);
  const [rippleCart, setRippleCart] = useState(false);

  /* ── derived ── */
  const isInWishlist = wishlistItems.some((i) => i.slug === product.slug);
  const isInCart = cartItems.some((i) => i.slug === product.slug);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock !== undefined && product.stock > 0 && product.stock < 5;

  /* ── handlers ── */
  const handleAddToCart = useCallback(async () => {
    if (isInCart || addingToCart || isOutOfStock) return;
    setRippleCart(true);
    setTimeout(() => setRippleCart(false), 500);
    setAddingToCart(true);
    try {
      await addToCart(product);
      if (isInWishlist) await removeFromWishlist(product.slug);
    } catch (e) {
      console.error("Error adding to cart:", e);
    } finally {
      setTimeout(() => setAddingToCart(false), 650);
    }
  }, [product, addToCart, isInCart, isInWishlist, removeFromWishlist, addingToCart, isOutOfStock]);

  const handleWishlistToggle = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setRippleWish(true);
    setTimeout(() => setRippleWish(false), 500);
    isInWishlist ? removeFromWishlist(product.slug) : addToWishlist(product);
  }, [isInWishlist, product, addToWishlist, removeFromWishlist]);

  const handleQuickView = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  }, [product, openQuickView]);

  /* ── render ── */
  return (
    <motion.article
      initial={{ opacity: 0, translateY: 18 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className="group relative w-full sm:w-[240px] flex flex-col rounded-xl overflow-hidden
                 bg-white dark:bg-[#141414]
                 border border-gray-100 dark:border-gray-800
                 shadow-[0_2px_12px_rgba(0,0,0,0.06)]
                 hover:shadow-[0_8px_32px_rgba(0,0,0,0.14)]
                 transition-shadow duration-300 ease-out"
    >
      {/* ─── Image block ─── */}
      <div className="relative group w-full overflow-hidden"
        style={{ aspectRatio: "1 / 0.82" }}>

        <Link href={`/products/${product.slug}`} className="block h-full w-full">
          <Image
            src={product.image || "/images/categories/default-product.jpg"}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, 280px"
            className={cn(
              "h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.06]",
              isImageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setIsImageLoaded(true)}
            quality={80}
          />
        </Link>

        {/* soft bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/25 via-black/5 to-transparent pointer-events-none" />

        {/* ── Badges row ── */}
        <div className="absolute top-2.5 left-2.5 z-10 flex gap-1.5 flex-wrap">
          {hasDiscount && (
            <span className="inline-flex items-center rounded-md bg-red-500 px-2 py-0.5 text-[10px] font-700 text-white tracking-tight leading-tight shadow-sm">
              -{discountPct}%
            </span>
          )}
          {product.isNew && (
            <span className="inline-flex items-center rounded-md bg-emerald-500 px-2 py-0.5 text-[10px] font-700 text-white tracking-tight leading-tight shadow-sm">
              NEW
            </span>
          )}
          {product.isFeatured && (
            <span className="inline-flex items-center rounded-md bg-amber-500 px-2 py-0.5 text-[10px] font-700 text-white tracking-tight leading-tight shadow-sm">
              ★ HOT
            </span>
          )}
        </div>

        {/* ── Wishlist pill ── */}
        <button
          data-wishlist
          onMouseDown={(e) => e.stopPropagation()}
          onClick={handleWishlistToggle}
          className="absolute top-2.5 right-2.5 z-30 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-[6px] shadow-sm transition-transform duration-200 hover:scale-110 active:scale-95"
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          {rippleWish && <Ripple />}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            style={{ display: 'block', minWidth: '20px', minHeight: '20px' }} 
            fill={isInWishlist ? "#ef4444" : "none"}       
            stroke={isInWishlist ? "#ef4444" : "#1f2937"} 
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="relative z-10"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>

        {/* ── Quick-view eye – centre ── */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <button
            onClick={handleQuickView}
            className="pointer-events-auto cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300"
            aria-label="Quick view"
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-full
                     bg-white/90 backdrop-blur-[6px] shadow-lg
                     text-gray-800 hover:bg-emerald-50 hover:text-emerald-600
                     transform scale-90 group-hover:scale-100 transition-all duration-300">
              <Eye size={20} />
            </span>
          </button>
        </div>

        {/* ── Low stock ribbon ── */}
        {isLowStock && (
          <div className="absolute bottom-2 left-2 z-10">
            <span className="inline-flex items-center rounded-md bg-orange-500/90 backdrop-blur-sm px-2 py-0.5 text-[9px] font-700 text-white tracking-wide uppercase shadow-sm">
              Only {product.stock} left
            </span>
          </div>
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
            <span className="rounded-lg bg-white/95 px-3 py-1 text-[10px] font-700 text-gray-800 tracking-wide uppercase shadow">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* ─── Info block ─── */}
      <div className="flex flex-col flex-1 px-3 pt-2 pb-0.5 gap-0">
        {/* category label */}
        <p className="text-[8px] font-600 uppercase tracking-widest text-gray-400 dark:text-gray-500 leading-tight">
          {product.category || "Eyewear"}
        </p>

        {/* name */}
        <h3 className="text-[13px] font-600 leading-tight text-gray-900 dark:text-gray-100
                        line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400
                        transition-colors duration-200">
          <Link href={`/products/${product.slug}`} className="hover:underline decoration-emerald-400 underline-offset-2">
            {product.name}
          </Link>
        </h3>


        {/* price row */}
        <div className="flex items-baseline gap-1.5 mt-1">
          <span className="text-[15px] font-700 text-gray-900 dark:text-white leading-tight">
            NRs {product.price.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-[11px] text-gray-400 line-through">
              {product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* feature tags – max 2, very compact */}
        {product.features?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {product.features.slice(0, 2).map((f, i) => (
              <span key={i} className="rounded-full bg-gray-100 dark:bg-gray-800 px-2 py-0.25 text-[9px] text-gray-500 dark:text-gray-400 font-500 leading-tight">
                {f}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ─── CTA ─── */}
      {/* <div className="px-3 pb-3 pt-2">
        <AnimatePresence mode="wait">
          <motion.button
            key={isInCart ? "in" : "out"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            onClick={handleAddToCart}
            disabled={isInCart || addingToCart || isOutOfStock}
            className={cn(
              "relative w-full flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-600 tracking-wide",
              "transition-all duration-200 overflow-hidden",
              isInCart
                ? "bg-gray-100 dark:bg-gray-800 text-gray-500 cursor-not-allowed"
                : isOutOfStock
                  ? "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-100 active:scale-[0.97]"
            )}
          >
            {rippleCart && !isInCart && <Ripple />}

            {addingToCart ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                  className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent"
                />
                <span className="relative z-10">Adding…</span>
              </>
            ) : isInCart ? (
              <>
                <Check size={13} />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag size={13} />
                <span>Add to Bag</span>
              </>
            )}
          </motion.button>
        </AnimatePresence>
      </div> */}
      {/* ─── CTA ─── */}
      <div className="px-3 pb-3 pt-2">
        {/* REMOVE AnimatePresence from here. Keep the button static. */}
        <button
          onClick={handleAddToCart}
          disabled={isInCart || addingToCart || isOutOfStock}
          className={cn(
            "relative w-full flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-600 tracking-wide",
            "transition-all duration-200 overflow-hidden",
            isInCart
              ? "bg-gray-100 dark:bg-gray-800 text-gray-500 cursor-not-allowed"
              : isOutOfStock
                ? "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-100 active:scale-[0.97]"
          )}
        >
          {/* Ripple is safe here because the button parent never unmounts */}
          {rippleCart && !isInCart && <Ripple />}

          {/* Animate ONLY the content inside */}
          <AnimatePresence mode="wait" initial={false}>
            {addingToCart ? (
              <motion.span
                key="adding"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-1.5"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                  className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent"
                />
                <span className="relative z-10">Adding…</span>
              </motion.span>
            ) : isInCart ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-1.5"
              >
                <Check size={13} />
                <span>Added</span>
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-1.5"
              >
                {isOutOfStock ? (
                  <span>Out of Stock</span>
                ) : (
                  <>
                    <ShoppingBag size={13} />
                    <span>Add to Bag</span>
                  </>
                )}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.article>
  );
});

ProductCard.displayName = "ProductCard";
export default ProductCard;