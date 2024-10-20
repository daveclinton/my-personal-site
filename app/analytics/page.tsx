"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

const GlobePage = () => {
  const [globeSize, setGlobeSize] = useState({ width: 500, height: 500 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      const container = document.getElementById("globe-container");
      if (container) {
        const width = container.offsetWidth;
        const height = Math.min(width, window.innerHeight * 0.6);
        setGlobeSize({ width, height });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMounted]);

  const data = [
    {
      lat: 29.953204744601763,
      lng: -90.08925929478903,
      altitude: 0.4,
      color: "#00ff33",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-[#1c1c20] rounded-lg p-6">
        <h2 className="text-2xl font-bold text-[#ff69b4] mb-4">
          LOCATION VISUALIZATION
        </h2>
        <p className="text-gray-400 mb-4">Recent geolocation visits</p>
        <div
          id="globe-container"
          className="relative flex justify-center items-center"
        >
          {isMounted && (
            <Globe
              pointsData={data}
              width={globeSize.width}
              height={globeSize.height}
              backgroundColor="#1c1c20"
            />
          )}
        </div>
      </div>
      <div className="bg-[#1c1c20] rounded-lg p-6">
        <h2 className="text-2xl font-bold text-[#ff69b4] mb-4">
          TOTALS BY CITY
        </h2>
        <p className="text-gray-400 mb-4">Recent city visits</p>
        <ul className="space-y-2">
          {[
            { name: "Pattaya", count: 72, flag: "🇹🇭" },
            { name: "Nairobi", count: 70, flag: "🇰🇪" },
            { name: "Bangkok", count: 51, flag: "🇹🇭" },
            { name: "Toronto", count: 37, flag: "🇨🇦" },
            { name: "Paris", count: 33, flag: "🇫🇷" },
            { name: "Pune", count: 30, flag: "🇮🇳" },
            { name: "Bengaluru", count: 29, flag: "🇮🇳" },
            { name: "Mumbai", count: 25, flag: "🇮🇳" },
            { name: "Moscow", count: 23, flag: "🇷🇺" },
            { name: "Delhi", count: 22, flag: "🇮🇳" },
          ].map((city) => (
            <li key={city.name} className="flex justify-between items-center">
              <span>
                {city.flag} {city.name}
              </span>
              <span className="text-[#ff69b4]">x{city.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GlobePage;
