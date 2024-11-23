"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { sendEmail } from "@/lib/resend-email";
import { z } from "zod";

const ContactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000),
});

type EmailResponse = {
  success: boolean;
  message: string;
  error?: string;
};

function Spinner() {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-pink-500" />
    </div>
  );
}

export function ContactPopup() {
  const [isOpen, setIsOpen] = useState(false);

  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<EmailResponse | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const resultTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (resultTimeoutRef.current) {
        clearTimeout(resultTimeoutRef.current);
      }
    };
  }, []);

  const clearResultWithTimeout = () => {
    if (resultTimeoutRef.current) {
      clearTimeout(resultTimeoutRef.current);
    }

    resultTimeoutRef.current = setTimeout(() => {
      setResult(null);
    }, 5000);
  };

  async function handleSubmit(formData: FormData) {
    setIsSending(true);
    setResult(null);
    try {
      ContactFormSchema.parse({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setResult({
          success: false,
          message: "Please check your input.",
          error: error.errors.map((err) => err.message).join(", "),
        });
        setIsSending(false);
        clearResultWithTimeout();
        return;
      }
    }

    try {
      const result = await sendEmail(formData);
      setResult(result);

      if (result.success && formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      console.log(error);
      setResult({
        success: false,
        message: "An unexpected error occurred. Please try again.",
        error: "UNKNOWN_ERROR",
      });
    }

    setIsSending(false);
    clearResultWithTimeout();
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-80 bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-pink-500">
          <div className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
            <h3 className="font-semibold text-pink-400">Contact Me</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-pink-400 hover:text-pink-300 transition-colors"
              aria-label="Close contact form"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <form
            ref={formRef}
            action={handleSubmit}
            className="p-4 bg-gray-900 space-y-4 relative"
          >
            {isSending && (
              <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center">
                <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <Spinner />
                    <p className="text-white">Sending message...</p>
                  </div>
                </div>
              </div>
            )}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                minLength={2}
                maxLength={100}
                className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-500"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-300"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                minLength={10}
                maxLength={5000}
                rows={3}
                className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-500"
                placeholder="Your message here..."
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSending}
              className="w-full bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <span>{isSending ? "Sending..." : "Send Message"}</span>
              {isSending && <Spinner />}
            </button>
            {result && (
              <p
                className={`text-sm ${
                  result.success ? "text-green-400" : "text-red-400"
                }`}
              >
                {result.message}
                {result.error && (
                  <span className="block mt-1 text-xs">{result.error}</span>
                )}
              </p>
            )}
          </form>
        </div>
      ) : (
        <div className="relative group">
          <div className="absolute -inset-4">
            <div className="w-full h-full rotate-180 blur-xl opacity-30 group-hover:opacity-70 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="relative bg-gradient-to-r from-pink-500 to-pink-400 text-white rounded-full px-6 py-3 flex items-center gap-2 shadow-lg hover:shadow-pink-400/50 transition-all duration-300 hover:scale-105 group/button"
            aria-label="Open contact form"
          >
            <MessageCircle className="h-5 w-5 group-hover/button:animate-bounce" />
            <span className="font-medium">Contact Me</span>

            <div className="absolute -inset-[2px] bg-gradient-to-r from-pink-500 via-pink-300 to-pink-500 rounded-full blur opacity-40 group-hover/button:opacity-75 animate-gradient-x"></div>
          </button>
        </div>
      )}
    </div>
  );
}
