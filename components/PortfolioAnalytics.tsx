import React from "react";
import { BarList } from "@/components/BarList";
import { getSlugData, SlugData } from "@/actions/getSlug";

export default async function PortfolioAnalytics() {
  let slugData: SlugData = [];
  let error = null;

  try {
    slugData = await getSlugData();
  } catch (e) {
    console.error("Failed to fetch slug data:", e);
    error = e instanceof Error ? e.message : "An unknown error occurred";
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-[#1c1c20] rounded-lg p-4 sm:p-6 md:p-8 min-w-7xl">
      <h2 className="text-2xl font-bold text-pink-500 mb-2 sm:mb-4">
        Portfolio Analytics
      </h2>
      <p className="text-gray-400 mb-4 sm:mb-6 text-base sm:text-lg">
        Visitor count per page
      </p>
      <BarList data={slugData} />
    </div>
  );
}
