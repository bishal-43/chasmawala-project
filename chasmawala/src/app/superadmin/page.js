// app/superadmin/page.js
"use client"

import { useEffect, useState } from "react"


export default function SuperAdminDashboard() {
    const [admins, setadmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        fetch("/api/superadmin/admin", { credentials: "include" })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch admins");
                return res.json();
            })
            .then((data) => {
                setadmins(data.admins || []);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading admins...</p>;
    if (error) return <p>Error: {error}</p>;


    return (
        <div>
            <h1>SuperAdmin Dashboard</h1>
            <h2>Manage Admins</h2>
            {admins.length === 0 ? (
                <p>No admins found</p>
            ) : (
                <ul>
                    {admins.map((admin) => (
                        <li key={admin._id}>
                            {admin.name} ({admin.email})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}