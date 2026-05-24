// src/components/admin/profile/page.js
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/authContext";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Key, Check, Mail, UserCheck, Eye } from "lucide-react";

// --- Skeleton Component for a better loading experience ---
const ProfileSkeleton = () => (
  <div className="w-full max-w-2xl mx-auto animate-pulse p-4">
    <div className="bg-white rounded-2xl border border-zinc-150 overflow-hidden shadow-sm">
      <div className="h-32 bg-zinc-100" />
      <div className="p-8 flex flex-col items-center">
        <div className="h-24 w-24 bg-zinc-200 rounded-2xl -mt-16 border-4 border-white shadow-md"></div>
        <div className="h-6 w-32 bg-zinc-200 rounded mt-4"></div>
        <div className="h-4 w-48 bg-zinc-200 rounded mt-2"></div>
        <div className="h-4 w-20 bg-zinc-200 rounded mt-3"></div>
      </div>
      <div className="px-8 pb-8 border-t border-zinc-100 pt-6">
        <div className="h-5 w-40 bg-zinc-200 rounded"></div>
        <div className="h-4 w-full bg-zinc-200 rounded mt-4"></div>
        <div className="h-4 w-5/6 bg-zinc-200 rounded mt-2"></div>
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
    const timer = setTimeout(() => {
      if (user) {
        setProfile(user);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [user]);

  if (!profile) {
    return <ProfileSkeleton />;
  }

  const getInitials = (name) => {
    if (!name) return "AD";
    const names = name.split(" ");
    if (names.length > 1) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const roleDetails = {
    superadmin: {
      title: "SuperAdmin Controls",
      permissions: [
        "Manage all administrator accounts",
        "View system-wide transactions & revenue",
        "Access security configuration settings",
        "Review database & server health audit logs"
      ],
      badgeColor: "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/20 dark:text-rose-405 dark:border-rose-900/30",
      icon: <ShieldCheck className="h-5 w-5 text-rose-500 mr-2" />,
    },
    admin: {
      title: "Admin Permissions",
      permissions: [
        "Manage catalog products & inventory",
        "Process, fulfill, and update orders",
        "Access registered customer details",
        "Generate and view local sales stats"
      ],
      badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-950/20 dark:text-indigo-405 dark:border-indigo-900/30",
      icon: <Key className="h-5 w-5 text-indigo-500 mr-2" />,
    },
  };

  const currentRoleDetails = roleDetails[profile.role] || {
    title: "Access Details",
    permissions: ["Standard backend access"],
    badgeColor: "bg-zinc-50 text-zinc-700 border-zinc-200",
    icon: <Key className="h-5 w-5 text-zinc-500 mr-2" />,
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
      
      {/* Header section */}
      <div>
        <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight dark:text-zinc-50">Profile</h1>
        <p className="text-[14px] text-zinc-500 font-medium">
          View your credential summary and role permissions.
        </p>
      </div>

      <Card className="border border-zinc-150 dark:border-zinc-800 shadow-sm rounded-2xl overflow-hidden bg-white dark:bg-zinc-900">
        {/* Banner Strip */}
        <div className="h-32 bg-gradient-to-r from-zinc-950 to-zinc-900 dark:from-zinc-950 dark:to-zinc-950/80 relative" />

        <CardContent className="p-6 relative flex flex-col items-center">
          {/* Avatar overlap */}
          <div className="w-24 h-24 rounded-2xl -mt-16 bg-gradient-to-br from-amber-400 to-amber-600 border-4 border-white dark:border-zinc-900 shadow-md flex items-center justify-center text-zinc-950 text-3xl font-bold select-none">
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover rounded-xl" />
            ) : (
              getInitials(profile.name)
            )}
          </div>

          <div className="text-center mt-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{profile.name}</h2>
            <div className="flex items-center gap-1.5 justify-center text-zinc-400 text-sm mt-1">
              <Mail className="h-4 w-4 text-zinc-450" />
              <span>{profile.email}</span>
            </div>
            <div className="mt-3.5">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border capitalize ${currentRoleDetails.badgeColor}`}>
                <UserCheck className="h-3 w-3" />
                {profile.role}
              </span>
            </div>
          </div>

          {/* Role details box */}
          <div className="w-full mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800">
            <h3 className="text-[15px] font-bold text-zinc-850 dark:text-zinc-200 flex items-center mb-4">
              {currentRoleDetails.icon}
              {currentRoleDetails.title}
            </h3>
            
            <ul className="space-y-3">
              {currentRoleDetails.permissions.map((permission, index) => (
                <li key={index} className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-100/50">
                    <Check className="h-3 w-3" />
                  </div>
                  <span>{permission}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}