'use client';

import { useState } from 'react';
import Link from 'next/link';

// Reusable Icon Component (same as your login page)
const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        if (!email) {
            setError("Please enter your email address.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            setMessage(data.message);
            setEmail(''); // Clear input on success
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
            <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">

                {/* Left Side - Branding and Message */}
                <div className="w-full md:w-1/2 p-8 md:p-12 bg-gradient-to-br from-emerald-500 to-green-600 text-white flex flex-col justify-center">
                    <h1 className="text-4xl font-bold mb-4">Forgot Your Password?</h1>
                    <p className="text-lg mb-6">No problem. Enter your email address and we'll send you a link to get back into your account.</p>
                    <div className="border-t-2 border-white opacity-50 w-1/4"></div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Reset Password</h2>

                    {/* Success Message */}
                    {message && (
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md mb-4" role="alert">
                            <p className="font-bold">Success</p>
                            <p>{message}</p>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && !message && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-4" role="alert">
                            <p className="font-bold">Request Failed</p>
                            <p>{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Input */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MailIcon />
                            </div>
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className={`w-full p-3 rounded-lg text-white font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-emerald-500 hover:bg-emerald-600"}`}
                            disabled={loading}
                        >
                            {loading ? 'Sending Link...' : 'Send Reset Link'}
                        </button>
                    </form>

                    <p className="text-center text-gray-500 mt-6 text-sm">
                        Remember your password?{' '}
                        <Link
                            href="/account/login"
                            className="text-emerald-500 hover:underline font-semibold"
                        >
                            Back to Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
