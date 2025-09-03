// src/components/LoginForm.js

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link'; // Import the Link component
import { useAuth } from "@/contexts/authContext";

// REMOVED: Modal-specific props are no longer needed
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Added for better UX
  const { setUser } = useAuth();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    if (!email.trim() || !password.trim()) {
      setError("Both email and password are required.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials. Please try again.");
      }

      setSuccess("Login successful! Redirecting...");
      
      // Update auth context and save token
      if (data.user) setUser(data.user);
      if (data.token) localStorage.setItem("token", data.token);

      // Redirect after a short delay to show the success message
      setTimeout(() => {
        router.push("/"); // Or redirect to a dashboard: router.push('/dashboard')
        router.refresh(); // Refresh to update navbar state
      }, 1500);

    } catch (error) {
      console.error("Login Error:", error);
      setError(error.message || "An unexpected error occurred.");
    } finally {
      // Don't set loading to false on success because we are redirecting
      if (error) setIsLoading(false);
    }
  };

  return (
    // REMOVED: The modal wrapper div with `fixed inset-0` is gone.
    // This is now a standard container for a form.
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md px-8 py-10">
      <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Welcome Back</h2>
      <p className="text-center text-gray-500 mb-6">Login to continue to Chasmawala.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            required
          />
        </div>

        <div>
          <label htmlFor="password"  className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-md">{error}</p>}
        {success && <p className="text-green-600 text-sm text-center bg-green-50 p-2 rounded-md">{success}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 transition-all text-white py-3 rounded-lg font-semibold text-base"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-sm text-center text-gray-600 pt-2">
          Don't have an account?{" "}
          {/* CHANGED: Replaced button with a Link for proper navigation */}
          <Link
            href="/account/signup"
            className="text-emerald-600 font-semibold hover:underline"
          >
            Sign up now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
