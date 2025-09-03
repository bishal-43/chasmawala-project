"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ShoppingCart, Heart, User, Search } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/contexts/authContext";
import ThemeToggle from "@/components/ThemeToggle";

// Main Navbar Component
const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // REMOVED: State for modal is no longer needed
    // const [showAuthModal, setShowAuthModal] = useState(false);
    // const [isSignup, setIsSignup] = useState(false);
    const { user, logout } = useAuth();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // ensure client-side render
    }, []);

    // Close mobile menu on route change
    const pathname = usePathname();
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navClass = isScrolled
        ? "bg-white/90 backdrop-blur-lg shadow-md"
        : "bg-white";

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navClass}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-emerald-600 transition-colors">
                            Chasmawala
                        </Link>

                        {/* Desktop Navigation */}
                        <DesktopNav />

                        {/* Action Icons & Auth */}
                        <div className="flex items-center space-x-4">
                            {/* CHANGED: Removed setShowAuthModal prop */}
                            <ActionIcons user={user} logout={logout} />
                            <div className="lg:hidden">
                                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-emerald-600">
                                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Mobile Navigation */}
                {/* ADDED: Pass user and logout to MobileNav for conditional rendering */}
                <MobileNav isOpen={isMenuOpen} user={user} logout={logout} />
            </header>

            {/* REMOVED: AuthModal is no longer rendered here */}

            <div className="h-20" /> {/* Spacer */}
        </>
    );
};

// Desktop Navigation Links with Mega Menu (No changes needed here)
const DesktopNav = () => {
    // ... (Your existing DesktopNav code remains the same)
    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Collections", href: "/collections" },
        { name: "Eye Test", href: "/eye-test" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
                <div key={link.name} className="group relative">
                    <Link href={link.href} className="text-base font-medium text-gray-600 hover:text-emerald-600 transition-colors py-6">
                        {link.name}
                    </Link>
                    {/* {link.megaMenu && <MegaMenu />} */}
                </div>
            ))}
        </nav>
    );
};

// Mega Menu for Collections (No changes needed here)
/*const MegaMenu = () => (
    // ... (Your existing MegaMenu code remains the same)
    <div className="absolute top-full left-1/2 -translate-x-1/2 w-auto opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 pt-4">
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden flex">
            <div className="p-8 grid grid-cols-3 gap-x-12">
                {renderMenuColumn("For Men", ["Eyeglasses", "Sunglasses", "New Arrivals","Contact Lenses"], "category")}
                {renderMenuColumn("For Women", ["Eyeglasses", "Sunglasses", "Contact Lenses"], "category")}
                {renderMenuColumn("Our Brands", ["Ray-Ban", "Oakley", "Vincent Chase"], "brand")}
            </div>
            <div className="w-64 bg-gray-100">
                <img src="https://placehold.co/256x320/a7f3d0/1e40af?text=New+Collection" alt="New Collection" className="w-full h-full object-cover" />
            </div>
        </div>
    </div>
);*/

/*const renderMenuColumn = (title, items, type = "category") => (
    // ... (Your existing renderMenuColumn code remains the same)
    <div key={title}>
        <h3 className="font-bold text-gray-800 mb-4">{title}</h3>
        <ul className="space-y-3">
            {items.map(item => (
                <li key={item}>
                    <Link
                        href={`/collections/${item.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-gray-500 hover:text-emerald-600 transition-colors text-sm"
                    >
                        {item}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);*/

