// // src/components/QuickViewModal.js

// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useCart } from "@/contexts/CartContext";
// import { useWishlist } from "@/contexts/WishlistContext";
// import { useQuickView } from "@/contexts/QuickViewContext";
// import { FiX, FiShoppingBag, FiHeart, FiCheckCircle } from "react-icons/fi";

// export default function QuickViewModal() {
//   const { cart, addToCart } = useCart();
//   const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
//   const { isOpen, product, closeQuickView } = useQuickView();

//   const [quantity, setQuantity] = useState(1);
//   const [isAddingToCart, setIsAddingToCart] = useState(false);

//   // Check if the product is already in the wishlist
//   const isInWishlist = wishlist?.some((item) => item.slug === product?.slug);

//   //console.log("--- 3. MODAL STATE ---", { isOpen, product, wishlist });

//   // Effect for handling the 'Escape' key to close the modal



//   useEffect(() => {
//     const handleEscape = (event) => {
//       if (event.key === "Escape") closeQuickView();
//     };
//     document.addEventListener("keydown", handleEscape);
//     return () => document.removeEventListener("keydown", handleEscape);
//   }, [closeQuickView]);

//   useEffect(() => {
//     if (product) {
//       setQuantity(1);
//     }
//   }, [product]);

//   if (!isOpen || !product) {
//     return null;
//   }

//   // Handler for adding items to the cart
//   const handleAddToCart = () => {
//     setIsAddingToCart(true);
//     addToCart({ ...product, quantity });
//     // Provide visual feedback for 2 seconds
//     setTimeout(() => {
//       setIsAddingToCart(false);
//       closeQuickView(); // Optionally close modal after adding to cart
//     }, 2000);
//   };

//   // Handler for toggling wishlist status
//   const handleWishlistToggle = () => {
//     if (isInWishlist) {
//       removeFromWishlist(product.slug);
//     } else {
//       addToWishlist(product);
//     }
//   };

//   console.log("Product data in Quick View:", product);

//   return (
//     // Modal Overlay
//     <div
//       className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 transition-opacity duration-300"
//       onClick={closeQuickView} // Close modal on overlay click
//     >
//       {/* Modal Content */}
//       <div
//         className="bg-white rounded-xl shadow-2xl w-full max-w-sm md:max-w-4xl grid md:grid-cols-2 gap-8 p-6 md:p-8 relative animate-scale-in"
//         onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside content
//       >
//         {/* Close Button */}
//         <button
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors rounded-full p-2"
//           onClick={closeQuickView}
//           aria-label="Close quick view"
//         >
//           <FiX size={24} />
//         </button>

//         {/* Product Image Column */}
//         <div className="w-full h-64 md:h-full flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">

//           <Image
//             src={product.image}
//             alt={product.name}
//             width={400}
//             height={400}
//             className="w-full h-full object-contain mix-blend-multiply"
//           />
//         </div>

//         {/* Product Details & Actions Column */}
//         <div className="flex flex-col justify-center space-y-4">
//           <div>
//             <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">
//               {product.category}
//             </span>
//             <h2 className="text-3xl font-bold text-gray-900 mt-1">{product.name}</h2>
//           </div>

//           <p className="text-gray-600 text-base leading-relaxed">
//             {product.description || "A premium quality product from our exclusive collection, designed for comfort and style."}
//           </p>

//           <p className="text-4xl font-extrabold text-gray-800">
//             ₹{product.price.toFixed(2)}
//           </p>

//           {/* Actions */}
//           <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
//             {/* Quantity Selector */}
//             <div className="flex items-center border border-gray-300 rounded-lg">
//               <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-l-lg">-</button>
//               <span className="px-5 py-2 text-lg font-semibold text-gray-900">{quantity}</span>
//               <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-2 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-r-lg">+</button>
//             </div>

//             {/* Add to Cart Button */}
//             <button
//               onClick={handleAddToCart}
//               disabled={isAddingToCart}
//               className={`w-full sm:w-auto flex-grow flex items-center justify-center px-6 py-3 font-semibold text-white rounded-lg transition-all duration-300 ease-in-out ${isAddingToCart
//                 ? "bg-green-600 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700"
//                 }`}
//             >
//               {isAddingToCart ? (
//                 <>
//                   <FiCheckCircle className="mr-2" /> Added!
//                 </>
//               ) : (
//                 <>
//                   <FiShoppingBag className="mr-2" /> Add to Cart
//                 </>
//               )}
//             </button>
//           </div>

//           <div className="flex items-center gap-4 pt-4 text-sm">
//             {/* Wishlist Button */}
//             <button
//               onClick={handleWishlistToggle}
//               className="flex items-center font-medium text-gray-600 hover:text-red-500 transition-colors"
//             >
//               <FiHeart className={`mr-2 ${isInWishlist ? 'text-red-500 fill-current' : ''}`} />
//               {isInWishlist ? 'Added to Wishlist' : 'Add to Wishlist'}
//             </button>
//             <span className="text-gray-300">|</span>
//             {/* View Full Details Link */}
//             {product && product.slug && (
//               <Link
//                 href={`/products/${product.slug}`}
//                 onClick={closeQuickView}
//                 className="font-medium text-gray-600 hover:text-blue-600"
//               >
//                 View Full Details
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// src/components/QuickViewModal.js

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useQuickView } from "@/contexts/QuickViewContext";
import { FiX, FiShoppingBag, FiHeart, FiCheckCircle, FiMinus, FiPlus, FiExternalLink, FiStar } from "react-icons/fi";

