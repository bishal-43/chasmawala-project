// src/components/ProductCard.js

"use client";

import { useState, useCallback, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { useQuickView } from "@/contexts/QuickViewContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Heart, Eye, ShoppingBag, Check, Star, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// Memoized Product Card for better performance
const ProductCard = memo(({ product }) => {
  const { cartItems = [], addToCart } = useCart();
  const { openQuickView } = useQuickView();
  const { wishlistItems = [], addToWishlist, removeFromWishlist } = useWishlist();

  // Local state for interaction feedback
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  // Derived state
  const isInWishlist = wishlistItems.some((item) => item.slug === product.slug);
  const isInCart = cartItems.some((item) => item.slug === product.slug);

  // Check if product has discount
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Handlers
  const handleAddToCart = useCallback(async () => {
    if (isInCart || addingToCart) return;

    setAddingToCart(true);
    try {
      await addToCart(product);
      if (isInWishlist) {
        await removeFromWishlist(product.slug);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      // Small delay for visual feedback
      setTimeout(() => setAddingToCart(false), 600);
    }
  }, [product, addToCart, isInCart, isInWishlist, removeFromWishlist, addingToCart]);

  const handleWishlistToggle = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInWishlist) {
      removeFromWishlist(product.slug);
    } else {
      addToWishlist(product);
    }
  }, [isInWishlist, product, addToWishlist, removeFromWishlist]);

  const handleQuickView = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  }, [product, openQuickView]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-2xl border border-gray-100 dark:border-gray-800 dark:bg-gray-900"
    >
      {/* Badges Section */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
        {/* Discount Badge */}
        {hasDiscount && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="flex items-center space-x-1 rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-3 py-1 shadow-lg"
          >
            <Sparkles size={12} className="text-white" />
            <span className="text-xs font-bold text-white">-{discountPercentage}%</span>
          </motion.div>
        )}

        {/* New/Featured Badge (if product has these properties) */}
        {product.isNew && (
          <div className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-1 shadow-lg">
            <span className="text-xs font-bold text-white">NEW</span>
          </div>
        )}

        {product.isFeatured && (
          <div className="rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 px-3 py-1 shadow-lg">
            <span className="text-xs font-bold text-white">⭐ Featured</span>
          </div>
        )}
      </div>

      {/* Image Section with Hover Actions */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50 dark:bg-gray-800">
        <Link
          href={`/products/${product.slug}`}
          className="block h-full w-full"
        >
          <Image
            src={product.image || "/images/categories/default-product.jpg"}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={cn(
              "h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-110",
              isImageLoaded ? "blur-0" : "blur-sm"
            )}
            onLoad={() => setIsImageLoaded(true)}
            quality={85}
          />

          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Link>

        {/* Wishlist Button - Always Visible on Mobile, Hover on Desktop */}
        <motion.button
          onClick={handleWishlistToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={cn(
            "absolute top-3 right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg transition-all duration-300",
            "md:opacity-0 md:group-hover:opacity-100", // Hide on desktop until hover
            isInWishlist
              ? "text-red-500 ring-2 ring-red-500"
              : "text-gray-700 hover:bg-red-50 hover:text-red-500"
          )}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          {/* Fallback if Heart doesn't render */}
          {typeof Heart === 'function' ? (
            <Heart
              size={20}
              strokeWidth={2}
              className={isInWishlist ? "fill-current" : "fill-none"}
            />
          ) : (
            <span className="text-xl">{isInWishlist ? "❤️" : "🤍"}</span>
          )}
        </motion.button>

        {/* Quick View Button - Center, appears on hover */}
        <motion.button
          onClick={handleQuickView}
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/95 backdrop-blur-sm p-3.5 text-gray-900 shadow-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-emerald-50 hover:text-emerald-600 hover:ring-2 hover:ring-emerald-500"
          aria-label="Quick view"
        >
          <Eye size={24} />
        </motion.button>

        {/* Stock Status Indicator */}
        {product.stock !== undefined && product.stock < 10 && product.stock > 0 && (
          <div className="absolute bottom-3 left-3 rounded-full bg-orange-500/90 backdrop-blur-sm px-3 py-1">
            <span className="text-xs font-semibold text-white">
              Only {product.stock} left!
            </span>
          </div>
        )}

        {product.stock === 0 && (
          <div className="absolute bottom-3 left-3 rounded-full bg-gray-900/90 backdrop-blur-sm px-3 py-1">
            <span className="text-xs font-semibold text-white">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Information Section */}
      <div className="flex flex-1 flex-col p-4 space-y-2">
        {/* Category */}
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
          {product.category || "Eyewear"}
        </p>

        {/* Product Name */}
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white line-clamp-2 min-h-[2.5rem] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          <Link href={`/products/${product.slug}`} className="hover:underline">
            {product.name}
          </Link>
        </h3>

        {/* Rating (if available) */}
        {product.rating && (
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={cn(
                    "transition-colors",
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              ({product.reviews || 0})
            </span>
          </div>
        )}

        {/* Price Section */}
        <div className="flex items-baseline space-x-2 pt-1">
          <span className="text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400">
            NRs {product.price.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              NRs {product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Product Features/Tags (if available) */}
        {product.features && product.features.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-2">
            {product.features.slice(0, 2).map((feature, index) => (
              <span
                key={index}
                className="rounded-full bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs text-gray-600 dark:text-gray-300"
              >
                {feature}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Add to Cart Button */}
      <div className="p-4 pt-0">
        <AnimatePresence mode="wait">
          <motion.button
            key={isInCart ? "added" : "add"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onClick={handleAddToCart}
            disabled={isInCart || addingToCart || product.stock === 0}
            className={cn(
              "relative flex w-full items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg",
              isInCart
                ? "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 cursor-not-allowed"
                : product.stock === 0
                  ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 hover:scale-[1.02] active:scale-[0.98]"
            )}
          >
            {addingToCart ? (
              <span className="flex items-center space-x-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="h-4 w-4 rounded-full border-2 border-white border-t-transparent"
                />
                <span>Adding...</span>
              </span>
            ) : isInCart ? (
              <span className="flex items-center space-x-2">
                <Check size={18} />
                <span>Added to Cart</span>
              </span>
            ) : product.stock === 0 ? (
              <span>Out of Stock</span>
            ) : (
              <span className="flex items-center space-x-2">
                <ShoppingBag size={18} />
                <span>Add to Cart</span>
              </span>
            )}
          </motion.button>
        </AnimatePresence>
      </div>

      {/* Hover Effect Border Glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20" />
      </div>
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;