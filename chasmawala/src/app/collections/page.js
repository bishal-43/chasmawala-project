//src/app/collections/page.js
"use client";
import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductFilter from "@/components/ProductFilter";
import ProductCard from "@/components/ProductCard";


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
// --- Skeleton Components (for a better loading UI) ---
const FilterSkeleton = () => (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="space-y-4">{[...Array(3)].map((_, i) => (<div key={i}><div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div><div className="space-y-2"><div className="h-4 bg-gray-200 rounded w-full"></div><div className="h-4 bg-gray-200 rounded w-full"></div><div className="h-4 bg-gray-200 rounded w-5/6"></div></div></div>))}</div>
    </div>
);
const ProductGridSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">{[...Array(6)].map((_, i) => (<div key={i} className="border border-gray-200 rounded-lg p-4 animate-pulse"><div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div><div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div><div className="h-4 bg-gray-200 rounded w-1/2"></div></div>))}</div>
);

// --- Main Page Logic Component ---
function CollectionsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [filterOptions, setFilterOptions] = useState(null); // Start as null

  // ✅ ADDED: State to manage filter visibility on mobile
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // This is the single, reliable function for fetching products.
  // It's passed to the ProductFilter component, which calls it.
  const fetchProducts = useCallback(async (currentFilters) => {
    setLoadingProducts(true);
    const params = new URLSearchParams();
    
    currentFilters.categories.forEach(c => params.append('category', c));
    currentFilters.brands.forEach(b => params.append('brand', b));
    
    // Only add the maxPrice parameter if it's actually been set to a value
    // lower than the maximum possible price.
    if (filterOptions && currentFilters.maxPrice < filterOptions.priceRange[1]) {
      params.set('maxPrice', currentFilters.maxPrice);
    }
    
    try {
      const res = await fetch(`/api/products?${params.toString()}`);
      if (!res.ok) throw new Error(`API Error: ${res.status}`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("❌ Failed to fetch products:", err);
      setProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  }, [filterOptions]); // This function is recreated once filterOptions are loaded.

  // Effect 1: Fetches the available filter options when the page loads.
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await fetch("/api/products/filters");
        if (!res.ok) throw new Error(`API Error: ${res.status}`);
        const data = await res.json();
        setFilterOptions(data);
      } catch (err) {
        console.error("❌ Failed to fetch filter options.", err);
        setFilterOptions({ categories: [], brands: [], priceRange: [0, 5000] });
      }
    };
    fetchOptions();
  }, []);

  // We no longer need a second useEffect to fetch products here.
  // The ProductFilter component is now responsible for triggering the first fetch.

  // This object reads the URL and is passed to ProductFilter
  // to set its initial UI state (e.g., which boxes are checked).
  const initialFiltersForChild = {
      categories: searchParams.getAll('category'),
      brands: searchParams.getAll('brand'),
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : null,
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* ✅ MODIFIED: Sidebar with conditional classes for mobile overlay */}
        <aside className={`
          md:w-80 lg:w-96 md:sticky md:top-24 md:self-start
          fixed top-0 left-0 w-full max-w-sm h-full bg-white z-50 transform transition-transform duration-300 ease-in-out
          ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}>
          <div className="p-6 h-full overflow-y-auto">
            {/* ✅ ADDED: Close button for mobile view */}
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

        <main className="flex-1">
          {/* ✅ MODIFIED: Title and filter button are now in a flex container */}
          <div className="flex justify-between items-center mb-6">
            
            {/* ✅ ADDED: Filter toggle button, only visible on mobile */}
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

      {/* ✅ ADDED: Overlay for when the mobile filter is open */}
      {isFilterOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsFilterOpen(false)}
        ></div>
      )}
    </div>
  );
}

// --- Main Page Component with Suspense ---
export default function CollectionPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading Page...</div>}>
      <CollectionsContent />
    </Suspense>
  );
}
