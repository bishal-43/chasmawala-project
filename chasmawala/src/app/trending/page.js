"use client";

import { useState, useEffect } from "react"; // Added useEffect
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { ShoppingBag , Eye} from "lucide-react";

export default function TrendingPage() {
    const { addToCart, cartItems } = useCart();

    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    // CORRECT: Use useEffect for data fetching
    useEffect(() => {
        setMounted(true);
        async function fetchTrending() {
            try {
                const res = await fetch("/api/products/trending");
                const data = await res.json();
                setProducts(data);

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
    }, []); // Empty array means this runs ONCE when the page loads

    function handleAddToCart(product) {
        addToCart(product);
        toast.success(`"${product.name}" added to cart!`);
    }

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#fafaf9]"> {/* Softer background for luxury feel */}
            {/* Header */}
            <div className="border-b bg-white sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold tracking-tight">Trending Now 🔥</h1>

                    <div className="flex items-center gap-4">
                        <div className="relative cursor-pointer">
                            <span className="text-2xl">🛒</span>
                            {mounted && cartItems?.length > 0 && (
                                <span className="absolute -top-1 -right-2 bg-[#c9a84c] text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                    {cartItems.length}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="container mx-auto px-4 py-6">
                <div className="relative max-w-xl mx-auto">
                    <input
                        type="search"
                        placeholder="Search frames, lenses, or styles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full border border-stone-200 rounded-full px-6 py-3 outline-none focus:ring-2 focus:ring-[#c9a84c] transition-all"
                    />
                </div>
            </div>

            {/* Products Grid */}
            <div className="container mx-auto px-4 pb-12">
                {loading ? (
                    <div className="flex flex-col items-center py-20">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black mb-4"></div>
                        <p className="text-stone-400">Updating live trends...</p>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-20 border-2 border-dashed border-stone-200 rounded-xl">
                        <p className="text-stone-500">No products match your search.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                        {filteredProducts.map((product) => (
                            <div
                                key={product._id}
                                className="group relative border border-transparent hover:border-stone-200 rounded-xl p-3 bg-white transition-all duration-300"
                            >
                                <div className="relative aspect-[4/5] mb-4 overflow-hidden rounded-lg bg-stone-100">
                                    <Image
                                        src={product.images?.[0] || product.image || "/placeholder.png"}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* quick view modal */}
                                    <Link 
                                        href={`/products/${product.slug}`} 
                                        scroll={false} // Keeps scroll position for modals
                                        className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                                    >
                                        <button className="bg-white/90 backdrop-blur-md text-black px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <Eye size={14} />
                                            Quick View
                                        </button>
                                    </Link>

                                    {product.badge && (
                                        <span className="absolute top-2 left-2 bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest rounded-sm">
                                            {product.badge}
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold">
                                        {product.category}
                                    </p>
                                    <h2 className="font-semibold text-stone-900 truncate">
                                        {product.name}
                                    </h2>

                                    <div className="flex justify-between items-center pt-2">
                                        <span className="font-bold text-lg">NRs {product.price}</span>
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="bg-stone-900 text-white text-xs px-4 py-2 rounded-full hover:bg-[#c9a84c] hover:text-black transition-colors"
                                        >
                                            <ShoppingBag size={24} />
                                            {/* <span>Add to Cart</span> */}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}