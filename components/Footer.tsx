import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#1F1F22] text-white py-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="iframe-container w-full">
            <iframe
              src="https://daveclintonn.substack.com/embed"
              width="100%"
              height="300"
              className="custom-iframe w-full"
              style={{
                border: "1px solid #EC4899",
                background: "#1F1F22",
                color: "#FFFFFF",
              }}
            />
          </div>
          <p className="text-xs text-white/70 mt-4">
            &copy; 2024 David Clinton. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
