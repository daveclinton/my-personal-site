"use client";

import React, { useState } from "react";

export default function SubstackCTA() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the subscription logic
    console.log("Subscribing email:", email);
    // Reset the email input after submission
    setEmail("");
  };

  return (
    <section className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-4 text-center">
              Want More Magic?{" "}
              <span className="text-pink-500">Subscribe to My Substack!</span>
            </h2>
            <div className="mb-6">
              <iframe
                src="https://yoursubstack.substack.com/embed"
                width="100%"
                height="320"
                style={{
                  border: "1px solid #EEE",
                  background: "white",
                }}
                frameBorder="0"
                scrolling="no"
              ></iframe>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-pink-600 text-white font-semibold rounded-md transition duration-300 ease-in-out transform hover:bg-pink-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 animate-pulse"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
