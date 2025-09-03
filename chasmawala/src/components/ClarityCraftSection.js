"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ClarityCraftSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* --- Left Column: Text Content --- */}
          <motion.div
            className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }} // Trigger animation when 40% in view
          >
            <motion.h2
              className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight"
              variants={itemVariants}
            >
              Clarity Meets Craft
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0"
              variants={itemVariants}
            >
              Experience handcrafted frames and lenses, engineered for a brighter perspective.
              From timeless designs to advanced optical technology, see the world with unparalleled precision and style.
            </motion.p>

            <motion.div variants={itemVariants}>
              <Link href="/collections">
                <button className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 text-white font-bold rounded-lg shadow-lg hover:bg-emerald-700 transition-transform duration-300 transform hover:scale-105">
                  Discover Your Pair
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* --- Right Column: Image --- */}
          <motion.div
            className="w-full lg:w-1/2 relative aspect-[16/9] md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl order-1 lg:order-2"
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            {/* The image you provided */}
            <Image
              src="/images/hero/heroimage1.png" // You'll need to save your image here!
              alt="Glasses showcasing a clear mountain view"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw" // Responsive image sizing
              style={{ objectFit: "cover" }}
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}