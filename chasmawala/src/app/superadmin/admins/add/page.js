"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input"; // Assuming components are in @/components
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { User, Mail, KeyRound } from "lucide-react"; // Using lucide-react for icons

export default function AddAdminPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [messages, setMessages] = useState({ error: "", success: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.name || !form.email || !form.password) {
      return "All fields are required.";
    }
    if (form.password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    // Basic email regex
    if (!/\S+@\S+\.\S+/.test(form.email)) {
        return "Please enter a valid email address.";
    }
    return null; // No errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessages({ error: "", success: "" });

    const validationError = validateForm();
    if (validationError) {
      setMessages({ error: `⚠️ ${validationError}`, success: "" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/superadmin/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages({ success: "✅ Admin added successfully!", error: "" });
        setForm({ name: "", email: "", password: "" });
      } else {
        setMessages({ error: `❌ ${data.error || "Failed to add admin"}`, success: "" });
      }
    } catch (err) {
      setMessages({ error: "❌ An unexpected error occurred.", success: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-800">Create Admin Account</h1>
            <p className="text-slate-500 mt-2">Fill in the details below to add a new admin.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            name="name"
            type="text"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            icon={<User className="w-4 h-4 text-slate-400" />}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="john.doe@example.com"
            value={form.email}
            onChange={handleChange}
            icon={<Mail className="w-4 h-4 text-slate-400" />}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            icon={<KeyRound className="w-4 h-4 text-slate-400" />}
          />

          <Button type="submit" loading={loading} className="w-full">
            {loading ? "Adding Admin..." : "Add Admin"}
          </Button>
          
          {messages.error && <Alert type="error">{messages.error}</Alert>}
          {messages.success && <Alert type="success">{messages.success}</Alert>}
        </form>

        <div className="text-center">
             <Link href="/superadmin/admins" className="text-sm font-medium text-blue-600 hover:underline">
                 ← Back to All Admins
             </Link>
        </div>
      </div>
    </div>
  );
}