// src/app/doctors/[slug]/page.js
"use client";

import Image from "next/image";
import { Star, Award, Stethoscope, MapPin, Clock, Calendar, Phone, Mail, CheckCircle, Users, Heart, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReviewForm from "@/app/review/page";

// --- UI Helper Components ---
const InfoPill = ({ icon, text, variant = "default" }) => {
  const variants = {
    default: "bg-gray-100 text-gray-700",
    primary: "bg-blue-50 text-blue-700",
    success: "bg-green-50 text-green-700",
    warning: "bg-amber-50 text-amber-700"
  };
  
  return (
    <div className={`flex items-center ${variants[variant]} px-4 py-2 rounded-full text-sm font-medium shadow-sm`}>
      {icon}
      <span className="ml-2">{text}</span>
    </div>
  );
};

const ServiceTag = ({ service }) => (
  <div className="group bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 border border-blue-100 hover:border-blue-200 hover:shadow-md cursor-default">
    {service}
  </div>
);

const StatCard = ({ icon, value, label }) => (
  <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-600 mt-1">{label}</p>
      </div>
      <div className="bg-blue-100 p-3 rounded-full">
        {icon}
      </div>
    </div>
  </div>
);

// --- Skeleton Loader Component ---
const DoctorProfileSkeleton = () => (
  <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 animate-pulse">
      {/* Hero Skeleton */}
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 flex flex-col items-center">
            <div className="w-56 h-56 bg-gray-200 rounded-3xl"></div>
          </div>
          <div className="lg:col-span-3 space-y-6">
            <div className="h-12 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="h-20 bg-gray-200 rounded-xl"></div>
              <div className="h-20 bg-gray-200 rounded-xl"></div>
              <div className="h-20 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl h-48"></div>
          <div className="bg-white p-6 rounded-2xl h-32"></div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl h-96"></div>
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

  const handleReviewSubmitted = (newReview) => {
    const reviewWithDefaults = { name: "New User", ...newReview };
    setDoctor(prevDoctor => ({
      ...prevDoctor,
      reviews: [reviewWithDefaults, ...prevDoctor.reviews],
      stats: {
        ...prevDoctor.stats,
        reviews: prevDoctor.stats.reviews + 1,
      }
    }));
  };

  if (loading) return <DoctorProfileSkeleton />;
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-white">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Profile</h2>
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      </div>
    );
  }
  
  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <p className="text-gray-600 text-lg">Doctor data could not be loaded.</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* --- HERO SECTION --- */}
        <motion.div
          className="bg-gradient-to-r from-white to-blue-50 rounded-3xl shadow-xl overflow-hidden mb-8 border border-blue-100"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 p-8 lg:p-12">
            {/* Doctor Image */}
            <div className="lg:col-span-2 flex flex-col items-center justify-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <Image
                  src={doctor.image || `https://placehold.co/300x300/E2E8F0/4A5568?text=${doctor.name.charAt(0)}`}
                  alt={`Portrait of ${doctor.name}`}
                  width={280}
                  height={280}
                  className="relative rounded-3xl object-cover shadow-2xl border-4 border-white"
                />
              </div>
              
              {/* Trust Badges */}
              <div className="flex gap-3 mt-6">
                <div className="bg-white px-4 py-2 rounded-full shadow-md border border-green-100 flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-600" />
                  <span className="text-xs font-semibold text-gray-700">Verified</span>
                </div>
                <div className="bg-white px-4 py-2 rounded-full shadow-md border border-blue-100 flex items-center gap-2">
                  <Shield size={16} className="text-blue-600" />
                  <span className="text-xs font-semibold text-gray-700">Licensed</span>
                </div>
              </div>
            </div>

            {/* Doctor Info */}
            <div className="lg:col-span-3 flex flex-col justify-center">
              <div className="mb-6">
                <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-2">
                  {doctor.name}
                  <span className="text-xl lg:text-2xl font-medium text-gray-500 ml-2">{doctor.credentials}</span>
                </h1>
                <p className="text-xl lg:text-2xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {doctor.specialization}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <StatCard
                  icon={<Award size={24} className="text-blue-600" />}
                  value={`${doctor.stats.experience}+`}
                  label="Years Experience"
                />
                <StatCard
                  icon={<Star size={24} className="text-yellow-500" />}
                  value={doctor.stats.rating}
                  label={`${doctor.stats.reviews} Reviews`}
                />
                <StatCard
                  icon={<Users size={24} className="text-green-600" />}
                  value="500+"
                  label="Happy Patients"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <a 
                  href="/" 
                  className="flex-1 min-w-[200px] inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
                >
                  <Calendar className="mr-2" size={20} />
                  Book Appointment
                </a>
                <a href="/contact" className="flex-1 min-w-[200px] inline-flex items-center justify-center px-6 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-md hover:shadow-lg border-2 border-blue-600 transition-all duration-300 hover:bg-blue-50">
                  <Phone className="mr-2" size={20} />
                  Contact Now
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Main Content */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            
            {/* About Section */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-xl mr-4">
                  <Heart size={24} className="text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">About Dr. {doctor.name.split(" ").pop()}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">{doctor.bio}</p>
            </div>

            {/* Services Section */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-indigo-100 p-3 rounded-xl mr-4">
                  <Stethoscope size={24} className="text-indigo-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Services Offered</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {doctor.services?.map((service) => (
                  <ServiceTag key={service} service={service} />
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-yellow-100 p-3 rounded-xl mr-4">
                  <Star size={24} className="text-yellow-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Patient Testimonials</h2>
              </div>
              
              <div className="space-y-6">
                {doctor.reviews && doctor.reviews.length > 0 ? (
                  doctor.reviews.map((review, index) => (
                    <motion.div
                      key={index}
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-500 hover:shadow-md transition-shadow duration-300"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className={i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 italic leading-relaxed mb-3">"{review.comment}"</p>
                      <p className="text-right text-sm font-bold text-gray-800">— {review.name}</p>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <Star size={48} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No reviews yet. Be the first to share your experience!</p>
                  </div>
                )}
              </div>

              {/* Review Form */}
              <div className="mt-8 pt-8 border-t-2 border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Share Your Experience</h3>
                <ReviewForm slug={doctor.slug} onReviewSubmitted={handleReviewSubmitted} />
              </div>
            </div>
          </motion.div>

          {/* Right Column - Sidebar */}
          <motion.div
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            
            {/* Qualifications */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 sticky top-6">
              <div className="flex items-center mb-6">
                <div className="bg-purple-100 p-3 rounded-xl mr-3">
                  <Award size={20} className="text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Qualifications</h2>
              </div>
              <ul className="space-y-4">
                {doctor.qualifications.map((q, index) => (
                  <motion.li
                    key={q.degree}
                    className="flex items-start p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:shadow-md transition-all duration-300"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Award size={20} className="text-purple-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-gray-800">{q.degree}</p>
                      <p className="text-sm text-gray-600 mt-1">{q.institution}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Clinic Info */}
            <div id="clinic-info" className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 scroll-mt-24">
              <div className="flex items-center mb-6">
                <div className="bg-green-100 p-3 rounded-xl mr-3">
                  <MapPin size={20} className="text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Clinic Information</h2>
              </div>
              
              <ul className="space-y-4 mb-6">
                <li className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <Stethoscope size={18} className="mr-3 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{doctor.clinic.name}</span>
                </li>
                <li className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <MapPin size={18} className="mr-3 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{doctor.clinic.address}</span>
                </li>
                <li className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <Clock size={18} className="mr-3 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{doctor.clinic.hours}</span>
                </li>
              </ul>

              {/* Map */}
              <div className="rounded-xl overflow-hidden shadow-md border-2 border-gray-200 h-64">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d316.98648731883117!2d85.92825918817799!3d26.721766969293913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec3f5b65452a3f%3A0x31c8838d3d1e235b!2sChashmawala%20Eye%20Clinic%20and%20Optical%20Shop!5e0!3m2!1sen!2sin!4v1769937191828!5m2!1sen!2sin`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                ></iframe>
              </div>

              {/* Get Directions Button */}
              <a
                href={`https://maps.app.goo.gl/xrRy4WjqCL56dWNr8`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
              >
                <MapPin className="mr-2" size={18} />
                Get Directions
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}