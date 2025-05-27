"use client";
import { CartProvider } from "@/contexts/CartContext";
import { QuickViewProvider } from "@/contexts/QuickViewContext";
import { WishlistProvider, useWishlist } from "@contexts/WishlistContext";
import { SearchProvider } from "@/contexts/SearchContext";
import { AuthProvider } from "@/contexts/authContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>  {/* ✅ Wrap everything inside AuthProvider */}
          <CartProvider>
            <QuickViewProvider>
              <WishlistProvider>
                <SearchProvider> {/* Wrap the app with SearchProvider */}
                  <Navbar />
                  {children}
                  <Footer />
                </SearchProvider>
              </WishlistProvider>
            </QuickViewProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
