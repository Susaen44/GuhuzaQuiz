import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const badges = await prisma.badge.findMany();
    return NextResponse.json(badges);
  } catch (error) {
    console.error('Failed to fetch badges:', error);
    return NextResponse.json(
      { message: 'Failed to fetch badges', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
