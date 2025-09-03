// src/hooks/useSuperAdminUsers.js

import useSWR from 'swr';

const fetcher = (url) => fetch(url, { credentials: 'include' }).then(async (res) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'An unknown error occurred' }));
    throw new Error(errorData.error || 'Failed to fetch data');
  }
  return res.json();
});

export function useSuperAdminUsers() {
  const { data, error, isLoading, mutate } = useSWR('/api/superadmin/users', fetcher);

  const deleteUser = async (userId) => {
    try {
      // Optimistically update the UI by removing the user from the local cache.
      mutate(
        (currentData) => ({
          ...currentData,
          users: currentData.users.filter((user) => user._id !== userId),
        }),
        false // Prevent SWR from re-fetching immediately
      );

      // Make the actual API call
      const res = await fetch(`/api/superadmin/users/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || 'Failed to delete user.');
      }
      
      // Trigger a re-validation to ensure data consistency (optional, but good practice)
      mutate();
    } catch (err) {
      // If the API call fails, SWR's `mutate` call will automatically revert the UI
      // to its previous state upon the next re-validation. We'll re-throw the error
      // so the UI component can display it.
      throw err; 
    }
  };

  return {
    users: data?.users || [],
    isLoading,
    error,
    deleteUser,
  };
}