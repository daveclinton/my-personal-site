"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { sendAnalytics } from "@/utils/analytics-track";
import React from "react";

export default function AnalyticsWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    const handleRouteChange = () => {
      const url = pathname;
      sendAnalytics(url);
    };
    handleRouteChange();

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [pathname]);

  return <React.Fragment>{children}</React.Fragment>;
}
