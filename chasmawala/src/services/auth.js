const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

// ✅ Signup User
export const signupUser = async (userData) => {
  const response = await fetch(`${API_URL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return await response.json();
};

// ✅ Login User
export const loginUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Important for cookie storage
      body: JSON.stringify(userData),
    });

    // If the response is not ok, return a structured error message
    if (!response.ok) {
      const errorData = await response.json();
      return { error: true, message: errorData.error || "Login failed" };
    }

    // If the response is successful, return user data
    const data = await response.json();
    return { user: data.user }; // Assuming the backend returns `user` upon success
  } catch (err) {
    // Catching network errors or unexpected issues
    return { error: true, message: "Network error or server issue" };
  }
};

// ✅ Check if User is Authenticated
export const checkAuth = async () => {
  const response = await fetch(`${API_URL}/api/auth/check-auth`, {
    method:"GET",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Not authenticated");
  return await response.json();
};

// ✅ Logout User
export const logoutUser = async () => {
  await fetch(`${API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
};
