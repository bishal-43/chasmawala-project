import { Cormorant_Garamond, Syne } from 'next/font/google';
import Link from "next/link";
import { ArrowLeft, Sparkles, Award, Eye, ArrowRight } from "lucide-react";

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cormorant'
});

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-syne'
});

export default async function BestSellerPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?bestseller=true`, { 
    next: { revalidate: 3600 } 
  });
  const data = await res.json();
  const products = data.products ?? [];

  // Categorize rankings
  const topThree = products.slice(0, 3);
  const theRest = products.slice(3);

  // Ranks details for top 3
  const ranksInfo = [
    { badge: "Gold Ranking", accent: "text-[#c9a84c]", border: "border-[#c9a84c]/60 shadow-[#c9a84c]/5" },
    { badge: "Silver Ranking", accent: "text-stone-400", border: "border-stone-200" },
    { badge: "Bronze Ranking", accent: "text-amber-700", border: "border-stone-200" },
  ];

  return (
    <main className={`${syne.variable} ${cormorant.variable} min-h-screen bg-[#fafaf9] text-stone-900 font-sans`}>
      
      {/* Dynamic Gold Header */}
      <header className="relative pt-32 pb-16 px-6 overflow-hidden border-b border-stone-100 bg-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.06)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-[#c9a84c] mb-8 transition-colors">
            <ArrowLeft size={14} /> Back to Home
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                 <span className="px-3 py-1 bg-[#c9a84c]/10 text-[#c9a84c] text-[0.65rem] font-black uppercase tracking-widest rounded-full flex items-center gap-1.5 animate-pulse">
                   <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]"></span>
                   Live Rankings
                 </span>
                 <span className="text-stone-400 text-[0.65rem] uppercase tracking-widest">Updated Hourly</span>
              </div>
              
              <h1 className={`${cormorant.className} text-6xl md:text-8xl font-black tracking-tighter text-stone-900 leading-none`}>
                Best <span className="text-transparent italic [-webkit-text-stroke:1px_#c9a84c] font-light">Sellers</span>
              </h1>
            </div>
            <p className="max-w-md text-stone-500 text-sm leading-relaxed border-l-2 border-[#c9a84c] pl-6 py-1 text-left">
              The hall of fame. These are the most-wanted frames in Janakpur, verified by thousands of Chasmawala customers.
            </p>
          </div>
        </div>
      </header>

      {/* The Podium (Top 3 Items) */}
      <section className="max-w-7xl mx-auto px-6 py-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topThree.map((product, i) => {
            const rank = ranksInfo[i] || ranksInfo[0];
            return (
              <div 
                key={product._id} 
                className={`relative group bg-white border ${rank.border} rounded-3xl overflow-hidden p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
              >
                {/* Ranking Tag */}
                <div className="absolute top-6 left-6 z-20">
                  <span className={`px-2.5 py-1 bg-white text-[9px] font-black uppercase tracking-wider rounded-full border border-stone-100 flex items-center gap-1 shadow-sm ${rank.accent}`}>
                    <Award size={10} />
                    {rank.badge}
                  </span>
                </div>

                <div className="absolute top-4 right-6 z-20">
                  <span className={`${cormorant.className} text-6xl font-black italic opacity-10 group-hover:opacity-20 transition-opacity ${rank.accent}`}>
                    0{i + 1}
                  </span>
                </div>
                
                {/* Image Wrap */}
                <div className="relative aspect-[4/5] mb-6 rounded-2xl overflow-hidden bg-stone-50 border border-stone-100/40">
                  <img 
                    src={product.image || product.images?.[0]} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={product.name}
                  />
                  {/* Hover Quick View */}
                  <Link 
                    href={`/products/${product.slug}`}
                    className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10"
                  >
                    <span className="bg-white/95 backdrop-blur-sm text-stone-900 px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-md hover:bg-[#c9a84c] hover:text-white">
                      <Eye size={14} className="text-[#c9a84c] group-hover:text-white" />
                      View Style
                    </span>
                  </Link>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-[#c9a84c] text-[10px] font-bold uppercase tracking-widest">{product.category || "Best Seller"}</p>
                    <h3 className="text-xl font-bold text-stone-900 truncate mt-1">{product.name}</h3>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-stone-100">
                    <p className="text-2xl font-black text-stone-900">NRs {product.price}</p>
                    <Link 
                      href={`/products/${product.slug}`}
                      className="bg-stone-900 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-[#c9a84c] transition-colors shadow-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* The Remaining List (Leaderboard Style) */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-[#c9a84c]">The Leaderboard</h2>
          <div className="flex-1 h-px bg-stone-200" />
        </div>

        <div className="space-y-4">
          {theRest.map((product, i) => (
            <div 
              key={product._id} 
              className="flex items-center gap-4 md:gap-8 p-4 bg-white hover:bg-stone-50/50 border border-stone-100 rounded-2xl shadow-sm transition-all duration-200 group"
            >
              <span className={`${cormorant.className} text-2xl font-black text-stone-300 w-8 text-center group-hover:text-[#c9a84c] transition-colors`}>
                {String(i + 4).padStart(2, "0")}
              </span>
              
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden flex-shrink-0 bg-stone-50 relative border border-stone-100">
                <img src={product.image || product.images?.[0]} className="w-full h-full object-cover" alt={product.name} />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-base md:text-lg font-bold text-stone-900 truncate group-hover:text-[#c9a84c] transition-colors">{product.name}</h4>
                <p className="text-stone-400 text-xs uppercase tracking-widest mt-1">{product.category}</p>
              </div>

              <div className="text-right">
                <p className="text-base md:text-xl font-black text-[#c9a84c]">NRs {product.price}</p>
                <Link href={`/products/${product.slug}`} className="inline-flex items-center gap-1 text-[0.65rem] uppercase font-bold text-stone-400 hover:text-stone-900 transition-colors mt-1.5">
                  Quick View <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Footer */}
      <footer className="bg-white border-t border-stone-100 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="p-4 rounded-2xl bg-stone-50/55 border border-stone-100/50">
            <p className="text-[#c9a84c] text-4xl mb-2 font-black">100%</p>
            <p className="text-stone-500 text-[0.65rem] font-bold uppercase tracking-wider">Genuine Brands</p>
          </div>
          <div className="p-4 rounded-2xl bg-stone-50/55 border border-stone-100/50">
            <p className="text-[#c9a84c] text-4xl mb-2 font-black">5k+</p>
            <p className="text-stone-500 text-[0.65rem] font-bold uppercase tracking-wider">Happy Eyes in Janakpur</p>
          </div>
          <div className="p-4 rounded-2xl bg-stone-50/55 border border-stone-100/50">
            <p className="text-[#c9a84c] text-4xl mb-2 font-black">24h</p>
            <p className="text-stone-500 text-[0.65rem] font-bold uppercase tracking-wider">Expert Support</p>
          </div>
        </div>
      </footer>
    </main>
  );
}