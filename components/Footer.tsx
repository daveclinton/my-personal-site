"use client";

import React, { useState, useEffect } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import Confetti from "react-confetti";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Subscribed!");
        setEmail("");
        setShowConfetti(true);
      } else {
        setMessage(data.message || "Error. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <footer className="bg-[#1F1F22] text-white py-4 relative overflow-hidden">
      {showConfetti && width && height && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col items-center">
          <form onSubmit={handleSubmit} className="w-full max-w-md mb-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-grow px-3 py-1.5 text-sm bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium px-3 py-1.5 rounded-md transition duration-300 ease-in-out disabled:opacity-50"
              >
                {isLoading ? "..." : "Subscribe"}
              </button>
            </div>
          </form>
          {message && (
            <p
              className={`text-xs mb-2 ${
                message.includes("Subscribed")
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {message}
            </p>
          )}
          <p className="text-xs text-white/70">
            &copy; 2024 David Clinton. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
