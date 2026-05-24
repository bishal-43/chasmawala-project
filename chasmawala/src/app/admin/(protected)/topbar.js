// "use client";

// import { useState } from "react";
// import { useAuth } from "@/contexts/authContext";
// import { useRouter } from "next/navigation";
// import { logoutUser } from "@/services/auth";
// import { 
//   Bell, 
//   LogOut, 
//   Menu, 
//   Search, 
//   Settings, 
//   UserCircle2,
//   X 
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import toast from "react-hot-toast";

// export default function Topbar({ onMenuClick }) {
//   const { user, logout: authContextLogout } = useAuth();
//   const router = useRouter();
//   // State to handle the visibility of the mobile search overlay
//   const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

//   const handleLogout = async () => {
//     try {
//       await logoutUser();
//       authContextLogout();
//       router.replace("/admin/login");
//     } catch (error) {
//       console.error("Logout failed:", error);
//       // It's better to use a toast notification library for user feedback
//       toast.error("Logout failed. Please try again.");
      
//     }
//   };

//   const getInitials = (name) => {
//     if (!name) return "AD"; // Default Admin initials
//     const names = name.split(' ');
//     if (names.length > 1) {
//       return (names[0][0] + names[names.length - 1][0]).toUpperCase();
//     }
//     return name.substring(0, 2).toUpperCase();
//   };

//   return (
//     <header className="sticky top-0 z-20 border-b bg-background">
//       <div className="flex h-16 items-center justify-between gap-2 px-3 sm:px-6">

//         {/* --- Mobile Search Overlay --- */}
//         {/* Renders a full-screen search when active */}
//         {isMobileSearchOpen && (
//           <div className="absolute inset-0 z-30 flex items-center bg-background px-3 sm:px-6 animate-in fade-in slide-in-from-top-1 duration-200">
//             <Search className="absolute left-6 h-4 w-4 text-muted-foreground" />
//             <Input
//               autoFocus
//               className="h-10 w-full border-none bg-transparent pl-10 pr-12 text-base shadow-none focus-visible:ring-0"
//               placeholder="Search products, orders..."
//               onBlur={() => setIsMobileSearchOpen(false)} // Closes when input loses focus
//             />
//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute right-3 sm:right-6 shrink-0"
//               onClick={() => setIsMobileSearchOpen(false)}
//             >
//               <X className="h-5 w-5" />
//               <span className="sr-only">Close search</span>
//             </Button>
//           </div>
//         )}

//         {/* --- Main Topbar (Visible when mobile search is closed) --- */}
//         <div className={`flex w-full items-center gap-2 ${isMobileSearchOpen ? 'opacity-0' : 'opacity-100'}`}>
          
//           {/* Left Side: Mobile Menu */}
//           <div className="flex items-center gap-2 md:hidden">
//              <Button
//                variant="ghost"
//                size="icon"
//                className="-ml-2 shrink-0"
//                onClick={onMenuClick}
//              >
//                <Menu className="h-5 w-5" />
//                <span className="sr-only">Toggle navigation menu</span>
//              </Button>
//           </div>
          
//           {/* Center: Desktop Search Bar */}
//           <div className="hidden md:flex flex-1 md:mx-4 lg:mx-8">
//             <form className="w-full max-w-xl">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   className="w-full bg-muted/40 pl-9 shadow-none focus-visible:ring-1"
//                   placeholder="Search products, orders, customers..."
//                 />
//               </div>
//             </form>
//           </div>

//           {/* Spacer for mobile view to push actions to the right */}
//           <div className="flex-1 md:hidden" />

//           {/* Right Side: Actions & User Menu */}
//           <div className="flex items-center gap-1 sm:gap-2">
            
//             {/* Mobile Search Trigger */}
//             <Button
//               variant="ghost"
//               size="icon"
//               className="md:hidden shrink-0 text-muted-foreground"
//               onClick={() => setIsMobileSearchOpen(true)}
//             >
//               <Search className="h-5 w-5" />
//               <span className="sr-only">Open search</span>
//             </Button>

//             <Button variant="ghost" size="icon" className="relative shrink-0 rounded-full text-muted-foreground">
//               <Bell className="h-5 w-5" />
//               <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
//               </span>
//               <span className="sr-only">View notifications</span>
//             </Button>

//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" className="relative h-9 w-9 rounded-full ml-1 ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
//                   <Avatar className="h-9 w-9 border">
//                     <AvatarImage src={user?.avatarUrl} alt={user?.name} />
//                     <AvatarFallback className="bg-primary/10 text-primary font-semibold">
//                       {getInitials(user?.name)}
//                     </AvatarFallback>
//                   </Avatar>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="w-56" align="end" forceMount>
//                 <DropdownMenuLabel className="font-normal">
//                   <div className="flex flex-col space-y-1">
//                     <p className="text-sm font-medium leading-none">{user?.name || "Admin"}</p>
//                     <p className="text-xs leading-none text-muted-foreground">
//                       {user?.email || "admin@example.com"}
//                     </p>
//                   </div>
//                 </DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem onClick={() => router.push("/admin/profile")} className="cursor-pointer">
//                   <UserCircle2 className="mr-2 h-4 w-4" />
//                   <span>Profile</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem className="cursor-pointer">
//                   <Settings className="mr-2 h-4 w-4" />
//                   <span>Settings</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer">
//                   <LogOut className="mr-2 h-4 w-4" />
//                   <span>Log out</span>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }



"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/services/auth";
import {
  Bell, LogOut, Menu, Search,
  Settings, UserCircle2, X, ChevronDown,
} from "lucide-react";
import toast from "react-hot-toast";

