



// "use client";

// import { useState, useEffect, useRef, useMemo } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { Menu, X, ShoppingBag, Heart, User, Search, Eye, Phone } from "lucide-react";
// import { useCart } from "@/contexts/CartContext";
// import { useWishlist } from "@/contexts/WishlistContext";
// import { useAuth } from "@/contexts/authContext";
// import ThemeToggle from "@/components/ThemeToggle";
// import Image from "next/image";


// // Main Navbar Component
// const Navbar = () => {
//     const [isScrolled, setIsScrolled] = useState(false);
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const { user, logout } = useAuth();

//     const pathname = usePathname();
//     useEffect(() => {
//         setIsMenuOpen(false);
//     }, [pathname]);

//     useEffect(() => {
//         const handleScroll = () => setIsScrolled(window.scrollY > 20);
//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, []);

//     const navClass = isScrolled
//         ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-md"
//         : "bg-white dark:bg-gray-900";

//     return (
//         <>
//             <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navClass}`}>
//                 <div className="container mx-auto px-3 sm:px-6 lg:px-8">
//                     <div className="flex items-center justify-between h-16 sm:h-20">
//                         {/* Logo */}
//                         <Link href="/" className="flex items-center space-x-2 group">
//                             <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden flex items-center justify-center bg-white">
//                                 <Image
//                                     src="/logo.png"
//                                     alt="Chasmawala Logo"
//                                     width={40}
//                                     height={40}
//                                     className="object-contain"
//                                 />
//                             </div>

//                             <span className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
//                                 <span className="hidden xs:inline">Chasmawala</span>
//                                 <span className="xs:hidden">Chasmawala</span>
//                             </span>
//                         </Link>

//                         {/* Mobile Quick Nav - Only visible on mobile/tablet */}
//                         <MobileQuickNav />

//                         {/* Desktop Navigation */}
//                         <DesktopNav />

//                         {/* Action Icons & CTA */}
//                         <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
//                             <ActionIcons user={user} logout={logout} />

//                             {/* CTA Button - Hidden on mobile, shown on desktop */}
//                             <Link
//                                 href="/eye-test"
//                                 className="hidden lg:flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 xl:px-6 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
//                             >
//                                 <Eye size={18} />
//                                 <span>Free Eye Test</span>
//                             </Link>

//                             {/* Mobile Menu Toggle */}
//                             <button
//                                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                                 className="lg:hidden text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 p-2"
//                                 aria-label={isMenuOpen ? "Close menu" : "Open menu"}
//                             >
//                                 {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Mobile Navigation */}
//                 <MobileNav isOpen={isMenuOpen} user={user} logout={logout} onClose={() => setIsMenuOpen(false)} />
//             </header>
//             {/*<div className="h-16 sm:h-20" /> {/* Spacer */}
//         </>
//     );
// };

// // Mobile Quick Navigation - Home and Collections always visible
// const MobileQuickNav = () => {
//     const pathname = usePathname();

//     return (
//         <nav className="flex lg:hidden items-center space-x-1 sm:space-x-2">
//             <Link
//                 href="/"
//                 className={`flex items-center space-x-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${pathname === '/'
//                         ? 'bg-emerald-500 text-white shadow-md'
//                         : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
//                     }`}
//             >
//                 <span className="text-base sm:text-lg">🏠</span>
//                 <span className="hidden xs:inline">Home</span>
//             </Link>
//             <Link
//                 href="/collections"
//                 className={`flex items-center space-x-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${pathname === '/collections'
//                         ? 'bg-emerald-500 text-white shadow-md'
//                         : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
//                     }`}
//             >
//                 <span className="text-base sm:text-lg">👓</span>
//                 <span className="hidden xs:inline">Collections</span>
//             </Link>
//         </nav>
//     );
// };

// // Desktop Navigation
// const DesktopNav = () => {
//     const pathname = usePathname();
//     const navLinks = [
//         { name: "Home", href: "/" },
//         { name: "Collections", href: "/collections" },
//         { name: "Contact", href: "/contact" },
//     ];

//     return (
//         <nav className="hidden lg:flex items-center space-x-8">
//             {navLinks.map((link) => {
//                 const isActive = pathname === link.href;
//                 return (
//                     <Link
//                         key={link.name}
//                         href={link.href}
//                         className={`text-base font-medium transition-colors py-6 relative group ${isActive
//                                 ? 'text-emerald-600 dark:text-emerald-400'
//                                 : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400'
//                             }`}
//                     >
//                         {link.name}
//                         <span className={`absolute bottom-5 left-0 right-0 h-0.5 bg-emerald-600 dark:bg-emerald-400 transition-transform duration-200 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
//                             }`} />
//                     </Link>
//                 );
//             })}
//         </nav>
//     );
// };

