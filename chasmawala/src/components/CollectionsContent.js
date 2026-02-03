// // src/components/CollectionsContent.js

// "use client";
// import { useEffect, useState, useCallback } from "react";
// import { useSearchParams } from "next/navigation";
// import ProductFilter from "@/components/ProductFilter";
// import ProductCard from "@/components/ProductCard";
// import { FilterSkeleton, ProductGridSkeleton } from "@/components/Skeletons";

// // Helper Icon components
// const FilterIcon = (props) => (
//   <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
//   </svg>
// );
// const XIcon = (props) => (
//   <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
//   </svg>
// );

// // This is your main client logic component, now accepting initial data as props
// export default function CollectionsContent({ initialProducts, initialFilterOptions }) {
//   const searchParams = useSearchParams();

//   // ✅ Use the props to set the initial state
//   const [products, setProducts] = useState(initialProducts || []);
//   const [filterOptions, setFilterOptions] = useState(initialFilterOptions || null);

//   // Keep product loading state for subsequent filter changes
//   const [loadingProducts, setLoadingProducts] = useState(false);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [isInitialRender, setIsInitialRender] = useState(true);

//   // This function for fetching products on filter change remains the same
//   const fetchProducts = useCallback(async (currentFilters) => {
//     setLoadingProducts(true);
//     const params = new URLSearchParams();
//     currentFilters.categories.forEach(c => params.append('category', c));
//     currentFilters.brands.forEach(b => params.append('brand', b));
//     if (filterOptions && currentFilters.maxPrice < filterOptions.priceRange[1]) {
//       params.set('maxPrice', currentFilters.maxPrice);
//     }
//     try {
//       const res = await fetch(`/api/products?${params.toString()}`);
//       const data = await res.json();
//       const productsArray = Array.isArray(data.products) ? data.products : (Array.isArray(data) ? data : []);
//       setProducts(productsArray);
//     } catch (err) {
//       console.error("❌ Failed to fetch products:", err);
//       setProducts([]);
//     } finally {
//       setLoadingProducts(false);
//     }
//   }, [filterOptions]);

//   useEffect(() => {
//     // Once the component mounts and we have initial products, 
//     // we are no longer in the "first-load" gray area.
//     if (initialProducts) {
//       setIsInitialRender(false);
//     }
//   }, [initialProducts]);

//   const initialFiltersForChild = {
//     categories: searchParams.getAll('category'),
//     brands: searchParams.getAll('brand'),
//     maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : null,
//   };

//   return (
//     <div className="container mx-auto py-12 px-6">
//       <div className="flex flex-col md:flex-row gap-8">

//         {/* --- Sidebar for Filters --- */}
//         <aside className={`
//           md:w-80 lg:w-96 md:sticky md:top-24 md:self-start
//           fixed top-0 left-0 w-full max-w-sm h-full bg-white z-50 transform transition-transform duration-300 ease-in-out
//           ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}
//           md:translate-x-0
//         `}>
//           <div className="p-6 h-full overflow-y-auto">
//             <div className="flex justify-between items-center md:hidden mb-4">
//               <h2 className="font-semibold text-lg">Filters</h2>
//               <button onClick={() => setIsFilterOpen(false)} className="text-gray-500 hover:text-gray-800">
//                 <XIcon className="h-6 w-6" />
//               </button>
//             </div>
//             {products.length > 0 ? (
//               <ProductFilter
//                 products={products}      // ✅ Pass the actual products array here
//                 onFilterChange={fetchProducts}
//                 initialFilters={initialFiltersForChild}
//               />
//             ) : (
//               <FilterSkeleton />
//             )}
//           </div>
//         </aside>

//         {/* --- Main Content for Products --- */}
//         <main className="flex-1">
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-2xl font-bold text-gray-800 hidden md:block">All Products</h1>
//             <button
//               onClick={() => setIsFilterOpen(true)}
//               className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 border rounded-lg text-sm font-medium"
//             >
//               <FilterIcon className="h-5 w-5" />
//               Filter
//             </button>
//           </div>

//           {loadingProducts || (isInitialRender && products.length === 0) ? (
//             <ProductGridSkeleton />
//           ) : products.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {products.map((p) => (
//                 <ProductCard key={p._id || p.id} product={p} />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-16">
//               <p className="text-gray-600">No products found here.</p>

//             </div>
//           )}
//         </main>
//       </div>

