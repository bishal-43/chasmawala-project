// src/components/CollectionsContent.js

"use client";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import ProductFilter from "@/components/ProductFilter";
import ProductCard from "@/components/ProductCard";
import { FilterSkeleton, ProductGridSkeleton } from "@/components/Skeletons";

// Helper Icon components
const FilterIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);
const XIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// This is your main client logic component, now accepting initial data as props
export default function CollectionsContent({ initialProducts, initialFilterOptions }) {
  const searchParams = useSearchParams();

  // ✅ Use the props to set the initial state
  const [products, setProducts] = useState(initialProducts || []);
  const [filterOptions, setFilterOptions] = useState(initialFilterOptions || null);

  // Keep product loading state for subsequent filter changes
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // This function for fetching products on filter change remains the same
  const fetchProducts = useCallback(async (currentFilters) => {
    setLoadingProducts(true);
    const params = new URLSearchParams();
    currentFilters.categories.forEach(c => params.append('category', c));
    currentFilters.brands.forEach(b => params.append('brand', b));
    if (filterOptions && currentFilters.maxPrice < filterOptions.priceRange[1]) {
      params.set('maxPrice', currentFilters.maxPrice);
    }
    try {
      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("❌ Failed to fetch products:", err);
      setProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  }, [filterOptions]);

  const initialFiltersForChild = {
    categories: searchParams.getAll('category'),
    brands: searchParams.getAll('brand'),
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : null,
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* --- Sidebar for Filters --- */}
        <aside className={`
          md:w-80 lg:w-96 md:sticky md:top-24 md:self-start
          fixed top-0 left-0 w-full max-w-sm h-full bg-white z-50 transform transition-transform duration-300 ease-in-out
          ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}>
          <div className="p-6 h-full overflow-y-auto">
            <div className="flex justify-between items-center md:hidden mb-4">
              <h2 className="font-semibold text-lg">Filters</h2>
              <button onClick={() => setIsFilterOpen(false)} className="text-gray-500 hover:text-gray-800">
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            {filterOptions ? (
              <ProductFilter
                options={filterOptions}
                onFilterChange={fetchProducts}
                initialFilters={initialFiltersForChild}
              />
            ) : (
              <FilterSkeleton />
            )}
          </div>
        </aside>

        {/* --- Main Content for Products --- */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
             <h1 className="text-2xl font-bold text-gray-800 hidden md:block">All Products</h1>
            <button
              onClick={() => setIsFilterOpen(true)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 border rounded-lg text-sm font-medium"
            >
              <FilterIcon className="h-5 w-5" />
              Filter
            </button>
          </div>

          {loadingProducts ? (
            <ProductGridSkeleton />
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <ProductCard key={p._id || p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600">No products found.</p>
            </div>
          )}
        </main>
      </div>

      {/* --- Mobile Overlay --- */}
      {isFilterOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsFilterOpen(false)}
        ></div>
      )}
    </div>
  );
}