// // Action Icons and User Auth
// const ActionIcons = ({ user, logout }) => {
//     const { cart } = useCart() || { cart: [] };
//     const { wishlistItems } = useWishlist() || { wishlistItems: [] };
//     const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
//     const [isSearchOpen, setIsSearchOpen] = useState(false);
//     const [searchQuery, setSearchQuery] = useState("");
//     const dropdownRef = useRef(null);
//     const searchInputRef = useRef(null);
//     const router = useRouter();

//     // Memoize counts for performance
//     const cartCount = useMemo(() => cart?.length || 0, [cart]);
//     const wishlistCount = useMemo(() => wishlistItems?.length || 0, [wishlistItems]);

//     // Auto-focus search input when opened
//     useEffect(() => {
//         if (isSearchOpen) {
//             searchInputRef.current?.focus();
//         }
//     }, [isSearchOpen]);

//     // Close dropdown on Escape key
//     useEffect(() => {
//         const handleEscape = (e) => {
//             if (e.key === 'Escape') {
//                 setIsUserDropdownOpen(false);
//                 setIsSearchOpen(false);
//             }
//         };
//         document.addEventListener('keydown', handleEscape);
//         return () => document.removeEventListener('keydown', handleEscape);
//     }, []);

//     // Close dropdown when clicking outside
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setIsUserDropdownOpen(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     const handleSearchSubmit = (e) => {
//         e.preventDefault();
//         if (searchQuery.trim()) {
//             router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
//             setIsSearchOpen(false);
//             setSearchQuery("");
//         }
//     };

//     return (
//         <div className="flex items-center space-x-2 sm:space-x-3">
//             {/* Search - Hidden on mobile */}
//             <div className="hidden md:flex items-center">
//                 {isSearchOpen ? (
//                     <form onSubmit={handleSearchSubmit} className="relative">
//                         <input
//                             ref={searchInputRef}
//                             type="text"
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                             onBlur={() => {
//                                 setTimeout(() => {
//                                     if (!searchQuery) setIsSearchOpen(false);
//                                 }, 200);
//                             }}
//                             placeholder="Search glasses..."
//                             className="w-48 xl:w-56 h-10 pl-4 pr-10 text-sm border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-300"
//                         />
//                         <button
//                             type="submit"
//                             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
//                             aria-label="Search"
//                         >
//                             <Search size={20} />
//                         </button>
//                     </form>
//                 ) : (
//                     <button
//                         onClick={() => setIsSearchOpen(true)}
//                         className="p-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
//                         aria-label="Open search"
//                     >
//                         <Search size={22} />
//                     </button>
//                 )}
//             </div>

//             {/* Wishlist - Hidden on extra small screens */}
//             <Link
//                 href="/wishlist"
//                 className="relative hidden sm:flex p-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
//                 aria-label="Wishlist"
//             >
//                 <Heart size={22} />
//                 {wishlistCount > 0 && <Badge count={wishlistCount} />}
//             </Link>

//             {/* Cart - Always visible */}
//             <Link
//                 href="/cart"
//                 className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
//                 aria-label="Shopping cart"
//             >
//                 <ShoppingBag size={22} />
//                 {cartCount > 0 && <Badge count={cartCount} />}
//             </Link>

//             {/* Theme Toggle - Hidden on mobile */}
//             <div className="hidden md:block">
//                 <ThemeToggle />
//             </div>

//             {/* User Account - Hidden on mobile */}
//             <div className="relative hidden lg:block" ref={dropdownRef}>
//                 {user ? (
//                     <>
//                         <button
//                             onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
//                             className="p-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
//                             aria-label="User menu"
//                         >
//                             <User size={22} />
//                         </button>
//                         <UserDropdown isOpen={isUserDropdownOpen} user={user} logout={logout} />
//                     </>
//                 ) : (
//                     <Link
//                         href="/account/login"
//                         className="bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-600 transition-colors"
//                     >
//                         Login
//                     </Link>
//                 )}
//             </div>
//         </div>
//     );
// };

// // Badge Component
// const Badge = ({ count }) => (
//     <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
//         {count > 99 ? '99+' : count}
//     </span>
// );

// // User Dropdown
// const UserDropdown = ({ isOpen, user, logout }) => {
//     const router = useRouter();
//     const handleLogout = async () => {
//         await logout();
//         router.push('/');
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="absolute top-full right-0 mt-4 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-fadeIn">
//             <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-700 dark:to-gray-700">
//                 <p className="font-semibold text-gray-800 dark:text-white truncate">{user?.name}</p>
//                 <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
//             </div>
//             <div className="py-2">
//                 <Link
//                     href="/account/profile"
//                     className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
//                 >
//                     My Profile
//                 </Link>
//                 <Link
//                     href="/orders"
//                     className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
//                 >
//                     My Orders
//                 </Link>
//                 <Link
//                     href="/wishlist"
//                     className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
//                 >
//                     My Wishlist
//                 </Link>
//             </div>
//             <div className="p-2 border-t border-gray-100 dark:border-gray-700">
//                 <button
//                     onClick={handleLogout}
//                     className="w-full text-left px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors font-medium"
//                 >
//                     Logout
//                 </button>
//             </div>
//         </div>
//     );
// };

// // Mobile Navigation Panel
// const MobileNav = ({ isOpen, user, logout, onClose }) => {
//     const router = useRouter();
//     const pathname = usePathname();

//     const navLinks = [
//         { name: "Home", href: "/", icon: "🏠" },
//         { name: "Collections", href: "/collections", icon: "👓" },
//         { name: "Contact", href: "/contact", icon: "📞" },
//     ];

//     const [searchQuery, setSearchQuery] = useState("");

//     const handleSearchSubmit = (e) => {
//         e.preventDefault();
//         if (searchQuery.trim()) {
//             router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
//             setSearchQuery("");
//             onClose();
//         }
//     };

//     const handleLogout = async () => {
//         await logout();
//         onClose();
//         router.push('/');
//     };

//     return (
//         <div
//             className={`lg:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg border-t border-gray-100 dark:border-gray-800 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
//                 }`}
//         >
//             <div className="p-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
//                 {/* CTA Button - Prominent in mobile menu */}
//                 <Link
//                     href="/eye-test"
//                     onClick={onClose}
//                     className="flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4 rounded-xl text-base font-semibold hover:shadow-lg transition-all duration-200 mb-4"
//                 >
//                     <Eye size={22} />
//                     <span>Book Free Eye Test</span>
//                 </Link>

//                 {/* Search bar for mobile */}
//                 <form onSubmit={handleSearchSubmit} className="relative mb-4">
//                     <input
//                         type="text"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         placeholder="Search glasses..."
//                         className="w-full h-12 pl-4 pr-12 text-base border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
//                     />
//                     <button
//                         type="submit"
//                         className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
//                         aria-label="Search"
//                     >
//                         <Search size={22} />
//                     </button>
//                 </form>

//                 {/* Navigation Links */}
//                 <nav className="flex flex-col space-y-1 mb-4">
//                     {navLinks.map((link) => {
//                         const isActive = pathname === link.href;
//                         return (
//                             <Link
//                                 key={link.name}
//                                 href={link.href}
//                                 onClick={onClose}
//                                 className={`flex items-center space-x-3 p-3 rounded-lg font-medium transition-colors ${isActive
//                                         ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
//                                         : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-emerald-600 dark:hover:text-emerald-400'
//                                     }`}
//                             >
//                                 <span className="text-xl">{link.icon}</span>
//                                 <span>{link.name}</span>
//                             </Link>
//                         );
//                     })}
//                 </nav>

//                 {/* Quick Actions */}
//                 <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-1">
//                     <Link
//                         href="/wishlist"
//                         onClick={onClose}
//                         className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-emerald-600 dark:hover:text-emerald-400 p-3 rounded-lg font-medium transition-colors"
//                     >
//                         <Heart size={20} />
//                         <span>My Wishlist</span>
//                     </Link>

//                     {/* Theme Toggle */}
//                     <div className="flex items-center space-x-3 p-3">
//                         <span className="text-gray-700 dark:text-gray-300 font-medium">Theme</span>
//                         <ThemeToggle />
//                     </div>

//                     {/* User Account Section */}
//                     {user ? (
//                         <>
//                             <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-800 p-3 rounded-lg mb-2">
//                                 <p className="font-semibold text-gray-800 dark:text-white text-sm">{user?.name}</p>
//                                 <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
//                             </div>
//                             <Link
//                                 href="/account/profile"
//                                 onClick={onClose}
//                                 className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-emerald-600 dark:hover:text-emerald-400 p-3 rounded-lg font-medium transition-colors"
//                             >
//                                 <User size={20} />
//                                 <span>My Account</span>
//                             </Link>
//                             <Link
//                                 href="/orders"
//                                 onClick={onClose}
//                                 className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-emerald-600 dark:hover:text-emerald-400 p-3 rounded-lg font-medium transition-colors"
//                             >
//                                 <ShoppingBag size={20} />
//                                 <span>My Orders</span>
//                             </Link>
//                             <button
//                                 onClick={handleLogout}
//                                 className="w-full flex items-center space-x-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 p-3 rounded-lg font-medium transition-colors"
//                             >
//                                 <span className="text-xl">🚪</span>
//                                 <span>Logout</span>
//                             </button>
//                         </>
//                     ) : (
//                         <Link
//                             href="/account/login"
//                             onClick={onClose}
//                             className="flex items-center justify-center bg-emerald-500 text-white hover:bg-emerald-600 p-3 rounded-lg font-semibold transition-colors"
//                         >
//                             Login / Signup
//                         </Link>
//                     )}
//                 </div>

//                 {/* Contact CTA */}
//                 <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
//                     <a
//                         href="tel:+9779744364817"
//                         className="flex items-center justify-center space-x-2 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 p-3 rounded-lg font-medium transition-colors"
//                     >
//                         <Phone size={20} />
//                         <span>Call Us: +9779744364817 </span>
//                     </a>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Navbar;







"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ShoppingBag, Heart, User, Search, Eye, Phone, ChevronDown, LogOut, Package } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/contexts/authContext";
import ThemeToggle from "@/components/ThemeToggle";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────────
   STYLES  (injected once via a tiny <style> tag)
───────────────────────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=Playfair+Display:wght@500;600&display=swap');

  :root {
    --nav-font: 'DM Sans', sans-serif;
    --nav-display-font: 'Playfair Display', serif;
    --emerald: #10b981;
    --emerald-dark: #059669;
    --emerald-light: #d1fae5;
    --teal: #0d9488;
    --nav-height: 68px;
  }

  @media (min-width: 640px) {
    :root { --nav-height: 76px; }
  }

  /* Nav wrapper */
  .cw-nav {
    font-family: var(--nav-font);
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 9999;
    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .cw-nav.scrolled {
    box-shadow: 0 1px 0 rgba(0,0,0,0.06), 0 4px 24px rgba(0,0,0,0.08);
  }

  /* Frosted inner bar */
  .cw-bar {
    backdrop-filter: blur(18px) saturate(180%);
    -webkit-backdrop-filter: blur(18px) saturate(180%);
    background: rgba(255,255,255,0.88);
    border-bottom: 1px solid rgba(0,0,0,0.07);
    transition: background 0.35s;
  }

  .dark .cw-bar {
    background: rgba(15,23,42,0.88);
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }

  /* Logo wordmark */
  .cw-logo-text {
    font-family: var(--nav-display-font);
    font-weight: 600;
    font-size: 1.35rem;
    letter-spacing: -0.01em;
    background: linear-gradient(135deg, #064e3b 0%, var(--emerald) 60%, var(--teal) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transition: opacity 0.2s;
  }

  .dark .cw-logo-text {
    background: linear-gradient(135deg, #6ee7b7, var(--emerald), #5eead4);
    -webkit-background-clip: text;
    background-clip: text;
  }

  /* Desktop nav link */
  .cw-link {
    position: relative;
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: 0.01em;
    color: #374151;
    text-decoration: none;
    padding: 6px 0;
    transition: color 0.2s;
  }

  .dark .cw-link { color: #d1d5db; }

  .cw-link::after {
    content: '';
    position: absolute;
    bottom: -2px; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--emerald), var(--teal));
    border-radius: 99px;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.25s cubic-bezier(0.4,0,0.2,1);
  }

  .cw-link:hover, .cw-link.active { color: var(--emerald-dark); }
  .dark .cw-link:hover, .dark .cw-link.active { color: #34d399; }
  .cw-link:hover::after, .cw-link.active::after { transform: scaleX(1); }

  /* CTA pill */
  .cw-cta {
    display: flex;
    align-items: center;
    gap: 7px;
    background: linear-gradient(135deg, var(--emerald) 0%, var(--teal) 100%);
    color: #fff;
    font-weight: 600;
    font-size: 0.85rem;
    letter-spacing: 0.02em;
    padding: 9px 20px;
    border-radius: 999px;
    border: none;
    cursor: pointer;
    text-decoration: none;
    box-shadow: 0 2px 12px rgba(16,185,129,0.35);
    transition: transform 0.18s, box-shadow 0.18s;
    white-space: nowrap;
  }

  .cw-cta:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(16,185,129,0.45);
  }

  /* Icon button */
  .cw-icon-btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px; height: 40px;
    border-radius: 10px;
    border: none;
    background: transparent;
    color: #4b5563;
    cursor: pointer;
    text-decoration: none;
    transition: background 0.18s, color 0.18s, transform 0.18s;
  }

  .dark .cw-icon-btn { color: #9ca3af; }

  .cw-icon-btn:hover {
    background: rgba(16,185,129,0.1);
    color: var(--emerald-dark);
    transform: translateY(-1px);
  }

  .dark .cw-icon-btn:hover {
    background: rgba(52,211,153,0.12);
    color: #34d399;
  }

  /* Badge */
  .cw-badge {
    position: absolute;
    top: 2px; right: 2px;
    min-width: 18px; height: 18px;
    padding: 0 4px;
    background: var(--emerald);
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    border-radius: 99px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 0 2px rgba(255,255,255,0.9);
  }

  .dark .cw-badge { box-shadow: 0 0 0 2px rgba(15,23,42,0.9); }

  /* Search bar */
  .cw-search-input {
    height: 38px;
    padding: 0 38px 0 14px;
    border-radius: 10px;
    border: 1.5px solid rgba(16,185,129,0.3);
    background: rgba(255,255,255,0.9);
    color: #111;
    font-family: var(--nav-font);
    font-size: 0.85rem;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, width 0.3s;
    width: 200px;
  }

  .dark .cw-search-input {
    background: rgba(30,41,59,0.9);
    color: #f1f5f9;
    border-color: rgba(52,211,153,0.25);
  }

  .cw-search-input:focus {
    border-color: var(--emerald);
    box-shadow: 0 0 0 3px rgba(16,185,129,0.15);
    width: 240px;
  }

  /* User dropdown */
  .cw-dropdown {
    position: absolute;
    top: calc(100% + 12px);
    right: 0;
    width: 220px;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
    border: 1px solid rgba(0,0,0,0.06);
    overflow: hidden;
    animation: cw-fadeDown 0.2s cubic-bezier(0.4,0,0.2,1);
    transform-origin: top right;
  }

  .dark .cw-dropdown {
    background: #1e293b;
    border-color: rgba(255,255,255,0.08);
    box-shadow: 0 8px 40px rgba(0,0,0,0.4);
  }

  @keyframes cw-fadeDown {
    from { opacity: 0; transform: translateY(-8px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  .cw-dropdown-header {
    padding: 14px 16px;
    background: linear-gradient(135deg, #ecfdf5, #f0fdfa);
    border-bottom: 1px solid rgba(0,0,0,0.05);
  }

  .dark .cw-dropdown-header {
    background: linear-gradient(135deg, rgba(16,185,129,0.1), rgba(13,148,136,0.1));
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .cw-dropdown-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 16px;
    font-size: 0.875rem;
    color: #374151;
    text-decoration: none;
    transition: background 0.15s, color 0.15s;
    cursor: pointer;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    font-family: var(--nav-font);
  }

  .dark .cw-dropdown-item { color: #d1d5db; }
  .cw-dropdown-item:hover { background: rgba(16,185,129,0.07); color: var(--emerald-dark); }
  .dark .cw-dropdown-item:hover { background: rgba(52,211,153,0.1); color: #34d399; }

  .cw-dropdown-item.danger { color: #ef4444; }
  .cw-dropdown-item.danger:hover { background: rgba(239,68,68,0.07); color: #dc2626; }

  /* ── Mobile drawer ─────────────────────────── */
  .cw-drawer {
    position: fixed;
    inset: 0;
    top: var(--nav-height);
    z-index: 9998;
    pointer-events: none;
  }

  .cw-drawer-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0);
    backdrop-filter: blur(0px);
    transition: background 0.3s, backdrop-filter 0.3s;
  }

  .cw-drawer.open .cw-drawer-overlay {
    background: rgba(0,0,0,0.3);
    backdrop-filter: blur(4px);
    pointer-events: all;
  }

  .cw-drawer-panel {
    position: absolute;
    top: 0; left: 0; right: 0;
    max-height: calc(100vh - var(--nav-height));
    background: #fff;
    overflow-y: auto;
    transform: translateY(-100%);
    opacity: 0;
    transition: transform 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.32s;
    pointer-events: none;
    border-bottom-left-radius: 24px;
    border-bottom-right-radius: 24px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.15);
  }

  .dark .cw-drawer-panel {
    background: #0f172a;
  }

  .cw-drawer.open .cw-drawer-panel {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }

  /* Mobile search */
  .cw-mobile-search {
    width: 100%;
    height: 48px;
    padding: 0 48px 0 16px;
    border-radius: 12px;
    border: 1.5px solid #e5e7eb;
    background: #f9fafb;
    font-family: var(--nav-font);
    font-size: 0.95rem;
    color: #111;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .dark .cw-mobile-search {
    background: #1e293b;
    border-color: rgba(255,255,255,0.1);
    color: #f1f5f9;
  }

  .cw-mobile-search:focus {
    border-color: var(--emerald);
    box-shadow: 0 0 0 3px rgba(16,185,129,0.12);
  }

  /* Mobile nav link */
  .cw-mobile-link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 12px;
    font-size: 0.95rem;
    font-weight: 500;
    color: #374151;
    text-decoration: none;
    transition: background 0.15s, color 0.15s;
    cursor: pointer;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    font-family: var(--nav-font);
  }

  .dark .cw-mobile-link { color: #d1d5db; }
  .cw-mobile-link:hover { background: rgba(16,185,129,0.08); color: var(--emerald-dark); }
  .dark .cw-mobile-link:hover { background: rgba(52,211,153,0.1); color: #34d399; }
  .cw-mobile-link.active { background: rgba(16,185,129,0.1); color: var(--emerald-dark); }
  .dark .cw-mobile-link.active { background: rgba(52,211,153,0.1); color: #34d399; }
  .cw-mobile-link.danger { color: #ef4444; }
  .cw-mobile-link.danger:hover { background: rgba(239,68,68,0.07); }

  /* Divider */
  .cw-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent);
    margin: 8px 0;
  }

  .dark .cw-divider {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
  }

  /* User pill in mobile */
  .cw-user-pill {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    background: linear-gradient(135deg, #ecfdf5, #f0fdfa);
    border-radius: 14px;
    margin-bottom: 4px;
  }

  .dark .cw-user-pill {
    background: linear-gradient(135deg, rgba(16,185,129,0.12), rgba(13,148,136,0.12));
  }

  .cw-user-avatar {
    width: 36px; height: 36px;
    border-radius: 99px;
    background: linear-gradient(135deg, var(--emerald), var(--teal));
    display: flex; align-items: center; justify-content: center;
    color: #fff;
    font-weight: 700;
    font-size: 0.95rem;
    flex-shrink: 0;
  }

  /* Hamburger animation */
  .cw-hamburger { 
    display: flex; flex-direction: column; justify-content: center;
    width: 40px; height: 40px; gap: 5px;
    border: none; background: none; cursor: pointer; padding: 8px;
    border-radius: 10px; transition: background 0.18s;
  }
  .cw-hamburger:hover { background: rgba(16,185,129,0.1); }
  .cw-hamburger span {
    display: block; height: 2px; border-radius: 99px;
    background: #374151;
    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s, width 0.3s;
  }
  .dark .cw-hamburger span { background: #d1d5db; }
  .cw-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .cw-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .cw-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* Call strip */
  .cw-call-strip {
    display: flex; align-items: center; justify-content: center;
    gap: 8px; padding: 12px 16px;
    background: linear-gradient(135deg, rgba(16,185,129,0.06), rgba(13,148,136,0.06));
    border-radius: 12px;
    color: var(--emerald-dark);
    font-weight: 500;
    font-size: 0.875rem;
    text-decoration: none;
    transition: background 0.18s;
  }

  .dark .cw-call-strip { color: #34d399; background: rgba(52,211,153,0.08); }
  .cw-call-strip:hover { background: rgba(16,185,129,0.12); }
  .dark .cw-call-strip:hover { background: rgba(52,211,153,0.14); }
`;

/* ─────────────────────────────────────────────────────────────
   Badge
───────────────────────────────────────────────────────────── */
const Badge = ({ count }) => (
  <span className="cw-badge">{count > 99 ? "99+" : count}</span>
);

/* ─────────────────────────────────────────────────────────────
   User Dropdown
───────────────────────────────────────────────────────────── */
const UserDropdown = ({ isOpen, user, logout }) => {
  const router = useRouter();
  if (!isOpen) return null;

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const initial = user?.name?.[0]?.toUpperCase() || "U";

  return (
    <div className="cw-dropdown">
      <div className="cw-dropdown-header">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="cw-user-avatar">{initial}</div>
          <div style={{ overflow: "hidden" }}>
            <p style={{ fontWeight: 600, fontSize: "0.875rem", color: "inherit", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user?.name}
            </p>
            <p style={{ fontSize: "0.75rem", color: "#6b7280", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user?.email}
            </p>
          </div>
        </div>
      </div>
      <div style={{ padding: "6px" }}>
        <Link href="/account/profile" className="cw-dropdown-item">
          <User size={15} /> My Profile
        </Link>
        <Link href="/orders" className="cw-dropdown-item">
          <Package size={15} /> My Orders
        </Link>
        <Link href="/wishlist" className="cw-dropdown-item">
          <Heart size={15} /> Wishlist
        </Link>
        <div className="cw-divider" />
        <button onClick={handleLogout} className="cw-dropdown-item danger">
          <LogOut size={15} /> Logout
        </button>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   Mobile Drawer
───────────────────────────────────────────────────────────── */
const MobileDrawer = ({ isOpen, user, logout, onClose }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { name: "Home", href: "/", icon: "🏠" },
    { name: "Collections", href: "/collections", icon: "👓" },
    { name: "Contact", href: "/contact", icon: "📞" },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      onClose();
    }
  };

  const handleLogout = async () => {
    await logout();
    onClose();
    router.push("/");
  };

  const initial = user?.name?.[0]?.toUpperCase() || "U";

  return (
    <div className={`cw-drawer${isOpen ? " open" : ""}`}>
      <div className="cw-drawer-overlay" onClick={onClose} />
      <div className="cw-drawer-panel">
        <div style={{ padding: "16px" }}>
          {/* CTA */}
          <Link
            href="/eye-test"
            onClick={onClose}
            className="cw-cta"
            style={{ justifyContent: "center", marginBottom: 14, display: "flex" }}
          >
            <Eye size={18} />
            Book Free Eye Test
          </Link>

          {/* Search */}
          <form onSubmit={handleSearchSubmit} style={{ position: "relative", marginBottom: 14 }}>
            <input
              className="cw-mobile-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search glasses..."
            />
            <button
              type="submit"
              style={{
                position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer", color: "#6b7280", display: "flex"
              }}
            >
              <Search size={20} />
            </button>
          </form>

          {/* Nav Links */}
          <nav style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 8 }}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={onClose}
                className={`cw-mobile-link${pathname === link.href ? " active" : ""}`}
              >
                <span style={{ fontSize: "1.2rem" }}>{link.icon}</span>
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="cw-divider" />

          {/* Quick Actions */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 8 }}>
            <Link href="/wishlist" onClick={onClose} className="cw-mobile-link">
              <Heart size={18} /> My Wishlist
            </Link>
            <div className="cw-mobile-link" style={{ cursor: "default" }}>
              <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>Theme</span>
              <ThemeToggle />
            </div>
          </div>

          <div className="cw-divider" />

          {/* Auth Section */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 8 }}>
            {user ? (
              <>
                <div className="cw-user-pill">
                  <div className="cw-user-avatar">{initial}</div>
                  <div style={{ overflow: "hidden" }}>
                    <p style={{ fontWeight: 600, fontSize: "0.875rem", margin: 0, color: "var(--emerald-dark)" }}>{user?.name}</p>
                    <p style={{ fontSize: "0.75rem", color: "#6b7280", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.email}</p>
                  </div>
                </div>
                <Link href="/account/profile" onClick={onClose} className="cw-mobile-link">
                  <User size={18} /> My Account
                </Link>
                <Link href="/orders" onClick={onClose} className="cw-mobile-link">
                  <Package size={18} /> My Orders
                </Link>
                <button onClick={handleLogout} className="cw-mobile-link danger">
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <Link
                href="/account/login"
                onClick={onClose}
                className="cw-cta"
                style={{ justifyContent: "center", display: "flex" }}
              >
                <User size={18} /> Login / Signup
              </Link>
            )}
          </div>

          {/* Call strip */}
          <div style={{ marginTop: 16 }}>
            <a href="tel:+9779744364817" className="cw-call-strip">
              <Phone size={16} />
              +977 9744364817
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   MAIN NAVBAR
───────────────────────────────────────────────────────────── */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cart } = useCart() || { cart: [] };
  const { wishlistItems } = useWishlist() || { wishlistItems: [] };
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const cartCount = useMemo(() => cart?.length || 0, [cart]);
  const wishlistCount = useMemo(() => wishlistItems?.length || 0, [wishlistItems]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/collections" },
    { name: "Contact", href: "/contact" },
  ];

  // Close menu on route change
  useEffect(() => { setIsMenuOpen(false); }, [pathname]);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-focus search
  useEffect(() => {
    if (isSearchOpen) searchInputRef.current?.focus();
  }, [isSearchOpen]);

  // Escape key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") {
        setIsUserDropdownOpen(false);
        setIsSearchOpen(false);
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Click outside dropdown
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Inject styles once */}
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <header className={`cw-nav${isScrolled ? " scrolled" : ""}`}>
        <div className="cw-bar">
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 16px" }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              height: "var(--nav-height)"
            }}>

              {/* ── Logo ── */}
              <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10, overflow: "hidden",
                  background: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}>
                  <Image src="/logo.png" alt="Chasmawala" width={38} height={38} style={{ objectFit: "contain" }} />
                </div>
                <span className="cw-logo-text">Chasmawala</span>
              </Link>

              {/* ── Desktop Nav ── */}
              <nav style={{ display: "none", alignItems: "center", gap: 36 }} className="cw-desktop-nav">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`cw-link${pathname === link.href ? " active" : ""}`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              {/* ── Right Actions ── */}
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>

                {/* Search - desktop */}
                <div className="cw-desktop-only" style={{ display: "flex", alignItems: "center" }}>
                  {isSearchOpen ? (
                    <form onSubmit={handleSearchSubmit} style={{ position: "relative" }}>
                      <input
                        ref={searchInputRef}
                        className="cw-search-input"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onBlur={() => { if (!searchQuery) setTimeout(() => setIsSearchOpen(false), 200); }}
                        placeholder="Search glasses..."
                      />
                      <button type="submit" style={{
                        position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                        background: "none", border: "none", cursor: "pointer", color: "#9ca3af", display: "flex"
                      }}>
                        <Search size={16} />
                      </button>
                    </form>
                  ) : (
                    <button className="cw-icon-btn" onClick={() => setIsSearchOpen(true)} aria-label="Search">
                      <Search size={20} />
                    </button>
                  )}
                </div>

                {/* Wishlist */}
                <Link href="/wishlist" className="cw-icon-btn cw-sm-only" aria-label="Wishlist">
                  <Heart size={20} />
                  {wishlistCount > 0 && <Badge count={wishlistCount} />}
                </Link>

                {/* Cart */}
                <Link href="/cart" className="cw-icon-btn" aria-label="Cart">
                  <ShoppingBag size={20} />
                  {cartCount > 0 && <Badge count={cartCount} />}
                </Link>

                {/* Theme toggle - desktop */}
                <div className="cw-desktop-only">
                  <ThemeToggle />
                </div>

                {/* User - desktop */}
                <div className="cw-desktop-only" ref={dropdownRef} style={{ position: "relative" }}>
                  {user ? (
                    <button
                      className="cw-icon-btn"
                      onClick={() => setIsUserDropdownOpen((v) => !v)}
                      aria-label="Account"
                    >
                      <User size={20} />
                    </button>
                  ) : (
                    <Link href="/account/login" className="cw-cta" style={{ padding: "8px 18px" }}>
                      Login
                    </Link>
                  )}
                  <UserDropdown isOpen={isUserDropdownOpen} user={user} logout={logout} />
                </div>

                {/* CTA - desktop */}
                <div className="cw-lg-only" style={{ marginLeft: 4 }}>
                  <Link href="/eye-test" className="cw-cta">
                    <Eye size={16} />
                    Free Eye Test
                  </Link>
                </div>

                {/* Hamburger - mobile */}
                <button
                  className={`cw-hamburger cw-mobile-toggle${isMenuOpen ? " open" : ""}`}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                  <span />
                  <span />
                  <span />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMenuOpen}
        user={user}
        logout={logout}
        onClose={() => setIsMenuOpen(false)}
      />

      {/* Responsive show/hide helpers */}
      <style>{`
        .cw-desktop-nav { display: none !important; }
        .cw-desktop-only { display: none !important; }
        .cw-lg-only { display: none !important; }
        .cw-sm-only { display: none !important; }
        .cw-mobile-toggle { display: flex !important; }

        @media (min-width: 640px) {
          .cw-sm-only { display: flex !important; }
        }
        @media (min-width: 768px) {
          .cw-desktop-only { display: flex !important; }
        }
        @media (min-width: 1024px) {
          .cw-desktop-nav { display: flex !important; }
          .cw-lg-only { display: flex !important; }
          .cw-mobile-toggle { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;