// src/app/admin/(protected)/doctors/page.js

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

// SVG Icon for the search input
const SearchIcon = () => (
  <svg
    className="h-5 w-5 text-gray-400"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
      clipRule="evenodd"
    />
  </svg>
);


export default function DoctorsListPage() {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/admin/doctors");
        if (!res.ok) {
          throw new Error("Failed to fetch doctors.");
        }
        const data = await res.json();
        setDoctors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);
  
  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="sm:flex sm:items-center sm:justify-between pb-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Manage Doctors</h2>
            <p className="mt-1 text-sm text-gray-500">
              View, search, and manage doctor profiles in the system.
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link href="/admin/doctors/add">
              <span className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Add New Doctor
              </span>
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-6">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
              <SearchIcon />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search by name or specialization..."
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="mt-8">
          {isLoading ? (
            <p className="text-center text-gray-500">Loading doctors...</p>
          ) : error ? (
            <p className="text-center text-red-500 bg-red-50 p-4 rounded-md">{error}</p>
          ) : filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredDoctors.map((doctor) => (
                <div key={doctor._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                            <p className="text-sm text-indigo-600 font-medium">{doctor.specialization}</p>
                            <p className="mt-1 text-xs text-gray-500">{doctor.credentials}</p>
                        </div>
                         <img
                            className="h-16 w-16 rounded-full object-cover"
                            src={doctor.image || `https://placehold.co/256x256/E2E8F0/4A5568?text=${doctor.name.charAt(0)}`}
                            alt={`Profile of ${doctor.name}`}
                        />
                    </div>
                  </div>
                   <div className="bg-gray-50 px-5 py-3">
                     <Link href={`/admin/doctors/${doctor._id}`}>
                        <span className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                          Edit Profile &rarr;
                        </span>
                      </Link>
                   </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center bg-white p-12 rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-gray-900">No Doctors Found</h3>
              <p className="mt-2 text-sm text-gray-500">
                There are no doctors matching your search, or no doctors have been added yet.
              </p>
              <div className="mt-6">
                <Link href="/admin/doctors/add">
                  <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                    Add the First Doctor
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
