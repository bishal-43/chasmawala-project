// app/admin/login/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext"; // Assuming this path is correct

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const { user, loading, setUser, setSkipInitialCheck } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      if (user.role === "admin") router.replace("/admin");
      else if (user.role === "superadmin") router.replace("/superadmin");
      //else router.replace("/");
    }
  }, [user, loading, router]);

  if (loading || (user && user.role !== "admin" && user.role !== "superadmin")) {
    return null; // Or a loading spinner
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setFormLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Important for sending/receiving cookies
      });

      // Parse the response data regardless of res.ok status
      // This allows us to read error messages from the server
      const data = await res.json(); 

      if (!res.ok) {
        // Now 'data' is defined and we can access 'data.error'
        setError(data.error || "Login failed: An unknown error occurred.");
        setFormLoading(false);
        return;
      }

      if (data.user) {
        setUser(data.user);
        setSkipInitialCheck(true);
      }

      router.push(data.redirectPath);
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally { // Ensure formLoading is set to false in all cases
      setFormLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left branding section */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 items-center justify-center p-12 text-white">
        <div className="space-y-6 max-w-md">
          <h1 className="text-4xl font-bold">Welcome Back 👋</h1>
          <p className="text-lg opacity-90">
            Manage your products, users, and orders from the secure admin dashboard.
          </p>
          <img
            src="/images/admin-login-illustration.svg"
            alt="Dashboard Illustration"
            className="w-80"
          />
        </div>
      </div>

      {/* Right login form section */}
      <div className="flex w-full md:w-1/2 justify-center items-center p-10">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md space-y-6"
        >
          <h2 className="text-3xl font-bold text-gray-800">Admin Login</h2>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={formLoading}
            className={`w-full text-white py-2 px-4 rounded-md transition duration-200 ${
              formLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {formLoading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-gray-500 text-center">
            Powered by <span className="font-semibold text-gray-700">Chasmawala Admin System</span>
          </p>
        </form>
      </div>
    </div>
  );
}
