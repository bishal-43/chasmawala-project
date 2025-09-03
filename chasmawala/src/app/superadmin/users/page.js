// src/app/superadmin/users/page.js

"use client";

import { useState } from "react";
import { useSuperAdminUsers } from "@/hooks/useSuperAdminUsers";
import { UsersTable } from "@/components/superadmin/UsersTable";
import { UsersTableSkeleton } from "@/components/superadmin/UsersTableSkeleton";
import { ConfirmationDialog } from "@/components/ui/confirmationDialog"; // Assumed component
import { Alert } from "@/components/ui/alert"; // Assumed component

export default function SuperAdminUsersPage() {
  const { users, isLoading, error, deleteUser } = useSuperAdminUsers();
  
  const [userToDelete, setUserToDelete] = useState(null);
  const [mutationError, setMutationError] = useState(null);

  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    setMutationError(null);
    try {
      await deleteUser(userToDelete);
    } catch (err) {
      setMutationError(err.message || "An unexpected error occurred.");
    } finally {
      setUserToDelete(null); // Close the dialog
    }
  };

  const renderContent = () => {
    if (isLoading) return <UsersTableSkeleton />;
    // Show fetch error preferentially
    if (error && !isLoading) return <Alert type="error">{error.message}</Alert>;
    return <UsersTable users={users} onDeleteClick={handleDeleteClick} />;
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-full">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-xl font-semibold mb-4">All Users</h1>
        {mutationError && <Alert type="error" className="mb-4">{mutationError}</Alert>}
        {renderContent()}
      </div>

      <ConfirmationDialog
        isOpen={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
      />
    </div>
  );
}