// "use client";

// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { Menu, X, ShoppingCart, Heart, User, Search } from "lucide-react";
// import { useCart } from "@/contexts/CartContext";
// import { useWishlist } from "@/contexts/WishlistContext";
// import { useAuth } from "@/contexts/authContext";
// import ThemeToggle from "@/components/ThemeToggle";

// // Main Navbar Component
// const Navbar = () => {
//     const [isScrolled, setIsScrolled] = useState(false);
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const { user, logout } = useAuth();
//     const [isClient, setIsClient] = useState(false);

//     useEffect(() => {
//         setIsClient(true);
//     }, []);

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
//         ? "bg-white/90 backdrop-blur-lg shadow-md"
//         : "bg-white";

//     return (
//         <>
//             <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navClass}`}>
//                 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex items-center justify-between h-20">
//                         {/* Logo */}
//                         <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-emerald-600 transition-colors">
//                             Chasmawala
//                         </Link>

//                         {/* Desktop Navigation */}
//                         <DesktopNav />

//                         {/* Action Icons & Auth */}
//                         <div className="flex items-center space-x-3 sm:space-x-4">
//                             <ActionIcons user={user} logout={logout} />
//                             <div className="lg:hidden">
//                                 <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-emerald-600">
//                                     {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 {/* Mobile Navigation */}
//                 <MobileNav isOpen={isMenuOpen} user={user} logout={logout} />
//             </header>
//             <div className="h-20" /> {/* Spacer */}
//         </>
//     );
// };

// // Desktop Navigation (No changes needed)
// const DesktopNav = () => {
//     const navLinks = [
//         { name: "Home", href: "/" },
//         { name: "Collections", href: "/collections" },
//         { name: "Eye Test", href: "/eye-test" },
//         { name: "Contact", href: "/contact" },
//     ];
//     return (
//         <nav className="hidden lg:flex items-center space-x-8">
//             {navLinks.map((link) => (
//                 <Link key={link.name} href={link.href} className="text-base font-medium text-gray-600 hover:text-emerald-600 transition-colors py-6">
//                     {link.name}
//                 </Link>
//             ))}
//         </nav>
//     );
// };


// // Action Icons and User Auth
// const ActionIcons = ({ user, logout }) => {
//     const { cart } = useCart() || { cart: [] };
//     const { wishlistItems } = useWishlist() || { wishlistItems: [] };
//     const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
//     const dropdownRef = useRef(null);
//     const [isSearchOpen, setIsSearchOpen] = useState(false);
//     const [searchQuery, setSearchQuery] = useState("");
//     const router = useRouter();
//     const searchInputRef = useRef(null);

//     useEffect(() => {
//         if (isSearchOpen) {
//             searchInputRef.current?.focus();
//         }
//     }, [isSearchOpen]);

