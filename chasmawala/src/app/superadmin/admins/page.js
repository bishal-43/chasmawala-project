// src/app/superadmin/admins/page.js
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PlusCircle, Trash2, Users, ShieldAlert } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

// --- UI Components (can be moved to their own files) ---

// Card component for a consistent container style
const Card = ({ children }) => (
  <div className="bg-white dark:bg-zinc-900 shadow-lg rounded-xl overflow-hidden">
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="p-6 border-b border-gray-200 dark:border-zinc-800">
    {children}
  </div>
);

const CardContent = ({ children }) => <div className="p-6">{children}</div>;

// Button component for consistent styling
const Button = ({ children, onClick, variant = 'primary', disabled = false, className = '' }) => {
  const baseStyles = "px-4 py-2 rounded-md font-semibold transition-all shadow-sm flex items-center gap-2";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    destructive: "bg-red-600 hover:bg-red-700 text-white",
    outline: "bg-transparent border border-gray-300 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800"
  };
  const disabledStyles = "disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none";
  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyles} ${variants[variant]} ${disabledStyles} ${className}`}>
      {children}
    </button>
  );
};

// Skeleton Loader for a better loading experience
const AdminTableSkeleton = () => (
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex justify-between items-center p-4 bg-gray-100 dark:bg-zinc-800 rounded-lg animate-pulse">
          <div className="space-y-2">
            <div className="h-5 w-32 bg-gray-300 dark:bg-zinc-700 rounded"></div>
            <div className="h-4 w-48 bg-gray-300 dark:bg-zinc-700 rounded"></div>
          </div>
          <div className="h-10 w-24 bg-gray-300 dark:bg-zinc-700 rounded-md"></div>
        </div>
      ))}
    </div>
);


// --- Main Page Component ---

export default function AdminsPage() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await fetch("/api/superadmin/admin", { credentials: "include" });
        if (!res.ok) {
          throw new Error(`Error ${res.status}: Could not fetch admins.`);
        }
        const data = await res.json();
        setAdmins(data.admins || []);
      } catch (err) {
        toast.error(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchAdmins();
  }, []);

  const handleDelete = async (id) => {
    // Custom confirmation using a toast
    toast(
      (t) => (
        <div className="flex flex-col items-center gap-3">
          <p className="font-semibold">Are you sure you want to delete this admin?</p>
          <div className="flex gap-4">
            <Button
              variant="destructive"
              onClick={() => {
                toast.dismiss(t.id);
                performDelete(id);
              }}
            >
              Yes, Delete
            </Button>
            <Button variant="outline" onClick={() => toast.dismiss(t.id)}>
              Cancel
            </Button>
          </div>
        </div>
      ),
      { duration: 6000 }
    );
  };

  const performDelete = async (id) => {
    setDeletingId(id);
    const toastId = toast.loading("Deleting admin...");
    try {
      const res = await fetch(`/api/superadmin/admin/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to delete admin");
      }
      toast.success("Admin deleted successfully!", { id: toastId });
      setAdmins((prev) => prev.filter((admin) => admin._id !== id));
    } catch (err) {
      toast.error(err.message, { id: toastId });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <Toaster position="top-center" reverseOrder={false} />
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                    Manage Admins
                </h1>
            </div>
            <Link href="/superadmin/admins/add">
                <Button>
                    <PlusCircle className="w-5 h-5" />
                    <span className="hidden md:inline">Add Admin</span>
                </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <AdminTableSkeleton />
          ) : admins.length === 0 ? (
            <div className="text-center py-10">
                <ShieldAlert className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-700 dark:text-gray-300">No Admins Found</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by adding a new administrator.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {admins.map((admin) => (
                <div
                  key={admin._id}
                  className="flex flex-col md:flex-row justify-between md:items-center bg-gray-50 dark:bg-zinc-800/50 p-4 rounded-lg border border-gray-200 dark:border-zinc-700 shadow-sm"
                >
                  <div className="mb-3 md:mb-0">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{admin.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{admin.email}</p>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(admin._id)}
                    disabled={deletingId === admin._id}
                  >
                    <Trash2 className="w-4 h-4" />
                    {deletingId === admin._id ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}