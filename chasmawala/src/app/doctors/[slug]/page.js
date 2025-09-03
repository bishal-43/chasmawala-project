"use client";

import Image from "next/image";
import { Star, Award, Stethoscope, MapPin, Clock, Calendar, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// --- MOCK DATA ---
// In a real application, you would fetch this data from your API
// based on the doctor's slug or ID from the URL.
const mockDoctorData = [{
    slug: "sharban-shah",
  name: "Dr. Sharban Shah",
  credentials: "MBBS, DO",
  specialization: "Senior Eye Specialist & Cataract Surgeon",
  image: "/images/hero/sharbanshah.jpg",
  stats: {
    experience: "5+ Years",
    rating: 4.9,
    reviews: 128,
  },
  bio: "Dr. Sharban Shah is a renowned ophthalmologist with over 5 years of experience in advanced cataract surgery and comprehensive eye care. He is dedicated to providing personalized treatment plans using the latest technologies to ensure the best possible outcomes for his patients. His compassionate approach and commitment to excellence have made him a trusted name in vision care.",
  qualifications: [
    { degree: "Doctor of Ophthalmology (DO)", institution: "Bharti Vidyapeeth(BVU)" },
    { degree: "Optometry", institution: "Institute of Medicine" },
    { degree: "Board Certified", institution: "Nepal Medical Council" },
  ],
  services: [
    "Advanced Cataract Surgery", "LASIK & Refractive Surgery", "Glaucoma Management",
    "Cornea Treatment", "Pediatric Eye Care", "Diabetic Retinopathy",
  ],
  clinic: {
    name: "Chasmawala Advanced Eye Clinic",
    address: "Ramanand Chowk, Janakpur, Nepal",
    hours: "Mon - Sat: 10:00 AM - 8:00 PM",
  },
  reviews: [
    { name: "A. Sharma", rating: 5, comment: "Dr. Shah is incredibly knowledgeable and caring. The entire process was smooth and my vision has never been better!" },
    { name: "R. Verma", rating: 5, comment: "An excellent and professional doctor. He took the time to explain everything clearly. Highly recommended." },
  ],
},


{
    slug: "kartik-gupta",
  name: "Opt. Kartik Gupta",
  credentials: "MBBS, DO",
  specialization: "Senior Eye Specialist & Cataract Surgeon",
  image: "/images/hero/kartikgupta.jpg",
  stats: {
    experience: "3+ Years",
    rating: 4.9,
    reviews: 128,
  },
  bio: "Opt. Kartik Gupta is a skilled optometrist with over 3 years of experience in advanced cataract surgery and comprehensive eye care. He is dedicated to providing personalized treatment plans using the latest technologies to ensure the best possible outcomes for his patients. His compassionate approach and commitment to excellence have made him a trusted name in vision care.",
  qualifications: [
    { degree: "Optometry", institution: "Bharti Vidyapeeth(BVU)" },
    { degree: "Board Certified", institution: "Nepal Medical Council" },
  ],
  services: [
    "Advanced Cataract Surgery", "LASIK & Refractive Surgery", "Glaucoma Management",
    "Cornea Treatment", "Pediatric Eye Care", "Diabetic Retinopathy",
  ],
  clinic: {
    name: "Chasmawala Advanced Eye Clinic",
    address: "Ramanand Chowk, Janakpur, Nepal",
    hours: "Mon - Sat: 10:00 AM - 8:00 PM",
  },
  reviews: [
    { name: "A. Sharma", rating: 5, comment: "Dr. Shah is incredibly knowledgeable and caring. The entire process was smooth and my vision has never been better!" },
    { name: "R. Verma", rating: 5, comment: "An excellent and professional doctor. He took the time to explain everything clearly. Highly recommended." },
  ],
},
];

// --- Helper Components for UI elements ---
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

// --- Main Doctor Profile Page Component ---
export default function DoctorProfilePage() {
    const params = useParams();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params?.slug) {
            // Find the doctor in our mock data array based on the slug from the URL
            const foundDoctor = mockDoctorData.find(d => d.slug === params.slug);
            
            // Simulate network delay
            setTimeout(() => {
                setDoctor(foundDoctor);
                setLoading(false);
            }, 500);
        }
    }, [params?.slug]);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (!doctor) {
        return <div className="flex justify-center items-center min-h-screen">Doctor not found.</div>;
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
                src={doctor.image}
                alt={`Portrait of ${doctor.name}`}
                width={200}
                height={200}
                className="rounded-full object-cover border-4 border-blue-200 shadow-md"
              />
            </div>
            <div className="text-center lg:text-left lg:col-span-2">
              <h1 className="text-4xl font-extrabold text-gray-900">{doctor.name}, <span className="text-2xl font-medium text-gray-500">{doctor.credentials}</span></h1>
              <p className="text-xl font-semibold text-blue-600 mt-2">{doctor.specialization}</p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-4">
                <InfoPill icon={<Award size={16} />} text={doctor.stats.experience} />
                <InfoPill icon={<Star size={16} className="text-yellow-500" />} text={`${doctor.stats.rating} (${doctor.stats.reviews} reviews)`} />
              </div>
              <button className="mt-6 w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-transform duration-300 transform hover:scale-105">
                <Calendar className="mr-2" size={20} />
                Visit the Clinic
              </button>
            </div>
          </div>
        </motion.div>

        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* --- Left Column (Main Details) --- */}
          <motion.div 
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About Dr. {doctor.name.split(' ').pop()}</h2>
              <p className="text-gray-600 leading-relaxed">{doctor.bio}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Services Offered</h2>
              <div className="flex flex-wrap gap-3">
                {doctor.services.map(service => <ServiceTag key={service} service={service} />)}
              </div>
            </div>
             <div className="bg-white p-6 rounded-2xl shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Patient Testimonials</h2>
                <div className="space-y-4">
                    {doctor.reviews.map((review, index) => (
                        <div key={index} className="border-l-4 border-blue-500 pl-4">
                            <div className="flex items-center mb-1">
                                {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} className="text-yellow-400 fill-current" />)}
                            </div>
                            <p className="text-gray-600 italic">"{review.comment}"</p>
                            <p className="text-right text-sm font-semibold text-gray-800 mt-2">- {review.name}</p>
                        </div>
                    ))}
                </div>
            </div>
          </motion.div>

          {/* --- Right Column (Sidebar) --- */}
          <motion.div 
            className="lg:col-span-1 space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Qualifications</h2>
              <ul className="space-y-3">
                {doctor.qualifications.map(q => (
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
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Clinic Information</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center"><Stethoscope size={16} className="mr-3" /> {doctor.clinic.name}</li>
                <li className="flex items-center"><MapPin size={16} className="mr-3" /> {doctor.clinic.address}</li>
                <li className="flex items-center"><Clock size={16} className="mr-3" /> {doctor.clinic.hours}</li>
              </ul>
               <div className="mt-4 h-48 bg-gray-200 rounded-lg overflow-hidden">
                 {/* In a real app, you would embed a Google Map here */}
                 
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}