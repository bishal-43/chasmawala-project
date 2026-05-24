"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu, X, ShoppingBag, Heart, User, Search, Eye, Phone,
  LogOut, Package, ChevronRight,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/contexts/authContext";
import ThemeToggle from "@/components/ThemeToggle";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────────
   NAV LINKS CONFIG
───────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Collections", href: "/collections" },
  { name: "Contact", href: "/contact" },
];

/* ─────────────────────────────────────────────────────────────
   BADGE
───────────────────────────────────────────────────────────── */
const Badge = ({ count }) => (
  <span className="
    absolute -top-1 -right-1
    min-w-[18px] h-[18px] px-[3px]
    bg-emerald-500 text-white
    text-[10px] font-bold
    rounded-full flex items-center justify-center
    ring-2 ring-white dark:ring-gray-950
    pointer-events-none
  ">
    {count > 99 ? "99+" : count}
  </span>
);

/* ─────────────────────────────────────────────────────────────
   ICON BUTTON
───────────────────────────────────────────────────────────── */
const IconBtn = ({ href, onClick, label, children, className = "" }) => {
  const base = `
    relative flex items-center justify-center
    w-10 h-10 rounded-xl
    text-gray-500 dark:text-gray-400
    hover:text-emerald-600 dark:hover:text-emerald-400
    hover:bg-emerald-50 dark:hover:bg-emerald-950/40
    transition-all duration-200
    ${className}
  `;
  if (href) {
    return (
      <Link href={href} className={base} aria-label={label}>
        {children}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={base} aria-label={label}>
      {children}
    </button>
  );
};

/* ─────────────────────────────────────────────────────────────
   USER DROPDOWN
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
    <div className="
      absolute top-[calc(100%+10px)] right-0
      w-56 z-50
      bg-white dark:bg-gray-900
      border border-gray-100 dark:border-gray-800
      rounded-2xl shadow-xl shadow-black/10 dark:shadow-black/40
      overflow-hidden
      animate-[fadeDown_0.18s_ease-out]
    ">
      {/* Header */}
      <div className="
        flex items-center gap-3 px-4 py-3.5
        bg-gradient-to-br from-emerald-50 to-teal-50
        dark:from-emerald-950/40 dark:to-teal-950/40
        border-b border-gray-100 dark:border-gray-800
      ">
        <div className="
          w-9 h-9 rounded-full flex-shrink-0
          bg-gradient-to-br from-emerald-500 to-teal-500
          flex items-center justify-center
          text-white font-bold text-sm
        ">
          {initial}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">{user?.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
        </div>
      </div>

      {/* Items */}
      <div className="p-1.5">
        {[
          { href: "/account/profile", icon: <User size={14} />, label: "My Profile" },
          { href: "/orders", icon: <Package size={14} />, label: "My Orders" },
          { href: "/wishlist", icon: <Heart size={14} />, label: "Wishlist" },
        ].map(({ href, icon, label }) => (
          <Link
            key={href}
            href={href}
            className="
              flex items-center gap-2.5 px-3 py-2.5 rounded-xl
              text-sm text-gray-700 dark:text-gray-300
              hover:bg-emerald-50 dark:hover:bg-emerald-950/40
              hover:text-emerald-700 dark:hover:text-emerald-400
              transition-colors duration-150
            "
          >
            <span className="text-gray-400 dark:text-gray-500">{icon}</span>
            {label}
          </Link>
        ))}

        <div className="my-1 h-px bg-gray-100 dark:bg-gray-800" />

        <button
          onClick={handleLogout}
          className="
            w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl
            text-sm text-red-500 dark:text-red-400
            hover:bg-red-50 dark:hover:bg-red-950/30
            transition-colors duration-150
          "
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   MOBILE DRAWER
───────────────────────────────────────────────────────────── */
const MobileDrawer = ({ isOpen, user, logout, onClose }) => {
  const router = useRouter();
  const pathname = usePathname();
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
    router.push("/");
  };

  const initial = user?.name?.[0]?.toUpperCase() || "U";

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40 bg-black/30 backdrop-blur-sm
          transition-opacity duration-300
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        style={{ top: "var(--navbar-h, 68px)" }}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`
          fixed left-0 right-0 z-40
          bg-white dark:bg-gray-950
          border-b border-gray-100 dark:border-gray-800
          rounded-b-3xl
          shadow-2xl shadow-black/20 dark:shadow-black/60
          overflow-y-auto
          transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
          }
        `}
        style={{
          top: "var(--navbar-h, 68px)",
          maxHeight: "calc(100dvh - var(--navbar-h, 68px))",
        }}
      >
        <div className="p-4 space-y-3">

          {/* CTA */}
          <Link
            href="/eye-test"
            onClick={onClose}
            className="
              flex items-center justify-center gap-2
              w-full py-3.5 rounded-2xl
              bg-gradient-to-r from-emerald-500 to-teal-500
              text-white font-semibold text-sm
              shadow-lg shadow-emerald-500/30
              hover:shadow-emerald-500/50 hover:-translate-y-0.5
              transition-all duration-200
            "
          >
            <Eye size={18} />
            Book Free Eye Test
          </Link>

          {/* Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search glasses..."
              className="
                w-full h-12 pl-4 pr-12 rounded-xl
                bg-gray-50 dark:bg-gray-900
                border border-gray-200 dark:border-gray-800
                text-gray-900 dark:text-gray-100
                placeholder-gray-400 dark:placeholder-gray-600
                text-sm
                focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400
                transition-all duration-200
              "
            />
            <button
              type="submit"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          </form>

          {/* Nav Links */}
          <nav className="space-y-0.5">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={onClose}
                  className={`
                    flex items-center justify-between px-4 py-3 rounded-xl
                    text-sm font-medium transition-all duration-150
                    ${isActive
                      ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-emerald-600 dark:hover:text-emerald-400"
                    }
                  `}
                >
                  {link.name}
                  {isActive && <ChevronRight size={14} className="text-emerald-500" />}
                </Link>
              );
            })}
          </nav>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent" />

          {/* Quick Actions */}
          <div className="space-y-0.5">
            <Link
              href="/wishlist"
              onClick={onClose}
              className="
                flex items-center gap-3 px-4 py-3 rounded-xl
                text-sm font-medium
                text-gray-700 dark:text-gray-300
                hover:bg-gray-50 dark:hover:bg-gray-900
                hover:text-emerald-600 dark:hover:text-emerald-400
                transition-colors duration-150
              "
            >
              <Heart size={18} className="text-gray-400 dark:text-gray-500" />
              My Wishlist
            </Link>

            {/* Theme row */}
            <div className="flex items-center justify-between px-4 py-2.5 rounded-xl">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Appearance</span>
              <ThemeToggle />
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent" />

          {/* Auth Section */}
          <div className="space-y-0.5">
            {user ? (
              <>
                {/* User pill */}
                <div className="
                  flex items-center gap-3 px-4 py-3 rounded-xl
                  bg-gradient-to-r from-emerald-50 to-teal-50
                  dark:from-emerald-950/40 dark:to-teal-950/40
                  mb-1
                ">
                  <div className="
                    w-9 h-9 rounded-full flex-shrink-0
                    bg-gradient-to-br from-emerald-500 to-teal-500
                    flex items-center justify-center
                    text-white font-bold text-sm
                  ">
                    {initial}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">{user?.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                  </div>
                </div>

                <Link href="/account/profile" onClick={onClose} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-150">
                  <User size={18} className="text-gray-400 dark:text-gray-500" /> My Account
                </Link>
                <Link href="/orders" onClick={onClose} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-150">
                  <Package size={18} className="text-gray-400 dark:text-gray-500" /> My Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors duration-150"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <Link
                href="/account/login"
                onClick={onClose}
                className="
                  flex items-center justify-center gap-2
                  w-full py-3 rounded-xl
                  bg-gray-900 dark:bg-white
                  text-white dark:text-gray-900
                  text-sm font-semibold
                  hover:bg-gray-800 dark:hover:bg-gray-100
                  transition-colors duration-200
                "
              >
                <User size={16} />
                Login / Sign up
              </Link>
            )}
          </div>

          {/* Call strip */}
          <a
            href="tel:+9779744364817"
            className="
              flex items-center justify-center gap-2
              w-full py-3 rounded-xl
              text-sm font-medium
              text-emerald-700 dark:text-emerald-400
              bg-emerald-50 dark:bg-emerald-950/40
              hover:bg-emerald-100 dark:hover:bg-emerald-950/60
              transition-colors duration-150
            "
          >
            <Phone size={15} />
            +977 9744364817
          </a>

        </div>
      </div>
    </>
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

  // Close menu on route change
  useEffect(() => { setIsMenuOpen(false); }, [pathname]);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-focus search input
  useEffect(() => {
    if (isSearchOpen) searchInputRef.current?.focus();
  }, [isSearchOpen]);

  // Escape key closes everything
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

  // Click outside closes user dropdown
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

  const initial = user?.name?.[0]?.toUpperCase() || null;

  return (
    <>
      {/* ── CSS: animation keyframe + CSS var for navbar height ── */}
      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-6px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        :root { --navbar-h: 64px; }
        @media (min-width: 640px) { :root { --navbar-h: 72px; } }
      `}</style>

      {/* ── Fixed Header ── */}
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${isScrolled
            ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200/60 dark:border-gray-800/60 shadow-sm shadow-black/5"
            : "bg-white/60 dark:bg-gray-950/60 backdrop-blur-md border-b border-transparent"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-[72px]">

            {/* ── Logo ── */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group flex-shrink-0"
              aria-label="Chasmawala home"
            >
              <div className="
                w-9 h-9 rounded-xl overflow-hidden flex-shrink-0
                bg-white dark:bg-gray-900
                ring-1 ring-gray-200 dark:ring-gray-800
                shadow-sm
                group-hover:ring-emerald-300 dark:group-hover:ring-emerald-700
                transition-all duration-200
              ">
                <Image
                  src="/logo.png"
                  alt="Chasmawala"
                  width={36}
                  height={36}
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="
                font-bold text-lg sm:text-xl tracking-tight
                bg-gradient-to-r from-gray-900 via-emerald-800 to-teal-700
                dark:from-white dark:via-emerald-300 dark:to-teal-300
                bg-clip-text text-transparent
                group-hover:opacity-80 transition-opacity duration-200
              ">
                Chasmawala
              </span>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`
                      relative px-4 py-2 rounded-xl text-sm font-medium
                      transition-all duration-200
                      ${isActive
                        ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-900"
                      }
                    `}
                  >
                    {link.name}
                    {isActive && (
                      <span className="
                        absolute bottom-1 left-1/2 -translate-x-1/2
                        w-1 h-1 rounded-full bg-emerald-500
                      " />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ── Right Actions ── */}
            <div className="flex items-center gap-1">

              {/* Search — desktop (md+) */}
              <div className="hidden md:flex items-center">
                {isSearchOpen ? (
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onBlur={() => { if (!searchQuery) setTimeout(() => setIsSearchOpen(false), 150); }}
                      placeholder="Search glasses…"
                      className="
                        h-9 w-44 xl:w-52 pl-3.5 pr-9 rounded-xl
                        bg-gray-100 dark:bg-gray-900
                        border border-gray-200 dark:border-gray-800
                        text-gray-900 dark:text-gray-100
                        placeholder-gray-400 dark:placeholder-gray-600
                        text-sm
                        focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400
                        transition-all duration-200
                      "
                    />
                    <button
                      type="submit"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors"
                      aria-label="Submit search"
                    >
                      <Search size={15} />
                    </button>
                  </form>
                ) : (
                  <IconBtn onClick={() => setIsSearchOpen(true)} label="Search">
                    <Search size={19} />
                  </IconBtn>
                )}
              </div>

              {/* Wishlist — sm+ */}
              <IconBtn href="/wishlist" label="Wishlist" className="hidden sm:flex">
                <Heart size={19} />
                {wishlistCount > 0 && <Badge count={wishlistCount} />}
              </IconBtn>

              {/* Cart — always */}
              <IconBtn href="/cart" label="Cart">
                <ShoppingBag size={19} />
                {cartCount > 0 && <Badge count={cartCount} />}
              </IconBtn>

              {/* Theme toggle — md+ */}
              <div className="hidden md:block">
                <ThemeToggle />
              </div>

              {/* User — lg+ */}
              <div className="relative hidden lg:block" ref={dropdownRef}>
                {user ? (
                  <button
                    onClick={() => setIsUserDropdownOpen((v) => !v)}
                    aria-label="Account menu"
                    aria-expanded={isUserDropdownOpen}
                    className="
                      flex items-center justify-center
                      w-9 h-9 rounded-full
                      bg-gradient-to-br from-emerald-500 to-teal-500
                      text-white font-bold text-sm
                      hover:shadow-md hover:shadow-emerald-500/30
                      hover:-translate-y-0.5
                      transition-all duration-200
                      ring-2 ring-white dark:ring-gray-950
                    "
                  >
                    {initial || <User size={15} />}
                  </button>
                ) : (
                  <Link
                    href="/account/login"
                    className="
                      flex items-center gap-1.5 px-4 py-2 rounded-xl
                      bg-gray-900 dark:bg-white
                      text-white dark:text-gray-900
                      text-sm font-semibold
                      hover:bg-gray-800 dark:hover:bg-gray-100
                      hover:-translate-y-0.5 hover:shadow-md
                      transition-all duration-200
                    "
                  >
                    <User size={14} />
                    Login
                  </Link>
                )}
                <UserDropdown isOpen={isUserDropdownOpen} user={user} logout={logout} />
              </div>

              {/* CTA — lg+ */}
              <Link
                href="/eye-test"
                className="
                  hidden lg:flex items-center gap-1.5
                  px-4 py-2 rounded-xl ml-1
                  bg-gradient-to-r from-emerald-500 to-teal-500
                  text-white text-sm font-semibold
                  shadow-md shadow-emerald-500/25
                  hover:shadow-lg hover:shadow-emerald-500/40
                  hover:-translate-y-0.5
                  transition-all duration-200
                  whitespace-nowrap
                "
              >
                <Eye size={15} />
                Free Eye Test
              </Link>

              {/* Hamburger — mobile/tablet */}
              <button
                onClick={() => setIsMenuOpen((v) => !v)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                className="
                  lg:hidden
                  flex flex-col items-center justify-center
                  w-10 h-10 rounded-xl gap-[5px]
                  text-gray-600 dark:text-gray-400
                  hover:bg-gray-100 dark:hover:bg-gray-900
                  transition-all duration-200
                "
              >
                <span className={`
                  block h-0.5 w-5 rounded-full bg-current
                  transition-all duration-300 origin-center
                  ${isMenuOpen ? "translate-y-[7px] rotate-45" : ""}
                `} />
                <span className={`
                  block h-0.5 w-5 rounded-full bg-current
                  transition-all duration-300
                  ${isMenuOpen ? "opacity-0 scale-x-0" : ""}
                `} />
                <span className={`
                  block h-0.5 w-5 rounded-full bg-current
                  transition-all duration-300 origin-center
                  ${isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""}
                `} />
              </button>

            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      <MobileDrawer
        isOpen={isMenuOpen}
        user={user}
        logout={logout}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
};

export default Navbar;
