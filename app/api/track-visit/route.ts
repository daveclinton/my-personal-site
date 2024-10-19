import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Received analytics data:", body);

    const { ip, city, region, country, loc, org, postal, timezone } = body;
    const [latitude, longitude] = loc.split(",").map(Number);

    const analyticsData = {
      ip: ip || null,
      city: city || null,
      region: region || null,
      country: country || null,
      latitude: latitude ? parseFloat(latitude) : null,
      longitude: longitude ? parseFloat(longitude) : null,
      org: org || null,
      postal: postal || null,
      timezone: timezone || null,
    };
    console.log("Processed analytics data:", analyticsData);
    const result = await prisma.locationData.create({
      data: analyticsData,
    });

    console.log("Saved analytics data:", result);
    return NextResponse.json(
      { message: "Analytics data recorded successfully", data: result },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to record anaytics data", error);
    return NextResponse.json(
      { error: "Failed to record anaytics data" },
      { status: 500 }
    );
  }
}
