"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Glasses, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

// --- Data remains the same ---
const heroSlidesData = [
  {
    id: "sunglasses",
    img: "/images/categories/sunglasses1.jpg",
    alt: "Stylish sunglasses on a beach background",
    pretitle: "Summer Collection 2025",
    title: "Embrace the Sun",
    subtitle: "Discover our latest collection of premium sunglasses, designed to offer ultimate protection and unmatched style.",
    cta_primary_text: "Shop Sunglasses",
    cta_primary_link: "/collections/sunglasses",
  },
  {
    id: "eyeglasses",
    img: "/images/categories/eyeglasses2.jpg",
    alt: "A person wearing modern eyeglasses in a city",
    pretitle: "Precision & Style",
    title: "Frame Your Vision",
    subtitle: "Explore handcrafted eyeglasses that blend timeless design with modern technology for crystal-clear vision.",
    cta_primary_text: "Explore Eyeglasses",
    cta_primary_link: "/collections/eyeglasses",
  },
  {
    id: "contacts",
    img: "/images/categories/contactlens3.jpg",
    alt: "Close-up of a contact lens case",
    pretitle: "Total Comfort",
    title: "Invisible Freedom",
    subtitle: "Experience all-day comfort with our advanced contact lenses. Perfect for any lifestyle and prescription.",
    cta_primary_text: "View Contact Lenses",
    cta_primary_link: "/collections/contacts",
  },
];

export default function ImageSlider() {
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Keep progress perfectly synced
  useEffect(() => {
    if (!swiper) return;

    const handleProgress = (_, timeLeft, totalTime) => {
      setProgress(((totalTime - timeLeft) / totalTime) * 100);
    };

    swiper.on("autoplayTimeLeft", handleProgress);
    return () => {
      swiper.off("autoplayTimeLeft", handleProgress);
    };
  }, [swiper]);

  const activeSlide = heroSlidesData[activeIndex];

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden text-white">
      {/* --- Background Swiper --- */}
      <Swiper
        modules={[Autoplay, EffectFade, Navigation]}
        onSwiper={setSwiper}
        onSlideChange={(s) => setActiveIndex(s.realIndex)}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        className="absolute inset-0 h-full w-full z-0"
      >
        {heroSlidesData.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <Image
                src={slide.img}
                alt={slide.alt}
                fill
                className="object-cover object-center"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* --- Gradient Overlay --- */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>

      {/* --- Content Area --- */}
      <div className="relative z-20 flex flex-col justify-end h-full p-6 sm:p-12 md:p-16 lg:p-24">
        <div className="max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-wider">
                {activeSlide.pretitle}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold my-4 leading-tight">
                {activeSlide.title}
              </h1>
              <p className="text-base md:text-lg text-gray-200 mb-8 max-w-lg">
                {activeSlide.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-start gap-4 mt-8">
            <Link href={activeSlide.cta_primary_link} passHref>
              <button className="w-full sm:w-auto flex items-center justify-center px-7 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-transform duration-300 transform hover:scale-105">
                {activeSlide.cta_primary_text}
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
            <Link href="/eye-test" passHref>
              <button className="w-full sm:w-auto flex items-center justify-center px-7 py-3 bg-transparent text-white font-semibold rounded-lg border-2 border-white/80 hover:bg-white/10 transition-all duration-300">
                Book an Eye Test
                <Glasses className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>

        {/* --- Navigation & Progress --- */}
        <div className="absolute bottom-8 right-6 md:right-16 lg:right-24 bg-black/30 backdrop-blur-md p-2 rounded-xl flex items-center gap-4">
          <button className="swiper-button-prev-custom p-2 rounded-lg hover:bg-white/20 transition-colors">
            <ChevronLeft size={24} />
          </button>

          <div className="flex items-center gap-3">
            <span className="font-semibold text-sm w-6 text-center">0{activeIndex + 1}</span>
            <div className="w-24 sm:w-32 h-0.5 bg-white/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
            <span className="text-sm text-white/50 w-6 text-center">0{heroSlidesData.length}</span>
          </div>

          <button className="swiper-button-next-custom p-2 rounded-lg hover:bg-white/20 transition-colors">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
