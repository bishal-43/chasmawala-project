"use client";

import { useState } from "react";
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

        {/* Contact Info Section */}
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

          {/* Google Map Embed */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              className="w-full h-64 md:h-full rounded-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3563.2635571368564!2d85.91627512521792!3d26.735964376753056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec401d18fed035%3A0xb177a04e09cda983!2sRamanand%20Chowk%2C%20Janakpur%2045600%2C%20Nepal!5e0!3m2!1sen!2sin!4v1742118376884!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
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

        {/* Social Media Links */}
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
}