//       {/* --- Mobile Overlay --- */}
//       {isFilterOpen && (
//         <div
//           className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
//           onClick={() => setIsFilterOpen(false)}
//         ></div>
//       )}
//     </div>
//   );
// }




// src/components/CollectionsContent.js

"use client";
import { useEffect, useState, useCallback, useMemo } from "react";

import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  Search,
  ArrowUpDown,
  Check,
} from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────
   SKELETONS
   ───────────────────────────────────────────── */
const CardSkeleton = () => (
  <div className="w-[220px] sm:w-[240px] rounded-xl overflow-hidden bg-white border border-gray-100">
    <div className="animate-shimmer" style={{ aspectRatio: "1 / 0.88", background: "linear-gradient(90deg,#f0f0f0 25%,#fafafa 50%,#f0f0f0 75%)", backgroundSize: "200% 100%" }} />
    <div className="p-3 flex flex-col gap-2">
      <div className="w-14 h-2 rounded-full bg-gray-100" />
      <div className="w-[90%] h-2.5 rounded-full bg-gray-100" />
      <div className="w-[60%] h-2.5 rounded-full bg-gray-100" />
      <div className="w-12 h-2 rounded-full bg-gray-100 mt-1" />
      <div className="w-full h-8 rounded-lg bg-gray-100 mt-1.5" />
    </div>
  </div>
);

const GridSkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
    {[...Array(6)].map((_, i) => <CardSkeleton key={i} />)}
  </div>
);

/* ─────────────────────────────────────────────
   COLLAPSIBLE SECTION
   ───────────────────────────────────────────── */
