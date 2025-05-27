"use client";
import ImageSlider from "@/components/ImageSlider";
import CategorySlider from "@/components/CategorySlider";
import Features from "@/components/Features";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <div className="relative">
      {/* ✅ Hero Section (Slider) */}
      <section className="relative flex flex-col items-center justify-center pt-16 space-y-10">
        <ImageSlider />
      </section>

      {/* ✅ Category Sliders (Bigger size) */}
      <section className="mt-10 space-y-16">
        <CategorySlider category="Sunglasses" />
        <CategorySlider category="Eyeglasses" />
        <CategorySlider category="ContactLenses" />
      </section>

      {/* ✅ Features Section */}
      <Features />

      {/* ✅ Contact Section */}
      <ContactSection />
    </div>
  );
}
