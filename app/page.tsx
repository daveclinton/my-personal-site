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
import SubstackFeed from "@/components/Substack-Feed";
import { ReadMore } from "@/components/ReadMore";

export default function Home() {
  const home = allHomes;

  const Content = getMDXComponent(home[0].body.code);
  const projects = allProjects;

  const clientWork = allClientWorks;

  return (
    <React.Fragment>
      <HeroSection />
      <div className="prose dark:prose-invert my-5 max-w-4xl">
        <ReadMore>
          <Content />
        </ReadMore>
      </div>
      <SubstackFeed />
      <section className="mt-10 flex flex-col gap-3">
        <h2 className="mb-2 text-lg font-semibold">Some Client Works</h2>
        {clientWork.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
        <Link href="/client-work" className="text-pink-400 hover:underline">
          View more client works →
        </Link>
      </section>
      <section className="mt-10 flex flex-col gap-3">
        <h2 className="mb-2 text-lg font-semibold">
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
