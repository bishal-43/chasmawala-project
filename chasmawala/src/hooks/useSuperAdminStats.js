// src/hooks/useSuperAdminStats.js

import useSWR from 'swr';

// A reusable fetcher function for SWR
const fetcher = (url) => fetch(url, { credentials: 'include' }).then(async (res) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'An unknown error occurred' }));
    throw new Error(errorData.error || 'Failed to fetch stats');
  }
  return res.json();
});

export function useSuperAdminStats() {
  const { data, error, isLoading } = useSWR('/api/superadmin/stats', fetcher);

  // Provide default values to prevent errors during the initial loading state
  const defaultStats = {
    totalAdmins: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
  };

  return {
    stats: data || defaultStats,
    isLoading,
    error,
  };
}