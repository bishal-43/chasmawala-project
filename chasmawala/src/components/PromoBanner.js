import { X, Tag, ArrowRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  return (
    <aside 
      className={`bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden transition-all duration-300 ${
        isClosing ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Sparkles className="h-5 w-5 shrink-0 animate-pulse" />
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <p className="text-sm md:text-base whitespace-nowrap">
                <span className="font-bold">🎉 Grand Opening!</span> 
                <span className="ml-2 bg-white/20 px-2 py-0.5 rounded text-xs font-semibold">30% OFF</span>
              </p>
              
              <div className="hidden md:flex items-center gap-2 text-xs">
                <span className="opacity-90">Ends in:</span>
                <div className="flex gap-1">
                  <span className="bg-white/20 px-2 py-1 rounded font-mono font-semibold">
                    {String(timeLeft.hours).padStart(2, '0')}h
                  </span>
                  <span className="bg-white/20 px-2 py-1 rounded font-mono font-semibold">
                    {String(timeLeft.minutes).padStart(2, '0')}m
                  </span>
                  <span className="bg-white/20 px-2 py-1 rounded font-mono font-semibold">
                    {String(timeLeft.seconds).padStart(2, '0')}s
                  </span>
                </div>
              </div>

              <span className="hidden lg:inline text-sm opacity-90">
                + Free eye testing | Code: <span className="font-bold bg-white/20 px-2 py-0.5 rounded">WELCOME30</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="/collections"
              className="hidden sm:flex items-center gap-1 bg-white text-purple-600 hover:bg-gray-100 px-4 py-1.5 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95"
            >
              Shop Now
              <ArrowRight className="h-4 w-4" />
            </a>
            
            <button
              onClick={handleClose}
              className="hover:bg-white/20 rounded-full p-1.5 transition-colors"
              aria-label="Close banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Animated background shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-[shimmer_3s_infinite]" 
           style={{ transform: 'translateX(-100%)', animation: 'shimmer 3s infinite' }} />
      
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
      `}</style>
    </aside>
  );
}