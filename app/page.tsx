import Link from "next/link";
import React from "react";
import HeroSection from "@/components/HeroSection";
import { getMDXComponent } from "next-contentlayer/hooks";
import {
  allClientWorks,
  allHomes,
  allProjects,
} from "@/.contentlayer/generated";
import { ProjectCard } from "@/components/ProjectCard";

export default function Home() {
  const home = allHomes;

  const Content = getMDXComponent(home[0].body.code);
  const projects = allProjects;

  const clientWork = allClientWorks;

  return (
    <React.Fragment>
      <HeroSection />
      <div className="prose dark:prose-invert my-5 max-w-4xl">
        <Content />
      </div>
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-6">Some Client Works</h2>
        {clientWork.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
        <Link href="/projects" className="text-pink-400 hover:underline">
          View more projects →
        </Link>
      </section>
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-6">
          A few things I&apos;ve Built 🏗️
        </h2>
        {projects.map((project, idx) => (
          <ProjectCard key={idx} {...project} />
        ))}
        <Link href="/projects" className="text-pink-400 hover:underline">
          View more projects →
        </Link>
      </section>
    </React.Fragment>
  );
}
