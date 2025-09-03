// src/contexts/authContext.js

/*"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { checkAuth, logoutUser } from "@/services/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined); // undefined = not checked yet
  const [loading, setLoading] = useState(true);
  const [skipInitialCheck, setSkipInitialCheck] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    if (skipInitialCheck) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      setLoading(true);
      try {
        const userData = await checkAuth(); // calls /api/auth/check with credentials: 'include'
        console.log("Auth API response:", userData);
        setUser(userData || null); // null if not logged in
      } catch (error) {
        setUser(null);
        if (error.message === "Not authenticated") {
          console.log("User is not logged in");
        } else {
          console.error("Auth check failed:", error);
        }
      } finally {
        setLoading(false);
        setHasChecked(true);
      }
    };

    fetchUser();

    // Optional: refresh session every 15 mins like Google
    const interval = setInterval(fetchUser, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [skipInitialCheck]);

  const logout = async () => {
    try {
      await logoutUser(); // server clears cookie
      
    } finally {
      setUser(null);
      setSkipInitialCheck(false);
    }
  };

  const isAdmin = user?.role === "admin";
  const isSuperAdmin = user?.role === "superadmin";

  return (
    <AuthContext.Provider
      value={{ user, setUser, logout, loading, setSkipInitialCheck, isAdmin, isSuperAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);*/


// src/contexts/authContext.js

"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { checkAuth, logoutUser } from "@/services/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // We now use a single state to track the authentication status.
  // 'loading' -> The initial check has not completed yet.
  // 'authenticated' -> The user is logged in.
  // 'unauthenticated' -> The user is not logged in.
  const [authStatus, setAuthStatus] = useState("loading");
  const [skipInitialCheck, setSkipInitialCheck] = useState(false);

  useEffect(() => {
    if (skipInitialCheck) return;
    const fetchUser = async () => {
      try {
        const userData = await checkAuth(); // calls /api/auth/check-auth
        if (userData) {
          setUser(userData);
          setAuthStatus("authenticated");
        } else {
          setUser(null);
          setAuthStatus("unauthenticated");
        }
      } catch (error) {
        setUser(null);
        setAuthStatus("unauthenticated");
        console.error("Auth check failed:", error);
      }
    };

    fetchUser();
  }, [skipInitialCheck]); // The empty dependency array ensures this runs only once on initial mount.

  const logout = async () => {
    try {
      await logoutUser(); // Server clears the cookie
    } finally {
      setUser(null);
      setAuthStatus("unauthenticated");
    }
  };

  const isAdmin = user?.role === "admin";
  const isSuperAdmin = user?.role === "superadmin";

  return (
    <AuthContext.Provider
      value={{ user, setUser, authStatus, logout, isAdmin, isSuperAdmin, skipInitialCheck, setSkipInitialCheck }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

