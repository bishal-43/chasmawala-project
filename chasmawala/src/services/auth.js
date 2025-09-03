const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// ✅ Signup User
export const signupUser = async (userData) => {
  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      // If server returns an error (e.g., email already exists)
      return { error: true, message: data.error || "Signup failed" };
    }

    // On success
    return { error: false, message: "Signup successful", user: data.user };
  } catch (err) {
    // For network errors
    console.error("Signup network/server error:", err);
    return { error: true, message: "Network error or server issue" };
  }
};


// ✅ Login User
export const loginUser = async (userData) => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Important for cookie storage
      body: JSON.stringify(userData),
    });

    // If the response is not ok, return a structured error message
    if (!response.ok) {
      const errorData = await response.json();
      // Ensure consistency: return null for user on error
      return { error: true, message: errorData.error || "Login failed", user: null };
    }

    // If the response is successful, return user data
    const data = await response.json();
    // Return ONLY the user object, consistent with checkAuth's new return
    return { error: false, message: "Login successful", user: data.user };
  } catch (err) {
    // Catching network errors or unexpected issues
    console.error("Login network/server error:", err);
    return { error: true, message: "Network error or server issue", user: null };
  }
};

// ✅ Check if User is Authenticated
export const checkAuth = async () => {
  const response = await fetch("/api/auth/check-auth", {
    method:"GET",
    credentials: "include",
    cache: "no-store",
  });

  if (response.status === 401) {
    //throw new Error("Not authenticated");
    return null;
  }

  if (!response.ok) {
    throw new Error("Auth check failed with status " + response.status);
  }

  // Parse the JSON response
  const data = await response.json();
  console.log("check-auth response:", data);

  // IMPORTANT: Return ONLY the user object from the response.
  // The AuthContext's setUser expects the user object directly.
  return data.user;
};

// ✅ Logout User
export const logoutUser = async () => {
  await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
};