// Action Icons (Search, Wishlist, Cart) and User Auth
// CHANGED: Removed setShowAuthModal from props
const ActionIcons = ({ user, logout }) => {
    const { cart } = useCart() || { cart: [] };
    const { wishlistItems } = useWishlist() || { wishlistItems: [] };
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();
    const searchInputRef = useRef(null);

    useEffect(() => {
        if (isSearchOpen) {
            searchInputRef.current?.focus();
        }
    }, [isSearchOpen]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Navigate to the search results page
            router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false); // Close the search bar after searching
            setSearchQuery("");   // Clear the input
        }
    };

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsUserDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center">
                {isSearchOpen ? (
                    <form onSubmit={handleSearchSubmit} className="relative">
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onBlur={() => { if (!searchQuery) setIsSearchOpen(false) }} // Hide if empty and loses focus
                            placeholder="Search glasses..."
                            className="w-48 h-10 pl-4 pr-10 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-300"
                        />
                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600">
                            <Search size={20} />
                        </button>
                    </form>
                ) : (
                    <button onClick={() => setIsSearchOpen(true)} className="text-gray-600 hover:text-emerald-600">
                        <Search size={22} />
                    </button>
                )}
            </div>
            <Link href="/wishlist" className="relative text-gray-600 hover:text-emerald-600">
                <Heart size={22} />
                {wishlistItems.length > 0 && <Badge count={wishlistItems.length} />}
            </Link>
            <Link href="/cart" className="relative text-gray-600 hover:text-emerald-600">
                <ShoppingCart size={22} />
                {cart.length > 0 && <Badge count={cart.length} />}
            </Link>

            <div className="relative" ref={dropdownRef}>
                {user ? (
                    <>
                        <button onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} className="text-gray-600 hover:text-emerald-600">
                            <User size={22} />
                        </button>
                        <UserDropdown isOpen={isUserDropdownOpen} user={user} logout={logout} />
                    </>
                ) : (
                    // CHANGED: Button is now a Link pointing to the login page
                    <Link href="/account/login" className="hidden lg:inline-block bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-600 transition-colors">
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

// Badge for Cart/Wishlist Count (No changes needed here)
const Badge = ({ count }) => (
    <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
        {count}
    </span>
);

// User Dropdown Menu (No changes needed here)
const UserDropdown = ({ isOpen, user, logout }) => {
    // ... (Your existing UserDropdown code remains the same)
    const router = useRouter();
    const handleLogout = async () => {
        await logout();
        router.push('/');
    };
    if (!isOpen) return null;
    return (
        <div className="absolute top-full right-0 mt-4 w-56 bg-white rounded-lg shadow-2xl border border-gray-100">
            <div className="p-4 border-b">
                <p className="font-semibold text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <div className="py-2">
                <Link href="/account/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-emerald-600">My Profile</Link>
                <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-emerald-600">My Orders</Link>
            </div>
            <div className="p-2">
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md">
                    Logout
                </button>
            </div>
        </div>
    );
};

// Mobile Navigation Panel
// CHANGED: Now accepts user and logout props to show correct auth links
const MobileNav = ({ isOpen, user, logout }) => {
    const router = useRouter();
    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Collections", href: "/collections" },
        { name: "Eye Test", href: "/eye-test" },
        { name: "Contact", href: "/contact" },
    ];

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    return (
        <div className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-lg transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-0' : '-translate-y-[120%]'}`}>
            <nav className="flex flex-col p-4 space-y-2">
                {navLinks.map((link) => (
                    <Link key={link.name} href={link.href} className="text-gray-700 hover:bg-gray-100 hover:text-emerald-600 p-3 rounded-md font-medium">
                        {link.name}
                    </Link>
                ))}
                {/* CHANGED: Conditionally render auth links */}
                <div className="border-t pt-4 mt-2 space-y-2">
                    {user ? (
                        <>
                            <Link href="/account/profile" className="flex items-center text-gray-700 hover:bg-gray-100 hover:text-emerald-600 p-3 rounded-md font-medium">
                                <User className="mr-3" size={20} /> My Account
                            </Link>
                            <button onClick={handleLogout} className="w-full flex items-center text-red-600 hover:bg-red-50 p-3 rounded-md font-medium">
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link href="/account/login" className="flex items-center justify-center bg-emerald-500 text-white hover:bg-emerald-600 p-3 rounded-md font-semibold">
                            Login / Signup
                        </Link>
                    )}
                </div>
            </nav>
            {/* You can remove this second nav or adjust it as needed */}
            <div className="flex items-center justify-between px-4 py-2 border-t">
                <ThemeToggle />
            </div>
        </div>
    );
};


// REMOVED: The AuthModal component is no longer needed in this file.

export default Navbar;