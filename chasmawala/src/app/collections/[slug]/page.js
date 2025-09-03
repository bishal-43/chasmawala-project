"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";

export default function SlugCollectionPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageTitle = slug ? slug.replace(/-/g, ' ') : "Collection";

  useEffect(() => {
    if (!slug) return;
    
    const fetchProductsBySlug = async () => {
      setLoading(true);
      try {
        // ✅ Single, efficient API call using the new 'slug' parameter
        const res = await fetch(`/api/products?${encodeURIComponent(slug)}`);
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsBySlug();
  }, [slug]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 capitalize">{pageTitle}</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => <ProductCard key={p._id || p.id} product={p} />)}
        </div>
      ) : (
        <div>No products found in this collection.</div>
      )}
    </div>
  );
}