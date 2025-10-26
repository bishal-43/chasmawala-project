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

  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ message: "", type: "" }); // 'success' or 'error'


  useEffect(() => {
    // This function will run when the component unmounts or imagePreview changes
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      setForm((prevForm) => ({
        ...prevForm,
        image: file || null,
      }));

      // Create or revoke image preview
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      if (file) {
        setImagePreview(URL.createObjectURL(file));
      } else {
        setImagePreview(null);
      }
    } else {
      setForm((prevForm) => {
        const newForm = { ...prevForm, [name]: value };
        
        // Auto-generate slug from name, but allow manual override
        if (name === "name") {
          newForm.slug = generateSlug(value);
        }
        
        return newForm;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ message: "", type: "" });

    // Use FormData to send file and text data together
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("slug", form.slug);
    formData.append("specialization", form.specialization);
    formData.append("credentials", form.credentials);
    formData.append("bio", form.bio);
    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      const res = await fetch("/api/admin/doctors", {
        method: "POST",
        // Do NOT set Content-Type header;
        // browser will automatically set it to multipart/form-data with the correct boundary
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ message: "Doctor added successfully!", type: "success" });
        // Reset the form
        setForm({
          name: "",
          slug: "",
          specialization: "",
          credentials: "",
          image: null,
          bio: "",
        });
        if (imagePreview) {
          URL.revokeObjectURL(imagePreview);
        }
        setImagePreview(null);
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor Photo
                </label>
                <div className="mt-1 flex items-center space-x-6">
                  {/* Image Preview */}
                  <div className="shrink-0">
                    <img
                      className="h-24 w-24 object-cover rounded-md bg-gray-100 shadow-sm"
                      src={imagePreview || "https://placehold.co/96x96/e2e8f0/cbd5e1?text=Photo"}
                      alt="Doctor photo preview"
                    />
                  </div>
                  {/* File Input */}
                  <label className="block">
                    <span className="sr-only">Choose profile photo</span>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      accept="image/png, image/jpeg, image/webp"
                      onChange={handleChange}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-indigo-50 file:text-indigo-700
                        hover:file:bg-indigo-100
                        cursor-pointer"
                    />
                  </label>
                </div>
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