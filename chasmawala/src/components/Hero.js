"use client";
import { useEffect, useRef } from "react";
import Button  from "@/components/ui/Button"; // Ensure this component exists
import { ArrowRight, Glasses } from "lucide-react";

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-reveal");
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <section
      id="home"
      className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-blue-50 to-white"
    >
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block mb-4 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium animate-fade-in">
            Premium Eyewear Collection
          </div>

          <h1 className="heading-xl mb-6 animate-fade-in" ref={heroRef}>
            See the World in Style
            <br /> with Perfect Vision
          </h1>

          <p className="subheading mb-8 max-w-2xl mx-auto animate-fade-in animate-reveal-delay-1">
            Discover our curated collection of designer frames and premium
            lenses. Expert care for your eyes, style for your life.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in animate-reveal-delay-2">
            <Button size="lg" className="button-hover w-full sm:w-auto">
              Shop Collection
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="button-hover w-full sm:w-auto"
            >
              Book Eye Test
              <Glasses className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-16 md:mt-24 relative mx-auto max-w-5xl animate-fade-in animate-reveal-delay-3">
          <div className="aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
              alt="Premium Eyewear Collection"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-primary/20 animate-float"></div>
          <div
            className="absolute top-1/2 -right-8 w-16 h-16 rounded-full bg-primary/10 animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute -bottom-8 left-1/4 w-20 h-20 rounded-full bg-primary/5 animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
