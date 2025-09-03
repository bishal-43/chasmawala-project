// app/superadmin/setting/page.js

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SuperAdminSettings() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [newPassword, setNewPassword] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    useEffect(() => {
        fetch("/api/auth/check-auth", {credentials:"include"})
        .then((res) => {
            if (!res.ok) throw new Error("Failed to load user");
            return res.json();
        })
        .then((data) => {
            setUser(data.user || null);
        })
        .catch((err) => {
            setError("Unauthorized or session expired");
            setUser(null);
        });
    }, []);

    const handleLogout = async() => {
        await fetch("api/auth/logout",{
            method: "POST",
            credentials: "include",
        });
        router.push("/admin/login");
    };

    const handlePasswordChange = async (e) => {
        setSuccess("");
        if (!newPassword || newPassword.length < 6){
            return setError("Password must be of minimum 6 characters");
        }
        const res = await fetch("/api/superadmin/change-password",{
            method: "POST",
            headers: {"content-type": "application/json"},
            credentials: "include",
            body: JSON.stringify({password:newPassword}),
        });

        const data = await res.json();
        if(res.ok){
            setSuccess("Password changed successfully");
            setNewPassword("");
        }else{
            setError(data.error || "Failed to change password");
        }
    };

    if (error) return <p className="text-red-600">{error}</p>;

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
            <h1 className="text-2xl semibold mb-6">Super Admin Settings</h1>

            {user ?(
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Name</label>
                        <p className="text-gray-800">{user.name}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Email</label>
                        <p className="text-gray-800">{user.email}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Role</label>
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded">{user.role}</span>
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-600">New Password</label>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded p-2"
                        />
                        <button onClick={handlePasswordChange} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Change Password
                        </button>
                    </div>

                    {success && <p className="text-green-600 mt-2">{success}</p>}
                    {error && <p className="text-red-600 mt-2">{error}</p>}

                    <button
                        onClick={handleLogout}
                        className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}

        </div>
    );



}