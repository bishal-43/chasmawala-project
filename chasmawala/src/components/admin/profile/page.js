// src/components/admin/profile/page.js
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/authContext";

// --- SVG Icons for better UI ---
const UserCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0012 11z" clipRule="evenodd" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5.002a11.954 11.954 0 01-1.252 8.243c-.453.662-.303 1.53.359 1.984a11.954 11.954 0 018.618 3.187 11.954 11.954 0 018.618-3.187c.662-.453.812-1.322.359-1.984a11.954 11.954 0 01-1.252-8.243A11.954 11.954 0 0110 1.944zM9 13a1 1 0 112 0v2a1 1 0 11-2 0v-2zm1-8a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);

const KeyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
  </svg>
);

// --- Skeleton Component for a better loading experience ---
const ProfileSkeleton = () => (
  <div className="p-4 sm:p-6 lg:p-8 animate-pulse">
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-8">
        <div className="flex flex-col items-center">
          <div className="h-24 w-24 bg-gray-300 rounded-full"></div>
          <div className="h-6 w-32 bg-gray-300 rounded mt-4"></div>
          <div className="h-4 w-48 bg-gray-300 rounded mt-2"></div>
          <div className="h-4 w-20 bg-gray-300 rounded mt-2"></div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="h-5 w-40 bg-gray-300 rounded"></div>
          <div className="h-4 w-full bg-gray-300 rounded mt-4"></div>
          <div className="h-4 w-5/6 bg-gray-300 rounded mt-2"></div>
        </div>
      </div>
    </div>
  </div>
);

// --- Main Profile Page Component ---
export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Simulate a network request for a better loading state preview
    setTimeout(() => {
      if (user) {
        setProfile(user);
      }
    }, 500);
  }, [user]);

  if (!profile) {
    return <ProfileSkeleton />;
  }

  const roleDetails = {
    superadmin: {
      title: "SuperAdmin Controls",
      permissions: ["Manage all admins", "View system-wide statistics", "Access audit logs"],
      badgeColor: "bg-red-100 text-red-800",
      icon: <ShieldCheckIcon />,
    },
    admin: {
      title: "Admin Permissions",
      permissions: ["Manage products & orders", "Handle customer issues", "Generate sales reports"],
      badgeColor: "bg-blue-100 text-blue-800",
      icon: <KeyIcon />,
    },
  };

  const currentRoleDetails = roleDetails[profile.role];

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          {/* --- Profile Header --- */}
          <div className="flex flex-col items-center text-center">
            <UserCircleIcon />
            <h1 className="text-2xl font-bold text-gray-900 mt-4">{profile.name}</h1>
            <p className="text-sm text-gray-500">{profile.email}</p>
            <span className={`text-xs font-semibold inline-block py-1 px-3 uppercase rounded-full mt-2 ${currentRoleDetails.badgeColor}`}>
              {profile.role}
            </span>
          </div>

          {/* --- Role-based Details Section --- */}
          {currentRoleDetails && (
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                {currentRoleDetails.icon}
                {currentRoleDetails.title}
              </h2>
              <ul className="mt-4 space-y-2 text-gray-600">
                {currentRoleDetails.permissions.map((permission, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{permission}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}