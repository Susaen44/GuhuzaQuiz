import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  // Ignore level query param, fetch all rewards
  const rewards = await prisma.reward.findMany({
    orderBy: { requiredLevel: "asc" },
  });

  return NextResponse.json(rewards);
}
