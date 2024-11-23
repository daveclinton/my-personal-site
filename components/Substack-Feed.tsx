"use client";
import Script from "next/script";
import { useState } from "react";

const SubstackFeed = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Create the configuration script that will run when the page loads
  const configScript = `
    window.SubstackFeedWidget = {
      substackUrl: "daveclintonn.substack.com",
      posts: 3,
      colors: {
        primary: "#EC4899",
        secondary: "#E3DCDF",
        background: "#101012",
      }
    };
  `;

  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      {isLoading && (
        <div className="w-full h-48 bg-gray-900 rounded-lg animate-pulse flex items-center justify-center">
          <div className="space-y-4">
            <div className="h-4 w-48 bg-gray-800 rounded animate-pulse"></div>
            <div className="h-4 w-40 bg-gray-800 rounded animate-pulse"></div>
            <div className="h-4 w-44 bg-gray-800 rounded animate-pulse"></div>
          </div>
        </div>
      )}

      <div
        id="substack-feed-embed"
        className={isLoading ? "hidden" : "block"}
      />

      <Script id="substack-feed-config" strategy="lazyOnload">
        {configScript}
      </Script>

      <Script
        src="https://substackapi.com/embeds/feed.js"
        strategy="lazyOnload"
        defer
        onLoad={() => {
          // Give a small delay to allow the widget to render
          setTimeout(() => setIsLoading(false), 500);
        }}
      />
    </div>
  );
};

export default SubstackFeed;
