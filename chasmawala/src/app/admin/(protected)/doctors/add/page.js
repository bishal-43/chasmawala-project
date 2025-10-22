"use client";
import { useState } from "react";

// Helper function to generate a URL-friendly slug
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

export default function AddDoctorPage() {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    specialization: "",
    credentials: "",
    image: "",
    bio: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ message: "", type: "" }); // 'success' or 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setForm((prevForm) => {
      const newForm = { ...prevForm, [name]: value };
      
      // Auto-generate slug from name, but allow manual override
      if (name === "name") {
        newForm.slug = generateSlug(value);
      }
      
      return newForm;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ message: "", type: "" }); // Reset status

    try {
      const res = await fetch("/api/admin/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ message: "Doctor added successfully!", type: "success" });
        // Optionally, reset the form
        setForm({
          name: "",
          slug: "",
          specialization: "",
          credentials: "",
          image: "",
          bio: "",
        });
      } else {
        setStatus({ message: data.message || "An unexpected error occurred.", type: "error" });
      }
    } catch (error) {
        setStatus({ message: "Failed to connect to the server.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Add New Doctor</h2>
            <p className="mt-1 text-sm text-gray-500">
              Fill in the details below to add a new doctor profile to the system.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-6">
              {/* Form Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g., Dr. Jane Doe"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                {/* Slug */}
                <div>
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                    Profile URL (Slug)
                  </label>
                  <input
                    type="text"
                    name="slug"
                    id="slug"
                    value={form.slug}
                    onChange={handleChange}
                    placeholder="e.g., dr-jane-doe"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                
                {/* Specialization */}
                <div>
                  <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">
                    Specialization
                  </label>
                  <input
                    type="text"
                    name="specialization"
                    id="specialization"
                    value={form.specialization}
                    onChange={handleChange}
                    placeholder="e.g., Cardiologist"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                
                {/* Credentials */}
                <div>
                  <label htmlFor="credentials" className="block text-sm font-medium text-gray-700 mb-1">
                    Credentials
                  </label>
                  <input
                    type="text"
                    name="credentials"
                    id="credentials"
                    value={form.credentials}
                    onChange={handleChange}
                    placeholder="e.g., M.D., F.A.C.C."
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  id="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://example.com/doctor.jpg"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              {/* Bio */}
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                  Short Biography
                </label>
                <textarea
                  name="bio"
                  id="bio"
                  rows="4"
                  value={form.bio}
                  onChange={handleChange}
                  placeholder="A brief introduction about the doctor..."
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Form Footer */}
            <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
              <div className="text-sm">
                {status.message && (
                  <p className={`${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {status.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Saving...' : 'Add Doctor'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}