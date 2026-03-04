
import { Cormorant_Garamond, Syne } from 'next/font/google';

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


function StarRating({ rating = 4.7, count }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <svg key={s} className="w-2.5 h-2.5" viewBox="0 0 12 12">
            <path
              d="M6 0l1.5 4h4l-3.3 2.4 1.3 4L6 8 2.5 10.4l1.3-4L.5 4h4z"
              fill={s <= Math.round(rating) ? "#c9a84c" : "#d1d5db"}
            />
          </svg>
        ))}
      </div>
      <span className="text-[0.65rem] font-medium text-stone-500 whitespace-nowrap">
        {rating} <span className="text-stone-300 mx-0.5">|</span> {count?.toLocaleString()}
      </span>
    </div>
  );
}

export default function RankedRow({ product, rank }) {
  return (
    <div className="group flex items-center gap-3 lg:gap-6 py-4 border-b border-stone-100 hover:bg-stone-50 transition-all px-2 lg:px-4 cursor-pointer">
      <span className={`${cormorant.className} text-2xl lg:text-3xl font-bold text-stone-200 group-hover:text-[#c9a84c] w-8 lg:w-10 transition-colors`}>
        {rank.toString().padStart(2, '0')}
      </span>

      <div className="w-14 h-16 lg:w-16 lg:h-20 bg-stone-100 overflow-hidden flex-shrink-0">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply" />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className={`${cormorant.className} text-base lg:text-lg font-bold text-stone-800 truncate`}>{product.name}</h4>
        <StarRating rating={product.rating} count={product.reviews} />
      </div>

      <div className="text-right flex-shrink-0 pl-2">
        <p className="text-sm lg:text-base font-bold text-stone-900">NRs {product.price}</p>
        <Link
          href={`/product/${product._id}`}
          className="text-[0.55rem] font-bold uppercase tracking-widest text-[#c9a84c] hover:underline hidden lg:block"
        >
          View →
        </Link>
      </div>
    </div>
  );
}
