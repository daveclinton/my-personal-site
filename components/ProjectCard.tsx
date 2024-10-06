import { Project } from "@/.contentlayer/generated";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export function ProjectCard(project: Project) {
  return (
    <div className="w-full overflow-hidden">
      <div className="py-2">
        <div className="flex justify-between items-start">
          <Link
            href={project.link}
            className="group flex items-center text-md font-bold text-pink-400  hover:text-pink-900 dark:hover:text-pink-400 transition-colors"
          >
            {project.title}
            <ExternalLink className="ml-1 h-4 w-4 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-2">
          {project.description}
        </p>

        <p className="text-gray-600 dark:text-gray-300 font-bold">
          Technologies
        </p>

        <div className="flex flex-wrap gap-1">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="py-1 text-sm text-gray-600 dark:text-gray-300"
            >
              *{tech}*
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
