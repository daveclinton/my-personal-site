"use client";
import { Copy, Github, Linkedin, Rss } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function HeroSection() {
  const [isCopied, setIsCopied] = useState(false);
  const email = "contact@daveclintonn.cc";

  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  useEffect(() => {
    fetch("/api/visitor-count")
      .then((response) => response.json())
      .then((data) => setVisitorCount(data.count))
      .catch((error) => console.log("Error fetching visitor count", error));
  }, []);

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
      <p
        onClick={copyEmail}
        className="mb-4 flex items-center gap-x-2 cursor-pointer"
      >
        Looking to hire me? Email me : contact@daveclinton.cc
        {isCopied ? (
          <span className="text-green-500">✓</span>
        ) : (
          <Copy size={15} color="" />
        )}
      </p>
      <p>
        Need consulting? Book a call with me{" "}
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
