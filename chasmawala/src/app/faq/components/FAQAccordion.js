// src/app/faq/components/FAQAccordion.js
"use client";
import { useState } from "react";

const ChevronDownIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

export default function FAQAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) => {
    // If the clicked item is already open, close it. Otherwise, open it.
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
      {items.map((item, index) => (
        <div key={index} className="bg-white">
          <button
            onClick={() => handleClick(index)}
            className="flex w-full items-center justify-between text-left p-4 sm:p-5 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
          >
            <span className="text-base font-medium text-gray-900">
              {item.question}
            </span>
            <ChevronDownIcon
              className={`h-6 w-6 text-gray-500 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-screen" : "max-h-0"}`}
          >
            <div className="px-4 pb-5 sm:px-5 text-gray-600 leading-relaxed">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}