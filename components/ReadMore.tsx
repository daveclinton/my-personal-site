"use client";
import React from "react";

export const ReadMore = ({ children }: { children: React.ReactNode }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const [showButton, setShowButton] = React.useState(true);

  React.useEffect(() => {
    if (contentRef.current) {
      const shouldShowButton = contentRef.current.scrollHeight > 100;
      setShowButton(shouldShowButton);
    }
  }, []);

  return (
    <div>
      <div ref={contentRef} className={`${!isExpanded ? "line-clamp-3" : ""}`}>
        {children}
      </div>

      {showButton && (
        <span className="inline-flex items-center gap-1">
          {!isExpanded && <span className="text-gray-400">...</span>}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-pink-400 hover:text-pink-300 transition-colors ml-1 hover:underline"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        </span>
      )}
    </div>
  );
};
