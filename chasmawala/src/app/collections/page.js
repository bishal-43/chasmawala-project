// src/app/collections/page.js

// NO "use client"; at the top level anymore.
import { Suspense } from "react";
import CollectionsContent from "@/components/CollectionsContent"; // We will move the client logic into its own file.
import { FilterSkeleton, ProductGridSkeleton } from "@/components/Skeletons"; // Assuming skeletons are in a separate file.

// This function fetches the initial data on the server.
async function getInitialData(resolvedSearchParams) {
  const queryString = new URLSearchParams(resolvedSearchParams).toString();

  // Fetch filter options and the first set of products in parallel.
  const filterOptionsPromise = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/filters`, { cache: 'no-store' });
  const initialProductsPromise = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?${queryString}`, { cache: 'no-store' });

  // Wait for both to finish.
  const [filterOptionsRes, initialProductsRes] = await Promise.all([
    filterOptionsPromise,
    initialProductsPromise,
  ]);

  // Handle potential errors if fetches fail.
  if (!filterOptionsRes.ok || !initialProductsRes.ok) {
    throw new Error("Failed to fetch initial collection data");
  }

  const filterOptions = await filterOptionsRes.json();
  const initialProductsData = await initialProductsRes.json();

  return { filterOptions, initialProducts: initialProductsData.products || [] };
}

// The page is now an async Server Component.
export default async function CollectionPage({ searchParams }) {
  // Fetch the data on the server before rendering.
  const resolvedSearchParams = await searchParams;
  const { filterOptions, initialProducts } = await getInitialData(resolvedSearchParams);

  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      {/* Pass server-fetched data as props to the client component. */}
      <CollectionsContent
        initialFilterOptions={filterOptions}
        initialProducts={initialProducts}
      />
    </Suspense>
  );
}