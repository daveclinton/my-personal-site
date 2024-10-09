import Link from "@/components/Link";
import { Rss, Github } from "lucide-react";
import SocialIcon from "@/components/social-icons";
import CustomLink from "@/components/Link";
import EnhancedEmailSection from "@/components/EmailEnhanced";
import { siteMetadata } from "@/data/siteMetadata";
import Image from "@/components/Image";
import { allHomes, allPosts, allProjects } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import PostsCard from "@/components/Posts";
import { ProjectCard } from "@/components/ProjectCard";
import { getMDXComponent } from "next-contentlayer/hooks";

export default async function Page() {
  const projects = allProjects;

  const latestPosts = allPosts
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 4);

  const home = allHomes;

  const Content = getMDXComponent(home[0].body.code);
  return (
    <>
      <div>
        <div className="mx-auto  overflow-hidden rounded-lg bg-gray-900 shadow-lg">
          <div className="space-y-4 p-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 animate-ping rounded-full bg-red-400 opacity-75"></div>
                <Image
                  src="/images/davecl.jpg"
                  alt="Profile Image"
                  className="relative h-16 w-16 rounded-full"
                  width={50}
                  height={50}
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">David Clinton</h2>
                <p className="text-gray-400">Mobile & Frontend Engineer</p>
              </div>
            </div>
            <div className="space-y-2">
              <EnhancedEmailSection />
              <p className="text-gray-300">
                Need consulting? Book a call with me{" "}
                <CustomLink
                  href="https://cal.com/david-clinton-ucuv7n"
                  className="text-pink-500 hover:text-pink-600 dark:hover:text-pink-400"
                >
                  here
                </CustomLink>
              </p>
            </div>
            <div className="flex justify-end space-x-4">
              <CustomLink
                href="https://daveclintonn.substack.com/"
                className="text-gray-400 hover:text-white"
              >
                <Rss size={24} />
              </CustomLink>
              <SocialIcon kind="twitter" href={siteMetadata.twitter} size={6} />
              <CustomLink
                href="https://github.com/daveclinton"
                className="text-gray-400 hover:text-white"
              >
                <Github size={24} />
              </CustomLink>
            </div>
          </div>
        </div>
        <div className="prose dark:prose-invert my-3 max-w-4xl">
          <Content />
        </div>
        <h1 className="text-xl font-extrabold leading-9 mb-2 tracking-tight text-gray-900 dark:text-white sm:text-xl sm:leading-10 md:text-2xl md:leading-14">
          {`Latest Posts 🪙`}
        </h1>
        {latestPosts.map((post, idx) => (
          <PostsCard key={idx} {...post} />
        ))}
        <div className="mt-4 mb-6">
          <Link
            href="/blog"
            className="text-pink-500 hover:text-pink-600 dark:hover:text-pink-400"
          >
            View more posts →
          </Link>
        </div>
        <h1 className="text-xl font-extrabold mt-5 leading-9 tracking-tight text-gray-900 dark:text-white sm:text-xl sm:leading-10 md:text-2xl md:leading-14">
          {`A few things I've Built 💻`}
        </h1>
        {projects.map((project, idx) => (
          <ProjectCard key={idx} {...project} />
        ))}
        <div className="mt-4 mb-6">
          <Link
            href="/projects"
            className="text-pink-500 hover:text-pink-600 dark:hover:text-pink-400"
          >
            View more projects →
          </Link>
        </div>
      </div>
    </>
  );
}
