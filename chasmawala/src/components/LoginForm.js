"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {useAuth} from "@/contexts/authContext";

const LoginForm = ({ setShowAuthModal, setIsSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setUser } = useAuth();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email.trim() || !password.trim()) {
      setError("Both fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      setSuccess("Login successful! Redirecting...");
      setUser(data.user);
      setIsLoggedIn(true);
      localStorage.setItem("token", data.token); // ✅ Save token if applicable
      setUser(data.user);
    } catch (error) {
      console.error("Login Error:", error);
      setError(error.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => {
        setShowAuthModal && setShowAuthModal(false); // Close modal if from popup
        router.push("/");
      }, 1500);
    }
  }, [isLoggedIn, router]);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md px-8 py-6 animate-fade-in">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Login to Your Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white py-2 rounded-lg font-medium"
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => setShowAuthModal && setShowAuthModal(false)}
            className="w-full mt-2 text-sm text-gray-600 hover:text-gray-800 underline"
          >
            Cancel
          </button>
          <p className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => setIsSignup("signup")}
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
