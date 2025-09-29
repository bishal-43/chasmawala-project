// src/lib/adminMiddleware.js

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/auth'; // You need this utility

export function withAdminAuth(handler) {
  return async (req, context) => {
    try {
      const token = cookies().get("auth-token")?.value;
      const isAdmin = await verifyAdminToken(token);
      
      if (!isAdmin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      // If authorized, run the actual API logic
      return handler(req, context);
    } catch (error) {
      return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
    }
  };
}