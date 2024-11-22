// app/api/pesapal/register-ipn/route.ts

import { NextResponse } from "next/server";
import axios from "axios";

export async function POST() {
  try {
    console.log("Here", process.env.NODE_ENV);
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
        consumer_key: process.env.PESAPAL_CONSUMER_KEY,
        consumer_secret: process.env.PESAPAL_CONSUMER_SECRET,
      },
    });

    if (!authResponse.data?.token) {
      throw new Error("Authentication failed");
    }

    const ipnResponse = await axios({
      method: "post",
      url: `${BASE_URL}/api/URLSetup/RegisterIPN`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${authResponse.data.token}`,
      },
      data: {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/pesapal/ipn`,
        ipn_notification_type: "GET",
      },
    });

    return NextResponse.json({ success: true, data: ipnResponse.data });
  } catch (error) {
    console.error("IPN Registration Error:", error);
    return NextResponse.json(
      {
        error: {
          message: "Failed to register IPN URL",
        },
      },
      { status: 500 }
    );
  }
}
