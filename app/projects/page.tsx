import { allProjects } from "@/.contentlayer/generated";
import { ProjectCard } from "@/components/ProjectCard";

import React from "react";

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
