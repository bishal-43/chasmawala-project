// app/page.js

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext";
import  PromoBanner  from "@/components/PromoBanner";
import ImageSlider from "@/components/ImageSlider";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ContactSection from "@/components/ContactSection";
import ClarityCraftSection from "@/components/ClarityCraftSection";
import OfferBanner from "@/components/OfferBanner";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      if (user.role === "admin") {
        router.replace("/admin");
      } else if (user.role === "superadmin") {
        router.replace("/superadmin");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);


  // Prevent flicker while auth is loading
  if (loading) return null;

  return (
    <div className="relative ">
      {/* <section className="relative z-10"> */}
        {/* <PromoBanner /> */}
      {/* </section> */}

      <section className="relative z-10 mt-8 px-4 md:px-10">
        <OfferBanner />
      </section>

      {/* <section className="relative z-10">
        <ImageSlider />
      </section> */}

      <section className="relative z-10">
        <Hero />
      </section>

      

      <section className="relative z-10">
        <ClarityCraftSection />
      </section>
      
      {/* ✅ Features Section */}
      <section className="relative z-10">
        <Features />
      </section>

      {/* ✅ Contact Section */}
      <section className="relative z-10">
        <ContactSection />
      </section>
    </div>
  );
}
