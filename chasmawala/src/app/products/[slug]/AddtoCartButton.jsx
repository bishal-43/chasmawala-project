"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, CheckCircle } from "lucide-react";

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart({ ...product, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className={`flex items-center justify-center w-full px-6 py-3 font-semibold text-white rounded-lg ${
        added ? "bg-green-600" : "bg-emerald-600 hover:bg-emerald-700"
      }`}
    >
      {added ? (
        <CheckCircle size={20} className="mr-2" />
      ) : (
        <ShoppingCart size={20} className="mr-2" />
      )}
      {added ? "Added to Cart!" : "Add to Cart"}
    </button>
  );
}
