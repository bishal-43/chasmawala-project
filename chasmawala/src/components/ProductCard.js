"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useQuickView } from "@/contexts/QuickViewContext";
import { useWishlist } from "@contexts/WishlistContext";

const ProductCard = ({ product }) => {
  const { cartItems, addToCart } = useCart();
  const { openQuickView } = useQuickView();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();

  const isInWishlist = wishlistItems.some((item) => item._id === product._id);
  const isInCart = cartItems?.some((item) => item._id === product._id) || false;

  const handleAddToCart = () => {
    addToCart(product);
    if (isInWishlist) {
      removeFromWishlist(product._id);
    }
  };

  return (
    <div className="border p-4 rounded-md shadow-md bg-white">
      <div className="relative w-full h-48 overflow-hidden">
        <Link href={`/products/${product._id}`} className="border p-4">
          <Image
            src={product.image ? product.image : "/images/categories/default-product.jpg"}
            alt={product.name}
            width={200}
            height={200}
            className="w-full h-40 object-cover"
          />
          <h2 className="text-lg font-bold">{product.name}</h2>
          <p className="text-gray-500">{product.category}</p>
          <p className="text-green-600 font-bold">${product.price}</p>
        </Link>
      </div>

      <div className="flex justify-between mt-3">
        <button
          className={`mt-2 px-4 py-2 rounded ${isInCart ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} text-white`}
          onClick={handleAddToCart}
          disabled={isInCart}
        >
          {isInCart ? "Added" : "Add to Cart"}
        </button>
        <button
          className={`px-4 py-2 rounded ${isInWishlist ? "bg-red-500 text-white" : "bg-gray-300 text-black"}`}
          onClick={() => (isInWishlist ? removeFromWishlist(product._id) : addToWishlist(product))}
        >
          {isInWishlist ? "❤️" : "🤍"}
        </button>
        <button className="bg-gray-500 text-white px-3 py-1 rounded" onClick={() => openQuickView(product)}>
          Quick View
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
