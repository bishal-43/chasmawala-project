// // src/app/collections/[slug]/page.js

// "use client";
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import ProductCard from "@/components/ProductCard";

// export default function SlugCollectionPage() {
//   const { slug } = useParams();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const pageTitle = slug ? slug.replace(/-/g, ' ') : "Collection";

//   useEffect(() => {
//     if (!slug) return;
    
//     const fetchProductsBySlug = async () => {
//       setLoading(true);
//       try {
//         // ✅ Single, efficient API call using the new 'slug' parameter
//         const res = await fetch(`/api/products?${encodeURIComponent(slug)}`);
//         const data = await res.json();
//         setProducts(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error(err);
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductsBySlug();
//   }, [slug]);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4 capitalize">{pageTitle}</h1>
//       {products.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {products.map((p) => <ProductCard key={p._id || p.id} product={p} />)}
//         </div>
//       ) : (
//         <div>No products found in this collection.</div>
//       )}
//     </div>
//   );
// }



// src/app/collections/[slug]/page.js

// NO "use client"; directive needed

export const dynamic = "force-dynamic";

import ProductCard from "@/components/ProductCard";
import { ProductGridSkeleton } from "@/components/Skeletons"; // Reuse or create a skeleton

// The function to fetch data can be defined here or imported
async function getProductsBySlug(slug) {
  try {
    // Use the full URL for server-side fetching, ideally from an environment variable
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?category=${encodeURIComponent(slug)}`, {
      cache: "no-store"
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.products || [];
  } catch (err) {
    console.error(err);
    return [];
  }
}

// The component is now async and receives params from Next.js
export default async function SlugCollectionPage({ params }) {
  const { slug } = await params;
  const products = await getProductsBySlug(slug); // Data is fetched here on the server
  const pageTitle = slug ? slug.replace(/-/g, ' ') : "Collections";

  // No more useState, useEffect, or loading states needed for the initial load

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 capitalize">{pageTitle}</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => <ProductCard key={p._id || p.id} product={p} />)}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-600">No products found in this collection.</p>
        </div>
      )}
    </div>
  );
}