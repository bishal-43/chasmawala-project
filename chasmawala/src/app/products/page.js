// app/products/page.js 
/*"use client";

import { useEffect, useState } from "react";
import ProductFilter from "@/components/ProductFilter";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch products from MongoDB via API
  useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    activeFilters.categories.forEach(cat => params.append("category", cat));
    activeFilters.brands.forEach(brand => params.append("brand", brand));
    activeFilters.frameShapes.forEach(shape => params.append("frameShape", shape));
    params.append("maxPrice", activeFilters.price);

    const res = await fetch(`/api/products?${params.toString()}`);
    const data = await res.json();

    // ✅ API returns an array, so use it directly
    setProducts(data);
    setLoading(false);
  };

  fetchProducts();
}, [activeFilters]);

  // ✅ Apply filters
  const applyFilters = ({ categories, brands, priceRange }) => {
    let updatedProducts = [...products];

    if (categories.length > 0) {
      updatedProducts = updatedProducts.filter((p) =>
        categories.includes(p.category)
      );
    }

    if (brands.length > 0) {
      updatedProducts = updatedProducts.filter((p) =>
        brands.includes(p.brand)
      );
    }

    updatedProducts = updatedProducts.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    setFilteredProducts(updatedProducts);
  };

  return (
    <div className="flex min-h-screen">
      
      <ProductFilter onApplyFilters={applyFilters} />

      
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Our Products</h1>

        {loading ? (
          <p>Loading products...</p>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="border rounded-lg p-4 shadow hover:shadow-lg transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded"
                />
                <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
                <p className="text-gray-600">{product.category}</p>
                <p className="text-blue-600 font-bold">₹{product.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No products found with the applied filters.</p>
        )}
      </div>
    </div>
  );
}
*/