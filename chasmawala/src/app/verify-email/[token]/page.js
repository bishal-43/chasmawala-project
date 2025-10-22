// src/app/verify-email/[token]/page.js

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('Verifying your email...');
  const { token } = useParams();

  useEffect(() => {
    const verifyUserEmail = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Verification token is missing.');
        return;
      }

      try {
        const res = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Verification failed.');
        }

        setStatus('success');
        setMessage('✅ ' + data.message);
      } catch (error) {
        setStatus('error');
        setMessage('❌ ' + (error.message || 'An error occurred.'));
      }
    };
    verifyUserEmail();
  }, [token]);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Email Verification</h1>
      <p>{message}</p>
      {status === 'success' && (
        <Link href="/account/login" style={{ color: '#007bff' }}>
          Proceed to Login
        </Link>
      )}
      {status === 'error' && (
         <p>Please try signing up again or contact support.</p>
      )}
    </div>
  );
}
