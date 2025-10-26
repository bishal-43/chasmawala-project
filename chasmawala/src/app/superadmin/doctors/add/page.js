"use client";

import { useState, useEffect } from "react"; // 1. Import useEffect
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, UploadCloud, Image as ImageIcon } from "lucide-react";
import { toast, Toaster } from "sonner";

export default function AddDoctor() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false); // We'll keep this for UI feedback

  // 2. Add new state for the file object and the preview URL
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    slug: "",
    credentials: "",
    specialization: "",
    // 'image' will be handled by imageFile and imagePreview
    stats: { experience: "" },
    bio: "",
    qualifications: [{ degree: "", institution: "" }],
    expertise: [""],
    clinic: { name: "", address: "", hours: "" },
    isOnline: false,
  });

  // 3. Add useEffect to clean up the preview URL
  useEffect(() => {
    // Revoke the object URL on component unmount to prevent memory leaks
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);


  // --- Handlers ---
  const handleChange = (e) => {
// ... (this handler is correct, no changes)
    const { name, value } = e.target;
    if (name.startsWith("stats.")) {
      const field = name.split(".")[1];
      setForm((prev) => ({ ...prev, stats: { ...prev.stats, [field]: value } }));
    } else if (name.startsWith("clinic.")) {
      const field = name.split(".")[1];
      setForm((prev) => ({ ...prev, clinic: { ...prev.clinic, [field]: value } }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
      if (name === "name" && !form.slug) {
        setForm((prev) => ({
          ...prev,
          slug: value.toLowerCase().replace(/\s+/g, "-"),
        }));
      }
    }
  };

  const handleCheckboxChange = (checked) =>
    setForm((prev) => ({ ...prev, isOnline: checked }));

  // --- Qualifications ---
  const handleQualificationChange = (index, e) => {
    const { name, value } = e.target;
    const newQualifications = [...form.qualifications];
    newQualifications[index][name] = value;
    setForm((prev) => ({ ...prev, qualifications: newQualifications }));
  };

  const addQualification = () =>
    setForm((prev) => ({
      ...prev,
      qualifications: [
        ...prev.qualifications,
        { degree: "", institution: "" },
      ],
    }));

  const removeQualification = (index) =>
    setForm((prev) => ({
      ...prev,
      qualifications: prev.qualifications.filter((_, i) => i !== index),
    }));

  // --- Expertise ---
  const handleExpertiseChange = (index, e) => {
    const newExpertise = [...form.expertise];
    newExpertise[index] = e.target.value;
    setForm((prev) => ({ ...prev, expertise: newExpertise }));
  };

  const addExpertise = () =>
    setForm((prev) => ({ ...prev, expertise: [...prev.expertise, ""] }));

  const removeExpertise = (index) =>
    setForm((prev) => ({
      ...prev,
      expertise: prev.expertise.filter((_, i) => i !== index),
    }));

  // --- 4. FIXED: Upload Image ---
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setImageFile(null);
      setImagePreview(null);
      return;
    }

    // Save the file object for submission
    setImageFile(file);

    // Create a local preview URL
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview); // Clean up old preview
    }
    setImagePreview(URL.createObjectURL(file));
  };
  
  // --- 5. FIXED: Submit Form ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("slug", form.slug);
    formData.append("specialization", form.specialization);
    formData.append("phone", form.phone || "");
    formData.append("credentials", form.credentials || "");
    formData.append("bio", form.bio || "");
    formData.append("isOnline", form.isOnline);

    formData.append("stats", JSON.stringify(form.stats));
    formData.append("clinic", JSON.stringify(form.clinic));
    formData.append("qualifications", JSON.stringify(form.qualifications));
    formData.append("expertise", JSON.stringify(form.expertise));

    // --- THIS IS THE FIX ---
    // Check for the imageFile, not form.image
    if (imageFile) {
      formData.append("image", imageFile); // Append the actual file
    }
    // No 'else' needed. If no image, we just don't append it.

    try {
      const res = await fetch("/api/superadmin/doctors", {
        method: "POST",
        body: formData,       // Send FormData directly
        credentials: "include", // send cookies automatically
      });

      const data = await res.json();

      if (!res.ok) {
        // This will now show your 401 error if you're not logged in
        toast.error(data.message || "Failed to add doctor.");
      } else {
        toast.success("Doctor added successfully!");
        router.push("/superadmin/doctors");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Toaster richColors />
      <h1 className="text-3xl font-bold mb-6">Add New Doctor</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ... all your other inputs (name, email, etc) are correct ... */}
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" type="tel" placeholder="+1234567890" value={form.phone} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" placeholder="dr-jane-doe" value={form.slug} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="credentials">Credentials</Label>
              <Input id="credentials" name="credentials" placeholder="MD, FACC" value={form.credentials} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="specialization">Specialization</Label>
              <Input id="specialization" name="specialization" placeholder="Cardiology" value={form.specialization} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="experience">Experience</Label>
              <Input id="experience" name="stats.experience" placeholder="10+ Years" value={form.stats.experience} onChange={handleChange} />
            </div>
          </div>

          {/* 6. FIXED: Image Upload Section */}
          <div className="mt-4">
            <Label>Doctor Image</Label>
            <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-gray-50 transition">
              {/* Use imagePreview, not form.image */}
              {!imagePreview ? (
                <>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload} // This now calls our fixed function
                    disabled={uploading} // Disable while uploading
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                  >
                    {/* 'uploading' state is now just for UI, not a real upload */}
                    {uploading ? (
                      <UploadCloud className="animate-pulse h-8 w-8 text-blue-500" />
                    ) : (
                      <ImageIcon className="h-8 w-8 text-gray-500" />
                    )}
                    <span className="text-sm text-gray-500">
                      {uploading ? "Processing..." : "Click to upload image"}
                    </span>
                  </label>
                </>
              ) : (
                <div className="relative w-40 h-40 mx-auto">
                  <img
                    src={imagePreview} // Use the local preview URL
                    alt="Doctor Preview"
                    className="rounded-lg w-full h-full object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      // Clear the file and preview
                      setImageFile(null);
                      setImagePreview(null);
                      if (imagePreview) {
                        URL.revokeObjectURL(imagePreview);
                      }
                    }}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4">
            <Label>Biography</Label>
            <Textarea id="bio" name="bio" value={form.bio} onChange={handleChange} placeholder="Short bio..." />
          </div>

          <div className="mt-4 flex items-center space-x-2">
            <Checkbox id="isOnline" checked={form.isOnline} onCheckedChange={handleCheckboxChange} />
            <Label htmlFor="isOnline" className="font-medium">Mark as Online Now</Label>
          </div>
        </div>
        
        {/* ... (Clinic, Qualifications, Expertise sections are all correct) ... */}
        
        {/* Clinic Section */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Clinic Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Clinic Name</Label>
              <Input name="clinic.name" value={form.clinic.name} onChange={handleChange} />
            </div>
            <div>
              <Label>Clinic Hours</Label>
              <Input name="clinic.hours" value={form.clinic.hours} placeholder="Mon–Fri 9am–5pm" onChange={handleChange} />
            </div>
            <div className="md:col-span-2">
              <Label>Clinic Address</Label>
              <Input name="clinic.address" value={form.clinic.address} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Qualifications */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Qualifications</h2>
          {form.qualifications.map((q, index) => (
            <div key={index} className="flex gap-2 mb-2 items-end">
              <div className="flex-1">
                <Label>Degree</Label>
                <Input name="degree" placeholder="MD" value={q.degree} onChange={(e) => handleQualificationChange(index, e)} />
              </div>
              <div className="flex-1">
                <Label>Institution</Label>
                <Input name="institution" placeholder="Harvard Medical School" value={q.institution} onChange={(e) => handleQualificationChange(index, e)} />
              </div>
              {form.qualifications.length > 1 && (
                <Button type="button" variant="destructive" size="icon" onClick={() => removeQualification(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addQualification}>+ Add Qualification</Button>
        </div>

        {/* Expertise */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Areas of Expertise</h2>
          {form.expertise.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2 items-center">
              <Input placeholder="e.g., Angioplasty" value={item} onChange={(e) => handleExpertiseChange(index, e)} />
              {form.expertise.length > 1 && (
                <Button type="button" variant="destructive" size="icon" onClick={() => removeExpertise(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addExpertise}>+ Add Expertise</Button>
        </div>


        <Button type="submit" disabled={isLoading} className="w-full text-lg py-6">
          {isLoading ? "Saving Doctor..." : "Save New Doctor"}
        </Button>
      </form>
    </div>
  );
}


