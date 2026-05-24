"use client";

import Link from "next/link";
import { Sparkles, Award, TrendingUp, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const portals = [
  {
    title: "New Arrivals",
    subtitle: "Just Landed",
    description: "Explore the latest optical designs & fresh silhouettes.",
    image: "/images/categories/eyeglasses3.jpg",
    href: "/new-arrivals",
    icon: Sparkles,
    accentColor: "border-emerald-500/20 text-emerald-400 bg-emerald-500/10",
    hoverAccent: "group-hover:text-emerald-400",
    gradient: "from-emerald-950/90 via-slate-950/40 to-transparent",
    btnBg: "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20",
  },
  {
    title: "Best Sellers",
    subtitle: "Customer Favorites",
    description: "Our hall of fame. The most-wanted frames, verified by thousands.",
    image: "/images/categories/sunglasses3.jpg",
    href: "/bestseller",
    icon: Award,
    accentColor: "border-amber-500/20 text-amber-400 bg-amber-500/10",
    hoverAccent: "group-hover:text-amber-400",
    gradient: "from-amber-950/90 via-slate-950/40 to-transparent",
    btnBg: "bg-amber-500 hover:bg-amber-600 shadow-amber-500/20",
  },
  {
    title: "Trending Now",
    subtitle: "Hot Right Now",
    description: "The styles currently taking over the season.",
    image: "/images/categories/sunglasses1.jpg",
    href: "/trending",
    icon: TrendingUp,
    accentColor: "border-rose-500/20 text-rose-400 bg-rose-500/10",
    hoverAccent: "group-hover:text-rose-400",
    gradient: "from-rose-950/90 via-slate-950/40 to-transparent",
    btnBg: "bg-rose-500 hover:bg-rose-600 shadow-rose-500/20",
  },
];

export default function PromoPortalsSection() {
  return (
    <section className="py-20 bg-white border-t border-stone-100 overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-stone-400 font-bold text-xs tracking-[0.25em] uppercase mb-4"
          >
            Curated Spotlights
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight mb-4"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Browse Your Vibe
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-stone-500 max-w-xl mx-auto leading-relaxed"
          >
            Skip the filters and jump directly into our hand-picked selections.
          </motion.p>
        </div>

        {/* Portals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {portals.map((portal, idx) => {
            const Icon = portal.icon;
            return (
              <motion.div
                key={portal.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
              >
                <Link
                  href={portal.href}
                  className="group block relative overflow-hidden rounded-[2rem] bg-stone-900 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5]"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={portal.image}
                      alt={portal.title}
                      className="object-cover w-full h-full opacity-80 transition-transform duration-700 scale-100 group-hover:scale-105"
                    />
                    {/* Dark Dynamic Accent Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${portal.gradient} opacity-90 transition-opacity duration-300 group-hover:opacity-95`} />
                  </div>

                  {/* Top Badge Icon */}
                  <div className="absolute top-6 left-6 z-20">
                    <div className={`flex items-center gap-2 border px-3 py-1.5 rounded-full backdrop-blur-md transition-colors duration-300 ${portal.accentColor}`}>
                      <Icon className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-wider">{portal.subtitle}</span>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20 flex flex-col justify-end h-1/2">
                    <h3 
                      className={`text-2xl md:text-3xl font-black text-white mb-2 transition-colors duration-300 ${portal.hoverAccent}`}
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {portal.title}
                    </h3>
                    
                    <p className="text-stone-300/90 text-sm leading-relaxed mb-6 font-medium">
                      {portal.description}
                    </p>

                    {/* Interactive Button CTA */}
                    <div className="flex items-center">
                      <span className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-white text-xs font-bold transition-all duration-300 shadow-lg ${portal.btnBg} group-hover:translate-x-1`}>
                        Shop Now
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
