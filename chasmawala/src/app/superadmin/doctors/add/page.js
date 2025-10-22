"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { toast, Toaster } from "sonner";

export default function AddDoctor() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    slug: "",
    credentials: "",
    specialization: "",
    image: "",
    stats: { experience: "" },
    bio: "",
    qualifications: [{ degree: "", institution: "" }],
    expertise: [""],
    clinic: { name: "", address: "", hours: "" },
    isOnline: false,
  });

  // --- Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("stats.")) {
      const field = name.split(".")[1];
      setForm(prev => ({ ...prev, stats: { ...prev.stats, [field]: value } }));
    } else if (name.startsWith("clinic.")) {
      const field = name.split(".")[1];
      setForm(prev => ({ ...prev, clinic: { ...prev.clinic, [field]: value } }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
      // Auto-generate slug if empty
      if (name === "name" && !form.slug) {
        setForm(prev => ({ ...prev, slug: value.toLowerCase().replace(/\s+/g, "-") }));
      }
    }
  };

  const handleCheckboxChange = (checked) => setForm(prev => ({ ...prev, isOnline: checked }));

  const handleQualificationChange = (index, e) => {
    const { name, value } = e.target;
    const newQualifications = [...form.qualifications];
    newQualifications[index][name] = value;
    setForm(prev => ({ ...prev, qualifications: newQualifications }));
  };

  const addQualification = () =>
    setForm(prev => ({ ...prev, qualifications: [...prev.qualifications, { degree: "", institution: "" }] }));

  const removeQualification = (index) =>
    setForm(prev => ({ ...prev, qualifications: prev.qualifications.filter((_, i) => i !== index) }));

  const handleExpertiseChange = (index, e) => {
    const newExpertise = [...form.expertise];
    newExpertise[index] = e.target.value;
    setForm(prev => ({ ...prev, expertise: newExpertise }));
  };

  const addExpertise = () => setForm(prev => ({ ...prev, expertise: [...prev.expertise, ""] }));

  const removeExpertise = (index) =>
    setForm(prev => ({ ...prev, expertise: prev.expertise.filter((_, i) => i !== index) }));

  // --- Form Submission ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    // --- Frontend validation ---
    if (!form.name || !form.email || !form.specialization || !form.slug) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      toast.error("Invalid email format.");
      return;
    }
    if (form.phone && !/^\+?\d{7,15}$/.test(form.phone)) {
      toast.error("Invalid phone number.");
      return;
    }

    setIsLoading(true);

    const payload = {
      ...form,
      qualifications: form.qualifications.filter(q => q.degree || q.institution),
      expertise: form.expertise.filter(e => e.trim() !== ""),
    };

    try {
      const token = localStorage.getItem("authToken"); // SuperAdmin JWT
      const res = await fetch("/api/superadmin/doctors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to add doctor.");
      } else {
        toast.success("Doctor added successfully!");
        router.push("/superadmin/doctors");
      }
    } catch (err) {
      console.error("Error adding doctor:", err);
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
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" placeholder="+1234567890" value={form.phone} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="slug">Profile Slug</Label>
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
            <div className="md:col-span-2">
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" name="image" placeholder="https://..." value={form.image} onChange={handleChange} />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="bio">Biography</Label>
              <Textarea id="bio" name="bio" value={form.bio} onChange={handleChange} placeholder="Short bio..." />
            </div>
            <div className="md:col-span-2 flex items-center space-x-2">
              <Checkbox id="isOnline" checked={form.isOnline} onCheckedChange={handleCheckboxChange} />
              <Label htmlFor="isOnline" className="font-medium">Mark as Online Now</Label>
            </div>
          </div>
        </div>

        {/* Clinic */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Clinic Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="clinic.name">Clinic Name</Label>
              <Input id="clinic.name" name="clinic.name" value={form.clinic.name} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="clinic.hours">Clinic Hours</Label>
              <Input id="clinic.hours" name="clinic.hours" placeholder="Mon-Fri 9am-5pm" value={form.clinic.hours} onChange={handleChange} />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="clinic.address">Clinic Address</Label>
              <Input id="clinic.address" name="clinic.address" value={form.clinic.address} onChange={handleChange} />
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
