import { ClientWork, Project } from "@/.contentlayer/generated";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export function ProjectCard(project: Project | ClientWork) {
  return (
    <Link
      href={project.link}
      className="block w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:bg-[#1F1F22] dark:hover:bg-[#1F1F22] transition-colors"
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <p className="group flex items-center text-lg font-semibold text-pink-500 dark:text-pink-400 hover:underline">
            {project.title}
            <ExternalLink className="ml-1 h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
          </p>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 mb-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
