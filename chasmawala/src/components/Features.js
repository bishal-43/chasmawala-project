"use client";
import { Eye, Glasses, UserCheck, Sparkles, Scaling, ShieldCheck } from "lucide-react";

// New feature data from an eye clinic perspective
const features = [
  {
    title: "Comprehensive Eye Exams",
    description: "Utilizing state-of-the-art diagnostic tools to assess your vision and eye health with precision.",
    icon: Eye,
  },
  {
    title: "Latest Eyewear Trends",
    description: "A curated collection of the latest frames from classic styles to modern designs to perfectly match your look.",
    icon: Glasses,
  },
  {
    title: "Expert Optometrists",
    description: "Our certified and experienced team is dedicated to providing personalized care and expert advice.",
    icon: UserCheck,
  },
  {
    title: "Advanced Lens Technology",
    description: "From blue-light filtering to progressive lenses, we offer cutting-edge solutions for optimal comfort and clarity.",
    icon: Sparkles,
  },
  {
    title: "Personalized Fitting Service",
    description: "We ensure your new glasses fit perfectly for maximum comfort and effectiveness, tailored to your facial features.",
    icon: Scaling,
  },
  {
    title: "After-Sales Care & Warranty",
    description: "Enjoy peace of mind with our comprehensive warranty and dedicated support for adjustments and repairs.",
    icon: ShieldCheck,
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 font-sans">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-800 mb-4">
            Experience Visionary Care
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're committed to providing not just eyewear, but a complete vision care experience. See how we focus on your health, style, and comfort.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100"
            >
              {/* Themed icon color changed to blue for a healthcare feel */}
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-5">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}