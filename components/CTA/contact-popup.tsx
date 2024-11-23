"use client";

import React, { useState, useRef } from "react";
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

export function ContactPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<EmailResponse | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

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
        return;
      }
    }

    try {
      const result = await sendEmail(formData);
      setResult(result);

      if (result.success && formRef.current) {
        formRef.current.reset(); // Proper form reset
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
            className="p-4 bg-gray-900 space-y-4"
          >
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
              className="w-full bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors disabled:opacity-50"
            >
              {isSending ? "Sending..." : "Send Message"}
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
        <button
          onClick={() => setIsOpen(true)}
          className="bg-pink-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-pink-700 transition-colors"
          aria-label="Open contact form"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
