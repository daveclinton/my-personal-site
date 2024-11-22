"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface PaymentFormData {
  amount: number | string;
  email: string;
  phone: string;
  description: string;
}

export default function PayDavidPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<PaymentFormData>({
    amount: "",
    email: "",
    phone: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/pesapal", {
        amount: formData.amount,
        description: formData.description || "Payment to David",
        reference: `TXN-${Date.now()}`,
        callback_url: `${window.location.origin}/pay-david`,
        currency: "KES",
        billing_address: {
          email_address: formData.email,
          phone_number: formData.phone,
          country_code: "KE",
        },
      });

      if (response.data?.data?.redirect_url) {
        window.location.href = response.data.data.redirect_url;
      } else {
        setError("Failed to initialize payment");
      }
    } catch (err) {
      setError("Failed to process payment. Please try again.");
      console.error("Payment error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const isCallback =
    typeof window !== "undefined" &&
    (window.location.search.includes("OrderTrackingId") ||
      window.location.search.includes("OrderMerchantReference"));

  if (isCallback) {
    return <PaymentCallback />;
  }

  return (
    <div className=" w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-lg">
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-pink-300">
          Support My Work
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Your contribution helps me continue creating and maintaining
          open-source projects
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm space-y-4">
          <div>
            <label htmlFor="amount" className="sr-only">
              Amount (KES)
            </label>
            <input
              type="number"
              id="number-input"
              aria-describedby="helper-text-explanation"
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm transition duration-300"
              placeholder="150 (USD)"
              required
              value={formData.amount as number}
              onChange={(e) =>
                setFormData({ ...formData, amount: Number(e.target.value) })
              }
            />
          </div>

          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm transition duration-300"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="phone" className="sr-only">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm transition duration-300"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="description" className="sr-only">
              Description (Optional)
            </label>
            <textarea
              id="description"
              name="description"
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm transition duration-300"
              placeholder="Description (Optional)"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
            />
          </div>
        </div>

        {error && (
          <div className="rounded-md bg-red-900 p-4 animate-fade-in">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-300">{error}</h3>
              </div>
            </div>
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
              isLoading
                ? "bg-pink-400 cursor-not-allowed"
                : "bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            } transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Proceed to Payment"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

function PaymentCallback() {
  const [isChecking, setIsChecking] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const orderTrackingId = params.get("OrderTrackingId");
        const orderMerchantReference = params.get("OrderMerchantReference");

        if (!orderTrackingId || !orderMerchantReference) {
          setError("Invalid payment parameters");
          setIsChecking(false);
          return;
        }

        const response = await axios.get("/api/pesapal/status", {
          params: {
            OrderTrackingId: orderTrackingId,
            OrderMerchantReference: orderMerchantReference,
          },
        });
        console.log(response);

        setPaymentStatus(response.data.data.status);
      } catch (err) {
        console.log(err);
        setError("Failed to verify payment status");
      } finally {
        setIsChecking(false);
      }
    };

    checkStatus();
  }, []);

  if (isChecking) {
    return (
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-500 mx-auto"></div>
        <p className="mt-4 text-lg text-pink-300">
          Verifying payment status...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md p-8 bg-red-900 rounded-lg animate-fade-in">
        <h1 className="text-2xl font-bold text-red-300 mb-4">Payment Error</h1>
        <p className="text-red-200">{error}</p>
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition-colors duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        >
          Return Home
        </button>
      </div>
    );
  }

  if (paymentStatus === "200") {
    return (
      <div className="max-w-md p-8 bg-green-900 rounded-lg animate-fade-in">
        <div className="w-16 h-16 mx-auto mb-4">
          <svg
            className="w-full h-full text-green-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-green-300 text-center mb-4">
          Thank You!
        </h1>
        <p className="text-green-200 text-center mb-6">
          Your payment has been completed successfully.
        </p>
        <div className="text-center">
          <button
            onClick={() => (window.location.href = "/")}
            className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition-colors duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md p-8 bg-red-900 rounded-lg animate-fade-in">
        <h1 className="text-2xl font-bold text-red-300 mb-4">Payment Failed</h1>
        <p className="text-red-200">
          We couldn&apos;t complete your payment. Please try again or contact
          support if the problem persists.
        </p>
        <button
          onClick={() => (window.location.href = "/pay-david")}
          className="mt-6 px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition-colors duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
