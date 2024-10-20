"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState, useCallback } from "react";
import { Users, Eye, BookOpen, Briefcase, Loader2 } from "lucide-react";
import { BarList } from "@/components/BarList";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export default function PortfolioPage() {
  const [globeSize, setGlobeSize] = useState({ width: 0, height: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [globeReady, setGlobeReady] = useState(false);

  const stats = [
    { name: "Newsletter Subscribers", count: 5, icon: Users },
    { name: "Portfolio Visitors", count: 89, icon: Eye },
    { name: "Blogs Written", count: 0, icon: BookOpen },
    { name: "Projects Completed", count: 5, icon: Briefcase },
  ];

  const studyPlan = [
    { name: "/home", value: 65 },
    { name: "/analytics", value: 12 },
    { name: "/client-work", value: 0 },
    { name: "/projects", value: 10 },
    { name: "/about", value: 0 },
  ];

  const onGlobeReady = useCallback(() => {
    setGlobeReady(true);
  }, []);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      const container = document.getElementById("globe-container");
      if (container) {
        const width = container.offsetWidth;
        const height = Math.min(width, window.innerHeight * 0.7);
        setGlobeSize({ width, height });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const data = [
    {
      lat: 29.953204744601763,
      lng: -90.08925929478903,
      altitude: 0.4,
      color: "#00ff33",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#1c1c20] rounded-lg p-4 sm:p-6 md:p-8 min-w-7xl">
        <h2 className="text-2xl  font-bold text-pink-600 mb-2 sm:mb-4">
          Portfolio Analytics
        </h2>
        <p className="text-gray-400 mb-4 sm:mb-6 text-base sm:text-lg">
          Visitor count per page
        </p>
        <BarList data={studyPlan} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#1c1c20] rounded-lg p-8">
          <h2 className="text-2xl font-bold text-pink-600 mb-4">
            Location Visualization
          </h2>
          <p className="text-gray-400 mb-6 text-lg">Recent geolocation visit</p>
          <div
            id="globe-container"
            className="relative flex justify-center items-center"
            style={{ height: `${globeSize.height}px` }}
          >
            {!globeReady ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="h-12 w-12 text-pink-900 animate-spin" />
              </div>
            ) : null}
            {isMounted && (
              <div
                className={`transition-opacity duration-1000 ${
                  globeReady ? "opacity-100" : "opacity-0"
                }`}
              >
                <Globe
                  pointsData={data}
                  width={globeSize.width}
                  height={globeSize.height}
                  backgroundColor="rgba(0,0,0,0)"
                  globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                  bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                  onGlobeReady={onGlobeReady}
                />
              </div>
            )}
          </div>
        </div>
        <div className="bg-[#1c1c20] rounded-lg p-8">
          <h2 className="text-2xl font-bold text-pink-600 mb-4">
            Portfolio Stats
          </h2>
          <p className="text-gray-400 mb-6 text-lg">
            Recent achievements and metrics
          </p>
          <ul className="space-y-6">
            {stats.map((stat) => (
              <li key={stat.name} className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <stat.icon className="h-8 w-8 text-pink-600" />
                  <span className="text-gray-200 text-xl">{stat.name}</span>
                </div>
                <span className="text-pink-600 font-semibold text-2xl">
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
