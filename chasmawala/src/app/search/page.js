// src/app/search/page.js
"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "./components/ProductSkeleton"; // A new component for loading state

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    const fetchProducts = async () => {
      if (!query) {
        setProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
        if (!res.ok) {
          throw new Error('Something went wrong. Please try again.');
        }
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  const renderContent = () => {
    if (loading) {
      // Show skeleton loaders
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
        </div>
      );
    }

    if (error) {
      return <p className="text-center text-red-500">{error}</p>;
    }

    if (products.length === 0) {
      return <p className="text-center text-gray-500">No products found for "{query}".</p>;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-6">
        Search Results
        {query && <span className="text-gray-500 font-normal">: "{query}"</span>}
      </h1>
      {renderContent()}
    </div>
  );
};

export default SearchPage;