export default function QuickViewModal() {
  const { cart, addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { isOpen, product, closeQuickView } = useQuickView();

  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Check if the product is already in the wishlist
  const isInWishlist = wishlist?.some((item) => item.slug === product?.slug);

  // Effect for handling the 'Escape' key to close the modal
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") closeQuickView();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [closeQuickView]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (product) {
      setQuantity(1);
      setImageLoaded(false);
    }
  }, [product]);

  if (!isOpen || !product) {
    return null;
  }

  // Handler for adding items to the cart
  const handleAddToCart = () => {
    setIsAddingToCart(true);
    addToCart({ ...product, quantity });
    setTimeout(() => {
      setIsAddingToCart(false);
      closeQuickView();
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

  return (
    <>
      {/* Modal Overlay with backdrop blur */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4 transition-all duration-300 animate-fade-in"
        onClick={closeQuickView}
      >
        {/* Modal Content */}
        <div
          className="bg-gradient-to-br from-white via-slate-50 to-white rounded-t-[2rem] sm:rounded-3xl shadow-2xl w-full max-w-sm md:max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden grid grid-cols-1 md:grid-cols-2 relative animate-slide-up sm:animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-400 hover:text-gray-900 active:scale-95 transition-all rounded-full p-2.5 bg-white/80 backdrop-blur-md hover:bg-white shadow-lg hover:shadow-xl z-20 group"
            onClick={closeQuickView}
            aria-label="Close quick view"
          >
            <FiX size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Wishlist Button - Floating */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-4 right-16 sm:right-20 text-gray-400 hover:text-red-500 active:scale-95 transition-all rounded-full p-2.5 bg-white/80 backdrop-blur-md hover:bg-white shadow-lg hover:shadow-xl z-20 group"
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <FiHeart 
              size={20} 
              className={`transition-all duration-300 ${
                isInWishlist 
                  ? 'fill-red-500 text-red-500 scale-110' 
                  : 'group-hover:scale-110'
              }`} 
            />
          </button>

          {/* Left Column - Product Image */}
          <div className="relative bg-gradient-to-br from-slate-100 via-gray-50 to-slate-100 flex items-center justify-center p-8 sm:p-12 min-h-[300px] sm:min-h-[500px] overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-200/30 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-emerald-200/30 to-transparent rounded-full blur-3xl"></div>
            
            {/* Product Badge */}
            <div className="absolute top-6 left-6 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-2 animate-bounce-subtle">
              <FiStar size={14} className="fill-white" />
              <span>QUICK VIEW</span>
            </div>

            {/* Image with loading state */}
            <div className={`relative w-full h-full flex items-center justify-center transition-all duration-500 ${imageLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-full object-contain mix-blend-multiply drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                onLoad={() => setImageLoaded(true)}
                priority
              />
            </div>

            {/* Loading skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          {/* Right Column - Product Details */}
          <div className="flex flex-col justify-between p-6 sm:p-8 md:p-10 overflow-y-auto max-h-[calc(95vh-300px)] sm:max-h-full custom-scrollbar">
            <div className="space-y-5 sm:space-y-6">
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-100">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                {product.category || "Premium"}
              </div>

              {/* Product Name */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600 font-medium">(4.8)</span>
                <span className="text-gray-300">•</span>
                <span className="text-sm text-gray-600">124 reviews</span>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {product.description || "A premium quality product from our exclusive collection, designed for comfort, style, and everyday use."}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 py-3">
                <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  ₹{product.price?.toLocaleString('en-IN')}
                </span>
                {/* <span className="text-lg text-gray-400 line-through">
                  ₹{((product.price || 0) * 1.25).toLocaleString('en-IN')}
                </span>
                <span className="px-2.5 py-1 bg-red-500 text-white rounded-lg text-xs font-bold">
                  20% OFF
                </span> */}
              </div>
            </div>

            {/* Actions Section */}
            <div className="space-y-4 pt-6 border-t-2 border-gray-100 mt-6">
              {/* Quantity and Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Quantity Selector */}
                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                    className="px-5 py-3.5 hover:bg-gray-50 active:bg-gray-100 transition-colors group"
                    aria-label="Decrease quantity"
                  >
                    <FiMinus size={18} className="text-gray-700 group-hover:scale-110 transition-transform" />
                  </button>
                  <div className="px-6 py-3.5 font-bold text-lg text-gray-900 min-w-[60px] text-center border-x-2 border-gray-200 bg-gradient-to-r from-transparent via-gray-50 to-transparent">
                    {quantity}
                  </div>
                  <button 
                    onClick={() => setQuantity(q => q + 1)} 
                    className="px-5 py-3.5 hover:bg-gray-50 active:bg-gray-100 transition-colors group"
                    aria-label="Increase quantity"
                  >
                    <FiPlus size={18} className="text-gray-700 group-hover:scale-110 transition-transform" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 font-bold text-base rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform active:scale-95 ${
                    isAddingToCart 
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white cursor-not-allowed" 
                      : "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 hover:-translate-y-0.5"
                  }`}
                >
                  {isAddingToCart ? (
                    <>
                      <FiCheckCircle size={22} className="animate-bounce" />
                      <span>Added!</span>
                    </>
                  ) : (
                    <>
                      <FiShoppingBag size={22} />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>

              {/* View Full Details Link */}
              {product && product.slug && (
                <Link
                  href={`/products/${product.slug}`}
                  onClick={closeQuickView}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3.5 font-semibold text-gray-700 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 rounded-xl transition-all duration-300 group"
                >
                  <span>View Full Details</span>
                  <FiExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              )}

              {/* Additional Info */}
              <div className="flex items-center justify-center gap-4 text-xs text-gray-500 pt-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  <span>Free Shipping</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-scale-in {
          animation: scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 3s ease-in-out infinite;
        }

        /* Custom Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </>
  );
}