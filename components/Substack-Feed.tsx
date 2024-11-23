"use client";

import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    SubstackFeedWidget: {
      substackUrl: string;
      posts: number;
      colors: {
        primary: string;
        secondary: string;
        background: string;
      };
    };
  }
}

const SubstackFeed = () => {
  useEffect(() => {
    window.SubstackFeedWidget = {
      substackUrl: "daveclintonn.substack.com",
      posts: 3,
      colors: {
        primary: "#EC4899",
        secondary: "#E3DCDF",
        background: "#101012",
      },
    };
  }, []);

  return (
    <>
      <div id="substack-feed-embed" className="w-full max-w-4xl mx-auto my-8" />
      <Script
        src="https://substackapi.com/embeds/feed.js"
        strategy="lazyOnload"
      />
    </>
  );
};

export default SubstackFeed;
