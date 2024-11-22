export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import axios from "axios";
import { z } from "zod";

const envSchema = z.object({
  PESAPAL_CONSUMER_KEY: z.string().min(1),
  PESAPAL_CONSUMER_SECRET: z.string().min(1),
});

export async function GET(request: Request) {
  try {
    const env = envSchema.safeParse({
      PESAPAL_CONSUMER_KEY: process.env.PESAPAL_CONSUMER_KEY,
      PESAPAL_CONSUMER_SECRET: process.env.PESAPAL_CONSUMER_SECRET,
    });

    if (!env.success) {
      return NextResponse.json(
        {
          error: "Invalid API configuration",
        },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const orderTrackingId = searchParams.get("OrderTrackingId");
    const orderMerchantReference = searchParams.get("OrderMerchantReference");

    if (!orderTrackingId || !orderMerchantReference) {
      return NextResponse.json(
        {
          error: "Missing required parameters",
        },
        { status: 400 }
      );
    }

    // const BASE_URL =
    //   process.env.NODE_ENV === "production"
    //     ? "https://pay.pesapal.com/v3"
    //     : "https://cybqa.pesapal.com/pesapalv3";

    const BASE_URL = "https://cybqa.pesapal.com/pesapalv3";

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
    });

    if (!authResponse.data?.token) {
      throw new Error("Authentication failed");
    }

    const statusResponse = await axios({
      method: "get",
      url: `${BASE_URL}/api/Transactions/GetTransactionStatus`,
      params: {
        orderTrackingId,
      },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${authResponse.data.token}`,
      },
    });

    return NextResponse.json({
      status: statusResponse.data.payment_status,
      data: statusResponse.data,
    });
  } catch (error) {
    console.error("Payment status check error:", error);
    return NextResponse.json(
      {
        error: "Failed to check payment status",
      },
      { status: 500 }
    );
  }
}
