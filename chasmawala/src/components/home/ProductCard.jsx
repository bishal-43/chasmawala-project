// components/home/ProductCard.jsx

"use client";
import Link  from "next/link";
import Image from "next/image";



export default function ProductCard({product, badge}){
    return(
        <Link
        href={`/products/${product.slug}`}
        className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden"
        >
            <div className="relative aspect-square bg-gray-100">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition"
                    />

                    {badge && (
                        <span className="absolute top-3 left-3 top-xs px-2 py-1 rounded-full bg-orange-500 text-white">
                            {badge}

                        </span>
                    )}
                    

            </div>

            <div className="p-4 ">
                    <h3 className="font-medium text-gray-900 line-clamp-1">{product.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">₹{product.price}</p>
            </div>
        </Link>
    )
}