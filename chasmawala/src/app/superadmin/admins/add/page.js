"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Mail, KeyRound, ArrowLeft, Check, X, Eye, EyeOff, Shield, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";

// Enhanced Input Component
const Input = ({ label, name, type, placeholder, value, onChange, icon, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            {icon}
          </div>
        )}
        <input
          id={name}
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full ${icon ? 'pl-10' : 'pl-4'} ${type === 'password' ? 'pr-12' : 'pr-4'} py-3 bg-gray-50 border-2 rounded-xl text-sm transition-all duration-200 focus:outline-none ${
            error
              ? 'border-red-300 focus:border-red-500 focus:bg-red-50/50'
              : isFocused
              ? 'border-blue-500 bg-white shadow-lg shadow-blue-500/10'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && (
        <p className="flex items-center gap-1 text-sm text-red-600 animate-shake">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );
};

// Button Component
const Button = ({ children, onClick, type = "button", loading = false, variant = "primary", className = "" }) => {
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl",
    outline: "bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`w-full px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

// Alert Component
const Alert = ({ type, children }) => {
  const styles = {
    error: "bg-red-50 border-red-200 text-red-800",
    success: "bg-emerald-50 border-emerald-200 text-emerald-800"
  };
  const icons = {
    error: <X className="w-5 h-5 text-red-600" />,
    success: <Check className="w-5 h-5 text-emerald-600" />
  };

  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border-2 ${styles[type]} animate-slideIn`}>
      <div className="flex-shrink-0 mt-0.5">{icons[type]}</div>
      <p className="text-sm font-medium flex-1">{children}</p>
    </div>
  );
};

// Password Strength Indicator
const PasswordStrength = ({ password }) => {
  const getStrength = () => {
    if (!password) return { level: 0, text: "", color: "" };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const levels = {
      1: { text: "Weak", color: "bg-red-500" },
      2: { text: "Fair", color: "bg-orange-500" },
      3: { text: "Good", color: "bg-yellow-500" },
      4: { text: "Strong", color: "bg-emerald-500" },
      5: { text: "Very Strong", color: "bg-emerald-600" }
    };

    return { level: strength, ...levels[strength] };
  };

  const strength = getStrength();
  if (!password) return null;

  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              level <= strength.level ? strength.color : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <p className="text-xs font-medium text-gray-600">
        Password strength: <span className={strength.level >= 4 ? 'text-emerald-600' : 'text-orange-600'}>{strength.text}</span>
      </p>
    </div>
  );
};

// Requirements Checklist
const RequirementItem = ({ met, text }) => (
  <div className={`flex items-center gap-2 text-sm transition-colors ${met ? 'text-emerald-600' : 'text-gray-500'}`}>
    <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
      met ? 'bg-emerald-100' : 'bg-gray-100'
    }`}>
      {met ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
    </div>
    <span className="font-medium">{text}</span>
  </div>
);

export default function AddAdminPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [messages, setMessages] = useState({ error: "", success: "" });
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear field error when user starts typing
    if (fieldErrors[e.target.name]) {
      setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
    }
    // Clear general messages
    if (messages.error || messages.success) {
      setMessages({ error: "", success: "" });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!form.name.trim()) {
      errors.name = "Name is required";
    } else if (form.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!form.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!form.password) {
      errors.password = "Password is required";
    } else if (form.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessages({ error: "", success: "" });

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/superadmin/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages({ success: "Admin account created successfully!", error: "" });
        setForm({ name: "", email: "", password: "" });
        setFieldErrors({});
      } else {
        setMessages({ error: data.error || "Failed to add admin", success: "" });
      }
    } catch (err) {
      setMessages({ error: "An unexpected error occurred. Please try again.", success: "" });
    } finally {
      setLoading(false);
    }
  };

  const passwordRequirements = [
    { met: form.password.length >= 8, text: "At least 8 characters" },
    { met: /[A-Z]/.test(form.password), text: "One uppercase letter" },
    { met: /[a-z]/.test(form.password), text: "One lowercase letter" },
    { met: /[0-9]/.test(form.password), text: "One number" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Back button */}
        <Link 
          href="/superadmin/admins"
          className="inline-flex items-center gap-2 mb-6 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to All Admins
        </Link>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-white">
          {/* Header */}
          <div className="relative p-8 pb-6 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"></div>
            
            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Create Admin Account</h1>
              <p className="text-blue-100 text-sm">
                Add a new administrator with full platform access
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Full Name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                icon={<User className="w-4 h-4 text-gray-400" />}
                error={fieldErrors.name}
              />

              <Input
                label="Email Address"
                name="email"
                type="email"
                placeholder="john.doe@example.com"
                value={form.email}
                onChange={handleChange}
                icon={<Mail className="w-4 h-4 text-gray-400" />}
                error={fieldErrors.email}
              />

              <div className="space-y-3">
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={handleChange}
                  icon={<KeyRound className="w-4 h-4 text-gray-400" />}
                  error={fieldErrors.password}
                />
                
                {form.password && (
                  <>
                    <PasswordStrength password={form.password} />
                    
                    {/* Requirements Checklist */}
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-2">
                      <p className="text-xs font-semibold text-gray-700 mb-2">Password Requirements:</p>
                      {passwordRequirements.map((req, idx) => (
                        <RequirementItem key={idx} met={req.met} text={req.text} />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <Button type="submit" loading={loading}>
                {loading ? (
                  "Creating Account..."
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Create Admin Account
                  </>
                )}
              </Button>

              {messages.error && <Alert type="error">{messages.error}</Alert>}
              {messages.success && (
                <Alert type="success">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    {messages.success}
                  </span>
                </Alert>
              )}
            </form>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
              <div className="flex gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <Shield className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-blue-900 mb-1">Admin Privileges</p>
                  <p className="text-xs text-blue-700 leading-relaxed">
                    This account will have full administrative access to manage users, products, orders, and system settings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
}