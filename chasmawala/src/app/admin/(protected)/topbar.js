"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/services/auth";
import { 
  Bell, 
  LogOut, 
  Menu, 
  Search, 
  Settings, 
  UserCircle2,
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";

export default function Topbar({ onMenuClick }) {
  const { user, logout: authContextLogout } = useAuth();
  const router = useRouter();
  // State to handle the visibility of the mobile search overlay
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      authContextLogout();
      router.replace("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // It's better to use a toast notification library for user feedback
      toast.error("Logout failed. Please try again.");
      
    }
  };

  const getInitials = (name) => {
    if (!name) return "AD"; // Default Admin initials
    const names = name.split(' ');
    if (names.length > 1) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-20 border-b bg-background">
      <div className="flex h-16 items-center justify-between gap-2 px-3 sm:px-6">

        {/* --- Mobile Search Overlay --- */}
        {/* Renders a full-screen search when active */}
        {isMobileSearchOpen && (
          <div className="absolute inset-0 z-30 flex items-center bg-background px-3 sm:px-6 animate-in fade-in slide-in-from-top-1 duration-200">
            <Search className="absolute left-6 h-4 w-4 text-muted-foreground" />
            <Input
              autoFocus
              className="h-10 w-full border-none bg-transparent pl-10 pr-12 text-base shadow-none focus-visible:ring-0"
              placeholder="Search products, orders..."
              onBlur={() => setIsMobileSearchOpen(false)} // Closes when input loses focus
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-3 sm:right-6 shrink-0"
              onClick={() => setIsMobileSearchOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close search</span>
            </Button>
          </div>
        )}

        {/* --- Main Topbar (Visible when mobile search is closed) --- */}
        <div className={`flex w-full items-center gap-2 ${isMobileSearchOpen ? 'opacity-0' : 'opacity-100'}`}>
          
          {/* Left Side: Mobile Menu */}
          <div className="flex items-center gap-2 md:hidden">
             <Button
               variant="ghost"
               size="icon"
               className="-ml-2 shrink-0"
               onClick={onMenuClick}
             >
               <Menu className="h-5 w-5" />
               <span className="sr-only">Toggle navigation menu</span>
             </Button>
          </div>
          
          {/* Center: Desktop Search Bar */}
          <div className="hidden md:flex flex-1 md:mx-4 lg:mx-8">
            <form className="w-full max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  className="w-full bg-muted/40 pl-9 shadow-none focus-visible:ring-1"
                  placeholder="Search products, orders, customers..."
                />
              </div>
            </form>
          </div>

          {/* Spacer for mobile view to push actions to the right */}
          <div className="flex-1 md:hidden" />

          {/* Right Side: Actions & User Menu */}
          <div className="flex items-center gap-1 sm:gap-2">
            
            {/* Mobile Search Trigger */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden shrink-0 text-muted-foreground"
              onClick={() => setIsMobileSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Open search</span>
            </Button>

            <Button variant="ghost" size="icon" className="relative shrink-0 rounded-full text-muted-foreground">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="sr-only">View notifications</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full ml-1 ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <Avatar className="h-9 w-9 border">
                    <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {getInitials(user?.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name || "Admin"}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email || "admin@example.com"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/admin/profile")} className="cursor-pointer">
                  <UserCircle2 className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}