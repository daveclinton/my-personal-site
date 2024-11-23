"use client";

import { useEffect } from "react";
import React from "react";
import { usePathname } from "next/navigation";

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
    renderSubstackFeedWidget?: () => void;
  }
}

const SubstackFeed = () => {
  const pathname = usePathname();

  const initializeSubstackWidget = () => {
    window.SubstackFeedWidget = {
      substackUrl: "daveclintonn.substack.com",
      posts: 3,
      colors: {
        primary: "#EC4899",
        secondary: "#E3DCDF",
        background: "#101012",
      },
    };

    if (window.renderSubstackFeedWidget) {
      window.renderSubstackFeedWidget();
    } else {
      const script = document.createElement("script");
      script.src = "https://substackapi.com/embeds/feed.js";
      script.async = true;
      script.onload = () => {
        window.renderSubstackFeedWidget?.();
      };
      document.body.appendChild(script);
    }
  };

  useEffect(() => {
    initializeSubstackWidget();
  }, [pathname]);

  return (
    <React.Fragment>
      <section className="mt-10 flex flex-col gap-3">
        <h2 className="mb-2 text-lg font-semibold">Recent Substacks</h2>
      </section>
      <div id="substack-feed-embed" className="w-full max-w-4xl mx-auto my-8" />
    </React.Fragment>
  );
};

export default SubstackFeed;