export default function Topbar({ onMenuClick, title = "Dashboard" }) {
  const { user, logout: authContextLogout } = useAuth();
  const router = useRouter();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      authContextLogout();
      router.replace("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const getInitials = (name) => {
    if (!name) return "AD";
    const names = name.split(" ");
    if (names.length > 1)
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-20 h-16 bg-white/80 backdrop-blur-md border-b border-zinc-100 flex items-center px-4 sm:px-7 gap-4">

      {/* ── Mobile search overlay ── */}
      {isMobileSearchOpen && (
        <div className="absolute inset-0 z-30 flex items-center bg-white px-4 gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
            <input
              autoFocus
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none focus:border-amber-400/80 focus:ring-4 focus:ring-amber-500/10 transition-all duration-200"
              placeholder="Search products, orders..."
              onBlur={() => setIsMobileSearchOpen(false)}
            />
          </div>
          <button
            className="w-9 h-9 rounded-xl border border-zinc-200 flex items-center justify-center text-zinc-400 hover:bg-zinc-50 hover:text-zinc-700 transition-all flex-shrink-0"
            onClick={() => setIsMobileSearchOpen(false)}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* ── Left: mobile menu + breadcrumb ── */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          className="md:hidden w-9 h-9 rounded-xl border border-zinc-200 flex items-center justify-center text-zinc-400 hover:bg-zinc-50 hover:text-zinc-700 transition-all flex-shrink-0"
          onClick={onMenuClick}
        >
          <Menu className="h-4 w-4" />
          <span className="sr-only">Toggle menu</span>
        </button>

        <div className="hidden md:block w-px h-5 bg-zinc-200 flex-shrink-0" />

        <div className="flex items-center gap-2 min-w-0">
          <span className="hidden sm:block text-[10px] font-bold tracking-widest uppercase text-zinc-405 text-zinc-400 whitespace-nowrap">
            Admin
          </span>
          <span className="hidden sm:block text-zinc-300 text-sm">/</span>
          <span className="font-bold text-[16px] text-zinc-800 tracking-tight truncate">
            {title}
          </span>
        </div>
      </div>

      {/* ── Center: desktop search ── */}
      <div className="hidden md:block flex-shrink-0 w-[380px] lg:w-[440px]">
        <div className="relative group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none group-focus-within:text-amber-500 transition-colors" />
          <input
            className="w-full h-10 pl-10 pr-14 rounded-2xl border border-zinc-200/80 bg-zinc-55/40 bg-zinc-50/50 text-[13.5px] text-zinc-800 placeholder:text-zinc-400/80 outline-none focus:border-amber-400/80 focus:bg-white focus:ring-4 focus:ring-amber-500/10 transition-all duration-200"
            placeholder="Search products, orders, customers..."
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold bg-zinc-200/60 text-zinc-500 px-2 py-1 rounded-lg pointer-events-none select-none">
            ⌘K
          </span>
        </div>
      </div>

      {/* ── Right: actions ── */}
      <div className="flex items-center gap-1.5 flex-shrink-0">

        {/* Mobile search trigger */}
        <button
          className="md:hidden w-9 h-9 rounded-xl border border-zinc-200 flex items-center justify-center text-zinc-400 hover:bg-zinc-50 hover:text-zinc-700 transition-all"
          onClick={() => setIsMobileSearchOpen(true)}
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </button>

        {/* Notifications */}
        <button className="relative w-10 h-10 rounded-2xl border border-zinc-200 bg-white flex items-center justify-center text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800 hover:border-zinc-300 transition-all shadow-sm">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
          </span>
          <span className="sr-only">Notifications</span>
        </button>

        {/* User dropdown */}
        <div className="relative ml-1">
          <button
            className="flex items-center gap-2 pl-1 pr-3.5 py-1 h-10 rounded-2xl border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 transition-all shadow-sm"
            onClick={() => setIsDropdownOpen((p) => !p)}
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-[11px] font-bold text-zinc-950 flex-shrink-0 overflow-hidden shadow-inner">
              {user?.avatarUrl
                ? <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                : getInitials(user?.name)
              }
            </div>
            <span className="hidden sm:block text-[13px] font-semibold text-zinc-700 max-w-[96px] truncate">
              {user?.name || "Admin"}
            </span>
            <ChevronDown
              className={`hidden sm:block h-4 w-4 text-zinc-400 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isDropdownOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />

              <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-56 bg-white border border-zinc-100 rounded-2xl shadow-2xl shadow-zinc-200/80 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">

                {/* User info header */}
                <div className="px-4 py-3.5 bg-zinc-50/50 border-b border-zinc-100">
                  <p className="text-[13.5px] font-bold text-zinc-800 leading-tight">
                    {user?.name || "Admin"}
                  </p>
                  <p className="text-[11.5px] text-zinc-400 mt-1 truncate">
                    {user?.email || "admin@example.com"}
                  </p>
                </div>

                {/* Items */}
                <div className="p-2 space-y-0.5">
                  <button
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950 transition-colors text-left font-medium"
                    onClick={() => { setIsDropdownOpen(false); router.push("/admin/profile"); }}
                  >
                    <UserCircle2 className="h-4 w-4 text-zinc-400 flex-shrink-0" />
                    Profile
                  </button>

                  <button
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950 transition-colors text-left font-medium"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Settings className="h-4 w-4 text-zinc-400 flex-shrink-0" />
                    Settings
                  </button>

                  <div className="my-1.5 h-px bg-zinc-100" />

                  <button
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left"
                    onClick={() => { setIsDropdownOpen(false); handleLogout(); }}
                  >
                    <LogOut className="h-4 w-4 text-rose-500 flex-shrink-0" />
                    Log out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}