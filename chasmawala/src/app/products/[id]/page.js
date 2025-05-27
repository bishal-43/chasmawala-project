"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10 text-lg text-gray-500">Loading product...</div>;
  }

  if (!product) {
    return <div className="text-center text-red-500 text-2xl mt-10">Product Not Found</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
        <Link href="/products" className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-lg">
          ✖
        </Link>

        <Image
          src={product.image || "/images/categories/default-product.jpg"} 
          alt={product.name}
          width={400}
          height={400}
          className="w-full h-64 object-cover rounded-md mb-4"
        />

        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-600 mt-1">{product.description || "No description available."}</p>
        <p className="text-lg font-semibold mt-2">₹{product.price}</p>

        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
