// src/hooks/useIdleLogout.js
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useIdleLogout(timeout = 30 * 60 * 1000) {
  const router = useRouter();

  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
      }, timeout);
    };

    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];

    events.forEach((e) => window.addEventListener(e, resetTimer));
    resetTimer(); // start timer on mount

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetTimer));
      clearTimeout(timer);
    };
  }, [router, timeout]);
}