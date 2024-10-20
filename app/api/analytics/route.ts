import { prisma } from "@/lib/prisma";
import { geolocation } from "@vercel/functions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const date = new Date();
    const { slug } = await request.json();

    const { flag, country, city, latitude, longitude } = geolocation(request);
    if (!(flag && country && city && latitude && longitude && slug)) {
      return NextResponse.json(
        { message: "Missing required parameters" },
        { status: 400 }
      );
    }

    await prisma.analytics.create({
      data: {
        date,
        slug,
        flag,
        country,
        city: city.replace(/[^a-zA-Z ]/g, " "),
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
    });

    return NextResponse.json({ message: "A Ok!" });
  } catch (error) {
    console.error("Error saving analytics data:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
