import { Github, Linkedin, Rss } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { EmailCopy } from "./EmailCopy";

export default async function HeroSection() {
  let visitorCount;
  try {
    visitorCount = await getVisitorCount();
  } catch (error) {
    console.error("Error fetching visitor count:", error);
    visitorCount = null;
  }

  return (
    <section className="bg-[#1F1F22] rounded-lg p-8 mb-12 ">
      <div className="flex items-center mb-6">
        <div className="relative">
          <div className="absolute  rounded-full animate-ping">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" />
          </div>
          <div className="relative  rounded-full mr-6">
            <Image
              src="/images/davecl.jpg"
              alt="Profile Image"
              className="h-16 w-16 rounded-full"
              width={64}
              height={64}
            />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">David Clinton</h1>
          <p className="text-gray-400">Mobile & Frontend Engineer</p>
        </div>
      </div>
      <EmailCopy />
      <p>
        Need consulting? Book a call with me {` `}
        <Link
          href="https://cal.com/david-clinton-ucuv7n"
          className="text-pink-400 hover:underline"
        >
          here
        </Link>
      </p>
      <div className="flex space-x-4 mt-6">
        <Link
          href="https://daveclintonn.substack.com/"
          className="text-gray-400 hover:text-white"
        >
          <span className="sr-only">RSS</span>
          <Rss />
        </Link>
        <Link
          href="https://www.linkedin.com/in/clintondavid46/"
          className="text-gray-400 hover:text-white"
        >
          <span className="sr-only">Linkedin</span>
          <Linkedin />
        </Link>
        <Link
          href="https://github.com/daveclinton"
          className="text-gray-400 hover:text-white"
        >
          <span className="sr-only">GitHub</span>
          <Github />
        </Link>
      </div>
      {visitorCount !== null && (
        <p className="mt-4 text-sm text-gray-400">
          Visitor count: {visitorCount}
        </p>
      )}
    </section>
  );
}

async function getVisitorCount() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/visitor-count`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch visitor count");
    }
    const data = await response.json();
    return data.count;
  } catch (error) {
    console.error("Error fetching visitor count:", error);
    return null;
  }
}
