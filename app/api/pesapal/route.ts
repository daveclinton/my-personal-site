import { NextResponse } from "next/server";
import axios from "axios";
import { z } from "zod";

const envSchema = z.object({
  PESAPAL_CONSUMER_KEY: z.string().min(1),
  PESAPAL_CONSUMER_SECRET: z.string().min(1),
});

const NOTIFICATION_ID = process.env.PESAPAL_NOTIFICATION_ID;

// Update schema to match expected Pesapal fields exactly
const paymentRequestSchema = z.object({
  amount: z.number().positive(),
  description: z.string(),
  reference: z.string(),
  callback_url: z.string().url(),
  currency: z.string(),
  // Add optional billing information
  billing_address: z
    .object({
      email_address: z.string().optional(),
      phone_number: z.string().optional(),
      country_code: z.string().optional(),
      first_name: z.string().optional(),
      middle_name: z.string().optional(),
      last_name: z.string().optional(),
      line_1: z.string().optional(),
      line_2: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      postal_code: z.string().optional(),
      zip_code: z.string().optional(),
    })
    .optional(),
});

export async function POST(request: Request) {
  try {
    // Validate environment variables
    const env = envSchema.safeParse({
      PESAPAL_CONSUMER_KEY: process.env.PESAPAL_CONSUMER_KEY,
      PESAPAL_CONSUMER_SECRET: process.env.PESAPAL_CONSUMER_SECRET,
    });

    if (!env.success) {
      console.error("Environment validation failed:", env.error);
      return NextResponse.json(
        {
          error: {
            error_type: "configuration_error",
            code: "invalid_environment",
            message: "Invalid API configuration",
          },
        },
        { status: 500 }
      );
    }

    // // Base URL configuration
    // const BASE_URL =
    //   process.env.NODE_ENV === "production"
    //     ? "https://pay.pesapal.com/v3"
    //     : "https://cybqa.pesapal.com/pesapalv3";

    const BASE_URL = "https://cybqa.pesapal.com/pesapalv3";

    // Get authentication token
    const authResponse = await axios({
      method: "post",
      url: `${BASE_URL}/api/Auth/RequestToken`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        consumer_key: env.data.PESAPAL_CONSUMER_KEY,
        consumer_secret: env.data.PESAPAL_CONSUMER_SECRET,
      },
      timeout: 10000,
    });

    if (!authResponse.data?.token) {
      throw new Error("Authentication failed: No token received");
    }

    // Validate request body
    const body = await request.json();
    const paymentData = paymentRequestSchema.safeParse(body);

    if (!paymentData.success) {
      return NextResponse.json(
        {
          error: {
            error_type: "validation_error",
            code: "invalid_request_data",
            message: "Invalid payment request data",
            details: paymentData.error.errors,
          },
        },
        { status: 400 }
      );
    }

    // Prepare payment request - exactly matching Pesapal's format
    const orderRequest = {
      id: paymentData.data.reference,
      currency: paymentData.data.currency,
      amount: paymentData.data.amount.toFixed(2),
      description: paymentData.data.description,
      callback_url: paymentData.data.callback_url,
      notification_id: NOTIFICATION_ID,
      billing_address: paymentData.data.billing_address || {
        email_address: "",
        phone_number: "",
        country_code: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        line_1: "",
        line_2: "",
        city: "",
        state: "",
        postal_code: "",
        zip_code: "",
      },
    };

    // Submit order request
    const { data: paymentResponse } = await axios({
      method: "post",
      url: `${BASE_URL}/api/Transactions/SubmitOrderRequest`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${authResponse.data.token}`,
      },
      data: orderRequest,
      timeout: 15000,
    });

    return NextResponse.json({ success: true, data: paymentResponse });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Pesapal API Error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });

      const statusCode = error.response?.status || 500;
      return NextResponse.json(
        {
          error: {
            error_type: error.response?.data?.error?.error_type || "api_error",
            code: error.response?.data?.error?.code || statusCode.toString(),
            message: error.response?.data?.error?.message || error.message,
          },
        },
        { status: statusCode }
      );
    }

    console.error("Unexpected error:", error);
    return NextResponse.json(
      {
        error: {
          error_type: "system_error",
          code: "500",
          message: "An unexpected error occurred",
        },
      },
      { status: 500 }
    );
  }
}
