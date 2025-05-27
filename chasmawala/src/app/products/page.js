"use client";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchProducts();
    }, 400); // delay to wait for user input to settle
  
    return () => clearTimeout(delayDebounce);
  }, [category, brand, minPrice, maxPrice]);
  

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      let url = `/api/products?`;
      if (category) url += `category=${category}&`;
      if (brand) url += `brand=${brand}&`;
      if (minPrice) url += `minPrice=${minPrice}&`;
      if (maxPrice) url += `maxPrice=${maxPrice}&`;


      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Unable to load products. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-6">
      {/* 🔹 Filter Section */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-2 border rounded">
          <option value="">All Categories</option>
          <option value="Sunglasses">Sunglasses</option>
          <option value="Eyeglasses">Eyeglasses</option>
        </select>

        <select value={brand} onChange={(e) => setBrand(e.target.value)} className="p-2 border rounded">
          <option value="">All Brands</option>
          <option value="Ray-Ban">Ray-Ban</option>
          <option value="Oakley">Oakley</option>
          <option value="Gucci">Gucci</option>
        </select>

        <input type="number" placeholder="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="p-2 border rounded" />
        <input type="number" placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="p-2 border rounded" />

        <button onClick={fetchProducts} className="bg-blue-600 text-white px-4 py-2 rounded">
          Apply Filters
        </button>
      </div>

      {/* 🔹 Product Listing */}
      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => <ProductCard key={product._id} product={product} />)
          ) : (
            <p className="text-center col-span-3">No products found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