function Section({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="mb-5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-1.5"
      >
        <span className="text-[10px] font-700 uppercase tracking-widest text-gray-700 dark:text-gray-300">
          {title}
        </span>
        <ChevronDown
          size={13}
          color="#9ca3af"
          className={cn("transition-transform duration-200", open && "rotate-180")}
        />
      </button>
      <div className="h-px bg-gray-100 dark:bg-gray-800 mb-2.5" />
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FILTER PANEL
   ───────────────────────────────────────────── */
function FilterPanel({ filterOptions, filters, onFilterChange }) {
  if (!filterOptions) return null;

  const { categories = [], brands = [], priceRange = [0, 100000] } = filterOptions;
  const allCategories = ["All", ...categories];

  const [localSearch, setLocalSearch] = useState(filters.search || "");

  useEffect(() => {
    setLocalSearch(filters.search || "");
  }, [filters.search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localSearch !== filters.search) {
      onFilterChange({ ...filters, search: localSearch });
    }
  };

  const toggleCategory = (cat) => {
    const next =
      cat === "All"
        ? []
        : filters.categories.includes(cat)
        ? filters.categories.filter((c) => c !== cat)
        : [...filters.categories, cat];
    onFilterChange({ ...filters, categories: next });
  };

  const toggleBrand = (brand) => {
    const next = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onFilterChange({ ...filters, brands: next });
  };

  return (
    <div>
      {/* search */}
      <form onSubmit={handleSearchSubmit} className="relative mb-4">
        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          
          placeholder="Search products…"
          className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 pl-8 pr-3 py-2 text-[12px] outline-none
                     focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 dark:focus:ring-emerald-900 transition-all duration-200"
        />
      </form>

      {/* categories */}
      <Section title="Category">
        <div className="flex flex-wrap gap-1.5">
          {allCategories.map((cat) => {
            const active = cat === "All" ? filters.categories.length === 0 : filters.categories.includes(cat);
            return (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={cn(
                  "rounded-full px-3 py-1 text-[11px] font-600 transition-all duration-180",
                  active
                    ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                    : "border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-400"
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </Section>

      {/* brands */}
      <Section title="Brand">
        <div className="flex flex-col gap-2">
          {brands.map((brand) => {
            const active = filters.brands.includes(brand);
            return (
              <label key={brand} className="flex items-center gap-2.5 cursor-pointer select-none">
                <div
                  onClick={() => toggleBrand(brand)}
                  className={cn(
                    "w-4 h-4 rounded flex items-center justify-center transition-all duration-150 cursor-pointer",
                    active
                      ? "bg-gray-900 dark:bg-white border-transparent"
                      : "border-1.5 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                  )}
                >
                  {active && <Check size={11} color={typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? "#111" : "#fff"} strokeWidth={3} />}
                </div>
                <span className="text-[12px] text-gray-700 dark:text-gray-300">{brand}</span>
              </label>
            );
          })}
        </div>
      </Section>

      {/* price */}
      <Section title="Price Range">
        <div className="flex flex-col gap-2">
          <input
            type="range"
            min={priceRange[0]}
            max={priceRange[1]}
            value={filters.maxPrice ?? priceRange[1]}
            onChange={(e) => onFilterChange({ ...filters, maxPrice: Number(e.target.value) })}
            className="w-full accent-gray-900 cursor-pointer"
          />
          <div className="flex justify-between">
            <span className="text-[11px] text-gray-400">NRs 0</span>
            <span className="text-[11px] font-700 text-gray-800 dark:text-gray-200">
              NRs {(filters.maxPrice ?? priceRange[1]).toLocaleString()}
            </span>
          </div>
        </div>
      </Section>

      {/* clear */}
      {(filters.categories.length + filters.brands.length) > 0 && (
        <button
          onClick={() => onFilterChange({ categories: [], brands: [], maxPrice: priceRange[1] })}
          className="mt-2 w-full rounded-lg border border-gray-200 dark:border-gray-700 py-1.5 text-[11px] font-600 text-red-500
                     hover:bg-red-50 dark:hover:bg-red-950 transition-colors duration-150 flex items-center justify-center gap-1.5"
        >
          <X size={12} /> Clear all filters
        </button>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SORT DROPDOWN
   ───────────────────────────────────────────── */
const SORT_OPTIONS = [
  { key: "default",    label: "Recommended" },
  { key: "price-asc",  label: "Price: Low → High" },
  { key: "price-desc", label: "Price: High → Low" },
  { key: "rating",     label: "Top Rated" },
  { key: "newest",     label: "Newest First" },
];

function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const label = SORT_OPTIONS.find((o) => o.key === value)?.label || "Sort";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900
                   px-3 py-1.5 text-[12px] font-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 transition-colors duration-200"
      >
        <ArrowUpDown size={13} color="#9ca3af" />
        {label}
        <ChevronDown size={12} color="#9ca3af" className={cn("transition-transform duration-180", open && "rotate-180")} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-[9]" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="absolute top-[calc(100%+6px)] left-0 z-[10] min-w-[170px] bg-white dark:bg-gray-900
                         rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden"
            >
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => { onChange(opt.key); setOpen(false); }}
                  className={cn(
                    "block w-full text-left px-4 py-2 text-[12px] transition-colors duration-150",
                    opt.key === value
                      ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-600 font-600"
                      : "text-gray-600 dark:text-gray-400 font-500 hover:bg-gray-50 dark:hover:bg-gray-800"
                  )}
                >
                  {opt.key === value && "✓  "}{opt.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   EMPTY STATE
   ───────────────────────────────────────────── */
function EmptyState({ onClear }) {
  return (
    <div className="flex flex-col items-center justify-center h-[380px] gap-3">
      <div className="w-18 h-18 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <Search size={28} color="#d1d5db" />
      </div>
      <p className="text-[15px] font-600 text-gray-700 dark:text-gray-300">No products found</p>
      <p className="text-[12px] text-gray-400">Try adjusting or clearing your filters</p>
      <button
        onClick={onClear}
        className="mt-1 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-5 py-2
                   text-[12px] font-600 hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors duration-200"
      >
        Clear Filters
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN  –  CollectionsContent
   ───────────────────────────────────────────── */
export default function CollectionsContent({ initialProducts, initialFilterOptions }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  /* ── state ── */
  const [products, setProducts]           = useState(initialProducts || []);
  const [filterOptions, setFilterOptions] = useState(initialFilterOptions || null);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [filterOpen, setFilterOpen]       = useState(false);
  const [sort, setSort]                   = useState("default");

  const [filters, setFilters] = useState({
    categories: searchParams.getAll("category"),
    brands:     searchParams.getAll("brand"),
    maxPrice:   searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : (initialFilterOptions?.priceRange?.[1] ?? null),
  });

  useEffect(() => {
    if (filterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [filterOpen]);

  /* ── fetch on filter change ── */
  const fetchProducts = useCallback(async (currentFilters) => {
    setLoadingProducts(true);
    const params = new URLSearchParams();
    currentFilters.categories.forEach((c) => params.append("category", c));
    currentFilters.brands.forEach((b) => params.append("brand", b));
    if (currentFilters.search) {
        params.append("search", currentFilters.search);
    }
    if (filterOptions && currentFilters.maxPrice < filterOptions.priceRange[1]) {
      params.set("maxPrice", currentFilters.maxPrice);
    }

    // Update URL Shallowly (so page doesn't reload, but URL updates)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });

    try {
      const res  = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      setProducts(Array.isArray(data.products) ? data.products : Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("❌ Failed to fetch products:", err);
      setProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  }, [filterOptions]);

  const handleFilterChange = useCallback((next) => {
    setFilters(next);
    fetchProducts(next);
  }, [fetchProducts]);

  useEffect(() => {
    if (initialProducts) setIsInitialRender(false);
  }, [initialProducts]);

  /* ── client-side sort ── */
  const sorted = useMemo(() => {
    const list = [...products];
    switch (sort) {
      case "price-asc":  list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating":     list.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
      case "newest":     list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
    }
    return list;
  }, [products, sort]);

  const activeFilterCount = filters.categories.length + filters.brands.length;
  const showSkeleton = loadingProducts || (isInitialRender && products.length === 0);

  const clearFilters = () => {
    const cleared = { categories: [], brands: [], maxPrice: filterOptions?.priceRange?.[1] ?? null };
    setFilters(cleared);
    fetchProducts(cleared);
  };

  /* ── render ── */
  return (
    <div className="min-h-screen bg-[#f5f5f3] dark:bg-[#0f0f0f]">

      {/* ── sticky top bar ── */}
      <div className="sticky top-0 z-20 bg-white dark:bg-[#141414] border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-[20px] font-700 text-gray-900 dark:text-white tracking-[-0.02em]">
              All Products
            </h1>
            {/* <p className="text-[11px] text-gray-400 mt-0.5">
              {sorted.length} item{sorted.length !== 1 ? "s" : ""} found
            </p> */}
          </div>
          <div className="flex items-center gap-2.5">
            {/* filter trigger (mobile + always-visible compact trigger) */}
            <button
              onClick={() => setFilterOpen(true)}
              className="relative flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700
                         bg-white dark:bg-gray-900 px-3 py-1.5 text-[12px] font-600 text-gray-700 dark:text-gray-300
                         hover:border-gray-400 transition-colors duration-200 lg:hidden"
            >
              <SlidersHorizontal size={14} />
              Filters
              {activeFilterCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 rounded-full bg-gray-900 dark:bg-white
                                 text-white dark:text-gray-900 text-[9px] font-700 flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <SortDropdown value={sort} onChange={setSort} />
          </div>
        </div>
      </div>

      {/* ── body ── */}
      <div className="max-w-[1280px] mx-auto px-6 py-6 flex gap-8">

        {/* ── sidebar (desktop) ── */}
        <aside className="hidden lg:block w-[260px] flex-shrink-0 sticky top-[88px] self-start max-h-[calc(100vh-108px)] overflow-y-auto">
          <div className="bg-white dark:bg-[#141414] rounded-xl border border-gray-100 dark:border-gray-800 p-5">
            <FilterPanel
              filterOptions={filterOptions}
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
        </aside>

        {/* ── grid ── */}
        <main className="flex-1">
          {showSkeleton ? (
            <GridSkeleton />
          ) : sorted.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {sorted.map((p, i) => (
                <motion.div
                  key={p._id || p.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.36, delay: i * 0.055, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          ) : (
            <EmptyState onClear={clearFilters} />
          )}
        </main>
      </div>

      {/* ── mobile filter drawer ── */}
      <AnimatePresence>
        {filterOpen && (
          <>
            {/* backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[39]"
              onClick={() => setFilterOpen(false)}
            />
            {/* drawer */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 w-[300px] max-w-[85vw] h-full bg-white dark:bg-[#141414] z-[40]
                         shadow-[-8px_0_32px_rgba(0,0,0,.14)] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-5 pb-2">
                <span className="text-[14px] font-700 text-gray-900 dark:text-white">Filters</span>
                <button onClick={() => setFilterOpen(false)} className="p-1">
                  <X size={18} color="#6b7280" />
                </button>
              </div>
              <div className="px-5 pb-6">
                <FilterPanel
                  filterOptions={filterOptions}
                  filters={filters}
                  onFilterChange={(next) => { handleFilterChange(next); }}
                />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── shimmer keyframes ── */}
      <style>{`
        @keyframes shimmer {
          from { background-position: -200% 0; }
          to   { background-position:  200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 1.4s infinite;
        }
      `}</style>
    </div>
  );
}