// src/components/FilterSidebar.js
/*

"use client";
import { useState, useEffect } from "react";
import { X, RotateCcw } from "lucide-react";

// You can later fetch these dynamically from DB if needed
const filterOptions = {
  categories: ["Sunglasses", "Eyeglasses", "Computer Glasses", "Contact Lenses"],
  brands: ["Ray-Ban", "Oakley", "Vincent Chase", "John Jacobs", "Carrera"],
  frameShapes: ["Rectangle", "Round", "Wayfarer", "Aviator", "Cat Eye"],
};

export default function FilterSidebar({
  isOpen,
  onClose,
  initialFilters,
  onApplyFilters,
}) {
  const [filters, setFilters] = useState(
    initialFilters || {
      categories: [],
      brands: [],
      frameShapes: [],
      price: 5000,
    }
  );

  // Reset filters when reopening
  useEffect(() => {
    if (isOpen) {
      setFilters(initialFilters);
    }
  }, [isOpen, initialFilters]);

  const handleCheckboxChange = (group, value) => {
    setFilters((prev) => {
      const newValues = prev[group].includes(value)
        ? prev[group].filter((item) => item !== value)
        : [...prev[group], value];
      return { ...prev, [group]: newValues };
    });
  };

  const handlePriceChange = (e) => {
    setFilters((prev) => ({ ...prev, price: parseInt(e.target.value, 10) }));
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      categories: [],
      brands: [],
      frameShapes: [],
      price: 5000,
    };
    setFilters(clearedFilters);
    onApplyFilters(clearedFilters); // Tell parent to reset products
    onClose();
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters); // ✅ Pass filters up to ProductsPage
    onClose();
  };


  return (
    <>
      // { Overlay }
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      // { Sidebar Drawer }
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        //{ Header }
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800"
          >
            <X size={22} />
          </button>
        </div>

        //{ Filter Sections }
        <div className="flex-grow overflow-y-auto p-4 space-y-6">
          <FilterSection title="Category">
            {filterOptions.categories.map((cat) => (
              <Checkbox
                key={cat}
                label={cat}
                checked={filters.categories.includes(cat)}
                onChange={() => handleCheckboxChange("categories", cat)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Brand">
            {filterOptions.brands.map((brand) => (
              <Checkbox
                key={brand}
                label={brand}
                checked={filters.brands.includes(brand)}
                onChange={() => handleCheckboxChange("brands", brand)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Frame Shape">
            {filterOptions.frameShapes.map((shape) => (
              <Checkbox
                key={shape}
                label={shape}
                checked={filters.frameShapes.includes(shape)}
                onChange={() => handleCheckboxChange("frameShapes", shape)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Price Range">
            <input
              type="range"
              min="500"
              max="10000"
              step="100"
              value={filters.price}
              onChange={handlePriceChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="text-center text-sm text-gray-700 mt-2 font-medium">
              Up to ₹{filters.price.toLocaleString("en-IN")}
            </div>
          </FilterSection>
        </div>

        //{ Footer Buttons }
        <div className="p-4 border-t bg-gray-50 grid grid-cols-2 gap-3">
          <button
            onClick={handleClearFilters}
            className="flex items-center justify-center px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-300 transition-colors"
          >
            <RotateCcw size={16} className="mr-2" />
            Clear All
          </button>
          <button
            onClick={handleApplyFilters}
            className="px-4 py-2.5 bg-emerald-600 text-white rounded-lg font-semibold text-sm hover:bg-emerald-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}

// --- Sub-components ---
/*
const FilterSection = ({ title, children }) => (
  <div>
    <h3 className="text-base font-semibold text-gray-800 mb-3 border-b pb-2">
      {title}
    </h3>
    <div className="space-y-2">{children}</div>
  </div>
);

const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-center space-x-3 cursor-pointer text-sm text-gray-600 hover:text-gray-900">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
    />
    <span>{label}</span>
  </label>
);
*/