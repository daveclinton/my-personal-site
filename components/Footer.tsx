"use client";

import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
        setMessage(data.message || "Successfully subscribed!");
        setEmail("");
      } else {
        setMessage(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.log(error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <footer className="bg-[#1F1F22] text-center py-8">
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
    </footer>
  );
}
