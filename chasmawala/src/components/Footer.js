"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaApplePay } from "react-icons/fa";

// Sub-component for individual footer links for cleaner code
const FooterLink = ({ href, children }) => (
  <li>
    <Link href={href} className="text-gray-400 hover:text-white transition-colors duration-300">
      {children}
    </Link>
  </li>
);

// Main Footer Component
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 font-sans">
      <div className="container mx-auto px-6 py-16">
        {/* Top Section with Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 pb-12 border-b border-gray-700">
          <div>
            <h3 className="text-2xl font-bold text-white">Stay in the Loop</h3>
            <p className="text-gray-400 mt-2">Get the latest on new arrivals, sales, and exclusive offers.</p>
          </div>
          <form className="w-full max-w-md flex">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-3 text-gray-800 bg-white border border-transparent rounded-l-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="bg-emerald-500 text-white font-bold px-6 py-3 rounded-r-lg hover:bg-emerald-600 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pt-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h2 className="text-2xl font-bold text-white">Chasmawala</h2>
            <p className="mt-4 text-sm text-gray-400">
              Your vision, our passion. Offering the finest selection of stylish and high-quality eyewear.
            </p>
            <div className="flex space-x-4 mt-6">
              <SocialIcon href="https://facebook.com/shrban.sah.2025" icon={<FaFacebookF />} />
              <SocialIcon href="https://www.instagram.com/optom_kartik?igsh=MW1mOG1wZTRiN3FkdQ==" icon={<FaInstagram />} />
              <SocialIcon href="https://www.linkedin.com/in/kartik-gupta-74201817b?" icon={<FaLinkedin />} />
              <SocialIcon href="https://youtube.com" icon={<FaYoutube />} />
            </div>
          </div>

          {/* Link Columns */}
          <FooterLinkColumn title="Shop">
            <FooterLink href="/collections/sunglasses">Sunglasses</FooterLink>
            <FooterLink href="/collections/eyeglasses">Eyeglasses</FooterLink>
            <FooterLink href="/collections/new-arrivals">New Arrivals</FooterLink>
            <FooterLink href="/brands">Our Brands</FooterLink>
          </FooterLinkColumn>

          <FooterLinkColumn title="About Us">
            <FooterLink href="/about">Our Story</FooterLink>
            <FooterLink href="/store">Store Locator</FooterLink>
            <FooterLink href="/careers">Careers</FooterLink>
            <FooterLink href="/press">Press</FooterLink>
          </FooterLinkColumn>

          <FooterLinkColumn title="Support">
            <FooterLink href="/contact">Contact Us</FooterLink>
            <FooterLink href="/faq">FAQ</FooterLink>
            <FooterLink href="/returns">Returns Policy</FooterLink>
            <FooterLink href="/shipping">Shipping Info</FooterLink>
          </FooterLinkColumn>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-800 py-6">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p className="text-gray-500 mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} Chasmawala. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-4">
            <span className="text-gray-500 hidden md:inline">We Accept:</span>
            <FaCcVisa size={32} className="text-gray-400" />
            <FaCcMastercard size={32} className="text-gray-400" />
            <FaCcPaypal size={32} className="text-gray-400" />
            <FaApplePay size={32} className="text-gray-400" />
          </div>
        </div>
      </div>
    </footer>
  );
}

// Sub-component for social media icons
const SocialIcon = ({ href, icon }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:bg-emerald-500 p-2 rounded-full transition-all duration-300">
        {icon}
    </a>
);

// Sub-component for link columns
const FooterLinkColumn = ({ title, children }) => (
    <div>
        <h3 className="text-base font-bold text-white tracking-wider uppercase">{title}</h3>
        <ul className="mt-4 space-y-3">{children}</ul>
    </div>
);
