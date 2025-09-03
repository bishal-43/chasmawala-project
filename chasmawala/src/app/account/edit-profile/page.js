"use client";

import { useState, useEffect } from "react";

export default function EditProfilePage() {
    // Initialize profile state with all necessary fields, including address.
    const [profile, setProfile] = useState({ name: "", email: "", phone: "", address: "" });
    const [isLoading, setIsLoading] = useState(true); // To show a loading state for the initial fetch.
    const [isSubmitting, setIsSubmitting] = useState(false); // To show a loading state on the update button.
    const [message, setMessage] = useState({ type: '', content: '' }); // To show success or error messages to the user.

    useEffect(() => {
        // Fetch user profile when the component loads.
        const fetchProfile = async () => {
            setIsLoading(true);
            setMessage({ type: '', content: '' });
            try {
                const response = await fetch("/api/account/edit-profile");
                if (response.ok) {
                    const data = await response.json();
                    // Ensure all fields have a value to avoid uncontrolled component warnings.
                    setProfile({
                        name: data.profile.name || "",
                        email: data.profile.email || "",
                        phone: data.profile.phone || "",
                        address: data.profile.address || "",
                    });
                    setUser(data.user);
                } else {
                     setMessage({ type: 'error', content: 'Failed to load profile. Please try again.' });
                }
            } catch (error) {
                console.error("Failed to load profile:", error);
                setMessage({ type: 'error', content: 'An error occurred while loading your profile.' });
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, []);

    // Handle changes in form inputs.
    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    // Handle form submission to update the profile.
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ type: '', content: '' });
        try {
            const response = await fetch("/api/account/edit-profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profile),
                credentials: "include",
            });

            if (response.ok) {
                setMessage({ type: 'success', content: 'Profile updated successfully!' });
            } else {
                const data = await response.json();
                setMessage({ type: 'error', content: data.error || 'Failed to update profile.' });
            }
        } catch (error) {
            console.error("Failed to update profile:", error);
            setMessage({ type: 'error', content: 'An error occurred while updating your profile.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <div className="text-center p-6">Loading profile...</div>;
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Edit Profile</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Input */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                {/* Email Input (disabled) */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={profile.email}
                        readOnly
                        className="mt-1 w-full border border-gray-300 p-2 rounded-md bg-gray-100 cursor-not-allowed"
                    />
                </div>
                {/* Phone Input */}
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                        id="phone"
                        type="text"
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                {/* Address Input - This was the missing field */}
                 <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                        id="address"
                        type="text"
                        name="address"
                        value={profile.address}
                        onChange={handleChange}
                        placeholder="Your Address"
                        className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                {/* Submit Button */}
                <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition disabled:bg-blue-300 disabled:cursor-wait"
                >
                    {isSubmitting ? 'Updating...' : 'Update Profile'}
                </button>
            </form>
            {/* Display Success/Error Message */}
            {message.content && (
                 <div className={`mt-4 text-center p-2 rounded-md ${
                     message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                 }`}>
                     {message.content}
                 </div>
            )}
        </div>
    );
}
