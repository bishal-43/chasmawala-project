// src/components/superadmin/AddAdminDialog.js

// You would need a basic Dialog/Modal component structure.
// Here is a conceptual implementation using a simple div.
// For a production app, use a library like Headless UI.
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { X } from "lucide-react";

export const AddAdminDialog = ({ isOpen, onClose, onAdminAdded }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password.length < 8) {
        setError("Password must be at least 8 characters long.");
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
      if (!res.ok) throw new Error(data.error || "Failed to add admin");
      
      onAdminAdded(data.admin);
      setForm({ name: "", email: "", password: "" });
      onClose();

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 m-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-800">Add New Admin</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100">
            <X className="h-5 w-5 text-slate-600" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Full Name" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" />
          <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" />
          <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Minimum 8 characters" />
          
          {error && <Alert type="error">{error}</Alert>}

          <div className="flex justify-end space-x-3 pt-2">
            <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit" loading={loading}>
              {loading ? "Adding..." : "Add Admin"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};