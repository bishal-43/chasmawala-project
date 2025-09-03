// src/contexts/QuickViewContext.js

"use client";
import { createContext, useContext, useState } from "react";

const QuickViewContext = createContext();

export function QuickViewProvider({ children }) {
  // ✅ FIX: Rename state from 'quickViewProduct' to just 'product' for clarity
  const [product, setProduct] = useState(null);

  // ✅ FIX: Derive isOpen directly from the product state
  const isOpen = Boolean(product); 

  const openQuickView = (productData) => {
    setProduct(productData);
  };

  const closeQuickView = () => {
    setProduct(null);
  };

  // ✅ FIX: Provide an object with the names that your modal expects: isOpen and product
  const value = { isOpen, product, openQuickView, closeQuickView };

  return (
    <QuickViewContext.Provider value={value}>
      {children}
    </QuickViewContext.Provider>
  );
};

export function useQuickView() {
  const context = useContext(QuickViewContext);
  if (context === undefined) {
    throw new Error('useQuickView must be used within a QuickViewProvider');
  }
  return context;
}