"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";

// --- Main Hero Component ---
export default function Hero() {
  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="home" className="relative bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[85vh] py-20 sm:py-28">
          
          {/* --- Left Column: Text Content --- */}
          <motion.div
            className="text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                See Life Clearly
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-extrabold text-gray-900 my-6 leading-tight"
              variants={itemVariants}
            >
              Your Perfect Pair is Waiting.
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-600 mb-10 max-w-lg mx-auto lg:mx-0"
              variants={itemVariants}
            >
              Explore thousands of designer frames and advanced lenses, all backed by our expert optical care.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              variants={itemVariants}
            >
              <Link href="/collections">
                <button className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-transform duration-300 transform hover:scale-105">
                  Shop All Eyewear
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
              <Link href="/virtual-tryOn">
                 <button className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-white text-gray-800 font-bold rounded-lg border-2 border-gray-200 shadow-md hover:border-blue-500 hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
                  Virtual Try-On
                </button>
              </Link>
            </motion.div>
            
            {/* Social Proof Section */}
            <motion.div className="mt-12 text-left" variants={itemVariants}>
                <div className="flex items-center justify-center lg:justify-start">
                    <div className="flex -space-x-2">
                        <Image className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User 1" width={40} height={40} />
                        <Image className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User 2" width={40} height={40} />
                        <Image className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User 3" width={40} height={40} />
                    </div>
                    <div className="ml-4">
                        <div className="flex items-center">
                           <Star className="w-5 h-5 text-yellow-400 fill-current" />
                           <Star className="w-5 h-5 text-yellow-400 fill-current" />
                           <Star className="w-5 h-5 text-yellow-400 fill-current" />
                           <Star className="w-5 h-5 text-yellow-400 fill-current" />
                           <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        </div>
                        <p className="text-sm text-gray-600">Rated **4.9/5** by 1,200+ happy customers</p>
                    </div>
                </div>
            </motion.div>
          </motion.div>

          {/* --- Right Column: Image Collage --- */}
          <div className="hidden lg:block relative h-full">
            <motion.div 
              className="absolute top-0 left-10 w-[60%] h-[55%] rounded-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, x: 50, rotate: 5 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            >
              <Image src="/images/hero/womenEyeglasses.jpg" alt="Woman wearing stylish eyeglasses" fill style={{ objectFit: 'cover' }} priority />
            </motion.div>
            <motion.div 
              className="absolute bottom-0 right-0 w-[55%] h-[60%] rounded-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, x: -50, rotate: -5 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            >
              <Image src="/images/hero/manSunglasses.jpg" alt="Man wearing modern sunglasses" fill style={{ objectFit: 'cover' }} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}