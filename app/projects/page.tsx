import { allProjects } from "@/.contentlayer/generated";
import { ProjectCard } from "@/components/ProjectCard";
import { Metadata } from "next";

import React from "react";

export const metadata: Metadata = {
  title: "David Clinton's Projects",
  description: "Explore David Clinton's projects and portfolio.",
  openGraph: {
    title: "David Clinton's Projects",
    description: "Explore David Clinton's projects and portfolio.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/projects`,
    siteName: "David Clinton's Site",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=David Clinton's Projects`,
        width: 1200,
        height: 630,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "David Clinton's Projects",
    description: "Explore David Clinton's projects and portfolio.",
    images: [
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=David Clinton's Projects`,
    ],
  },
};

const Projects = () => {
  const projects = allProjects;
  return (
    <div>
      <h1 className="text-xl font-extrabold leading-9 mb-2 tracking-tight text-gray-900 dark:text-white sm:text-xl sm:leading-10 md:text-2xl md:leading-14">
        {`My Projects 🪙`}
      </h1>
      {projects.map((post, idx) => (
        <ProjectCard key={idx} {...post} />
      ))}
    </div>
  );
};

export default Projects;
