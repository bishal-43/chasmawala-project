"use client";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { X, RotateCcw, SlidersHorizontal, Search, Tag } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const ProductFilter = ({
  products = [],
  onFilterChange = () => {},
  initialFilters = {},
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const isInitialMount = useRef(true);
  const updateTimeoutRef = useRef(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchBrand, setSearchBrand] = useState("");

  // 1. 🚀 DYNAMIC EXTRACTION
  const { availableCategories, availableBrands, absoluteMaxPrice } = useMemo(() => {
    if (!products || products.length === 0) {
      return { availableCategories: [], availableBrands: [], absoluteMaxPrice: 10000 };
    }

    const brandsSet = new Set();
    const catsSet = new Set();
    let max = 0;

    products.forEach((p) => {
      // Normalizing to handle potential case issues
      if (p.brand) brandsSet.add(p.brand.trim());
      if (p.category) catsSet.add(p.category.trim());
      const pPrice = Number(p.price) || 0;
      if (pPrice > max) max = pPrice;
    });

    return {
      availableCategories: Array.from(catsSet).sort(),
      availableBrands: Array.from(brandsSet).sort(),
      absoluteMaxPrice: Math.ceil(max) || 1000,
    };
  }, [products]);

  // 2. STATE MANAGEMENT
  const [filters, setFilters] = useState({
    categories: initialFilters.categories || [],
    brands: initialFilters.brands || [],
    maxPrice: initialFilters.maxPrice ?? absoluteMaxPrice,
  });

  // Local UI state for the slider handle (prevents jumping during API fetch)
  const [maxPriceUI, setMaxPriceUI] = useState(filters.maxPrice);

  // Sync state if products load for the first time
  useEffect(() => {
    if (isInitialMount.current && products.length > 0) {
      const targetMax = initialFilters.maxPrice ?? absoluteMaxPrice;
      setFilters(prev => ({ ...prev, maxPrice: targetMax }));
      setMaxPriceUI(targetMax);
    }
  }, [absoluteMaxPrice, initialFilters.maxPrice, products.length]);

  // 3. 🚀 PERFORMANCE: DEBOUNCED UPDATE
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (!products.length) return;

    if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current);

    updateTimeoutRef.current = setTimeout(() => {
      onFilterChange(filters);

      const params = new URLSearchParams();
      filters.categories.forEach(c => params.append('category', c));
      filters.brands.forEach(b => params.append('brand', b));

      if (filters.maxPrice < absoluteMaxPrice) {
        params.set('maxPrice', filters.maxPrice);
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, 400);

    return () => clearTimeout(updateTimeoutRef.current);
  }, [filters, onFilterChange, pathname, router, absoluteMaxPrice]);

  const toggle = useCallback((key, value) => {
    setFilters((prev) => {
      const current = prev[key] || [];
      const newValues = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: newValues };
    });
  }, []);

  const handleMaxPriceChange = (value) => {
    setMaxPriceUI(value);
    setFilters(prev => ({ ...prev, maxPrice: value }));
  };

  const resetAll = () => {
    setFilters({ categories: [], brands: [], maxPrice: absoluteMaxPrice });
    setMaxPriceUI(absoluteMaxPrice);
    setSearchCategory("");
    setSearchBrand("");
  };

  const activeFilterCount = filters.categories.length + filters.brands.length + (filters.maxPrice < absoluteMaxPrice ? 1 : 0);

  const CheckboxItem = ({ label, checked, onChange }) => (
    <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer group transition-colors">
      <input
        type="checkbox"
        className="h-4.5 w-4.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
        checked={checked}
        onChange={onChange}
      />
      <span className="text-sm text-slate-700 group-hover:text-indigo-600 transition-colors font-medium">{label}</span>
    </label>
  );

  const FilterContent = () => (
    <div className="flex flex-col h-full space-y-8">
      {/* Category Section */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Tag size={16} className="text-indigo-600" />
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Categories</h3>
        </div>
        {availableCategories.length > 6 && (
          <input
            type="text"
            placeholder="Search categories..."
            className="w-full mb-2 px-3 py-1.5 text-xs border border-slate-200 rounded-md focus:ring-1 focus:ring-indigo-500 outline-none"
            onChange={(e) => setSearchCategory(e.target.value)}
          />
        )}
        <div className="space-y-1 max-h-48 overflow-y-auto custom-scrollbar">
          {availableCategories.filter(c => c.toLowerCase().includes(searchCategory.toLowerCase())).map(c => (
            <CheckboxItem key={c} label={c} checked={filters.categories.includes(c)} onChange={() => toggle("categories", c)} />
          ))}
        </div>
      </section>

      {/* Brand Section */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Tag size={16} className="text-indigo-600" />
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Brands</h3>
        </div>
        {availableBrands.length > 6 && (
          <input
            type="text"
            placeholder="Search brands..."
            className="w-full mb-2 px-3 py-1.5 text-xs border border-slate-200 rounded-md focus:ring-1 focus:ring-indigo-500 outline-none"
            onChange={(e) => setSearchBrand(e.target.value)}
          />
        )}
        <div className="space-y-1 max-h-48 overflow-y-auto custom-scrollbar">
          {availableBrands.filter(b => b.toLowerCase().includes(searchBrand.toLowerCase())).map(b => (
            <CheckboxItem key={b} label={b} checked={filters.brands.includes(b)} onChange={() => toggle("brands", b)} />
          ))}
        </div>
      </section>

      {/* Price Section */}
      <section className="bg-slate-50 p-4 rounded-xl border border-slate-200">
        <h3 className="text-xs font-bold text-slate-500 uppercase mb-4">Max Price: ₹{maxPriceUI.toLocaleString()}</h3>
        <Slider
          min={0}
          max={absoluteMaxPrice}
          value={maxPriceUI}
          onChange={handleMaxPriceChange}
          trackStyle={{ backgroundColor: '#4f46e5' }}
          handleStyle={{ borderColor: '#4f46e5', backgroundColor: '#fff' }}
        />
      </section>

      <button onClick={resetAll} className="flex items-center justify-center gap-2 py-2 text-sm text-slate-500 hover:text-red-500 transition-colors">
        <RotateCcw size={14} /> Reset Filters
      </button>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block w-72 shrink-0 border-r border-slate-100 pr-6">
        <div className="sticky top-24">
           <FilterContent />
        </div>
      </aside>

      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button onClick={() => setIsDrawerOpen(true)} className="bg-indigo-600 text-white p-4 rounded-full shadow-xl"><SlidersHorizontal /></button>
      </div>

      {isDrawerOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsDrawerOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 shadow-xl animate-in slide-in-from-right">
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-xl font-bold">Filters</h2>
               <button onClick={() => setIsDrawerOpen(false)}><X /></button>
            </div>
            <FilterContent />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductFilter;