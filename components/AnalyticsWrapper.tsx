"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { sendAnalytics } from "@/utils/analytics-track";
import React from "react";

export default function AnalyticsWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleRouteChange = () => {
      const url = pathname + searchParams.toString();
      sendAnalytics(url);
    };
    handleRouteChange();

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [pathname, searchParams]);

  return <React.Fragment>{children}</React.Fragment>;
}
