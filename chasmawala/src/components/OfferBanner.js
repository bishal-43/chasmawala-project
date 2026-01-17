"use client";

import { useEffect, useState, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles, Tag, TrendingUp } from "lucide-react";

// Animation Variants (optimized for performance)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } // Custom easing
  }
};

const floatVariants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Memoized Countdown Timer Component
const CountdownTimer = memo(({ timeLeft }) => {
  if (!timeLeft) return null;

  return (
    <motion.div
      variants={itemVariants}
      className="grid grid-cols-4 gap-2 sm:gap-3 md:flex md:gap-4 mb-6 md:mb-8"
      aria-label="Time remaining"
    >
      {Object.entries(timeLeft).map(([unit, value]) => (
        <motion.div
          key={unit}
          className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 flex flex-col items-center min-w-[70px] sm:min-w-[80px] md:min-w-[100px] shadow-2xl"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl sm:rounded-2xl" />
          
          <AnimatePresence mode="popLayout">
            <motion.span
              key={value}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              className="relative text-2xl sm:text-3xl md:text-4xl font-bold font-mono tracking-tight"
            >
              {value.toString().padStart(2, '0')}
            </motion.span>
          </AnimatePresence>
          
          <span className="text-[10px] sm:text-xs uppercase font-semibold tracking-wider opacity-80 mt-1">
            {unit}
          </span>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />
        </motion.div>
      ))}
    </motion.div>
  );
});

CountdownTimer.displayName = 'CountdownTimer';

// Floating Decoration Component
const FloatingIcon = ({ children, delay = 0, className = "" }) => (
  <motion.div
    variants={floatVariants}
    initial="initial"
    animate="animate"
    transition={{ delay }}
    className={cn("absolute opacity-20", className)}
  >
    {children}
  </motion.div>
);

export default function OfferBanner() {
  const [isMounted, setIsMounted] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  // Set offer end date (7 days from now, or fixed date)
  const offerEnd = useMemo(() => {
    // Option 1: Fixed date (make sure it's in the future!)
    return new Date("2026-01-31T23:59:59").getTime();
    
    // Option 2: Dynamic (7 days from now)
    // return Date.now() + (7 * 24 * 60 * 60 * 1000);
  }, []);

  const calculateTimeLeft = useCallback(() => {
    const now = Date.now();
    const diff = offerEnd - now;

    if (diff <= 0) {
      setIsExpired(true);
      return null;
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }, [offerEnd]);

  // Initialize with calculated value to prevent flash
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    setIsMounted(true);
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const updatedTime = calculateTimeLeft();
      setTimeLeft(updatedTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  // Hydration-safe loading state
  if (!isMounted) {
    return (
      <div className="w-full min-h-[400px] md:h-[500px] bg-gradient-to-br from-emerald-600 to-green-700 animate-pulse mt-16 sm:mt-20" />
    );
  }

  return (
    <section
      className="relative w-full min-h-[400px] md:h-[500px] flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 via-teal-500 to-green-700 text-white overflow-hidden mt-16 sm:mt-20"
      aria-labelledby="offer-heading"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/categories/default-product.jpg"
          alt="Premium eyeglasses collection"
          fill
          className="object-cover opacity-15 mix-blend-overlay"
          priority
          sizes="100vw"
          quality={75}
        />
        
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-transparent to-green-900/40" />
      </div>

      {/* Animated Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />

      {/* Floating Decorative Icons */}
      <FloatingIcon delay={0} className="top-10 left-10 hidden lg:block">
        <Sparkles size={60} className="text-yellow-300" />
      </FloatingIcon>
      <FloatingIcon delay={1} className="top-20 right-20 hidden lg:block">
        <Tag size={50} className="text-pink-300" />
      </FloatingIcon>
      <FloatingIcon delay={0.5} className="bottom-20 left-1/4 hidden md:block">
        <TrendingUp size={55} className="text-blue-300" />
      </FloatingIcon>

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center max-w-4xl px-4 sm:px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Premium Badge */}
        {!isExpired && (
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 sm:px-6 py-2 mb-4 sm:mb-6"
          >
            <Sparkles size={16} className="text-yellow-300" />
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wide">
              Limited Time Offer
            </span>
          </motion.div>
        )}

        {/* Main Heading */}
        <motion.h1
          id="offer-heading"
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-3 sm:mb-4 md:mb-6 drop-shadow-2xl tracking-tight leading-tight"
        >
          {isExpired ? (
            <>
              <span className="block text-2xl sm:text-3xl md:text-4xl mb-2 opacity-90">Offer Has Ended</span>
              <span className="bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent">
                But the Style Continues!
              </span>
            </>
          ) : (
            <>
              <span className="block text-2xl sm:text-3xl md:text-4xl mb-2 opacity-90">Mega Festive Sale 🎉</span>
              <span className="bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent">
                Flat 30% Off Everything!
              </span>
            </>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          variants={itemVariants} 
          className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 font-medium opacity-90 max-w-2xl mx-auto leading-relaxed"
        >
          {isExpired
            ? "Discover our latest eyewear collection with premium frames, designer sunglasses, and cutting-edge lenses."
            : "Shop premium eyeglasses, designer sunglasses, and advanced lenses. Elevate your vision and style!"}
        </motion.p>

        {/* Countdown Timer */}
        {!isExpired && timeLeft && <CountdownTimer timeLeft={timeLeft} />}

        {/* Call-to-Action Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <Button
            asChild
            size="lg"
            className={cn(
              "bg-white text-emerald-800 font-bold px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg hover:bg-emerald-50 transition-all rounded-full shadow-2xl hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:scale-105 active:scale-95 group w-full sm:w-auto",
              !isExpired && "animate-pulse"
            )}
          >
            <Link href="/collections" className="flex items-center space-x-2">
              <span>{isExpired ? "Explore Collection" : "Shop Now"}</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </Button>

          {!isExpired && (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white font-semibold px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg hover:bg-white hover:text-emerald-800 transition-all rounded-full shadow-xl hover:scale-105 active:scale-95 w-full sm:w-auto"
            >
              <Link href="/eye-test" className="flex items-center space-x-2">
                <span>Free Eye Test</span>
                <span className="text-xl">👁️</span>
              </Link>
            </Button>
          )}
        </motion.div>

        {/* Trust Indicators */}
        {!isExpired && (
          <motion.div
            variants={itemVariants}
            className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm opacity-80"
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg">✓</span>
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg">✓</span>
              <span>14-Day Returns</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg">✓</span>
              <span>Premium Quality</span>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Bottom Gradient Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-emerald-900/60 via-emerald-800/20 to-transparent pointer-events-none" />
      
      {/* Top Gradient Glow */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-teal-900/40 to-transparent pointer-events-none" />
    </section>
  );
}