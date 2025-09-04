"use client";

import dynamic from "next/dynamic";

// Dynamically import StoreLocator with SSR disabled
const StoreLocator = dynamic(() => import("./StoreLocator"), {
  ssr: false, // ✅ No server-side rendering
});

export default function StoreDisplayWrapper({ store }) {
  return <StoreLocator store={store} />;
}