//     const handleSearchSubmit = (e) => {
//         e.preventDefault();
//         if (searchQuery.trim()) {
//             router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
//             setIsSearchOpen(false);
//             setSearchQuery("");
//         }
//     };

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setIsUserDropdownOpen(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     return (
//         <div className="flex items-center space-x-3 sm:space-x-4">
//             {/* FIX: Search icon and bar now hidden on extra-small screens (below sm breakpoint) */}
//             <div className="hidden sm:flex items-center">
//                 {isSearchOpen ? (
//                     <form onSubmit={handleSearchSubmit} className="relative">
//                         <input
//                             ref={searchInputRef}
//                             type="text"
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                             onBlur={() => { if (!searchQuery) setIsSearchOpen(false) }}
//                             placeholder="Search glasses..."
//                             className="w-48 h-10 pl-4 pr-10 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-300"
//                         />
//                         <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600">
//                             <Search size={20} />
//                         </button>
//                     </form>
//                 ) : (
//                     <button onClick={() => setIsSearchOpen(true)} className="text-gray-600 hover:text-emerald-600">
//                         <Search size={22} />
//                     </button>
//                 )}
//             </div>

//             {/* FIX: Wishlist icon now hidden on extra-small screens */}
//             <Link href="/wishlist" className="relative hidden sm:inline-flex text-gray-600 hover:text-emerald-600">
//                 <Heart size={22} />
//                 {wishlistItems.length > 0 && <Badge count={wishlistItems.length} />}
//             </Link>

//             {/* Cart icon remains visible on all screen sizes */}
//             <Link href="/cart" className="relative text-gray-600 hover:text-emerald-600">
//                 <ShoppingCart size={22} />
//                 {cart.length > 0 && <Badge count={cart.length} />}
//             </Link>

//             {/* FIX: User icon/login button now hidden on smaller screens (below lg breakpoint) */}
//             <div className="relative hidden lg:block" ref={dropdownRef}>
//                 {user ? (
//                     <>
//                         <button onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} className="text-gray-600 hover:text-emerald-600">
//                             <User size={22} />
//                         </button>
//                         <UserDropdown isOpen={isUserDropdownOpen} user={user} logout={logout} />
//                     </>
//                 ) : (
//                     <Link href="/account/login" className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-600 transition-colors">
//                         Login
//                     </Link>
//                 )}
//             </div>
//         </div>
//     );
// };

// // Badge Component (No changes)
// const Badge = ({ count }) => (
//     <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
//         {count}
//     </span>
// );

// // User Dropdown (No changes)
// const UserDropdown = ({ isOpen, user, logout }) => {
//     const router = useRouter();
//     const handleLogout = async () => {
//         await logout();
//         router.push('/');
//     };
//     if (!isOpen) return null;
//     return (
//         <div className="absolute top-full right-0 mt-4 w-56 bg-white rounded-lg shadow-2xl border border-gray-100">
//             <div className="p-4 border-b">
//                 <p className="font-semibold text-gray-800">{user?.name}</p>
//                 <p className="text-xs text-gray-500">{user?.email}</p>
//             </div>
//             <div className="py-2">
//                 <Link href="/account/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-emerald-600">My Profile</Link>
//                 <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-emerald-600">My Orders</Link>
//             </div>
//             <div className="p-2">
//                 <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md">
//                     Logout
//                 </button>
//             </div>
//         </div>
//     );
// };

// // Mobile Navigation Panel
// const MobileNav = ({ isOpen, user, logout }) => {
//     const router = useRouter();
//     const navLinks = [
//         { name: "Home", href: "/" },
//         { name: "Collections", href: "/collections" },
//         { name: "Eye Test", href: "/eye-test" },
//         { name: "Contact", href: "/contact" },
//     ];

//     // ADDED: State and handler for mobile search
//     const [searchQuery, setSearchQuery] = useState("");
//     const handleSearchSubmit = (e) => {
//         e.preventDefault();
//         if (searchQuery.trim()) {
//             router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
//             setSearchQuery("");
//         }
//     };

//     return (
//         <div className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-lg transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-0' : '-translate-y-[120%]'}`}>
//             <div className="p-4">
//                  {/* ADDED: Search bar for mobile view */}
//                 <form onSubmit={handleSearchSubmit} className="relative mb-4">
//                     <input
//                         type="text"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         placeholder="Search glasses..."
//                         className="w-full h-12 pl-4 pr-12 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
//                     />
//                     <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600">
//                         <Search size={22} />
//                     </button>
//                 </form>

//                 <nav className="flex flex-col space-y-2">
//                     {navLinks.map((link) => (
//                         <Link key={link.name} href={link.href} className="text-gray-700 hover:bg-gray-100 hover:text-emerald-600 p-3 rounded-md font-medium">
//                             {link.name}
//                         </Link>
//                     ))}

//                     <div className="border-t pt-4 mt-2 space-y-2">
//                          {/* ADDED: Wishlist link for mobile view */}
//                          <Link href="/wishlist" className="flex items-center text-gray-700 hover:bg-gray-100 hover:text-emerald-600 p-3 rounded-md font-medium">
//                              <Heart className="mr-3" size={20} /> My Wishlist
//                          </Link>

//                         {user ? (
//                             <>
//                                 <Link href="/account/profile" className="flex items-center text-gray-700 hover:bg-gray-100 hover:text-emerald-600 p-3 rounded-md font-medium">
//                                     <User className="mr-3" size={20} /> My Account
//                                 </Link>
//                                 <button onClick={logout} className="w-full text-left text-red-600 hover:bg-red-50 p-3 rounded-md font-medium">
//                                     Logout
//                                 </button>
//                             </>
//                         ) : (
//                             <Link href="/account/login" className="flex items-center justify-center bg-emerald-500 text-white hover:bg-emerald-600 p-3 rounded-md font-semibold">
//                                 Login / Signup
//                             </Link>
//                         )}
//                     </div>
//                 </nav>
//             </div>
//         </div>
//     );
// };

// export default Navbar;



"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ShoppingCart, Heart, User, Search, Eye, Phone } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/contexts/authContext";
import ThemeToggle from "@/components/ThemeToggle";
import Image from "next/image";


// Main Navbar Component
const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    const pathname = usePathname();
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navClass = isScrolled
        ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-md"
        : "bg-white dark:bg-gray-900";

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navClass}`}>
                <div className="container mx-auto px-3 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 sm:h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-2 group">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden flex items-center justify-center bg-white">
                                <Image
                                    src="/logo.png"
                                    alt="Chasmawala Logo"
                                    width={40}
                                    height={40}
                                    className="object-contain"
                                />
                            </div>

                            <span className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                <span className="hidden xs:inline">Chasmawala</span>
                                <span className="xs:hidden">Chasmawala</span>
                            </span>
                        </Link>

                        {/* Mobile Quick Nav - Only visible on mobile/tablet */}
                        <MobileQuickNav />

                        {/* Desktop Navigation */}
                        <DesktopNav />

                        {/* Action Icons & CTA */}
                        <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
                            <ActionIcons user={user} logout={logout} />

                            {/* CTA Button - Hidden on mobile, shown on desktop */}
                            <Link
                                href="/eye-test"
                                className="hidden lg:flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 xl:px-6 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
                            >
                                <Eye size={18} />
                                <span>Free Eye Test</span>
                            </Link>

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="lg:hidden text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 p-2"
                                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <MobileNav isOpen={isMenuOpen} user={user} logout={logout} onClose={() => setIsMenuOpen(false)} />
            </header>
            {/*<div className="h-16 sm:h-20" /> {/* Spacer */}
        </>
    );
};

// Mobile Quick Navigation - Home and Collections always visible
const MobileQuickNav = () => {
    const pathname = usePathname();

    return (
        <nav className="flex lg:hidden items-center space-x-1 sm:space-x-2">
            <Link
                href="/"
                className={`flex items-center space-x-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${pathname === '/'
                        ? 'bg-emerald-500 text-white shadow-md'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
            >
                <span className="text-base sm:text-lg">🏠</span>
                <span className="hidden xs:inline">Home</span>
            </Link>
            <Link
                href="/collections"
                className={`flex items-center space-x-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${pathname === '/collections'
                        ? 'bg-emerald-500 text-white shadow-md'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
            >
                <span className="text-base sm:text-lg">👓</span>
                <span className="hidden xs:inline">Collections</span>
            </Link>
        </nav>
    );
};

// Desktop Navigation
const DesktopNav = () => {
    const pathname = usePathname();
    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Collections", href: "/collections" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={`text-base font-medium transition-colors py-6 relative group ${isActive
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400'
                            }`}
                    >
                        {link.name}
                        <span className={`absolute bottom-5 left-0 right-0 h-0.5 bg-emerald-600 dark:bg-emerald-400 transition-transform duration-200 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                            }`} />
                    </Link>
                );
            })}
        </nav>
    );
};

// Action Icons and User Auth
const ActionIcons = ({ user, logout }) => {
    const { cart } = useCart() || { cart: [] };
    const { wishlistItems } = useWishlist() || { wishlistItems: [] };
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const dropdownRef = useRef(null);
    const searchInputRef = useRef(null);
    const router = useRouter();

    // Memoize counts for performance
    const cartCount = useMemo(() => cart?.length || 0, [cart]);
    const wishlistCount = useMemo(() => wishlistItems?.length || 0, [wishlistItems]);

    // Auto-focus search input when opened
    useEffect(() => {
        if (isSearchOpen) {
            searchInputRef.current?.focus();
        }
    }, [isSearchOpen]);

    // Close dropdown on Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setIsUserDropdownOpen(false);
                setIsSearchOpen(false);
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsUserDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
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
        <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search - Hidden on mobile */}
            <div className="hidden md:flex items-center">
                {isSearchOpen ? (
                    <form onSubmit={handleSearchSubmit} className="relative">
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onBlur={() => {
                                setTimeout(() => {
                                    if (!searchQuery) setIsSearchOpen(false);
                                }, 200);
                            }}
                            placeholder="Search glasses..."
                            className="w-48 xl:w-56 h-10 pl-4 pr-10 text-sm border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-300"
                        />
                        <button
                            type="submit"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                            aria-label="Search"
                        >
                            <Search size={20} />
                        </button>
                    </form>
                ) : (
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="p-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                        aria-label="Open search"
                    >
                        <Search size={22} />
                    </button>
                )}
            </div>

            {/* Wishlist - Hidden on extra small screens */}
            <Link
                href="/wishlist"
                className="relative hidden sm:flex p-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                aria-label="Wishlist"
            >
                <Heart size={22} />
                {wishlistCount > 0 && <Badge count={wishlistCount} />}
            </Link>

            {/* Cart - Always visible */}
            <Link
                href="/cart"
                className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                aria-label="Shopping cart"
            >
                <ShoppingCart size={22} />
                {cartCount > 0 && <Badge count={cartCount} />}
            </Link>

            {/* Theme Toggle - Hidden on mobile */}
            <div className="hidden md:block">
                <ThemeToggle />
            </div>

            {/* User Account - Hidden on mobile */}
            <div className="relative hidden lg:block" ref={dropdownRef}>
                {user ? (
                    <>
                        <button
                            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                            className="p-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                            aria-label="User menu"
                        >
                            <User size={22} />
                        </button>
                        <UserDropdown isOpen={isUserDropdownOpen} user={user} logout={logout} />
                    </>
                ) : (
                    <Link
                        href="/account/login"
                        className="bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-600 transition-colors"
                    >
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

// Badge Component
const Badge = ({ count }) => (
    <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
        {count > 99 ? '99+' : count}
    </span>
);

// User Dropdown
const UserDropdown = ({ isOpen, user, logout }) => {
    const router = useRouter();
    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    if (!isOpen) return null;

    return (
        <div className="absolute top-full right-0 mt-4 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-fadeIn">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-700 dark:to-gray-700">
                <p className="font-semibold text-gray-800 dark:text-white truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
            </div>
            <div className="py-2">
                <Link
                    href="/account/profile"
                    className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                    My Profile
                </Link>
                <Link
                    href="/orders"
                    className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                    My Orders
                </Link>
                <Link
                    href="/wishlist"
                    className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                    My Wishlist
                </Link>
            </div>
            <div className="p-2 border-t border-gray-100 dark:border-gray-700">
                <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors font-medium"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

// Mobile Navigation Panel
const MobileNav = ({ isOpen, user, logout, onClose }) => {
    const router = useRouter();
    const pathname = usePathname();

    const navLinks = [
        { name: "Home", href: "/", icon: "🏠" },
        { name: "Collections", href: "/collections", icon: "👓" },
        { name: "Contact", href: "/contact", icon: "📞" },
    ];

    const [searchQuery, setSearchQuery] = useState("");

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
        router.push('/');
    };

    return (
        <div
            className={`lg:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg border-t border-gray-100 dark:border-gray-800 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
                }`}
        >
            <div className="p-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
                {/* CTA Button - Prominent in mobile menu */}
                <Link
                    href="/eye-test"
                    onClick={onClose}
                    className="flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4 rounded-xl text-base font-semibold hover:shadow-lg transition-all duration-200 mb-4"
                >
                    <Eye size={22} />
                    <span>Book Free Eye Test</span>
                </Link>

                {/* Search bar for mobile */}
                <form onSubmit={handleSearchSubmit} className="relative mb-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search glasses..."
                        className="w-full h-12 pl-4 pr-12 text-base border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                    <button
                        type="submit"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                        aria-label="Search"
                    >
                        <Search size={22} />
                    </button>
                </form>

                {/* Navigation Links */}
                <nav className="flex flex-col space-y-1 mb-4">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={onClose}
                                className={`flex items-center space-x-3 p-3 rounded-lg font-medium transition-colors ${isActive
                                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-emerald-600 dark:hover:text-emerald-400'
                                    }`}
                            >
                                <span className="text-xl">{link.icon}</span>
                                <span>{link.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Quick Actions */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-1">
                    <Link
                        href="/wishlist"
                        onClick={onClose}
                        className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-emerald-600 dark:hover:text-emerald-400 p-3 rounded-lg font-medium transition-colors"
                    >
                        <Heart size={20} />
                        <span>My Wishlist</span>
                    </Link>

                    {/* Theme Toggle */}
                    <div className="flex items-center space-x-3 p-3">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">Theme</span>
                        <ThemeToggle />
                    </div>

                    {/* User Account Section */}
                    {user ? (
                        <>
                            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-800 p-3 rounded-lg mb-2">
                                <p className="font-semibold text-gray-800 dark:text-white text-sm">{user?.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                            </div>
                            <Link
                                href="/account/profile"
                                onClick={onClose}
                                className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-emerald-600 dark:hover:text-emerald-400 p-3 rounded-lg font-medium transition-colors"
                            >
                                <User size={20} />
                                <span>My Account</span>
                            </Link>
                            <Link
                                href="/orders"
                                onClick={onClose}
                                className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-emerald-600 dark:hover:text-emerald-400 p-3 rounded-lg font-medium transition-colors"
                            >
                                <ShoppingCart size={20} />
                                <span>My Orders</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center space-x-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 p-3 rounded-lg font-medium transition-colors"
                            >
                                <span className="text-xl">🚪</span>
                                <span>Logout</span>
                            </button>
                        </>
                    ) : (
                        <Link
                            href="/account/login"
                            onClick={onClose}
                            className="flex items-center justify-center bg-emerald-500 text-white hover:bg-emerald-600 p-3 rounded-lg font-semibold transition-colors"
                        >
                            Login / Signup
                        </Link>
                    )}
                </div>

                {/* Contact CTA */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <a
                        href="tel:+9779744364817"
                        className="flex items-center justify-center space-x-2 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 p-3 rounded-lg font-medium transition-colors"
                    >
                        <Phone size={20} />
                        <span>Call Us: +9779744364817 </span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;