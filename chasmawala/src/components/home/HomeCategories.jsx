import Link from "next/link";
import { Glasses, Sparkles, Contact } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Eyeglasses",
    description: "Everyday clarity",
    image: "/images/categories/eyeglasses1.jpg",
    href: "/collections/eyeglasses",
    icon: Glasses,
    gradient: "from-blue-500 to-teal-600",
  },
  {
    title: "Sunglasses",
    description: "Style & protection",
    image: "/images/categories/sunglasses1.jpg",
    href: "/collections/sunglasses",
    icon: Sparkles,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    title: "Contact Lenses",
    description: "Precision vision",
    image: "/images/categories/contactlens1.jpg",
    href: "/collections/contact-lenses",
    icon: Contact,
    gradient: "from-emerald-500 to-teal-600",
  },
];

export default function HomeCategories() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-teal-600 font-bold text-sm tracking-widest uppercase mb-4"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Our Collections
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black text-slate-900 mb-6"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Shop by Category
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Find the perfect eyewear for every need—from professional frames to stylish sun protection.
          </motion.p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
            >
              <Link
                href={cat.href}
                className="group block relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Image Container */}
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient} opacity-60 group-hover:opacity-75 transition-opacity mix-blend-multiply`} />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <cat.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-black mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {cat.title}
                  </h3>
                  <p className="text-white/90 text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    {cat.description} →
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
