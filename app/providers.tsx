"use client";

import { useEffect } from "react";
import { reportWebVitals } from "@/lib/web-vitals";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    reportWebVitals();
  }, []);

  return <>{children}</>;
}
