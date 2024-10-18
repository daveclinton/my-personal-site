/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import Confetti from "react-confetti";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const size = useWindowSize();

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  async function handleSubmit(e: any) {
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
        setMessage(data.message || "Successfully subscribed!");
        setEmail("");
        setShowConfetti(true);
      } else {
        setMessage(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <footer className="bg-[#1F1F22] text-center py-8 relative overflow-hidden">
      {showConfetti && (
        <Confetti width={size.width || 300} height={size.height || 300} />
      )}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="mb-6">
          <h2 className="text-xl font-bold mb-4 text-white">
            Subscribe to My Newsletter
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="px-4 py-2 w-full sm:w-auto rounded-md text-black"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out w-full sm:w-auto disabled:opacity-50"
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </button>
          </div>
        </form>
        {message && (
          <p
            className={`mb-4 ${
              message.includes("success") ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}
        <p className="text-white">
          &copy; 2024 David Clinton. All rights reserved.
        </p>
      </div>
      <style jsx>{`
        .confetti-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease-out;
        }
        .confetti-container.active {
          opacity: 1;
        }
        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          background-color: #f0f;
          animation: confetti-fall 5s ease-out infinite;
        }
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100%) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </footer>
  );
}
