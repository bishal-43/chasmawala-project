// // src/components/Features.js

// "use client";
// import { Eye, Glasses, UserCheck, Sparkles, Scaling, ShieldCheck } from "lucide-react";

// // New feature data from an eye clinic perspective
// const features = [
//   {
//     title: "Comprehensive Eye Exams",
//     description: "Utilizing state-of-the-art diagnostic tools to assess your vision and eye health with precision.",
//     icon: Eye,
//   },
//   {
//     title: "Latest Eyewear Trends",
//     description: "A curated collection of the latest frames from classic styles to modern designs to perfectly match your look.",
//     icon: Glasses,
//   },
//   {
//     title: "Expert Optometrists",
//     description: "Our certified and experienced team is dedicated to providing personalized care and expert advice.",
//     icon: UserCheck,
//   },
//   {
//     title: "Advanced Lens Technology",
//     description: "From blue-light filtering to progressive lenses, we offer cutting-edge solutions for optimal comfort and clarity.",
//     icon: Sparkles,
//   },
//   {
//     title: "Personalized Fitting Service",
//     description: "We ensure your new glasses fit perfectly for maximum comfort and effectiveness, tailored to your facial features.",
//     icon: Scaling,
//   },
//   {
//     title: "After-Sales Care & Warranty",
//     description: "Enjoy peace of mind with our comprehensive warranty and dedicated support for adjustments and repairs.",
//     icon: ShieldCheck,
//   },
// ];

// export default function Features() {
//   return (
//     <section className="py-24 bg-gradient-to-b from-white to-gray-50 font-sans">
//       <div className="container mx-auto px-4">
//         {/* Section Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-800 mb-4">
//             Experience Visionary Care
//           </h2>
//           <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//             We're committed to providing not just eyewear, but a complete vision care experience. See how we focus on your health, style, and comfort.
//           </p>
//         </div>

//         {/* Features Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="bg-white p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100"
//             >
//               {/* Themed icon color changed to blue for a healthcare feel */}
//               <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-5">
//                 <feature.icon className="h-8 w-8" />
//               </div>
//               <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
//               <p className="text-gray-600">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }










import { Eye, Glasses, UserCheck, Sparkles, Scaling, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Comprehensive Eye Exams",
    description: "State-of-the-art diagnostic tools to assess your vision and eye health with precision.",
    icon: Eye,
    color: "teal",
  },
  {
    title: "Latest Eyewear Trends",
    description: "Curated collection from classic styles to modern designs to perfectly match your look.",
    icon: Glasses,
    color: "amber",
  },
  {
    title: "Expert Optometrists",
    description: "Certified and experienced team dedicated to personalized care and expert advice.",
    icon: UserCheck,
    color: "blue",
  },
  {
    title: "Advanced Lens Technology",
    description: "Blue-light filtering to progressive lenses—cutting-edge solutions for optimal comfort.",
    icon: Sparkles,
    color: "purple",
  },
  {
    title: "Personalized Fitting",
    description: "Perfect fit for maximum comfort and effectiveness, tailored to your facial features.",
    icon: Scaling,
    color: "emerald",
  },
  {
    title: "After-Sales Care",
    description: "Comprehensive warranty and dedicated support for adjustments and repairs.",
    icon: ShieldCheck,
    color: "rose",
  },
];

const colorMap = {
  teal: "from-teal-500 to-teal-600",
  amber: "from-amber-500 to-orange-600",
  blue: "from-blue-500 to-cyan-600",
  purple: "from-purple-500 to-pink-600",
  emerald: "from-emerald-500 to-teal-600",
  rose: "from-rose-500 to-pink-600",
};

export default function Features() {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-teal-600 font-bold text-sm tracking-widest uppercase mb-4"
          >
            Why Choose Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black text-slate-900 mb-6"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Visionary Care
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600"
          >
            Complete vision care experience focused on your health, style, and comfort.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group relative bg-white p-8 rounded-3xl border border-slate-200 hover:border-transparent hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Gradient on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${colorMap[feature.color]} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity`} />
              
              {/* Icon */}
              <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${colorMap[feature.color]} flex items-center justify-center mb-6 shadow-lg`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
