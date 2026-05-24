"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { ShoppingBag, Eye, Search, ArrowLeft, Flame } from "lucide-react";
import { Cormorant_Garamond, Syne } from 'next/font/google';

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-cormorant' });
const syne = Syne({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-syne' });

export default function TrendingPage() {
    const { addToCart, cartItems } = useCart();

    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        async function fetchTrending() {
            try {
                const res = await fetch("/api/products/trending");
                const data = await res.json();
                const cleanData = Array.isArray(data) ? data : (data.products || []);
                setProducts(cleanData);
            } catch (error) {
                console.error("Error fetching trending products:", error);
                toast.error("Failed to load trending items");
            } finally {
                setLoading(false);
            }
        }

        fetchTrending();
    }, []);

    function handleAddToCart(product) {
        addToCart(product);
        toast.success(`"${product.name}" added to cart!`);
    }

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={`${syne.variable} ${cormorant.variable} min-h-screen bg-[#fafaf9] font-sans text-stone-900`}>
            
            {/* ── Header ── */}
            <header className="relative pt-32 pb-16 px-6 overflow-hidden border-b border-stone-100 bg-white">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.05)_0%,transparent_70%)] pointer-events-none" />
                
                <div className="max-w-7xl mx-auto relative z-10">
                    <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-rose-500 mb-8 transition-colors">
                        <ArrowLeft size={14} /> Back to Home
                    </Link>
                    
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="px-3 py-1 bg-rose-500/10 text-rose-600 text-[0.65rem] font-black uppercase tracking-widest rounded-full flex items-center gap-1.5 animate-pulse">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                    Live Trends
                                </span>
                                <span className="text-stone-400 text-[0.65rem] uppercase tracking-widest">Updated Realtime</span>
                            </div>
                            
                            <h1 className={`${cormorant.className} text-6xl md:text-8xl font-black leading-none tracking-tighter text-stone-900`}>
                                Trending <span className="text-transparent italic [-webkit-text-stroke:1px_#ef4444] font-light">Now</span>
                            </h1>
                        </div>
                        
                        {/* Search Input in Header */}
                        <div className="w-full md:max-w-xs relative">
                            <input
                                type="text"
                                placeholder="Search hot styles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full border border-stone-200 rounded-2xl px-5 py-3 pl-11 text-sm outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 bg-[#fafaf9] transition-all"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Products Grid */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                {loading ? (
                    <div className="flex flex-col items-center py-32 bg-white rounded-3xl border border-stone-100 shadow-sm">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-rose-500 mb-4"></div>
                        <p className="text-stone-400 text-sm font-medium">Analyzing live store trends...</p>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-32 bg-white rounded-3xl border border-stone-100 shadow-sm max-w-3xl mx-auto">
                        <Flame className="w-12 h-12 text-rose-500/40 mx-auto mb-4" />
                        <p className="text-stone-500 font-bold text-lg">No trending products match your search.</p>
                        <p className="text-stone-400 text-xs mt-1">Try searching for other styles or shapes.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredProducts.map((product) => (
                            <div
                                key={product._id}
                                className="group relative bg-white border border-stone-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                            >
                                {/* Custom Trending Badge */}
                                <div className="absolute top-4 left-4 z-20">
                                    <span className="bg-rose-505 bg-rose-500 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                                        <Flame size={10} className="fill-white" />
                                        Hot Style
                                    </span>
                                </div>

                                {/* Image Wrapper */}
                                <div className="relative aspect-[4/5] bg-stone-50 overflow-hidden">
                                    <img
                                        src={product.images?.[0] || product.image || "/placeholder.png"}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* Quick View Hover Overlay */}
                                    <Link
                                        href={`/products/${product.slug}`}
                                        className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10"
                                    >
                                        <span className="bg-white/95 backdrop-blur-sm text-stone-900 px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-md hover:bg-rose-500 hover:text-white">
                                            <Eye size={14} className="text-rose-500 group-hover:text-white" />
                                            View Style
                                        </span>
                                    </Link>
                                </div>

                                {/* Content Info */}
                                <div className="p-5 flex flex-col flex-1 justify-between">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider text-rose-500 font-bold mb-1">
                                            {product.category || "Hot Trend"}
                                        </p>
                                        <h3 className="font-bold text-stone-900 text-base group-hover:text-rose-500 transition-colors line-clamp-1">
                                            {product.name}
                                        </h3>
                                    </div>

                                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-stone-100">
                                        <div>
                                            <p className="text-stone-400 text-[10px] font-bold uppercase tracking-wider">Price</p>
                                            <p className="text-lg font-black text-stone-900">NRs {product.price}</p>
                                        </div>
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="bg-stone-900 text-white p-3 rounded-xl hover:bg-rose-500 hover:text-white transition-colors shadow-sm"
                                            aria-label="Add to Cart"
                                        >
                                            <ShoppingBag size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}