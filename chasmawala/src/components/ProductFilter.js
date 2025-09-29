"use client";
import { useState, useEffect, useRef } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";

/**
 * A client-side component to filter products by category, brand, and price.
 * It receives filter options and an initial state from its parent,
 * and calls a callback function whenever the filters are changed.
 *
 * @param {object} options - Contains available {categories, brands, priceRange}.
 * @param {function} onFilterChange - Callback function to execute with the new filters.
 * @param {object} initialFilters - The initial state for the filters, usually from URL params.
 */
const ProductFilter = ({
  options = {},
  onFilterChange = () => {},
  initialFilters = {},
}) => {
  // Destructure options with default values to prevent errors
  const {
    categories = [],
    brands = [],
    priceRange: initialPriceRange = [0, 5000],
  } = options;

  // ✅ Initialize state by merging initialFilters from props with default values.
  // This is the key fix to make MegaMenu links work.
  const [filters, setFilters] = useState({
    categories: initialFilters.categories || [],
    brands: initialFilters.brands || [],
    maxPrice: initialFilters.maxPrice || initialPriceRange[1],
  });



  const pathname = usePathname();
  const router = useRouter();

  const isInitialMount = useRef(true);

  // ✅ When the available price range from the API changes,
  // update the filter's max price ONLY if it wasn't set by the user via URL.
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false; // Set it to false for subsequent renders
      return; // Exit the effect
    }
  // 1. Call the parent function to refetch products
  onFilterChange(filters);

  // 2. Update the URL query string
  const params = new URLSearchParams();
  filters.categories.forEach(c => params.append('category', c));
  filters.brands.forEach(b => params.append('brand', b));
  if (filters.maxPrice < initialPriceRange[1]) {
     params.set('maxPrice', filters.maxPrice);
  }
  
  // router.push will update the URL without a full page reload
  router.push(`${pathname}?${params.toString()}`);

}, [filters, onFilterChange, pathname, router, initialPriceRange]);

  // Toggles an item in a filter array (categories or brands).
  const toggle = (key, value) => {
    setFilters((prev) => {
      const current = prev[key] || [];
      const isPresent = current.includes(value);
      const newValues = isPresent
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: newValues };
    });
  };

  // Updates the max price from the range slider.
  const handlePriceChange = (val) => {
    setFilters((prev) => ({ ...prev, maxPrice: Number(val) }));
  };

  // Resets all filters to their default state.
  const resetAll = () => {
    setFilters({
      categories: [],
      brands: [],
      maxPrice: initialPriceRange[1],
    });
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-4">
        <h2 className="font-semibold text-lg text-gray-800">Filters</h2>
        <button
          onClick={resetAll}
          className="text-sm text-blue-600 hover:text-blue-800 flex items-center transition-colors duration-200"
        >
          <FiRefreshCw className="mr-1" /> Reset
        </button>
      </div>

      {/* Categories Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
          {categories.map((c) => (
            <label key={c} className="flex items-center space-x-3 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={filters.categories.includes(c)}
                onChange={() => toggle("categories", c)}
                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-gray-600">{c}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Brands</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
          {brands.map((b) => (
            <label key={b} className="flex items-center space-x-3 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={filters.brands.includes(b)}
                onChange={() => toggle("brands", b)}
                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-gray-600">{b}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Section */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Price</h3>
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>₹{initialPriceRange[0]}</span>
          <span>₹{filters.maxPrice}</span>
        </div>
        <input
          type="range"
          min={initialPriceRange[0]}
          max={initialPriceRange[1]}
          value={filters.maxPrice}
          onChange={(e) => handlePriceChange(e.target.value)}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
        />
      </div>
    </div>
  );
};

export default ProductFilter;
