import { Cormorant_Garamond, Syne } from 'next/font/google';
import Link from "next/link";
import { ArrowLeft, Sparkles, Eye, ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-cormorant' });
const syne = Syne({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-syne' });

export default async function NewArrivalsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/new-arrivals`, { 
    next: { revalidate: 3600 } 
  });
  const data = await res.json();
  const products = data.products ?? [];

  return (
    <main className={`${syne.variable} ${cormorant.variable} min-h-screen bg-[#fafaf9] font-sans text-stone-900`}>
      
      {/* ── Header ── */}
      <header className="relative pt-32 pb-16 px-6 overflow-hidden border-b border-stone-100 bg-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.06)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-emerald-600 mb-8 transition-colors">
            <ArrowLeft size={14} /> Back to Home
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 text-[0.65rem] font-black uppercase tracking-widest rounded-full flex items-center gap-1.5 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Fresh Drop
                </span>
                <span className="text-stone-400 text-[0.65rem] uppercase tracking-widest">Updated Today</span>
              </div>
              
              <h1 className={`${cormorant.className} text-6xl md:text-8xl font-black leading-none tracking-tighter text-stone-900`}>
                New <span className="text-transparent italic [-webkit-text-stroke:1px_#10b981] font-light">Arrivals</span>
              </h1>
            </div>
            
            <p className="max-w-md text-sm text-stone-500 leading-relaxed border-l-2 border-emerald-500 pl-6 py-1">
              "Discover the latest optical innovations and silhouettes to land at our Janakpur studio. Modern shapes meet lightweight durability."
            </p>
          </div>
        </div>
      </header>

      {/* ── Product Grid ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div 
                key={product._id} 
                className="group relative bg-white border border-stone-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                {/* Custom New Tag for this page */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <Sparkles size={10} className="fill-white" />
                    Just Landed
                  </span>
                </div>
                
                {/* Image Wrapper */}
                <div className="relative aspect-[4/5] bg-stone-50 overflow-hidden">
                  <img 
                    src={product.image || (product.images && product.images[0]) || "/placeholder.png"} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={product.name}
                  />
                  
                  {/* Quick View Hover Overlay */}
                  <Link 
                    href={`/products/${product.slug}`}
                    className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10"
                  >
                    <span className="bg-white/95 backdrop-blur-sm text-stone-905 px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-md hover:bg-emerald-500 hover:text-white">
                      <Eye size={14} className="text-emerald-500 group-hover:text-white" />
                      View Style
                    </span>
                  </Link>
                </div>

                {/* Content info */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-emerald-600 font-bold mb-1">
                      {product.category || "Optical Frame"}
                    </p>
                    <h3 className="font-bold text-stone-900 text-base group-hover:text-emerald-600 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-stone-100">
                    <p className="text-lg font-black text-stone-900">NRs {product.price}</p>
                    <Link 
                      href={`/products/${product.slug}`}
                      className="text-stone-400 hover:text-emerald-600 transition-colors"
                    >
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-40 text-center bg-white rounded-3xl border border-stone-100 shadow-sm max-w-3xl mx-auto">
            <Sparkles className="w-12 h-12 text-emerald-500 mx-auto mb-4 opacity-50" />
            <h2 className={`${cormorant.className} text-3xl text-stone-700 italic font-bold`}>Coming Soon...</h2>
            <p className="text-stone-400 text-sm mt-2 max-w-xs mx-auto">Our next premium collection drop is currently being curated by our specialists.</p>
          </div>
        )}
      </section>

      {/* ── Curation Highlights ── */}
      <section className="bg-white border-t border-stone-100 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4 p-6 bg-stone-50 rounded-2xl border border-stone-100/50">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 shadow-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-xs uppercase tracking-widest">Premium Lenses</h4>
              <p className="text-stone-500 text-xs mt-2 leading-relaxed">Top-tier anti-glare, blue light blocking, and scratch-resistant optical glass.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-6 bg-stone-50 rounded-2xl border border-stone-100/50">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 shadow-sm">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-xs uppercase tracking-widest">Imported Frames</h4>
              <p className="text-stone-500 text-xs mt-2 leading-relaxed">Handpicked silhouettes crafted from premium acetate and aerospace-grade titanium.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-6 bg-stone-50 rounded-2xl border border-stone-100/50">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 shadow-sm">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-xs uppercase tracking-widest">Expert Fitting</h4>
              <p className="text-stone-500 text-xs mt-2 leading-relaxed">Custom prescription alignment and free adjustments at our Janakpur studio.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer Stats ── */}
      <footer className="border-t border-stone-100 py-16 bg-stone-50 text-center">
         <p className={`${cormorant.className} text-3xl italic text-stone-400 font-bold`}>Chasmawala Janakpur</p>
         <div className="mt-4 flex justify-center gap-8 text-[0.65rem] font-bold uppercase tracking-widest text-stone-300">
            <span>Premium Lenses</span>
            <span>·</span>
            <span>Imported Frames</span>
            <span>·</span>
            <span>Expert Fitting</span>
         </div>
      </footer>
    </main>
  );
}