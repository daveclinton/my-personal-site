/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import dynamic from "next/dynamic";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import {
  Users,
  Eye,
  BookOpen,
  Briefcase,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import type { GlobeMethods } from "react-globe.gl";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export default function PortfolioPage() {
  const [globeSize, setGlobeSize] = useState({ width: 0, height: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const globeEl = useRef<GlobeMethods | null>(null);

  const stats = [
    { name: "Newsletter Subscribers", count: 1250, icon: Users },
    { name: "Portfolio Visitors", count: 5678, icon: Eye },
    { name: "Blogs Written", count: 42, icon: BookOpen },
    { name: "Projects Completed", count: 37, icon: Briefcase },
  ];

  const studyPlan = [
    { id: 1, task: "Learn React Basics", completed: true },
    { id: 2, task: "Master Next.js", completed: true },
    { id: 3, task: "Explore GraphQL", completed: false },
    { id: 4, task: "Build a Full-Stack App", completed: false },
    { id: 5, task: "Learn Docker", completed: false },
    { id: 6, task: "Implement CI/CD Pipeline", completed: false },
    { id: 7, task: "Study Cloud Architecture", completed: false },
    { id: 8, task: "Master TypeScript", completed: false },
    { id: 9, task: "Learn Machine Learning Basics", completed: false },
    { id: 10, task: "Contribute to Open Source", completed: false },
  ];

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

  useEffect(() => {
    if (isMounted && globeSize.width > 0) {
      const timer = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isMounted, globeSize]);

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.1;
    }
  }, [isMounted, globeSize]);

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#1c1c20] rounded-lg p-8">
          <h2 className="text-3xl font-bold text-[#ff69b4] mb-6">
            LOCATION VISUALIZATION
          </h2>
          <p className="text-gray-400 mb-6 text-lg">Recent geolocation visit</p>
          <div
            id="globe-container"
            className="relative flex justify-center items-center"
            style={{ height: `${globeSize.height}px` }}
          >
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="h-12 w-12 text-[#ff69b4] animate-spin" />
              </div>
            ) : (
              isMounted && (
                <Globe
                  ref={globeEl as MutableRefObject<GlobeMethods | undefined>}
                  pointsData={data}
                  width={globeSize.width}
                  height={globeSize.height}
                  backgroundColor="rgba(0,0,0,0)"
                  globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                  bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                />
              )
            )}
          </div>
        </div>
        <div className="bg-[#1c1c20] rounded-lg p-8">
          <h2 className="text-3xl font-bold text-[#ff69b4] mb-6">
            PORTFOLIO STATS
          </h2>
          <p className="text-gray-400 mb-6 text-lg">
            Recent achievements and metrics
          </p>
          <ul className="space-y-6">
            {stats.map((stat) => (
              <li key={stat.name} className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <stat.icon className="h-8 w-8 text-[#ff69b4]" />
                  <span className="text-gray-200 text-xl">{stat.name}</span>
                </div>
                <span className="text-[#ff69b4] font-semibold text-2xl">
                  {stat.count.toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-[#1c1c20] rounded-lg p-8">
        <h2 className="text-3xl font-bold text-[#ff69b4] mb-6">
          YEARLY STUDY PLAN
        </h2>
        <p className="text-gray-400 mb-6 text-lg">
          Track your learning progress
        </p>
        <ul className="space-y-6">
          {studyPlan.map((item) => (
            <li key={item.id} className="flex items-center space-x-6">
              <span className="text-[#ff69b4] font-semibold text-2xl min-w-[2.5rem]">
                {item.id}.
              </span>
              <span
                className={`text-gray-200 flex-grow text-xl ${
                  item.completed ? "line-through" : ""
                }`}
              >
                {item.task}
              </span>
              {item.completed && (
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
