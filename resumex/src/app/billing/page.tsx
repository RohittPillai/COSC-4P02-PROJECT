"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BillingPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to pricing as soon as this page loads
    router.push("/pricing");
  }, [router]);

  return null;
}
