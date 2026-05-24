"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, Mail, MapPin, Phone, Send, Instagram, Facebook, Linkedin } from "lucide-react";
import { Cormorant_Garamond, Syne } from 'next/font/google';

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-cormorant' });
const syne = Syne({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-syne' });

const ContactInfoItem = ({ icon, title, value, href }) => (
  <div className="flex items-start gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-100/50 shadow-sm transition-all hover:bg-white hover:border-emerald-500/20">
    <div className="flex-shrink-0 text-emerald-600 bg-emerald-50 w-10 h-10 rounded-xl flex items-center justify-center">
      {icon}
    </div>
    <div>
      <h3 className="text-sm font-black uppercase tracking-wider text-stone-400">{title}</h3>
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-base font-bold text-stone-850 hover:text-emerald-600 transition-colors mt-1 block">
        {value}
      </a>
    </div>
  </div>
);

const SocialLink = ({ href, icon, 'aria-label': ariaLabel }) => (
  <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
    <div className="p-3 bg-stone-100 rounded-full hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
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
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
    }, 1500);
  };

  return (
    <div className={`${syne.variable} ${cormorant.variable} min-h-screen bg-[#fafaf9] font-sans text-stone-900`}>
      
      {/* ── Main Content Grid ── */}
      <section className="max-w-5xl mx-auto px-6 pt-32 pb-16">
        <div className="grid md:grid-cols-2 gap-12 bg-white border border-stone-100 p-8 rounded-[2rem] shadow-sm">
          
          {/* Left Column: Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className={`${cormorant.className} text-3xl font-bold text-stone-900 mb-2`}>Get In Touch</h2>
              <p className="text-sm text-stone-500 leading-relaxed">
                Drop by our Janakpur eye clinic, give us a call, or send an email. We will get back to you as quickly as possible.
              </p>
            </div>

            <div className="space-y-4">
              <ContactInfoItem
                icon={<MapPin size={20} />}
                title="Our Studio"
                value="Murli Chowk, Janakpur, Nepal"
                href="https://maps.app.goo.gl/o1H91BY5Dfhb9mib7"
              />
              <ContactInfoItem
                icon={<Mail size={20} />}
                title="Email Support"
                value="shrbansah@gmail.com"
                href="mailto:shrbansah@gmail.com"
              />
              <ContactInfoItem
                icon={<Phone size={20} />}
                title="Call Desk"
                value="+977 9744364817"
                href="tel:+9779744364817"
              />
            </div>
            
            <div className="border-t border-stone-100 pt-6">
              <h3 className="text-xs font-black uppercase tracking-wider text-stone-400 mb-3">Connect Socially</h3>
              <div className="flex items-center gap-3">
                <SocialLink href="https://www.instagram.com/sshrban?igsh=OXJodzVmczRodG93&utm_source=qr" icon={<Instagram size={18} className="text-stone-500" />} aria-label="Instagram" />
                <SocialLink href="https://www.facebook.com/share/1BYMHSBfhb/?mibextid=wwXIfr" icon={<Facebook size={18} className="text-stone-500" />} aria-label="Facebook" />
                <SocialLink href="https://www.linkedin.com/in/bishal-kumar-gupta-3b775b258?" icon={<Linkedin size={18} className="text-stone-500" />} aria-label="LinkedIn" />
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="flex flex-col justify-center">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full bg-emerald-50/50 border border-emerald-100 p-8 rounded-2xl text-center">
                <CheckCircle className="w-16 h-16 text-emerald-500 mb-4 animate-bounce" />
                <h3 className="text-xl font-bold text-stone-900">Message Sent!</h3>
                <p className="text-stone-500 text-sm mt-2">Thank you for reaching out. A Chasmawala expert will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-stone-900 mb-1">Send a Message</h3>
                  <p className="text-xs text-stone-400 mb-4">We reply to all inquiries within 24 hours.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Your Name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    className="w-full px-4 py-3 bg-[#fafaf9] border border-stone-200 rounded-2xl shadow-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm" 
                  />
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Your Email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    className="w-full px-4 py-3 bg-[#fafaf9] border border-stone-200 rounded-2xl shadow-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm" 
                  />
                </div>
                <input 
                  type="text" 
                  name="subject" 
                  placeholder="Subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-3 bg-[#fafaf9] border border-stone-200 rounded-2xl shadow-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm" 
                />
                <textarea 
                  name="message" 
                  rows="4" 
                  placeholder="Your Message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-3 bg-[#fafaf9] border border-stone-200 rounded-2xl shadow-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                ></textarea>
                
                <button 
                  type="submit" 
                  disabled={isLoading} 
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-stone-900 text-white font-bold rounded-2xl shadow-md hover:bg-emerald-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm"
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                  {!isLoading && <Send size={14} />}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Google Map Section ── */}
      <section className="border-t border-stone-100 overflow-hidden bg-white">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="mb-8">
            <h3 className="text-xs font-black uppercase tracking-wider text-stone-400 mb-1">Find Us On Google Maps</h3>
            <p className="text-sm text-stone-500">Located centrally at Murli Chowk for your convenience.</p>
          </div>
          <div className="h-96 md:h-[450px] w-full rounded-[2rem] overflow-hidden border border-stone-100 shadow-sm relative">
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d552.2456408497301!2d85.92789432025934!3d26.72163473434559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec3f5b65452a3f%3A0x31c8838d3d1e235b!2sChashmawala%20Eye%20Clinic%20and%20Optical%20Shop!5e0!3m2!1sen!2snp!4v1761022741395!5m2!1sen!2snp"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}