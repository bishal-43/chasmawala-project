// src/app/account/login/page.js

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/auth";
import { useAuth } from "@/contexts/authContext";

// Reusable Icon Components (or import from a library)
const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

const LoginPage = () => {
  const { setUser } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
        setError("Both email and password are required.");
        return;
    }

    setLoading(true);
    try {
      const response = await loginUser({ email, password });
      
      if (response.error) {
        setError(response.message || "Login failed. Please check your credentials.");
      } else if (response.user) {
        setUser(response.user);
        // Redirect based on role, or to a default dashboard
        const redirectPath = response.user.role === 'admin' ? '/admin' : '/';
        router.push(redirectPath);
      }
    } catch (err) {
      console.error("Login component error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
        
        {/* Left Side - Branding and Welcome Message */}
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-gradient-to-br from-emerald-500 to-green-600 text-white flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-lg mb-6">Log in to access your account and continue where you left off.</p>
          <div className="border-t-2 border-white opacity-50 w-1/4"></div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Log In</h2>
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-4" role="alert">
              <p className="font-bold">Login Failed</p>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MailIcon />
                </div>
                <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" required />
            </div>
            
            {/* Password Input */}
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon />
                </div>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" required />
            </div>
            
            <button type="submit" className={`w-full p-3 rounded-lg text-white font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-emerald-500 hover:bg-emerald-600"}`} disabled={loading}>
              {loading ? "Logging In..." : "Log In"}
            </button>
          </form>

          <p className="text-center text-gray-500 mt-6 text-sm">
            Don't have an account? <a href="/account/signup" className="text-emerald-500 hover:underline font-semibold">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
