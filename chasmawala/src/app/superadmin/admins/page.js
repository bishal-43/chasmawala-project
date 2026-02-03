// src/app/superadmin/admins/page.js
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PlusCircle, Trash2, Users, ShieldAlert, Mail, UserCheck, Search, Filter, MoreVertical, Edit, Shield } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

// --- Enhanced UI Components ---

const Card = ({ children, className = '' }) => (
  <div className={`bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="p-6 sm:p-8 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
    {children}
  </div>
);

const CardContent = ({ children }) => <div className="p-6 sm:p-8">{children}</div>;

const Button = ({ children, onClick, variant = 'primary', disabled = false, className = '', size = 'md' }) => {
  const baseStyles = "rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5",
    lg: "px-6 py-3 text-lg"
  };
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl",
    destructive: "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg shadow-red-500/30 hover:shadow-xl",
    outline: "bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700",
    ghost: "hover:bg-gray-100 text-gray-600"
  };
  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

// Enhanced Skeleton Loader
const AdminTableSkeleton = () => (
  <div className="space-y-4">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl animate-pulse border border-gray-200">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gray-300 rounded-full"></div>
          <div className="flex-1 space-y-3">
            <div className="h-5 w-40 bg-gray-300 rounded-lg"></div>
            <div className="h-4 w-56 bg-gray-300 rounded-lg"></div>
          </div>
          <div className="h-10 w-28 bg-gray-300 rounded-xl"></div>
        </div>
      </div>
    ))}
  </div>
);

// Admin Card Component
const AdminCard = ({ admin, onDelete, isDeleting }) => {
  const [showMenu, setShowMenu] = useState(false);
  
  return (
    <div className="group relative p-5 bg-white hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 rounded-xl border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Gradient accent on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all">
            {admin.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-3 border-white flex items-center justify-center">
            <UserCheck className="w-3 h-3 text-white" />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-900 mb-1 truncate group-hover:text-blue-700 transition-colors">
                {admin.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="truncate">{admin.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  <Shield className="w-3 h-3" />
                  Admin
                </span>
                <span className="text-xs text-gray-500">ID: {admin._id.slice(-6)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => toast.success("Edit functionality coming soon!")}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(admin._id)}
                disabled={isDeleting}
              >
                <Trash2 className="w-4 h-4" />
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Empty State Component
const EmptyState = () => (
  <div className="text-center py-16">
    <div className="relative inline-block">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl"></div>
      <div className="relative p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl">
        <ShieldAlert className="mx-auto h-16 w-16 text-gray-400" />
      </div>
    </div>
    <h3 className="mt-6 text-2xl font-bold text-gray-900">No Admins Found</h3>
    <p className="mt-2 text-gray-500 max-w-sm mx-auto">
      Get started by adding your first administrator to help manage the platform.
    </p>
    <Link href="/superadmin/admins/add">
      <Button className="mt-6" size="lg">
        <PlusCircle className="w-5 h-5" />
        Add Your First Admin
      </Button>
    </Link>
  </div>
);

// Stats Cards
const StatsCard = ({ icon: Icon, label, value, gradient }) => (
  <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3">
      <div className={`p-3 bg-gradient-to-br ${gradient} rounded-xl shadow-lg`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

// --- Main Page Component ---

export default function AdminsPage() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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
    toast(
      (t) => (
        <div className="flex flex-col items-center gap-4 p-2">
          <div className="p-3 bg-red-100 rounded-full">
            <Trash2 className="w-6 h-6 text-red-600" />
          </div>
          <div className="text-center">
            <p className="font-bold text-gray-900 mb-1">Delete Admin?</p>
            <p className="text-sm text-gray-600">This action cannot be undone.</p>
          </div>
          <div className="flex gap-3 w-full">
            <Button
              variant="destructive"
              onClick={() => {
                toast.dismiss(t.id);
                performDelete(id);
              }}
              className="flex-1"
            >
              Delete
            </Button>
            <Button variant="outline" onClick={() => toast.dismiss(t.id)} className="flex-1">
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

  const filteredAdmins = admins.filter(admin =>
    admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-4 sm:p-6 lg:p-8">
      <Toaster 
        position="top-center" 
        toastOptions={{
          className: 'bg-white shadow-2xl rounded-xl border border-gray-200',
        }}
      />
      
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Stats Overview */}
        {!loading && admins.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatsCard 
              icon={Users} 
              label="Total Admins" 
              value={admins.length}
              gradient="from-blue-500 to-blue-600"
            />
            <StatsCard 
              icon={UserCheck} 
              label="Active" 
              value={admins.length}
              gradient="from-emerald-500 to-emerald-600"
            />
            <StatsCard 
              icon={Shield} 
              label="Permissions" 
              value="Full"
              gradient="from-purple-500 to-purple-600"
            />
          </div>
        )}

        {/* Main Card */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Manage Admins
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    View and manage administrator accounts
                  </p>
                </div>
              </div>
              <Link href="/superadmin/admins/add">
                <Button size="lg" className="w-full sm:w-auto">
                  <PlusCircle className="w-5 h-5" />
                  Add Admin
                </Button>
              </Link>
            </div>

            {/* Search and Filters */}
            {!loading && admins.length > 0 && (
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  />
                </div>
                <Button variant="outline" className="sm:w-auto">
                  <Filter className="w-4 h-4" />
                  Filters
                </Button>
              </div>
            )}
          </CardHeader>

          <CardContent>
            {loading ? (
              <AdminTableSkeleton />
            ) : admins.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                {filteredAdmins.length === 0 ? (
                  <div className="text-center py-12">
                    <Search className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                    <h3 className="text-lg font-semibold text-gray-700">No results found</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Try adjusting your search query
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredAdmins.map((admin) => (
                      <AdminCard
                        key={admin._id}
                        admin={admin}
                        onDelete={handleDelete}
                        isDeleting={deletingId === admin._id}
                      />
                    ))}
                  </div>
                )}
                
                {/* Results count */}
                <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                  <p className="text-sm text-gray-500">
                    Showing <span className="font-semibold text-gray-900">{filteredAdmins.length}</span> of{" "}
                    <span className="font-semibold text-gray-900">{admins.length}</span> admin{admins.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}