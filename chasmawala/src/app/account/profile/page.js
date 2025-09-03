// app/account/profile/page.js

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/check-auth", { credentials: "include" });
  
        const contentType = res.headers.get("content-type");
        if (!res.ok || !contentType?.includes("application/json")) {
          console.log("🔁 Redirecting because response is not OK or not JSON");
          router.push("/");
          return;
        }
  
        const data = await res.json();
        console.log("👤 User data from check-auth:", data);
        setUser(data.user);
      } catch (error) {
        console.error("❌ Failed to fetch user:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };
  
    fetchUser();
  }, [router]);
  

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        console.log("✅ Logout successful");
        
        window.location.href = "/";
      } else {
        console.error("❌ Logout failed");
      }
    } catch (error) {
      console.error("❌ Logout request error:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md space-y-4">
        {/* Profile Picture */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl text-gray-500">
            {user.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
        </div>

        {/* User Info */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-semibold">{user?.name}</h2>
          <p className="text-gray-600">{user?.email}</p>
          
        </div>

        {/* Profile Actions */}
        <div className="space-y-3">
          <Link
            href="/wishlist"
            className="block w-full text-center py-2 rounded-lg bg-pink-100 text-pink-600 hover:bg-pink-200 transition"
          >
            ❤️ View Wishlist
          </Link>

          <Link
            href="/orders"
            className="block w-full text-center py-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
          >
            📦 Order History
          </Link>

          <Link
            href="/account/edit-profile"
            className="block w-full text-center py-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition"
          >
            ✏️ Edit Profile
          </Link>

          <Link
            href="/account/change-password"
            className="block w-full text-center py-2 rounded-lg bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition"
          >
            🔐 Change Password
          </Link>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}
