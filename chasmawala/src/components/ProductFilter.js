"use client";
import { useState } from "react";

const ProductFilter = ({ products, setFilteredProducts }) => {
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [priceRange, setPriceRange] = useState([0, 200]);

  const handleFilter = () => {
    let filtered = products;

    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }
    if (brand) {
      filtered = filtered.filter((product) => product.brand === brand);
    }
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1]);

    setFilteredProducts(filtered);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md mb-6">
      {/* Category Filter */}
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-2 border rounded-md mr-2">
        <option value="">All Categories</option>
        <option value="sunglasses">Sunglasses</option>
        <option value="eyeglasses">Eyeglasses</option>
        <option value="contact-lenses">Contact Lenses</option>
      </select>

      {/* Brand Filter */}
      <select value={brand} onChange={(e) => setBrand(e.target.value)} className="p-2 border rounded-md mr-2">
        <option value="">All Brands</option>
        <option value="Ray-Ban">Ray-Ban</option>
        <option value="Oakley">Oakley</option>
        <option value="Lenskart">Lenskart</option>
        <option value="Titan">Titan</option>
        <option value="Bausch & Lomb">Bausch & Lomb</option>
        <option value="Acuvue">Acuvue</option>
      </select>

      {/* Price Filter */}
      <input
        type="range"
        min="0"
        max="200"
        value={priceRange[0]}
        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
        className="mr-2"
      />
      <input
        type="range"
        min="0"
        max="200"
        value={priceRange[1]}
        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
      />

      <button onClick={handleFilter} className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Apply Filters
      </button>
    </div>
  );
};

export default ProductFilter;
