import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json(
      { message: "Username and password are required" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.player.findUnique({
      where: { email: username },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ message: "Invalid password" }, { status: 401 });
    }

    const cookieStore = await cookies();
    cookieStore.set("LoggedIn", "true", { secure: true, httpOnly: true, sameSite: "strict", path: "/" });
    cookieStore.set("PlayerLevel", String(user.Level_Id || 1), { secure: true, httpOnly: true, sameSite: "strict", path: "/" });

    return NextResponse.json({ message: "Login successful", player: user });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
