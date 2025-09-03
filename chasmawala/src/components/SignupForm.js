import { useState } from "react";
import { useRouter } from "next/navigation";

const SignupForm = ({ setShowAuthModal, setIsSignup }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        if (!name.trim() || !email.trim() || !password.trim()) {
            setError("All fields are required!");
            return;
        }

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Signup failed");
                return;
            }

            localStorage.setItem("token", data.token);
            setSuccess("Signup successful! Redirecting...");

            setTimeout(() => {
                setShowAuthModal(false);
                router.push("/");
            }, 1500);
        } catch (error) {
            console.error("Unexpected error:", error);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md px-8 py-6 animate-fade-in">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Create Your Account</h2>

                <form onSubmit={handleSignup} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {success && <p className="text-green-500 text-sm">{success}</p>}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white py-2 rounded-lg font-medium"
                    >
                        Sign Up
                    </button>

                    <button
                        type="button"
                        className="w-full mt-2 text-sm text-gray-600 hover:text-gray-800 underline"
                        onClick={() => setShowAuthModal(false)}
                    >
                        Cancel
                    </button>
                    <p className="text-sm text-center mt-4">
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={() => setIsSignup(false)}
                            className="text-blue-600 underline"
                        >
                            Login
                        </button>
                    </p>

                </form>
            </div>
        </div>
    );
};

export default SignupForm;
