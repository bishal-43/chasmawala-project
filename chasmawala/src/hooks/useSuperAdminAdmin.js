// src/hooks/useSuperAdminAdmin.js

import useSWR from 'swr';
import { useState } from 'react';

// A simple fetcher function for SWR
const fetcher = (url) => fetch(url, { credentials: 'include' }).then(async (res) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'An unknown error occurred' }));
    throw new Error(errorData.error || 'Failed to fetch data');
  }
  return res.json();
});

export function useSuperAdminAdmins() {
  const { data, error, isLoading, mutate } = useSWR('/api/superadmin/admin', fetcher);

  const [apiError, setApiError] = useState(null);

  const addAdmin = async (newAdminData) => {
    setApiError(null);
    try {
      // Make the API call to add the new admin
      const res = await fetch('/api/superadmin/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newAdminData),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || 'Failed to add admin.');
      }

      // Update the local SWR cache without re-fetching
      // This provides an instant UI update
      mutate((currentData) => ({
        ...currentData,
        admins: [...(currentData?.admins || []), result.newAdmin],
      }), false); // false = don't revalidate yet

      return { success: true };
    } catch (err) {
      setApiError(err.message);
      return { success: false, error: err.message };
    }
  };

  const deleteAdmin = async (adminId) => {
    setApiError(null);
    try {
      // Optimistically update the UI by removing the admin from the cache
      mutate((currentData) => ({
        ...currentData,
        admins: currentData.admins.filter((admin) => admin._id !== adminId),
      }), false); // false = don't revalidate yet

      // Make the API call
      const res = await fetch(`/api/superadmin/admin/${adminId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || 'Failed to delete admin.');
      }
      
      // Trigger a re-validation to ensure our data is fresh (optional but good practice)
      mutate();

    } catch (err) {
      setApiError(err.message);
      // If the delete failed, revert the optimistic update by re-fetching
      mutate();
    }
  };

  return {
    admins: data?.admins || [],
    isLoading,
    error: error || apiError, // Combine fetch error with mutation error
    addAdmin,
    deleteAdmin,
    clearError: () => setApiError(null),
  };
}