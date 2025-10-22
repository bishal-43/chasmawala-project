// src/app/admin/(protected)/doctors/[id]/page.js

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// A self-contained confirmation modal component
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, isDeleting }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-bold text-gray-900">Confirm Deletion</h3>
        <p className="mt-2 text-sm text-gray-600">
          Are you sure you want to delete this doctor's profile? This action cannot be undone.
        </p>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-400"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};


export default function EditDoctorPage({ params }) {
  const { id } = params;
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    specialization: "",
    credentials: "",
    image: "",
    bio: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [status, setStatus] = useState({ message: "", type: "" });
  const [initialLoadingError, setInitialLoadingError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchDoctor = async () => {
      setIsLoading(true);
      setInitialLoadingError(null);
      try {
        const res = await fetch(`/api/admin/doctors/${id}`);
        if (!res.ok) {
          throw new Error("Doctor not found.");
        }
        const data = await res.json();
        setForm(data);
      } catch (error) {
        setInitialLoadingError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ message: "", type: "" });

    try {
      const res = await fetch(`/api/admin/doctors/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus({ message: "Doctor updated successfully!", type: "success" });
      } else {
        setStatus({ message: data.message || "Error updating doctor.", type: "error" });
      }
    } catch (error) {
      setStatus({ message: "Failed to connect to the server.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setStatus({ message: "", type: "" });
    try {
      const res = await fetch(`/api/admin/doctors/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        // Redirect to the doctors list page after successful deletion
        router.push("/admin/doctors");
      } else {
        const data = await res.json();
        setStatus({ message: data.message || "Failed to delete doctor.", type: "error" });
        setIsModalOpen(false); // Close modal on error
      }
    } catch (error) {
      setStatus({ message: "Failed to connect to the server.", type: "error" });
      setIsModalOpen(false); // Close modal on error
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading doctor details...</div>;
  }

  if (initialLoadingError) {
    return <div className="p-8 text-center text-red-500 bg-red-50 rounded-lg">{initialLoadingError}</div>;
  }

  return (
    <>
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
      <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Edit Doctor Profile</h2>
              <p className="mt-1 text-sm text-gray-500">
                Update the details for <span className="font-medium">{form.name || "this doctor"}</span>.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-6">
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
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* Form Footer */}
              <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-red-600 bg-transparent rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                  Delete Doctor
                </button>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    {status.message && (
                      <p className={`text-sm ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                        {status.message}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
                    >
                      {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
