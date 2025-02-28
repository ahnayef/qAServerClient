import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = uuidv4();

  try {
    await db.query(
      "INSERT INTO users (id, email, password) VALUES (?, ?, ?)",
      [userId, email, hashedPassword]
    );

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error registering user" }, { status: 500 });
  }
}
