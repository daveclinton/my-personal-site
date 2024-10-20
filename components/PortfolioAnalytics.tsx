"use client";
import React, { useEffect } from "react";
import { BarList } from "@/components/BarList";
import { usePortfolioStore } from "@/store/portfolioStore";

const PortfolioAnalytics: React.FC = () => {
  const { slugData, loading, error, fetchSlugData } = usePortfolioStore();

  useEffect(() => {
    fetchSlugData();
  }, [fetchSlugData]);

  if (loading) {
    return <div>Loading...</div>;
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
};

export default PortfolioAnalytics;
