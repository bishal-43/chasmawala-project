"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "@/services/auth"; // ✅ Ensure correct import

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ Prevent multiple submissions
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // ✅ Disable button while submitting

    // ✅ Trim input values before submitting
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // ✅ Basic input validation
    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    // ✅ Ensure valid email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email.");
      setLoading(false);
      return;
    }

    // ✅ Ensure strong password
    if (trimmedPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    try {
      const response = await signup({ name: trimmedName, email: trimmedEmail, password: trimmedPassword });

      if (response.error) {
        setError(response.error || "Signup failed. Please try again.");
      } else {
        alert("Account Created Successfully!");
        router.push("/account/login"); // ✅ Redirect to login page after signup
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // ✅ Re-enable button after request
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      {error && <p className="text-red-500">{error}</p>} {/* ✅ Show error message only when needed */}
      <form onSubmit={handleSignup} className="space-y-4">
        <input 
          type="text" 
          placeholder="Full Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="w-full p-3 border rounded-lg"
          required
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-3 border rounded-lg"
          required
        />
        <input 
          type="password" 
          placeholder="Password (Min 8 chars)" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full p-3 border rounded-lg"
          required
        />
        <button 
          type="submit" 
          className={`w-full p-3 rounded-lg text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
          }`}
          disabled={loading} // ✅ Prevent multiple submissions
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
