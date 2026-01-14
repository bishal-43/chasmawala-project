import { X, Tag } from "lucide-react";
import { useState } from "react";

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <Tag className="h-5 w-5 shrink-0" />
            <p className="text-sm md:text-base">
              <span className="hidden sm:inline">🎉 Grand Opening Sale!</span> Get <span className="font-bold">30% OFF</span> on all eyewear | Free eye testing | Use code: <span className="font-bold">WELCOME30</span>
            </p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="ml-4 hover:bg-white/10 rounded p-1 transition-colors"
            aria-label="Close banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}