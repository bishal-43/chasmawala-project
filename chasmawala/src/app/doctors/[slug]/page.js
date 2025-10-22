// src/app/doctors/[slug]/page.js
"use client";

import Image from "next/image";
import { Star, Award, Stethoscope, MapPin, Clock, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReviewForm from "@/app/review/page";

// --- UI Helper Components ---
const InfoPill = ({ icon, text }) => (
  <div className="flex items-center bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium">
    {icon}
    <span className="ml-2">{text}</span>
  </div>
);

const ServiceTag = ({ service }) => (
  <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
    {service}
  </div>
);

// --- Skeleton Loader Component ---
const DoctorProfileSkeleton = () => (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="flex justify-center lg:col-span-1">
                    <div className="w-48 h-48 bg-gray-200 rounded-full"></div>
                </div>
                <div className="lg:col-span-2 space-y-4">
                    <div className="h-10 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                    <div className="flex gap-3 mt-4">
                        <div className="h-8 bg-gray-200 rounded-full w-28"></div>
                        <div className="h-8 bg-gray-200 rounded-full w-40"></div>
                    </div>
                </div>
            </div>
        </div>
        {/* Main Content Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
                <div className="bg-white p-6 rounded-2xl shadow-md space-y-3">
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
            </div>
            <div className="lg:col-span-1 space-y-8">
                <div className="bg-white p-6 rounded-2xl shadow-md space-y-3">
                    <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-12 bg-gray-200 rounded w-full"></div>
                    <div className="h-12 bg-gray-200 rounded w-full"></div>
                </div>
            </div>
        </div>
    </div>
);


export default function DoctorProfilePage() {
  const params = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      if (!params?.slug) return;
      try {
        setLoading(true);
        const res = await fetch(`/api/doctors/${params.slug}`);
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Doctor not found");
        }
        const data = await res.json();
        setDoctor(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [params?.slug]);

  // Improvement: Handle review submission to update UI in real-time
  const handleReviewSubmitted = (newReview) => {
    // Note: In a real app, you'd fetch the current user's name from a session/context
    // For now, we'll optimistically update with a placeholder name.
    const reviewWithDefaults = { name: "New User", ...newReview };

    setDoctor(prevDoctor => ({
        ...prevDoctor,
        reviews: [reviewWithDefaults, ...prevDoctor.reviews],
        stats: {
            ...prevDoctor.stats,
            reviews: prevDoctor.stats.reviews + 1,
            // You could also recalculate the average rating here for full accuracy
        }
    }));
  };

  if (loading) {
    return <DoctorProfileSkeleton />;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500 font-semibold">{error}</div>;
  }
  
  if (!doctor) {
     return <div className="flex justify-center items-center min-h-screen">Doctor data could not be loaded.</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* --- HEADER SECTION --- */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8 mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="flex justify-center lg:col-span-1">
              <Image
                src={doctor.image || `https://placehold.co/200x200/E2E8F0/4A5568?text=${doctor.name.charAt(0)}`}
                alt={`Portrait of ${doctor.name}`}
                width={200}
                height={200}
                className="rounded-full object-cover border-4 border-blue-200 shadow-md"
              />
            </div>
            <div className="text-center lg:text-left lg:col-span-2">
              <h1 className="text-4xl font-extrabold text-gray-900">
                {doctor.name}, <span className="text-2xl font-medium text-gray-500">{doctor.credentials}</span>
              </h1>
              <p className="text-xl font-semibold text-blue-600 mt-2">{doctor.specialization}</p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-4">
                <InfoPill icon={<Award size={16} />} text={`${doctor.stats.experience} Years`} />
                <InfoPill
                  icon={<Star size={16} className="text-yellow-500" />}
                  text={`${doctor.stats.rating} (${doctor.stats.reviews} reviews)`}
                />
              </div>
              <a href="#clinic-info" className="mt-6 w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-transform duration-300 transform hover:scale-105">
                <Calendar className="mr-2" size={20} />
                Visit the Clinic
              </a>
            </div>
          </div>
        </motion.div>

        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* About Section */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About Dr. {doctor.name.split(" ").pop()}</h2>
              <p className="text-gray-600 leading-relaxed">{doctor.bio}</p>
            </div>

            {/* Services Section */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Services Offered</h2>
              <div className="flex flex-wrap gap-3">
                {doctor.services?.map((service) => (
                  <ServiceTag key={service} service={service} />
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Patient Testimonials</h2>
              <div className="space-y-6">
                {/* Improvement: Handle empty state for reviews */}
                {doctor.reviews && doctor.reviews.length > 0 ? (
                  doctor.reviews.map((review, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <div className="flex items-center mb-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={16} className="text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-600 italic">"{review.comment}"</p>
                      <p className="text-right text-sm font-semibold text-gray-800 mt-2">- {review.name}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No reviews yet. Be the first to share your experience!</p>
                )}
              </div>
              <div className="mt-8 pt-6 border-t">
                 <ReviewForm slug={doctor.slug} onReviewSubmitted={handleReviewSubmitted} />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-1 space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* Qualifications */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Qualifications</h2>
              <ul className="space-y-3">
                {doctor.qualifications.map((q) => (
                  <li key={q.degree} className="flex items-start">
                    <Award size={20} className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-700">{q.degree}</p>
                      <p className="text-sm text-gray-500">{q.institution}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Clinic Info */}
            <div id="clinic-info" className="bg-white p-6 rounded-2xl shadow-md scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Clinic Information</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center"><Stethoscope size={16} className="mr-3" /> {doctor.clinic.name}</li>
                <li className="flex items-center"><MapPin size={16} className="mr-3" /> {doctor.clinic.address}</li>
                <li className="flex items-center"><Clock size={16} className="mr-3" /> {doctor.clinic.hours}</li>
              </ul>
              <div className="mt-4 h-48 bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(doctor.clinic.address)}`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
