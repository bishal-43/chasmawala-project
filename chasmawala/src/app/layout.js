"use client";

import { usePathname } from "next/navigation";
import { CartProvider } from "@/contexts/CartContext";
import { QuickViewProvider } from "@/contexts/QuickViewContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { SearchProvider } from "@/contexts/SearchContext";
import { AuthProvider } from "@/contexts/authContext";
import 'leaflet/dist/leaflet.css';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/styles/globals.css";
import { Providers } from "./providers";
import QuickViewModal from "@components/QuickViewModal";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const isDashboardRoute = pathname.startsWith("/admin") || pathname.startsWith("/superadmin");

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <AuthProvider>
            <CartProvider>
              <QuickViewProvider>
                <WishlistProvider>
                  <SearchProvider>
                    {/* 👇 Hide Navbar/Footer on dashboard routes */}
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

        {/* Global styles and scripts can be added here if needed */}
      </body>
    </html>
  );
}
