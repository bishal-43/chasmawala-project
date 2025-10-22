"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { Toaster, toast } from "sonner"; // Notifications

export default function EditDoctorPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id; // Doctor ID from URL

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    isOnline: false,
    slug: "",
    credentials: "",
    specialization: "",
    image: "",
    stats: { experience: "" },
    bio: "",
    qualifications: [{ degree: "", institution: "" }],
    expertise: [""],
    clinic: { name: "", address: "", hours: "" },
  });

  // --- Fetch existing doctor data ---
  useEffect(() => {
    if (!id) return;

    const fetchDoctorData = async () => {
      setIsFetching(true);
      try {
        const token = localStorage.getItem("auth-token");
        const res = await fetch(`/api/superadmin/doctors/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error("Doctor not found or you don't have permission.");
        }

        const data = await res.json();

        data.qualifications = data.qualifications || [{ degree: "", institution: "" }];
        data.expertise = data.expertise || [""];
        data.clinic = data.clinic || { name: "", address: "", hours: "" };
        data.stats = data.stats || { experience: "" };

        setForm(data);
      } catch (error) {
        console.error(error);
        toast.error(error.message || "Failed to fetch doctor data.");
        router.push("/superadmin/doctors");
      } finally {
        setIsFetching(false);
      }
    };

    fetchDoctorData();
  }, [id, router]);

  // --- Generic Change Handler ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("stats.")) {
      const field = name.split(".")[1];
      setForm((prev) => ({ ...prev, stats: { ...prev.stats, [field]: value } }));
    } else if (name.startsWith("clinic.")) {
      const field = name.split(".")[1];
      setForm((prev) => ({ ...prev, clinic: { ...prev.clinic, [field]: value } }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // --- Checkbox Handler ---
  const handleCheckboxChange = (checked) => {
    setForm((prev) => ({ ...prev, isOnline: checked }));
  };

  // --- Qualification Handlers ---
  const handleQualificationChange = (index, e) => {
    const { name, value } = e.target;
    const newQualifications = [...form.qualifications];
    newQualifications[index][name] = value;
    setForm((prev) => ({ ...prev, qualifications: newQualifications }));
  };

  const addQualification = () => {
    setForm((prev) => ({
      ...prev,
      qualifications: [...prev.qualifications, { degree: "", institution: "" }],
    }));
  };

  const removeQualification = (index) => {
    const newQualifications = form.qualifications.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, qualifications: newQualifications }));
  };

  // --- Expertise Handlers ---
  const handleExpertiseChange = (index, e) => {
    const newExpertise = [...form.expertise];
    newExpertise[index] = e.target.value;
    setForm((prev) => ({ ...prev, expertise: newExpertise }));
  };

  const addExpertise = () => {
    setForm((prev) => ({ ...prev, expertise: [...prev.expertise, ""] }));
  };

  const removeExpertise = (index) => {
    const newExpertise = form.expertise.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, expertise: newExpertise }));
  };

  // --- Form Submission ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const token = localStorage.getItem("auth-token");

    try {
      const res = await fetch(`/api/superadmin/doctors/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("Doctor updated successfully!");
        router.push("/superadmin/doctors");
      } else {
        const data = await res.json();
        toast.error(data.message || "Error updating doctor");
      }
    } catch (error) {
      console.error("Failed to update doctor:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Loading Doctor Data...</h1>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Toaster richColors />
      <h1 className="text-3xl font-bold mb-6">Edit Doctor Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* --- Basic Information --- */}
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
              <Input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="slug">Profile Slug (URL)</Label>
              <Input id="slug" name="slug" value={form.slug} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="credentials">Credentials</Label>
              <Input id="credentials" name="credentials" value={form.credentials} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="specialization">Specialization</Label>
              <Input id="specialization" name="specialization" value={form.specialization} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="experience">Experience</Label>
              <Input id="experience" name="stats.experience" value={form.stats.experience} onChange={handleChange} />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" name="image" value={form.image} onChange={handleChange} />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="bio">Biography</Label>
              <Textarea id="bio" name="bio" value={form.bio} onChange={handleChange} />
            </div>
            <div className="md:col-span-2 flex items-center space-x-2">
              <Checkbox id="isOnline" checked={form.isOnline} onCheckedChange={handleCheckboxChange} />
              <Label htmlFor="isOnline" className="font-medium">
                Mark as "Online Now" for consultations
              </Label>
            </div>
          </div>
        </div>

        {/* --- Clinic Details --- */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Clinic Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="clinic.name">Clinic Name</Label>
              <Input id="clinic.name" name="clinic.name" value={form.clinic.name} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="clinic.hours">Clinic Hours</Label>
              <Input id="clinic.hours" name="clinic.hours" value={form.clinic.hours} onChange={handleChange} />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="clinic.address">Clinic Address</Label>
              <Input id="clinic.address" name="clinic.address" value={form.clinic.address} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* --- Qualifications --- */}
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
          <Button type="button" variant="outline" onClick={addQualification}>
            + Add Qualification
          </Button>
        </div>

        {/* --- Expertise --- */}
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
          <Button type="button" variant="outline" onClick={addExpertise}>
            + Add Expertise
          </Button>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full text-lg py-6">
          {isLoading ? "Saving Changes..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}
