// src/app/account/change-password/page.js
"use client";

import { useState } from "react";

// A simple loading spinner component for visual feedback
const LoadingSpinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


export default function ChangePasswordPage() {
    // State for form fields
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Enhanced state for loading and messages
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", content: "" }); // 'type' can be 'error' or 'success'

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ type: "", content: "" }); // Clear previous messages

        if (newPassword !== confirmPassword) {
            setMessage({ type: "error", content: "New passwords do not match." });
            setIsLoading(false);
            return;
        }

        

        try {
            const res = await fetch("/api/account/change-password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    
                },
                credentials: "include",
                // ✅ BUG FIX: Changed 'oldPassword' to 'currentPassword' to match the API
                body: JSON.stringify({ currentPassword: oldPassword, newPassword }),
            });

            const data = await res.json();

            if (!res.ok) {
                // Throw an error to be caught by the catch block
                throw new Error(data.error || "An unknown error occurred.");
            }
            
            setMessage({ type: "success", content: "Password changed successfully!" });
            
            // ✅ UX Improvement: Clear form fields on success
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");

        } catch (error) {
            setMessage({ type: "error", content: error.message });
        } finally {
            // ✅ UX Improvement: Ensure loading is always turned off
            setIsLoading(false);
        }
    };

    // Determine message color based on its type
    const messageColor = message.type === "success" ? "text-green-600" : "text-red-600";

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-800">Change Your Password</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="password"
                        placeholder="Current Password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        disabled={isLoading}
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        disabled={isLoading}
                    />
                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        disabled={isLoading}
                    />
                    <button 
                        type="submit" 
                        className="w-full flex justify-center items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
                        disabled={isLoading}
                    >
                        {isLoading ? <LoadingSpinner /> : 'Change Password'}
                    </button>
                </form>

                {message.content && (
                    <p className={`mt-4 text-center text-sm font-medium ${messageColor}`}>
                        {message.content}
                    </p>
                )}
            </div>
        </div>
    );
}
