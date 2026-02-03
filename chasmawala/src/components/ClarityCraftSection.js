// src/components/ClarityCraftSection.js

// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { ArrowRight } from "lucide-react";

// export default function ClarityCraftSection() {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.15, delayChildren: 0.2 },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
//   };

//   return (
//     <section className="relative bg-white py-16 md:py-24">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
//           {/* --- Left Column: Text Content --- */}
//           <motion.div
//             className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1"
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.4 }} // Trigger animation when 40% in view
//           >
//             <motion.h2
//               className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight"
//               variants={itemVariants}
//             >
//               Clarity Meets Craft
//             </motion.h2>

//             <motion.p
//               className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0"
//               variants={itemVariants}
//             >
//               Experience handcrafted frames and lenses, engineered for a brighter perspective.
//               From timeless designs to advanced optical technology, see the world with unparalleled precision and style.
//             </motion.p>

//             <motion.div variants={itemVariants}>
//               <Link href="/collections">
//                 <button className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-700 transition-transform duration-300 transform hover:scale-105">
//                   Discover Your Pair
//                   <ArrowRight className="ml-2 h-5 w-5" />
//                 </button>
//               </Link>
//             </motion.div>
//           </motion.div>

//           {/* --- Right Column: Image --- */}
//           <motion.div
//             className="w-full lg:w-1/2 relative aspect-[16/9] md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl order-1 lg:order-2"
//             initial={{ opacity: 0, x: 50, scale: 0.95 }}
//             whileInView={{ opacity: 1, x: 0, scale: 1 }}
//             viewport={{ once: true, amount: 0.5 }}
//             transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
//           >
//             {/* The image you provided */}
//             <Image
//               src="/images/hero/heroimage1.png" // You'll need to save your image here!
//               alt="Glasses showcasing a clear mountain view"
//               fill
//               sizes="(max-width: 1024px) 100vw, 50vw" // Responsive image sizing
//               style={{ objectFit: "cover" }}
//               priority
//             />
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }





import Image from "next/image";
import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ClarityCraftSection() {
  const benefits = [
    "Handcrafted premium frames",
    "Advanced optical technology",
    "Personalized fitting service",
    "Lifetime warranty included"
  ];

  return (
    <section className="relative bg-white py-20 md:py-32 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-teal-50/30" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <span className="inline-block text-teal-600 font-bold text-sm tracking-widest uppercase mb-4">
              Premium Quality
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Clarity Meets
              <br />
              <span className="bg-gradient-to-r from-teal-600 to-amber-500 bg-clip-text text-transparent">
                Craftsmanship
              </span>
            </h2>

            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Experience handcrafted frames and lenses engineered for a brighter perspective. From timeless designs to advanced optical technology.
            </p>

            {/* Benefits List */}
            <div className="space-y-4 mb-10">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0" />
                  <span className="text-slate-700 font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <Link href="/collections">
              <button className="group inline-flex items-center gap-3 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-teal-600/30 hover:shadow-xl hover:-translate-y-0.5">
                <span className="text-lg">Discover Your Pair</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/hero/heroimage1.png"
                alt="Premium eyewear showcase"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              {/* Decorative Border */}
              <div className="absolute inset-0 border-8 border-white/10 rounded-3xl" />
            </div>
            {/* Floating Accent */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl -z-10 blur-2xl opacity-60" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}