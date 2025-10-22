"use client";

import { useState, useEffect } from "react";
import {
  User,
  Star,
  MessageCircle,
  X,
  Phone,
  Mail,
  Award,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/* --------------------- Skeleton Loader --------------------- */
const DoctorCardSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
    <div className="w-full h-56 bg-gray-200"></div>
    <div className="p-6">
      <div className="h-4 bg-gray-200 rounded-full w-1/3 mb-3"></div>
      <div className="h-7 bg-gray-200 rounded w-3/4 mb-1"></div>
      <div className="h-5 bg-gray-200 rounded w-1/2 mb-4"></div>

      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <div className="grid grid-cols-3 gap-2">
          {Array(3)
            .fill()
            .map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="h-6 w-10 bg-gray-300 rounded"></div>
                <div className="h-3 w-16 bg-gray-300 rounded mt-1"></div>
              </div>
            ))}
        </div>
      </div>

      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
      <div className="flex flex-wrap gap-2 mb-6">
        <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
        <div className="h-5 w-24 bg-gray-200 rounded-full"></div>
        <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
      </div>

      <div className="mt-auto pt-6 grid grid-cols-2 gap-3">
        <div className="h-12 bg-gray-200 rounded-lg"></div>
        <div className="h-12 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  </div>
);

/* --------------------- Contact Modal --------------------- */
const ContactModal = ({ doctor, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 20 }}
      className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative p-8"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
      >
        <X size={24} />
      </button>

      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800">
          Contact Dr. {doctor.name.split(" ").pop()}
        </h3>
        <p className="text-gray-500 mt-1">Choose your preferred method.</p>
      </div>

      <div className="mt-8 space-y-4">
        <a
          href={`tel:${doctor.phone}`}
          className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors w-full text-left"
        >
          <Phone className="text-blue-500" size={24} />
          <div className="ml-4">
            <p className="font-semibold text-gray-800">Telephone Call</p>
            <p className="text-sm text-gray-600">{doctor.phone}</p>
          </div>
        </a>

        <a
          href={`https://wa.me/${doctor.phone}?text=Hello%20Dr.%20${doctor.name.split(" ").pop()}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors w-full text-left"
        >
          <MessageCircle className="text-green-500" size={24} />
          <div className="ml-4">
            <p className="font-semibold text-gray-800">WhatsApp Chat</p>
            <p className="text-sm text-gray-600">Start a conversation</p>
          </div>
        </a>

        <a
          href={`mailto:${doctor.email}`}
          className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors w-full text-left"
        >
          <Mail className="text-red-500" size={24} />
          <div className="ml-4">
            <p className="font-semibold text-gray-800">Email</p>
            <p className="text-sm text-gray-600">Send your query</p>
          </div>
        </a>
      </div>
    </motion.div>
  </motion.div>
);

/* --------------------- Doctor Card --------------------- */
const DoctorCard = ({ doctor, onConsultClick }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 flex flex-col h-full">
    {/* Image Section */}
    <div className="relative">
      <Image
        src={
          doctor.image ||
          `https://placehold.co/400x300/E2E8F0/4A5568?text=${doctor.name.charAt(
            0
          )}`
        }
        alt={`Portrait of ${doctor.name}`}
        width={400}
        height={300}
        className="w-full h-56 object-cover"
      />
      {doctor.isOnline && (
        <div className="absolute top-4 right-4 flex items-center bg-green-500/90 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
          </span>
          Online
        </div>
      )}
    </div>

    {/* Content Section */}
    <div className="p-6 flex flex-col flex-grow">
      <span className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold mb-2">
        {doctor.specialization}
      </span>
      <h3 className="text-2xl font-bold text-gray-900 mt-1">{doctor.name}</h3>
      <p className="text-gray-500 text-sm mb-4">
        {doctor.credentials || "Certified Medical Professional"}
      </p>

      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <span className="text-lg font-bold text-gray-800 flex items-center justify-center">
              <Award size={18} className="mr-1 text-gray-500" />{" "}
              {doctor.stats?.experience || "N/A"}
            </span>
            <span className="text-xs text-gray-500 block">Experience</span>
          </div>
          <div>
            <span className="text-lg font-bold text-gray-800 flex items-center justify-center">
              <Star size={16} className="mr-1 text-yellow-400 fill-current" />{" "}
              {doctor.stats?.rating || "N/A"}
            </span>
            <span className="text-xs text-gray-500 block">Rating</span>
          </div>
          <div>
            <span className="text-lg font-bold text-gray-800 flex items-center justify-center">
              <Users size={18} className="mr-1 text-gray-500" />{" "}
              {doctor.stats?.reviews || 0}
            </span>
            <span className="text-xs text-gray-500 block">Reviews</span>
          </div>
        </div>
      </div>

      <h4 className="text-sm font-semibold text-gray-600 mb-2">Expertise</h4>
      <div className="flex flex-wrap gap-2">
        {(doctor.expertise || []).slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full"
          >
            {skill}
          </span>
        ))}
        {doctor.expertise?.length > 3 && (
          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">
            +{doctor.expertise.length - 3} more
          </span>
        )}
      </div>

      <div className="mt-auto pt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={() => onConsultClick(doctor)}
          className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-indigo-300"
        >
          <MessageCircle className="mr-2" size={20} />
          Free Consultation
        </button>
        <Link
          href={`/doctors/${doctor.slug}`}
          className="flex items-center justify-center px-4 py-3 bg-white text-gray-800 rounded-lg font-semibold border border-gray-300 hover:bg-gray-100 transition-colors"
        >
          <User className="mr-2" size={20} />
          View Profile
        </Link>
      </div>
    </div>
  </div>
);

/* --------------------- Main Component --------------------- */
export default function FreeConsultation() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("/api/doctors");
        if (!res.ok) throw new Error("Failed to fetch doctors");
        const data = await res.json();
        setDoctors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const renderContent = () => {
    if (loading) return Array(3).fill().map((_, i) => <DoctorCardSkeleton key={i} />);
    if (error) return <p className="text-red-500 text-center col-span-3">{error}</p>;
    if (doctors.length === 0) return <p className="text-gray-600 text-center col-span-3">No doctors available at the moment.</p>;
    return doctors.slice(0, 3).map((doctor) => (
      <DoctorCard key={doctor._id} doctor={doctor} onConsultClick={setSelectedDoctor} />
    ));
  };

  return (
    <>
      <section className="py-24 bg-gray-50 font-sans">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                Expert Advice
              </span>{" "}
              is Just a Click Away
            </h2>
            <p className="text-lg text-gray-600">
              Connect with our highly-rated eye care specialists for a free, no-obligation consultation to address your vision needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedDoctor && (
          <ContactModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
