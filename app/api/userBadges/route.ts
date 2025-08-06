import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { playerId, badgeId } = await req.json();

  if (!playerId || !badgeId) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  const existing = await prisma.playerBadge.findUnique({
    where: { playerId_badgeId: { playerId, badgeId } },
  });

  if (existing) {
    await prisma.playerBadge.update({
      where: { playerId_badgeId: { playerId, badgeId } },
      data: { count: { increment: 1 } },
    });
  } else {
    await prisma.playerBadge.create({
      data: { playerId, badgeId, count: 1 },
    });
  }

  return NextResponse.json({ success: true });
}
