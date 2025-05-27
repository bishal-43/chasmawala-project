"use client";

import storeInfo from "@/utils/store-info";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

const FindStore = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLoading(false);
        },
        () => setLoading(false)
      );
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Find Our Store</h1>

      {loading ? (
        <div className="flex justify-center items-center">
          <Loader className="animate-spin" size={30} />
        </div>
      ) : (
        <div className="p-6 border rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-semibold">{storeInfo.name}</h2>
          <p className="text-gray-600">{storeInfo.address}</p>
          <p className="text-gray-600">📞 {storeInfo.phone}</p>
          <p className="text-gray-600">✉️ {storeInfo.email}</p>

          {/* Get Directions Button */}
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${storeInfo.latitude},${storeInfo.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            📍 Get Directions
          </a>
        </div>
      )}
    </div>
  );
};

export default FindStore;
