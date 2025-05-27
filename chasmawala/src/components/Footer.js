import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand & Tagline */}
        <div>
          <h2 className="text-2xl font-bold text-white">Chasmawala</h2>
          <p className="mt-2 text-sm">Your one-stop shop for stylish eyewear.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li><Link href="/" className="hover:text-blue-400">Home</Link></li>
            <li><Link href="/products" className="hover:text-blue-400">Products</Link></li>
            <li><Link href="/categories" className="hover:text-blue-400">Categories</Link></li>
            <li><Link href="/about" className="hover:text-blue-400">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-blue-400">Contact</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-white">Customer Service</h3>
          <ul className="mt-3 space-y-2">
            <li><Link href="/shipping" className="hover:text-blue-400">Shipping & Delivery</Link></li>
            <li><Link href="/returns" className="hover:text-blue-400">Returns & Refunds</Link></li>
            <li><Link href="/faq" className="hover:text-blue-400">FAQ</Link></li>
            <li><Link href="/privacy" className="hover:text-blue-400">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Social Media & Payments */}
        <div>
          <h3 className="text-lg font-semibold text-white">Follow Us</h3>
          <div className="flex space-x-4 mt-3">
            <Link href="https://facebook.com" target="_blank" className="text-gray-400 hover:text-blue-500">
              <FaFacebook size={24} />
            </Link>
            <Link href="https://instagram.com" target="_blank" className="text-gray-400 hover:text-pink-500">
              <FaInstagram size={24} />
            </Link>
            <Link href="https://twitter.com" target="_blank" className="text-gray-400 hover:text-blue-400">
              <FaTwitter size={24} />
            </Link>
          </div>

          <h3 className="text-lg font-semibold text-white mt-6">We Accept</h3>
          <div className="flex space-x-4 mt-3">
            <FaCcVisa size={36} className="text-blue-500" />
            <FaCcMastercard size={36} className="text-red-500" />
            <FaCcPaypal size={36} className="text-blue-400" />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
        &copy; {new Date().getFullYear()} Chasmawala. All rights reserved.
      </div>
    </footer>
  );
}

