

/*import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });

    setTimeout(() => setSubmitted(false), 3000); // Hide success message after 3 sec
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-10 px-4 md:px-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">📞 Contact Us</h1>

        
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Our Store</h2>
            <p>📍 **Address:** Ramanand Chowk, Janakpur, Nepal</p>
            <p>📧 **Email:** <a href="mailto:support@chasmawala.com" className="text-blue-500">support@chasmawala.com</a></p>
            <p>📞 **Phone:** <a href="tel:+911234567890" className="text-blue-500">+91 12345 67890</a></p>
            <p>🕒 **Hours:** Sun-Sat, 10 AM - 8 PM</p>

            <div className="flex space-x-4 mt-4">
              <Link href="https://wa.me/911234567890" target="_blank">
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg shadow">💬 WhatsApp</button>
              </Link>
              <Link href="tel:+911234567890">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow">📞 Call Now</button>
              </Link>
            </div>
          </div>

          
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              className="w-full h-64 md:h-full rounded-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3563.2635571368564!2d85.91627512521792!3d26.735964376753056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec401d18fed035%3A0xb177a04e09cda983!2sRamanand%20Chowk%2C%20Janakpur%2045600%2C%20Nepal!5e0!3m2!1sen!2sin!4v1742118376884!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>

          {submitted && (
            <div className="p-3 mb-4 bg-green-200 text-green-700 rounded">
              ✅ Your message has been sent successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
            <textarea
              name="message"
              rows="4"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            ></textarea>
            <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded shadow">
              📩 Send Message
            </button>
          </form>
        </div>

        
        <div className="mt-6 text-center">
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex justify-center space-x-6 mt-2">
            <Link href="https://instagram.com" target="_blank">
              <span className="text-pink-500 text-xl cursor-pointer">📷 Instagram</span>
            </Link>
            <Link href="https://facebook.com" target="_blank">
              <span className="text-blue-600 text-xl cursor-pointer">📘 Facebook</span>
            </Link>
            <Link href="https://twitter.com" target="_blank">
              <span className="text-blue-400 text-xl cursor-pointer">🐦 Twitter</span>
            </Link>
            <Link href="https://linkedin.com" target="_blank">
              <span className="text-blue-700 text-xl cursor-pointer">🔗 LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}*/


"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, Mail, MapPin, Phone, Send, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";

// Helper component for contact information items
const ContactInfoItem = ({ icon, title, value, href }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 text-blue-500">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      <a href={href} className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">
        {value}
      </a>
    </div>
  </div>
);

// Helper component for social media links
const SocialLink = ({ href, icon, 'aria-label': ariaLabel }) => (
  <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
    <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors">
      {icon}
    </div>
  </Link>
);

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Form Data Submitted:", formData);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
    }, 1500);
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* --- Header --- */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Get in Touch
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              We'd love to hear from you! Whether you have a question, feedback, or need assistance, our team is ready to help.
            </p>
          </div>

          {/* --- Main Content Grid --- */}
          <div className="grid md:grid-cols-2 gap-12 bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
            
            {/* --- Left Column: Contact Info --- */}
            <div className="space-y-8">
              <ContactInfoItem
                icon={<MapPin size={24} />}
                title="Our Address"
                value="Murli Chowk, Janakpur, Nepal"
                href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d552.2456408497301!2d85.92789432025934!3d26.72163473434559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec3f5b65452a3f%3A0x31c8838d3d1e235b!2sChashmawala%20Eye%20Clinic%20and%20Optical%20Shop!5e0!3m2!1sen!2snp!4v1761022741395!5m2!1sen!2snp"
              />
              <ContactInfoItem
                icon={<Mail size={24} />}
                title="Email Us"
                value="shrbansah@gmail.com"
                href="mailto:shrbansah@gmail.com"
              />
              <ContactInfoItem
                icon={<Phone size={24} />}
                title="Call Us"
                value="+977 9744364817"
                href="tel:+9779744364817"
              />
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Follow Us</h3>
                <div className="flex items-center gap-4">
                  <SocialLink href="https://www.instagram.com/sshrban?igsh=OXJodzVmczRodG93&utm_source=qr" icon={<Instagram size={20} className="text-gray-500" />} aria-label="Instagram" />
                  <SocialLink href="https://www.facebook.com/share/1BYMHSBfhb/?mibextid=wwXIfr" icon={<Facebook size={20} className="text-gray-500" />} aria-label="Facebook" />
                  {/* <SocialLink href="https://twitter.com" icon={<Twitter size={20} className="text-gray-500" />} aria-label="Twitter" /> */}
                  <SocialLink href="https://www.linkedin.com/in/bishal-kumar-gupta-3b775b258?" icon={<Linkedin size={20} className="text-gray-500" />} aria-label="LinkedIn" />
                </div>
              </div>
            </div>

            {/* --- Right Column: Contact Form --- */}
            <div>
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full bg-green-50 dark:bg-green-900/50 p-6 rounded-lg text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold text-green-800 dark:text-green-200">Message Sent!</h3>
                  <p className="text-green-600 dark:text-green-300 mt-2">Thank you for reaching out. We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="form-input" />
                    <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required className="form-input" />
                  </div>
                  <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required className="form-input" />
                  <textarea name="message" rows="5" placeholder="Your Message" value={formData.message} onChange={handleChange} required className="form-input"></textarea>
                  <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                    {isLoading ? 'Sending...' : 'Send Message'}
                    {!isLoading && <Send size={18} />}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
       {/* --- Google Map Section --- */}
       <div className="h-96 md:h-[500px] w-full mt-10">
          <iframe
            className="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d552.2456408497301!2d85.92789432025934!3d26.72163473434559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec3f5b65452a3f%3A0x31c8838d3d1e235b!2sChashmawala%20Eye%20Clinic%20and%20Optical%20Shop!5e0!3m2!1sen!2snp!4v1761022741395!5m2!1sen!2snp"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
    </div>
  );
}

// Add this to your global CSS file (e.g., globals.css) for the input styles:
/*
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .form-input {
    @apply w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow;
  }
}
*/