"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function OfferBanner() {
  // Countdown timer (set offer end date here)
  const offerEnd = new Date("2025-11-10T23:59:59").getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = offerEnd - now;

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[480px] flex items-center justify-center bg-gradient-to-r from-emerald-500 to-green-700 text-white overflow-hidden rounded-2xl shadow-xl mt-8">
      {/* Background image overlay */}
      <Image
        src="/banner-bg.jpg"
        alt="Chasmawala Offer Banner"
        fill
        className="object-cover opacity-30"
        priority
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 md:px-12">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-md"
        >
          🎉 Mega Festive Offer — Flat 50% Off!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg md:text-xl mb-6 font-medium"
        >
          Shop premium eyeglasses, sunglasses, and lenses before the deal ends!
        </motion.p>

        {/* Countdown Timer */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          {["days", "hours", "minutes", "seconds"].map((key) => (
            <div
              key={key}
              className="bg-white/20 backdrop-blur-md rounded-lg px-4 py-2 flex flex-col items-center min-w-[70px]"
            >
              <span className="text-2xl md:text-3xl font-bold">{timeLeft[key]}</span>
              <span className="text-xs uppercase tracking-wide">{key}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.7 }}
        >
          <Button
            onClick={() => (window.location.href = "/collection/sunglasses")}
            className="bg-white text-emerald-700 font-semibold px-6 py-3 text-lg hover:bg-gray-100 transition-all rounded-full shadow-lg"
          >
            Shop Now
          </Button>
        </motion.div>
      </div>

      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-emerald-700/80 to-transparent"></div>
    </section>
  );
}
