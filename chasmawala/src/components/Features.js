"use client";
import { CircleUser, Shield, Zap, Layers, LineChart, RefreshCw } from "lucide-react";

const features = [
  { title: "User-Centered", description: "Designed with intuitive experiences.", icon: CircleUser },
  { title: "Enhanced Security", description: "Built with robust security practices.", icon: Shield },
  { title: "Lightning Fast", description: "Optimized for speed and performance.", icon: Zap },
  { title: "Modular Design", description: "Flexible and customizable components.", icon: Layers },
  { title: "Insightful Analytics", description: "Comprehensive data insights.", icon: LineChart },
  { title: "Continuous Updates", description: "Regular feature enhancements.", icon: RefreshCw },
];

export default function Features() {
  return (
    <section className="py-24 bg-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
        <p className="text-lg text-gray-600 mb-10">
          Experience innovation, security, and performance in one platform.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
              <feature.icon className="text-primary h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
