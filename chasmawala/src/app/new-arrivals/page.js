import ProductCard from "@/components/home/ProductCard";
import { Cormorant_Garamond, Syne } from 'next/font/google';
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-cormorant' });
const syne = Syne({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-syne' });

export default async function NewArrivalsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/new-arrivals`, { 
    next: { revalidate: 3600 } 
  });
  const data = await res.json();
  const products = data.products ?? [];

  return (
    <main className={`${syne.variable} ${cormorant.variable} min-h-screen bg-white font-sans text-stone-900`}>
      
      {/* ── Header ── */}
      <header className="pt-16 pb-10 px-6 border-b border-stone-100">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-black mb-8 transition-colors">
            <ArrowLeft size={14} /> Back to Home
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} className="text-emerald-500 fill-emerald-500" />
                <span className="text-[0.6rem] font-black uppercase tracking-[0.3em] text-emerald-600">Season Drop</span>
              </div>
              <h1 className={`${cormorant.className} text-6xl md:text-8xl font-bold leading-none tracking-tighter`}>
                New <span className="italic font-light text-stone-400">Arrivals</span>
              </h1>
            </div>
            <p className="max-w-xs text-sm text-stone-500 leading-relaxed border-l-2 border-emerald-500 pl-6">
              "Discover the latest optical innovations and silhouettes to land at our Janakpur studio."
            </p>
          </div>
        </div>
      </header>

      {/* ── Product Grid ── */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-12">
            {products.map((product, idx) => (
              <div key={product._id} className="group relative">
                {/* Custom New Tag for this page */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    JUST LANDED
                  </span>
                </div>
                <ProductCard product={product} />
                
                {/* Secondary detail for New Arrivals */}
                <div className="mt-2 flex items-center gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                   <p className="text-[0.6rem] font-bold text-stone-400 uppercase tracking-widest">Available Now</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-40 text-center">
            <h2 className={`${cormorant.className} text-3xl text-stone-300 italic`}>Coming Soon...</h2>
            <p className="text-stone-400 text-sm mt-2">Our next collection is currently being curated.</p>
          </div>
        )}
      </section>

      {/* ── Footer Stats ── */}
      <footer className="border-t border-stone-100 py-20 bg-stone-50 text-center">
         <p className={`${cormorant.className} text-2xl italic text-stone-400`}>Chasmawala Janakpur</p>
         <div className="mt-4 flex justify-center gap-8 text-[0.6rem] font-bold uppercase tracking-widest text-stone-300">
            <span>Premium Lenses</span>
            <span>Imported Frames</span>
            <span>Expert Fitting</span>
         </div>
      </footer>
    </main>
  );
}