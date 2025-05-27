// src/app/admin/login/page.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include", // ✅ Important for cookie storage
    });

    const data = await res.json();

    if (res.ok) {
      // ✅ Now check the role from /api/auth/check-auth
      const authCheck = await fetch("/api/auth/check-auth", {
        credentials: "include",
      });

      const authData = await authCheck.json();

      if (authCheck.ok && authData.redirectPath) {
        router.push(authData.redirectPath); // 🔁 redirect based on role
      } else {
        alert("Authentication check failed.");
      }
    } else {
      alert(data.error || "Login failed");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-md mx-auto mt-20 p-8 bg-white shadow-lg rounded-lg space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800">Admin Login</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@example.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Login
      </button>
    </form>

  );
}
