import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const totalSubscribers = await prisma.subscriber.count();
    return NextResponse.json({ total: totalSubscribers });
  } catch (error) {
    console.error("Error fetching subscriber count:", error);
    return NextResponse.json(
      { error: "Error fetching subscriber count" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
