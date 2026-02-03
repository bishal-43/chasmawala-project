"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ChevronDown, 
  Search, 
  Bell, 
  Settings, 
  LogOut, 
  User, 
  Shield,
  Menu,
  X
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/authContext";
import { useState } from "react";

export default function Topbar() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications] = useState(3); // Example notification count

  const handleLogout = () => {
    localStorage.removeItem("admin-token");
    logout();
    router.push("/admin/login");
  };

  const isSuperAdmin = user?.role === "superadmin";
  const userInitials = user?.name 
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() 
    : (isSuperAdmin ? "SA" : "AD");

  return (
    <>
      {/* Main Topbar */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Section */}
            <div className="flex items-center gap-4 flex-1">
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5 text-gray-600" />
                ) : (
                  <Menu className="h-5 w-5 text-gray-600" />
                )}
              </button>

              {/* Title with badge */}
              <div className="hidden sm:flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {isSuperAdmin && (
                    <div className="p-1.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg shadow-purple-500/30">
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div>
                    <h1 className="text-lg font-bold text-gray-900">
                      {isSuperAdmin ? "SuperAdmin" : "Admin"}
                    </h1>
                    <p className="text-xs text-gray-500 -mt-0.5">Dashboard</p>
                  </div>
                </div>
                
                {isSuperAdmin && (
                  <span className="px-2.5 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold rounded-full shadow-sm">
                    Master Access
                  </span>
                )}
              </div>

              {/* Search Bar */}
              <div className="hidden md:flex flex-1 max-w-md ml-6">
                <div className={`relative w-full transition-all duration-300 ${
                  searchFocused ? 'scale-105' : ''
                }`}>
                  <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${
                    searchFocused ? 'text-purple-500' : 'text-gray-400'
                  }`} />
                  <input
                    type="text"
                    placeholder="Search anything..."
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className={`w-full pl-10 pr-4 py-2 bg-gray-50 border-2 rounded-xl text-sm transition-all duration-300 focus:outline-none ${
                      searchFocused 
                        ? 'border-purple-500 bg-white shadow-lg shadow-purple-500/10' 
                        : 'border-transparent hover:bg-gray-100'
                    }`}
                  />
                  {searchFocused && (
                    <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-white rounded-xl shadow-xl border border-gray-100 animate-slideDown">
                      <p className="text-xs text-gray-500 px-3 py-2">Start typing to search...</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search icon for mobile */}
              <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Search className="h-5 w-5 text-gray-600" />
              </button>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-105 active:scale-95">
                <Bell className="h-5 w-5 text-gray-600" />
                {notifications > 0 && (
                  <>
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    <span className="absolute -top-1 -right-1 px-1.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {notifications}
                    </span>
                  </>
                )}
              </button>

              {/* Settings */}
              <button className="hidden sm:block p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-105 active:scale-95 hover:rotate-90">
                <Settings className="h-5 w-5 text-gray-600" />
              </button>

              {/* Divider */}
              <div className="hidden sm:block h-8 w-px bg-gray-200"></div>

              {/* User Dropdown */}
              <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 px-2 sm:px-3 py-2 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:shadow-md group"
                  >
                    <div className="relative">
                      <Avatar className="h-9 w-9 border-2 border-white shadow-md ring-2 ring-gray-100 group-hover:ring-purple-500 transition-all duration-300">
                        <AvatarImage src="/superadmin.png" alt="Profile" />
                        <AvatarFallback className={`text-xs font-bold ${
                          isSuperAdmin 
                            ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white' 
                            : 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white'
                        }`}>
                          {userInitials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                    </div>
                    
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-semibold text-gray-900 leading-none">
                        {user?.name || (isSuperAdmin ? "Super Admin" : "Admin")}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {user?.email || `${isSuperAdmin ? 'superadmin' : 'admin'}@example.com`}
                      </p>
                    </div>
                    
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${
                      open ? 'rotate-180' : ''
                    }`} />
                  </Button>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent 
                  className="w-64 mr-2 sm:mr-4 mt-2 p-2 bg-white/95 backdrop-blur-xl border border-gray-200 shadow-xl rounded-xl animate-slideDown"
                  align="end"
                >
                  {/* User Info Header */}
                  <div className="px-3 py-3 mb-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                    <DropdownMenuLabel className="p-0">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                          <AvatarImage src="/superadmin.png" alt="Profile" />
                          <AvatarFallback className={`font-bold ${
                            isSuperAdmin 
                              ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white' 
                              : 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white'
                          }`}>
                            {userInitials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 truncate">
                            {user?.name || (isSuperAdmin ? "Super Admin" : "Admin")}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user?.email || `${isSuperAdmin ? 'superadmin' : 'admin'}@example.com`}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                            <span className="text-xs text-emerald-600 font-medium">Online</span>
                          </div>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                  </div>

                  <DropdownMenuSeparator className="my-2" />

                  <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-gray-100 transition-colors py-2.5">
                    <Link
                      href={isSuperAdmin ? "/superadmin/profile" : "/admin/profile"}
                      className="flex items-center gap-3 w-full"
                    >
                      <div className="p-1.5 bg-blue-50 rounded-lg">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">My Profile</p>
                        <p className="text-xs text-gray-500">View and edit profile</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-gray-100 transition-colors py-2.5">
                    <div className="flex items-center gap-3 w-full">
                      <div className="p-1.5 bg-purple-50 rounded-lg">
                        <Settings className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Settings</p>
                        <p className="text-xs text-gray-500">Preferences & config</p>
                      </div>
                    </div>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="my-2" />

                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="rounded-lg cursor-pointer hover:bg-red-50 transition-colors text-red-600 py-2.5 focus:bg-red-50 focus:text-red-600"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="p-1.5 bg-red-50 rounded-lg">
                        <LogOut className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Logout</p>
                        <p className="text-xs text-red-500">Sign out of account</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm animate-fadeIn" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-xl p-4 animate-slideDown">
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                {isSuperAdmin && (
                  <div className="p-1.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                )}
                <div>
                  <h2 className="text-sm font-bold text-gray-900">
                    {isSuperAdmin ? "SuperAdmin Dashboard" : "Admin Dashboard"}
                  </h2>
                  <p className="text-xs text-gray-500">Master Control Panel</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
}