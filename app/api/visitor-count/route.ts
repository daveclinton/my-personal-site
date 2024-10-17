import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    let visitorCount = await prisma.visitorCount.findFirst();

    if (!visitorCount) {
      visitorCount = await prisma.visitorCount.create({
        data: { count: 1 },
      });
    } else {
      visitorCount = await prisma.visitorCount.update({
        where: { id: visitorCount.id },
        data: { count: visitorCount.count + 1 },
      });
    }

    return NextResponse.json({ count: visitorCount.count });
  } catch (error) {
    console.error("Error updating visitor count:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
