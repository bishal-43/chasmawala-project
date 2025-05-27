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
import { useState } from "react";
import { PhoneCall, Video, Mail } from "lucide-react";

const doctors = [
  {
    id: 1,
    name: "Dr. Sharban Shah",
    specialization: "Senior Eye Specialist",
    experience: "15+ years experience",
    image: "/images/doctor1.jpg",
    phone: "+91 98765 43210",
    email: "rahul.sharma@chasmawala.com",
    videoConsultation: "#",
  },
  {
    id: 2,
    name: "Dr. Kartik Gupta",
    specialization: "Pediatric Eye Surgeon",
    experience: "10+ years experience",
    image: "/images/doctor2.jpg",
    phone: "+91 87654 32109",
    email: "anjali.verma@chasmawala.com",
    videoConsultation: "#",
  },
];

export default function FreeConsultation() {
  const [visiblePhones, setVisiblePhones] = useState({});

  const togglePhoneVisibility = (id) => {
    setVisiblePhones((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-24 bg-gray-200">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">👨‍⚕️ Free Consultation</h2>
        <p className="text-lg text-gray-700 mb-10">
          Get expert advice from our specialists for **free**.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center"
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-40 h-40 rounded-full border-4 border-primary mb-4"
              />
              <h3 className="text-2xl font-semibold">{doctor.name}</h3>
              <p className="text-gray-600">{doctor.specialization}</p>
              <p className="text-gray-500">{doctor.experience}</p>

              <div className="mt-4 flex flex-col gap-4">
                {/* Toggle Phone Number Visibility */}
                <button
                  onClick={() => togglePhoneVisibility(doctor.id)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2"
                >
                  <PhoneCall className="h-5 w-5" />
                  {visiblePhones[doctor.id] ? doctor.phone : "Call Now"}
                </button>

                <a
                  href={doctor.videoConsultation}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
                >
                  <Video className="h-5 w-5" /> Video Consult
                </a>

                <a
                  href={`mailto:${doctor.email}`}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg flex items-center gap-2"
                >
                  <Mail className="h-5 w-5" /> Email
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
