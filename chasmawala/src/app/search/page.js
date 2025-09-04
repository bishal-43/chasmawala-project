"use client";

import { Suspense } from "react";
import SearchContent from "./SearchContent";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading search results...</div>}>
      <SearchContent />
    </Suspense>
  );
}
