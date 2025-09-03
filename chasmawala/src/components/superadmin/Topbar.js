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
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/authContext"; // ✅ make sure you import this
import { useState } from "react";

export default function Topbar() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("admin-token"); // Clear token
    logout(); // also clear auth context
    router.push("/admin/login"); // Redirect
  };

  return (
    <div className="flex items-center justify-between bg-white shadow px-6 py-3">
      {/* Left: Title */}
      <h1 className="text-lg font-semibold">
        {user?.role === "superadmin" ? "SuperAdmin Dashboard" : "Admin Dashboard"}
      </h1>

      {/* Right: Avatar + Dropdown */}
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center space-x-2 focus:outline-none"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="/superadmin.png" alt="Profile" />
              <AvatarFallback>
                {user?.role === "superadmin" ? "SA" : "AD"}
              </AvatarFallback>
            </Avatar>
            <ChevronDown className="h-4 w-4 opacity-70" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40 mr-4">
          <DropdownMenuLabel>
            {user?.role === "superadmin" ? "SuperAdmin" : "Admin"}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              href={
                user?.role === "superadmin"
                  ? "/superadmin/profile"
                  : "/admin/profile"
              }
            >
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
