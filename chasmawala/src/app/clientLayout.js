"use client";

import { usePathname } from "next/navigation";
import { CartProvider } from "@/contexts/CartContext";
import { QuickViewProvider } from "@/contexts/QuickViewContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { SearchProvider } from "@/contexts/SearchContext";
import { AuthProvider } from "@/contexts/authContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuickViewModal from "@components/QuickViewModal";
import { Providers } from "./providers";
import 'leaflet/dist/leaflet.css';

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const isDashboardRoute =
    pathname.startsWith("/admin") || pathname.startsWith("/superadmin");

  return (
    <Providers>
      <AuthProvider>
        <CartProvider>
          <QuickViewProvider>
            <WishlistProvider>
              <SearchProvider>
                {!isDashboardRoute && <Navbar />}

                {children}
                <QuickViewModal />

                {!isDashboardRoute && <Footer />}
              </SearchProvider>
            </WishlistProvider>
          </QuickViewProvider>
        </CartProvider>
      </AuthProvider>
    </Providers>
  );
}
