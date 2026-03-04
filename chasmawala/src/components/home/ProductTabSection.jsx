"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/home/ProductCard"; // Fixed path to your component
import Link from "next/link";

const TABS = [
  { key: "trending", label: "Trending", path: "/trending" },
  { key: "new-arrivals", label: "New Arrivals", path: "/new-arrivals" },
  { key: "bestseller", label: "Bestsellers", path: "/bestseller" },
];

export default function ProductTabsSection() {
  const [active, setActive] = useState("trending");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Find the current tab object to get the correct path for the "View All" link
  const currentTab = TABS.find((tab) => tab.key === active);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        // Ensure the API call matches your backend structure
        const res = await fetch(`/api/products/${active}`);
        const data = await res.json();
        
        // Defensive check: Ensure we always set an array
        const cleanData = Array.isArray(data) ? data : (data.products || []);
        setProducts(cleanData);
      } catch (e) {
        console.error("Fetch error:", e);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [active]);

  return (
    <section className="bg-white py-20 font-sans">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header with Dynamic Navigation */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-stone-900">Popular Products</h2>
          <Link 
            href={currentTab?.path || "/collections"} 
            className="text-sm font-bold uppercase tracking-widest text-stone-400 hover:text-emerald-600 transition-colors"
          >
            Explore all {currentTab?.label} →
          </Link>
        </div>

        {/* Tabs - Mobile Responsive Scrollable */}
        <div className="flex gap-8 border-b border-stone-100 mb-10 overflow-x-auto scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`pb-4 text-xs uppercase tracking-[0.2em] relative transition-all whitespace-nowrap
                ${active === tab.key ? "text-black font-bold" : "text-stone-300 hover:text-stone-500"}
              `}
            >
              {tab.label}
              {active === tab.key && (
                <span className="absolute left-0 right-0 -bottom-[1px] h-[3px] bg-emerald-500 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Grid with Skeleton and Map Protection */}
        <div className="min-h-[400px]">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-4 animate-pulse">
                  <div className="aspect-[4/5] bg-stone-100 rounded-xl" />
                  <div className="h-4 bg-stone-100 rounded w-3/4" />
                  <div className="h-4 bg-stone-100 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {products.slice(0, 10).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-stone-100 rounded-2xl">
              <p className="text-stone-400 text-sm">No {currentTab?.label} available at the moment.</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}