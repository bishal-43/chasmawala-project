// src/app/superadmin/dashboard/page.js

"use client";

import { useState } from "react";
import { AdminList } from "@/components/superadmin/AdminList";
import { AddAdminDialog } from "@/components/superadmin/AddAdminDialog";
import { ConfirmationDialog } from "@/components/ui/confirmationDialog";
import { DashboardHeader } from "@/components/superadmin/DashboardHeader";
import { AdminListSkeleton } from "@/components/superadmin/AdminListSkeleton";
import { Alert } from "@/components/ui/alert";
import { useSuperAdminAdmins } from "@/hooks/useSuperAdminAdmin";

export default function SuperAdminDashboard() {
  const { admins, isLoading, error, addAdmin, deleteAdmin } = useSuperAdminAdmins();
  
  // State for dialog visibility and context
  const [dialog, setDialog] = useState({ type: null, adminId: null }); // type: 'add' | 'delete'

  const handleOpenDeleteConfirm = (id) => {
    setDialog({ type: 'delete', adminId: id });
  };
  
  const handleOpenAddDialog = () => {
    setDialog({ type: 'add', adminId: null });
  };
  
  const handleCloseDialogs = () => {
    setDialog({ type: null, adminId: null });
  };

  const handleDeleteConfirmed = async () => {
    if (dialog.type === 'delete' && dialog.adminId) {
      await deleteAdmin(dialog.adminId);
      handleCloseDialogs();
    }
  };

  const handleAdminAdded = () => {
    // The hook's `addAdmin` function handles the logic.
    // We just need to close the dialog upon success.
    handleCloseDialogs();
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <DashboardHeader onAddAdmin={handleOpenAddDialog} />

        <main className="mt-8">
          {error && <Alert type="error">{error.message || error}</Alert>}
          
          {isLoading ? (
            <AdminListSkeleton />
          ) : (
            <AdminList admins={admins} onDelete={handleOpenDeleteConfirm} />
          )}
        </main>
      </div>

      <AddAdminDialog
        isOpen={dialog.type === 'add'}
        onClose={handleCloseDialogs}
        onAdminAdded={handleAdminAdded} // Prop now just closes the dialog
        addAdmin={addAdmin} // Pass the mutation function to the dialog
      />

      <ConfirmationDialog
        isOpen={dialog.type === 'delete'}
        onClose={handleCloseDialogs}
        onConfirm={handleDeleteConfirmed}
        title="Delete Admin"
        message="Are you sure you want to delete this admin? This action cannot be undone."
      />
    </div>
  );
}