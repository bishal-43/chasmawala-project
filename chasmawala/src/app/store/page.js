// src/app/store/page.js



import { stores } from "@/utils/store-data";
import StoreDisplayWrapper from "./components/StoreDisplayWrapper";

export const metadata = {
  title: "Our Store | Chasmawala",
  description: "Visit our flagship store in Murli Chowk, Janakpur. Shop our latest eyewear collections in person.",
};





export default function StorePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Visit Our Store
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Experience our collection in person at our Janakpur location.
          </p>
        </div>
        
        {/* Pass the single store object to the display component */}
        <StoreDisplayWrapper store={stores} />
      </div>
    </div>
  );
}