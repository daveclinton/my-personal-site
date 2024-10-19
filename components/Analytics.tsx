"use client";

import { initAnalytics } from "@/utils/analytics-track";
import { useEffect } from "react";

export function AnalyticsScript() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return null;
}
