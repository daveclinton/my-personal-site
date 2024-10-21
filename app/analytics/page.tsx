import React from "react";
import GlobeComponent from "@/components/GlobeUtils/Globe";
import PortfolioAnalytics from "@/components/PortfolioAnalytics";
import PortfolioStats from "@/components/PortfolioStats";

export default function PortfolioPage() {
  return (
    <div className="space-y-8 mx-auto px-4 sm:px-6 lg:px-8 lg:w-svw max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#1c1c20] rounded-lg p-8">
          <h2 className="text-2xl font-bold text-pink-500 mb-4">
            Location Visualization
          </h2>
          <p className="text-gray-400 mb-6 text-lg">Recent geolocation visit</p>
          <GlobeComponent />
        </div>
        <PortfolioStats />
      </div>
      <PortfolioAnalytics />
    </div>
  );
}
