"use client";
import React, { useEffect } from "react";
import { Users, Eye, BookOpen, Briefcase } from "lucide-react";
import { useGlobeStore } from "@/store/globeData";
import {
  allClientWorks,
  allPosts,
  allProjects,
} from "@/.contentlayer/generated";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function PortfolioStats() {
  const [totalSubs, setTotalSubscribers] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const { pointsData, loading: globeLoading } = useGlobeStore();
  console.log(pointsData);
  const blogs = allPosts;
  const projects = allProjects;
  const clientProjects = allClientWorks;

  useEffect(() => {
    fetch("/api/subscribers-total")
      .then((response) => response.json())
      .then((data) => {
        setTotalSubscribers(data.total);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching subscriber count:", error);
        setLoading(false);
      });
  }, []);

  const stats = [
    { name: "Newsletter Subscribers", count: totalSubs, icon: Users },
    { name: "Unique Visitors", count: pointsData?.length, icon: Eye },
    { name: "Blogs Written", count: blogs.length, icon: BookOpen },
    { name: "Projects Completed", count: projects.length, icon: Briefcase },
    {
      name: "Client Projects Done",
      count: clientProjects.length,
      icon: Briefcase,
    },
  ];

  return (
    <div className="bg-[#1c1c20] rounded-lg p-8">
      <h2 className="text-2xl font-bold text-pink-500 mb-4">Portfolio Stats</h2>
      <p className="text-gray-400 mb-6 text-lg">
        Recent milestones and metrics
      </p>
      <ul className="space-y-6">
        {stats.map((stat) => (
          <li key={stat.name} className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <stat.icon className="h-8 w-8 text-pink-500" />
              <span className="text-gray-200 text-sm">{stat.name}</span>
            </div>
            {loading || globeLoading ? (
              <Skeleton
                width={60}
                height={32}
                baseColor="#2d2d30"
                highlightColor="#3f3f3f"
              />
            ) : (
              <span className="text-pink-500 font-semibold text-2xl">
                {stat.count !== false ? stat.count?.toLocaleString() : "N/A"}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
