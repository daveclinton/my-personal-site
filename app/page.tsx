import Link from "@/components/Link";
import { Rss, Github } from "lucide-react";
import SocialIcon from "@/components/social-icons";
import CustomLink from "@/components/Link";
import EnhancedEmailSection from "@/components/EmailEnhanced";
import { siteMetadata } from "@/data/siteMetadata";
import Image from "@/components/Image";
import { getMDXComponent } from "next-contentlayer/hooks";
import { compareDesc, format, parseISO } from "date-fns";
import { allProjects, Project } from "contentlayer/generated";

function PostCard(post: Project) {
  const Content = getMDXComponent(post.body.code);
  return (
    <div className="mb-8">
      <h2 className="text-xl">
        <Link
          href={post.url}
          className="text-blue-700 hover:text-blue-900"
          legacyBehavior
        >
          {post.title}
        </Link>
      </h2>
      <time dateTime={post.date} className="block mb-2 text-xs text-gray-600">
        {format(parseISO(post.date), "LLLL d, yyyy")}
      </time>
      <div className="text-sm">
        <Content />
      </div>
    </div>
  );
}

export default async function Page() {
  const posts = allProjects.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );
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
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-xl sm:leading-10 md:text-2xl md:leading-14">
            Hey Legend 😊,
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            All things here are Software Engineering related! You can subscribe
            to receive an article straight into your inbox every Sunday! on my
            <Link
              href="https://daveclintonn.substack.com/"
              className="text-pink-500"
            >
              {` Substack. `}
            </Link>
            You can also check out my
            <Link href="/projects" className="text-pink-500">
              {` Projects `}
            </Link>{" "}
            Here
            <br />
            <br />
            My posts are a collaborative space, so feel free to reply if: 🧰
            There’s a topic you’re curious about and would love to read about on
            my blog. 🪜 You know about good resources that could benefit fellow
            aspiring Software Engineers. 😁 You just want to say hello. :)
            <br />
            <br />I will always be happy to share more with you. Check out my
            about here; :)
            <Link href="/about" className="text-pink-500">
              {` About `}
            </Link>
            section.
          </p>
        </div>
        {/* My Posts */}
        <div>
          {posts.map((post, idx) => (
            <PostCard key={idx} {...post} />
          ))}
        </div>
      </div>
    </>
  );
}
