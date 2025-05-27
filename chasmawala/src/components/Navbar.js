"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ShoppingCart, Heart, User, UserCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/contexts/authContext";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const { user, setUser,logout } = useAuth();


  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  const cartContext = useCart();
  const wishlistContext = useWishlist();
  const cart = cartContext?.cart || [];
  const wishlistItems = wishlistContext?.wishlistItems || [];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
        console.log("Retrieved Token:", token);

        if (!token) {
          setUser(null); // No token means user is not authenticated
          return;
        }

        const res = await fetch("http://localhost:5000/api/auth/check-auth", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // Send token in Authorization header
            "Accept": "application/json",
          },
        });

        if (!res.ok) {
          setUser(null); // Invalid response, reset user state
          return;
        }

        const data = await res.json();
        setUser(data.user || null); // Set user data if available
      } catch (error) {
        console.error("Error fetching auth status:", error);
        setUser(null); // Reset user state in case of error
      }
    };
    fetchAuthStatus();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/collections" },
    { name: "Eye Test", href: "/eye-test" },
    { name: "Contact", href: "/contact" },
    { name: "Find a Store", href: "/store" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 flex items-center justify-between shadow-md ${isScrolled ? "bg-white/80 backdrop-blur-md" : "bg-white"}`}
      >
        <Link href="/" className="text-xl font-bold">
          Chasmawala
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium hover:text-blue-600 transition-colors ${pathname === link.href ? "text-blue-600 font-bold" : ""}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/wishlist" className="relative">
            <Heart size={20} />
            {wishlistItems.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <Link href="/cart" className="relative">
            <ShoppingCart size={20} />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs rounded-full px-2">
                {cart.length}
              </span>
            )}
          </Link>

          {user ? (
            <div
              ref={dropdownRef}
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="p-2">
                <User size={20} />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border shadow-md rounded-lg">
                  <Link href="/account/profile" className="block px-4 py-2 hover:bg-gray-100">
                    Profile
                  </Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="text-sm font-medium hover:text-blue-600"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            {isSignup ? (
              <SignupForm
              setShowAuthModal={() => setShowAuthModal(false)}
                setIsSignup={setIsSignup}
              />
            ) : (
              <LoginForm
              setShowAuthModal={() => setShowAuthModal(false)}
                setIsSignup={setIsSignup}
              />
            )}

            <p
              className="mt-2 text-sm text-center cursor-pointer text-blue-600"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup
                ? "Already have an account? Login"
                : "Don't have an account? Sign Up"}
            </p>

            <button
              className="w-full mt-2 text-gray-500"
              onClick={() => setShowAuthModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
