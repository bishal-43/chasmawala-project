"use client";
import { useState, useRef } from "react";
import ProductCard from "./ProductCard";

export default function TrendingSection({ products }) {
    if (!products?.length) return null;

    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const stopDrag = () => setIsDragging(false);

    return (
        <section className="relative overflow-hidden bg-[#0a0a0a] py-20 font-sans">
            {/* Glow */}
            <div className="pointer-events-none absolute -top-[60%] -left-[10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,80,30,0.12)_0%,transparent_70%)]" />

            {/* Noise */}
            <div className="pointer-events-none absolute inset-0 opacity-40 bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%270%200%20200%20200%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter%20id=%27noise%27%3E%3CfeTurbulence%20type=%27fractalNoise%27%20baseFrequency=%270.85%27%20numOctaves=%274%27%20stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect%20width=%27100%25%27%20height=%27100%25%27%20filter=%27url(%23noise)%27%20opacity=%270.04%27/%3E%3C/svg%3E')]"/>

            <div className="relative mx-auto max-w-[1400px] px-8">
                {/* Header */}
                <div className="mb-12 flex items-end justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-3">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-[#ff501e]" />
                            <span className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-[#ff501e]">
                                Live Now
                            </span>
                        </div>

                        <h2 className="font-['Bebas_Neue'] text-[clamp(3rem,7vw,6rem)] leading-[0.9] tracking-wide text-[#f0ede6]">
                            Trending <br />
                            <span className="text-transparent [-webkit-text-stroke:1.5px_#f0ede6]">
                                Right Now
                            </span>
                        </h2>
                    </div>

                    <a
                        href="/trending"
                        className="group flex items-center gap-2 border-b border-[#333] pb-2 text-[0.75rem] font-medium uppercase tracking-widest text-[#888] transition hover:border-[#f0ede6] hover:text-[#f0ede6]"
                    >
                        View All
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                    </a>
                </div>

                <div className="mb-10 h-px bg-gradient-to-r from-[#333] to-transparent" />

                {/* Scroll */}
                <div
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={stopDrag}
                    onMouseLeave={stopDrag}
                    className="flex cursor-grab gap-5 overflow-x-auto pb-6 active:cursor-grabbing scrollbar-hide"
                >
                    {products.map((p, i) => (
                        <div key={p._id} className="group relative w-[260px] flex-shrink-0">
                            <span className="absolute -top-6 left-0 font-['Bebas_Neue'] text-sm tracking-wider text-[#444]">
                                {String(i + 1).padStart(2, "0")}
                            </span>

                            <div className="relative overflow-hidden rounded border border-[#1e1e1e] bg-[#141414] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-[#333] group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,80,30,0.15)]">
                                <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[linear-gradient(135deg,rgba(255,80,30,0.06)_0%,transparent_60%)]" />

                                <div className="p-3">
                                    <span className="inline-flex items-center gap-1 border border-[rgba(255,80,30,0.3)] bg-[rgba(255,80,30,0.15)] px-2 py-1 text-[0.6rem] font-medium uppercase tracking-widest text-[#ff501e]">
                                        ↑ Trending
                                    </span>
                                </div>

                                <ProductCard product={p} badge="Trending" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Progress */}
                <div className="mt-8 flex gap-1 px-2">
                    {products.slice(0, 8).map((_, i) => (
                        <div
                            key={i}
                            className={`h-[2px] max-w-[32px] flex-1 rounded ${i === 0 ? "bg-[#ff501e]" : "bg-[#222]"
                                }`}
                        />
                    ))}
                </div>

                {/* Bottom */}
                <div className="mt-12 flex items-center gap-4 text-[0.65rem] uppercase tracking-widest text-[#333]">
                    <span className="h-px flex-1 bg-[#1e1e1e]" />
                    <span>{products.length} products trending</span>
                    <span className="h-px flex-1 bg-[#1e1e1e]" />
                </div>
            </div>
        </section>
    );
}





