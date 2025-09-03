// src/hooks/useSuperAdminOrders.js

import useSWR from 'swr';

// Reusable fetcher function
const fetcher = (url) => fetch(url, { credentials: 'include' }).then(async (res) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'An unknown error occurred' }));
    throw new Error(errorData.error || 'Failed to fetch data');
  }
  return res.json();
});

export function useSuperAdminOrders() {
  const { data, error, isLoading } = useSWR('/api/superadmin/orders', fetcher);

  return {
    orders: data?.orders || [],
    isLoading,
    error,
  };
}