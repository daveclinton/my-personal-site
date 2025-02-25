import { allProjects } from "@/.contentlayer/generated";
import { ProjectCard } from "@/components/ProjectCard";
import { Metadata } from "next";
import React from "react";
import { PhoneCard } from "@/components/ImageSlider";

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

const mobileAppProjects = [
  {
    title: "Fitness Tracker",
    description: "Track your workouts and monitor your progress",
    image:
      "https://res.cloudinary.com/dazawvf2g/image/upload/v1732641324/Screenshot_2024-11-26_at_8.10.15_PM_otngdf.png",
    type: "iphone" as const,
  },
  {
    title: "Recipe Finder",
    description: "Discover new recipes based on ingredients you have",
    image:
      "https://res.cloudinary.com/dazawvf2g/image/upload/v1732643275/Screenshot_2024-11-26_at_8.46.05_PM_z5xy5f.png",
    type: "android" as const,
  },
  {
    title: "Meditation App",
    description: "Guided meditations for relaxation and mindfulness",
    image: "/placeholder.svg?height=900&width=500",
    type: "iphone" as const,
  },
  {
    title: "Task Manager",
    description: "Organize your tasks and boost productivity",
    image: "/placeholder.svg?height=900&width=500",
    type: "android" as const,
  },
];

const Projects = () => {
  const projects = allProjects;
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-extrabold leading-9 mb-8 tracking-tight text-gray-900 dark:text-white sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
          {`My Projects 🪙`}
        </h1>
        <div className="space-y-8 mb-16">
          {projects.map((post, idx) => (
            <ProjectCard key={idx} {...post} />
          ))}
        </div>
        <h2 className="text-xl font-extrabold leading-9 mb-8 tracking-tight text-gray-900 dark:text-white sm:text-2xl sm:leading-10 md:text-3xl md:leading-14">
          {`Mobile App Projects 📱`}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mobileAppProjects.map((project, index) => (
            <div key={index} className="flex justify-center">
              <PhoneCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
