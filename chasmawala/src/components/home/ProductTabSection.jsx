"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/home/ProductCard";
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

  const currentTab = TABS.find((tab) => tab.key === active);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${active}`);
        const data = await res.json();
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

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-10"
        >
          <h2 className="text-3xl font-bold tracking-tight text-stone-900">Popular Products</h2>
          <Link
            href={currentTab?.path || "/collections"}
            className="text-sm font-bold uppercase tracking-widest text-stone-400 hover:text-emerald-600 transition-colors"
          >
            Explore all {currentTab?.label} →
          </Link>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex gap-8 border-b border-stone-100 mb-10 overflow-x-auto scrollbar-hide"
        >
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
        </motion.div>

        {/* Grid */}
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
            <motion.div
              key={active}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.07 } },
              }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
            >
              {products.slice(0, 10).map((product) => (
                <motion.div
                  key={product._id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
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