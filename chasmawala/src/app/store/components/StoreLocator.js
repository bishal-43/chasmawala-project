// src/app/store/_components/StoreLocator.js
"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Clock, Mail, Phone } from 'lucide-react';

// Fix for default Leaflet icon issue with Webpack
const defaultIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export default function StoreLocator({ store }) {
  const position = [store.latitude, store.longitude];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-8 rounded-2xl shadow-lg">
      
      {/* Column 1: Store Details */}
      <div className="flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-gray-900">{store.name}</h2>
        <p className="mt-2 text-gray-600 text-lg">{store.address}</p>

        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-blue-600" />
            <span className="text-gray-700">{store.phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-blue-600" />
            <span className="text-gray-700">{store.email}</span>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-blue-600 mt-1" />
            <div>
              <p className="font-semibold text-gray-800">Store Hours:</p>
              <p className="text-gray-700">Mon - Fri: {store.hours.weekday}</p>
              <p className="text-gray-700">Sat - Sun: {store.hours.weekend}</p>
            </div>
          </div>
        </div>

        <a
          href={`https://maps.google.com/?q=${store.latitude},${store.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block w-full text-center bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          Get Directions
        </a>
      </div>

      {/* Column 2: Interactive Map */}
      <div className="h-96 md:h-full w-full rounded-lg overflow-hidden shadow-md z-0">
        <MapContainer center={position} zoom={15} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={defaultIcon}>
            <Popup>{store.name}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}