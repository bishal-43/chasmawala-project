"use client";
import { createContext, useContext, useState } from "react";

// Create Context
const QuickViewContext = createContext();

// Provider Component
export const QuickViewProvider = ({ children }) => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const openQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  return (
    <QuickViewContext.Provider value={{ quickViewProduct, openQuickView, closeQuickView }}>
      {children}
    </QuickViewContext.Provider>
  );
};

// Custom Hook
export const useQuickView = () => useContext(QuickViewContext);

export default QuickViewContext;
