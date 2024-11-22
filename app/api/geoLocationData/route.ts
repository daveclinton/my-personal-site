/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function generateRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 70 + Math.random() * 30;
  const lightness = 40 + Math.random() * 20;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export async function GET() {
  try {
    const geoData = await prisma.analytics.findMany({
      select: {
        latitude: true,
        longitude: true,
        city: true,
        country: true,
        flag: true,
      },
      distinct: ["latitude", "longitude", "city", "country"],
    });

    const pointsData = geoData.map((point: any) => ({
      lat: point.latitude,
      lng: point.longitude,
      size: 0.5,
      color: generateRandomColor(),
      label: `${point.city}, ${point.country} ${point.flag}`,
    }));

    return NextResponse.json(pointsData);
  } catch (error) {
    console.error("Error fetching geolocation data:", error);
    return NextResponse.json(
      { error: "Failed to fetch geolocation data" },
      { status: 500 }
    );
  }
}
