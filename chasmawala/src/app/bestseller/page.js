import ProductCard from "@components/home/ProductCard";
import { Cormorant_Garamond, Syne } from 'next/font/google';
import Link from "next/link";
import Image from "next/image";

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

  return (
    <main className={`${syne.variable} ${cormorant.variable} min-h-screen bg-[#0a0a0a] text-white font-sans`}>
      
      {/* Dynamic Dark Header */}
      <header className="relative pt-20 pb-12 px-6 mb-12 overflow-hidden border-b border-white/10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.15)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
             <span className="px-3 py-1 bg-[#c9a84c] text-black text-[0.6rem] font-black uppercase tracking-widest rounded-full">
               Live Rankings
             </span>
             <span className="text-stone-500 text-[0.6rem] uppercase tracking-widest">Updated Hourly</span>
          </div>
          
          <h1 className={`${cormorant.className} text-6xl md:text-8xl font-bold tracking-tighter mb-4`}>
            Best <span className="text-transparent italic [-webkit-text-stroke:1px_#c9a84c]">Sellers</span>
          </h1>
          <p className="max-w-lg text-stone-400 text-sm md:text-base leading-relaxed font-['Syne']">
            The hall of fame. These are the most-wanted frames in Janakpur, verified by thousands of Chasmawala customers.
          </p>
        </div>
      </header>

      {/* The Podium (Top 3 Items) */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topThree.map((product, i) => (
            <div 
              key={product._id} 
              className={`relative group bg-[#141414] border ${i === 0 ? 'border-[#c9a84c]' : 'border-white/10'} rounded-2xl overflow-hidden p-4 transition-all hover:-translate-y-2`}
            >
              <div className="absolute top-4 right-4 z-30">
                <span className={`${cormorant.className} text-5xl font-bold italic opacity-20 group-hover:opacity-100 transition-opacity text-[#c9a84c]`}>
                  0{i + 1}
                </span>
              </div>
              
              <div className="relative aspect-[4/5] mb-6 rounded-xl overflow-hidden bg-stone-900">
                <Image 
                  src={product.image || product.images?.[0]} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt={product.name}
                  fill
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold truncate">{product.name}</h3>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[#c9a84c] text-xs font-bold uppercase tracking-widest">{product.category}</p>
                    <p className="text-2xl font-black mt-1">NRs {product.price}</p>
                  </div>
                  <Link 
                    href={`/products/${product.slug}`}
                    className="bg-white text-black px-6 py-2 rounded-full text-xs font-bold hover:bg-[#c9a84c] transition-colors"
                  >
                    View Style
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Remaining List (Leaderboard Style) */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-stone-500">The Leaderboard</h2>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <div className="space-y-4">
          {theRest.map((product, i) => (
            <div 
              key={product._id} 
              className="flex items-center gap-4 md:gap-8 p-4 bg-white/5 hover:bg-white/[0.08] border border-white/5 rounded-xl transition-all group"
            >
              <span className={`${cormorant.className} text-2xl font-bold text-stone-600 w-8 text-center`}>
                {i + 4}
              </span>
              
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0 bg-stone-900">
                <Image src={product.image || product.images?.[0]} className="w-full h-full object-cover" alt="" fill/>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-base md:text-lg font-bold truncate">{product.name}</h4>
                <p className="text-stone-500 text-xs uppercase tracking-widest">{product.category}</p>
              </div>

              <div className="text-right">
                <p className="text-base md:text-xl font-black text-[#c9a84c]">NRs {product.price}</p>
                <Link href={`/product/${product.slug}`} className="text-[0.6rem] uppercase font-bold text-white/40 hover:text-white transition-colors">
                  Quick View →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Footer */}
      <footer className="bg-white/5 border-t border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <p className="text-[#c9a84c] text-3xl mb-2 font-bold">100%</p>
            <p className="text-stone-400 text-xs uppercase tracking-widest">Genuine Brands</p>
          </div>
          <div>
            <p className="text-[#c9a84c] text-3xl mb-2 font-bold">5k+</p>
            <p className="text-stone-400 text-xs uppercase tracking-widest">Happy Eyes in Janakpur</p>
          </div>
          <div>
            <p className="text-[#c9a84c] text-3xl mb-2 font-bold">24h</p>
            <p className="text-stone-400 text-xs uppercase tracking-widest">Expert Support</p>
          </div>
        </div>
      </footer>
    </main>
  );
}