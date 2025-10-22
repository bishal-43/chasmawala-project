"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash2, FilePenLine } from "lucide-react";
import { Toaster, toast } from "sonner"; 

export default function DoctorsPage() {
  const router = useRouter();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState(null);

  // Fetch all doctors
  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("auth-token"); // replace with your token key
      const res = await fetch("/api/superadmin/doctors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch doctors");
      }

      const data = await res.json();
      setDoctors(data);
    } catch (error) {
      console.error(error);
      alert("Error fetching doctors"); // optionally replace with toast.error()
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Delete doctor
  const handleDelete = async () => {
    if (!doctorToDelete) return;

    try {
      const token = localStorage.getItem("auth-token");
      const res = await fetch(`/api/superadmin/doctors/${doctorToDelete}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete doctor");
      }

      toast.success("Doctor deleted successfully");
      setDoctorToDelete(null);
      setShowDeleteModal(false);
      fetchDoctors();
    } catch (error) {
      console.error(error);
      toast.error("Error deleting doctor");
      setShowDeleteModal(false);
    }
  };

  // Modal controls
  const openDeleteModal = (id) => {
    setDoctorToDelete(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDoctorToDelete(null);
    setShowDeleteModal(false);
  };

  // Navigation
  const navigateToAdd = () => {
    router.push("/superadmin/doctors/add");
  };

  const navigateToEdit = (id) => {
    router.push(`/superadmin/doctors/edit/${id}`);
  };

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Loading Doctors...</h1>
      </div>
    );
  }

  return (
    <>
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
            <p className="mb-6">This action cannot be undone. This will permanently delete the doctor's profile.</p>
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={closeDeleteModal}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Yes, Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Doctors Management</h1>
          <Button onClick={navigateToAdd}>+ Add Doctor</Button>
        </div>

        {doctors.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-medium text-gray-700">No doctors found.</h2>
            <p className="text-gray-500 mt-2">Get started by adding a new doctor.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {doctors.map((doc) => (
              <div key={doc._id} className="border p-4 rounded-lg shadow-sm bg-white flex flex-col justify-between">
                <div>
                  <img 
                    src={doc.image || 'https://placehold.co/600x400/EEE/31343C?text=No+Image'} 
                    alt={doc.name}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                  <h2 className="font-semibold text-lg text-blue-800">{doc.name}</h2>
                  <p className="text-sm text-gray-600">{doc.credentials}</p>
                  <p className="text-md font-medium text-gray-800 mt-1">{doc.specialization}</p>
                  <p className="text-sm text-gray-500 mt-2">{doc.email}</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="w-full" onClick={() => navigateToEdit(doc._id)}>
                    <FilePenLine className="h-4 w-4 mr-2" /> Edit
                  </Button>
                  <Button variant="destructive" size="sm" className="w-full" onClick={() => openDeleteModal(doc._id)}>
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
