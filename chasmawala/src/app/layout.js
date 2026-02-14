import "@/styles/globals.css";
import ClientLayout from "./clientLayout";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Chasmawala",
  description: "Trendy eyeglasses & sunglasses at affordable prices. Shop now for stylish eyewear that suits your look and budget.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Chasmawala – Buy Eyewear Online",
    description: "Premium eyewear for daily use. Shop now!",
    url: "https://chasmawala.com.np",
    siteName: "Chasmawala",
    images: [
      {
        url: "https://chasmawala.com.np/og-image1.jpg",
        width: 1200,
        height: 630,
        alt: "Chasmawala Eyewear Store",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chasmawala – Buy Eyewear Online",
    description: "Premium eyewear at best prices",
    images: ["https://chasmawala.com.np/og-image1.jpg"],
  },
};
  

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientLayout>
          {children}
          <SpeedInsights />
          <Analytics />
        </ClientLayout>
      </body>
    </html>
  );
}
