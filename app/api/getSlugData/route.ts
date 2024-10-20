import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const slugData = await prisma.analytics.groupBy({
      by: ["slug"],
      _count: {
        slug: true,
      },
      orderBy: {
        _count: {
          slug: "desc",
        },
      },
      take: 5,
    });

    const formattedData = slugData.map((item) => ({
      name: item.slug,
      value: item._count.slug,
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Error fetching slug data:", error);
    return NextResponse.json(
      { error: "Failed to fetch slug data" },
      { status: 500 }
    );
  }
}
