import "@/styles/globals.css";
import ClientLayout from "./clientLayout";

export const metadata = {
  title: "Chasmawala",
  description: "Eyewear Store",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
