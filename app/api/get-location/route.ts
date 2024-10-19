import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for") || request.ip || "41.212.82.148";
  const apiKey = process.env.IPINFO_API_KEY;

  if (!apiKey) {
    console.error("IPINFO_API_KEY is not set");
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(`https://ipinfo.io/${ip}?token=${apiKey}`);
    if (!response.ok) {
      console.error("Error from ipinfo.io:", response.statusText);
      return NextResponse.json(
        { error: "Failed to fetch location data" },
        { status: response.status }
      );
    }
    const data = await response.json();
    const [latitude, longitude] = data.loc.split(",").map(Number);
    const locationData = {
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country,
      latitude: latitude,
      longitude: longitude,
      org: data.org,
      postal: data.postal,
      timezone: data.timezone,
    };
    const savedLocation = await prisma.locationData.create({
      data: locationData,
    });

    console.log("Location data saved:", savedLocation);

    return NextResponse.json(savedLocation);
  } catch (error) {
    console.error("Error fetching or saving data:", error);
    return NextResponse.json(
      { error: "Failed to fetch or save location data" },
      { status: 500 }
    );
  }
}
