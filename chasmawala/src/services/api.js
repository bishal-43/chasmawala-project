const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const signup = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      credentials: "include", // ✅ Important for authentication
    });

    return await response.json();
  } catch (error) {
    console.error("Signup Error:", error);
    return { error: "Something went wrong!" };
  }
};

export const login = async (credentials) => {
  try {
    console.log("🔍 Login API Request:", `${API_URL}/api/auth/login`);  // ✅ Log API URL

    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      credentials: "include",
    });

    return await response.json();
  } catch (error) {
    console.error("🔥 Login Error:", error);
    return { error: "Something went wrong!" };
  }
};


