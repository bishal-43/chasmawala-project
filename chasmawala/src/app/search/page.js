"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/search?query=${query}`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    if (query) {
      fetchProducts();
    }
  }, [query]);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">
        Search Results for "{query}"
      </h1>

      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-gray-500 text-center">No products found.</p>
      )}
    </div>
  );
};

export default SearchPage;
