"use client";
import React from "react";
import { Users, Eye, BookOpen, Briefcase } from "lucide-react";
import GlobeComponent from "@/components/GlobeUtils/Globe";
import PortfolioAnalytics from "@/components/PortfolioAnalytics";

export default function PortfolioPage() {
  const stats = [
    { name: "Newsletter Subscribers", count: 5, icon: Users },
    { name: "Portfolio Visitors", count: 89, icon: Eye },
    { name: "Blogs Written", count: 0, icon: BookOpen },
    { name: "Projects Completed", count: 5, icon: Briefcase },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <PortfolioAnalytics />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#1c1c20] rounded-lg p-8">
          <h2 className="text-2xl font-bold text-pink-500 mb-4">
            Location Visualization
          </h2>
          <p className="text-gray-400 mb-6 text-lg">Recent geolocation visit</p>
          <GlobeComponent />
        </div>
        <div className="bg-[#1c1c20] rounded-lg p-8">
          <h2 className="text-2xl font-bold text-pink-500 mb-4">
            Portfolio Stats
          </h2>
          <p className="text-gray-400 mb-6 text-lg">
            Recent achievements and metrics
          </p>
          <ul className="space-y-6">
            {stats.map((stat) => (
              <li key={stat.name} className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <stat.icon className="h-8 w-8 text-pink-500" />
                  <span className="text-gray-200 text-sm">{stat.name}</span>
                </div>
                <span className="text-pink-500 font-semibold text-2xl">
                  {stat.count.toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
