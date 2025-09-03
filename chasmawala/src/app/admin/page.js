// src/app/admin/page.js
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminRootRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/dashboard");
  }, [router]);

  return null;
}
