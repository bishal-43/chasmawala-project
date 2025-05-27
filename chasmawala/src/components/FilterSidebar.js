"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function FilterSidebar({ filters, setFilters }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Button to Open Filter Drawer */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-20 left-5 z-50 bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700"
      >
        Filter
      </button>

      {/* Filter Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-50`}
      >
        {/* Close Button */}
        <div className="p-4 flex justify-between border-b">
          <h2 className="text-lg font-bold">Filters</h2>
          <button onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-4">
          {/* Category Filter */}
          <div className="mb-4">
            <h3 className="text-md font-semibold">Category</h3>
            {["Sunglasses", "Eyeglasses", "Contact Lenses"].map((category) => (
              <label key={category} className="flex items-center space-x-2 mt-2">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() =>
                    setFilters((prev) => ({
                      ...prev,
                      categories: prev.categories.includes(category)
                        ? prev.categories.filter((c) => c !== category)
                        : [...prev.categories, category],
                    }))
                  }
                />
                <span>{category}</span>
              </label>
            ))}
          </div>

          {/* Price Filter */}
          <div className="mb-4">
            <h3 className="text-md font-semibold">Price Range</h3>
            <input
              type="range"
              min="1000"
              max="5000"
              value={filters.price}
              onChange={(e) => setFilters((prev) => ({ ...prev, price: e.target.value }))}
              className="w-full"
            />
            <span>Up to ₹{filters.price}</span>
          </div>

          {/* Apply Filters Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Overlay when filter is open */}
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={() => setIsOpen(false)}></div>}
    </>
  );
}
