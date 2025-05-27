"use client";
import { useState } from "react";
import { loginUser } from "@/services/auth";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { setUser } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await loginUser(formData);
      console.log("Login Response:", response); 
      
      if (response.user) {
        setUser(response.user);
        router.push("/"); // ✅ Redirect to home page
      } else {
        setError(response.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
