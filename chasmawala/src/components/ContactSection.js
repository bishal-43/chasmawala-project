/*"use client";
import { useState } from "react";
import { Phone, MessageCircle, Video, Mail, PhoneCall } from "lucide-react";

const contactOptions = [
  { 
    title: "Telephonic Consultation", 
    description: "Speak with an expert instantly.", 
    icon: Phone,
    type: "phone", 
    value: "+91 12345 67890"
  },
  { 
    title: "WhatsApp Call", 
    description: "Easy & fast assistance via WhatsApp.", 
    icon: MessageCircle, 
    type: "whatsapp", 
    value: "https://wa.me/911234567890"
  },
  { 
    title: "Video Consultation", 
    description: "Get expert guidance via video.", 
    icon: Video, 
    type: "video", 
    value: "#"
  },
  { 
    title: "Email Support", 
    description: "Send us your queries anytime.", 
    icon: Mail, 
    type: "email", 
    value: "mailto:support@chasmawala.com"
  },
];

export default function ContactSection() {
  const [showPhone, setShowPhone] = useState(false);

  const handleClick = (option) => {
    if (option.type === "phone") {
      setShowPhone(!showPhone);
    } else if (option.type === "whatsapp") {
      window.open(option.value, "_blank");
    } else if (option.type === "email") {
      window.location.href = option.value;
    }
  };

  return (
    <section className="py-24 bg-gray-200">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Free Consultation</h2>
        <p className="text-lg text-gray-700 mb-10">
          Choose your preferred way to get in touch with us.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactOptions.map((option, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-lg text-center cursor-pointer hover:bg-gray-100 transition"
              onClick={() => handleClick(option)}
            >
              <option.icon className="text-primary h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold">{option.title}</h3>
              <p className="text-gray-600">{option.description}</p>

              {/* Display Phone Number on Click */ //}
/*{option.type === "phone" && showPhone && (
  <div className="mt-4">
    <p className="text-lg font-bold text-gray-800">{option.value}</p>
    <a href={`tel:${option.value}`} className="inline-block mt-2">
      <PhoneCall className="text-green-600 h-8 w-8 mx-auto" />
    </a>
  </div>
)}
</div>
))}
</div>
</div>
</section>
);
}

*/

"use client";
import { Video, User, Star, ShieldCheck, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Expanded data for a richer UI
const doctors = [
  {
    id: 1,
    name: "Dr. Sharban Shah",
    specialization: "Senior Eye Specialist",
    experience: "5+ years",
    rating: 4.9,
    reviews: 128,
    image: "/images/hero/sharbanshah.jpg",
    isOnline: true,
    expertise: ["Cataract Surgery", "Glaucoma", "LASIK"],
    profileLink: "/doctors/sharban-shah",
    phone: "911234567890",
  },
  {
    id: 2,
    name: "Dr. Kartik Gupta",
    specialization: "Pediatric Eye Surgeon",
    experience: "3+ years",
    rating: 4.8,
    reviews: 92,
    image: "/images/hero/kartikgupta.jpg",
    isOnline: false,
    expertise: ["Strabismus", "Retinopathy", "Pediatric Vision"],
    profileLink: "/doctors/kartik-gupta",
    phone: "911234567890",
  },
  // Add more doctors as needed
];

// A single Doctor Card component for better code organization
const DoctorCard = ({ doctor }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-200/80">
    <div className="md:flex">
      {/* --- Doctor Image & Online Status --- */}
      <div className="md:flex-shrink-0 relative">
        <Image
          src={doctor.image}
          alt={`Portrait of ${doctor.name}`}
          width={250}
          height={250}
          className="w-full h-56 object-cover md:w-48 md:h-full"
        />
        {doctor.isOnline && (
          <div className="absolute top-3 right-3 flex items-center bg-green-500/90 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
            </span>
            Online
          </div>
        )}
      </div>

      {/* --- Doctor Info & Actions --- */}
      <div className="p-6 flex flex-col flex-grow">
        <div>
          <p className="text-indigo-600 font-semibold text-sm">{doctor.specialization}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">{doctor.name}</h3>

          {/* --- Experience & Rating --- */}
          <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 mt-3">
            <div className="flex items-center">
              <ShieldCheck size={16} className="text-gray-500 mr-1.5" />
              <span>{doctor.experience} experience</span>
            </div>
            <div className="flex items-center">
              <Star size={16} className="text-yellow-400 fill-current mr-1.5" />
              <span className="font-semibold">{doctor.rating}</span>
              <span className="ml-1">({doctor.reviews} reviews)</span>
            </div>
          </div>

          {/* --- Expertise Badges --- */}
          <div className="mt-4 flex flex-wrap gap-2">
            {doctor.expertise.map((skill) => (
              <span key={skill} className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="flex-grow"></div>

        {/* --- Action Buttons --- */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href={`https://wa.me/${doctor.phone}?text=Hello!%20I'd%20like%20a%20free%20consultation.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-lg font-semibold text-center hover:bg-green-600 transition-colors shadow-lg"
          >
            <MessageCircle className="mr-2" size={20} />
            Free Consultation 
          </a>
          <Link
            href={doctor.profileLink}
            className="flex items-center justify-center px-4 py-3 bg-white text-gray-800 rounded-lg font-semibold text-center border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            <User className="mr-2" size={20} />
            View Profile
          </Link>
        </div>
      </div>
    </div>
  </div>
);


export default function FreeConsultation() {
  return (
    <section className="py-24 bg-gray-50 font-sans">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-3">
            Expert Advice is Just a Click Away
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Connect with our highly-rated eye care specialists for a free, no-obligation consultation to address your vision needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    </section>
  );
}