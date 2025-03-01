import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
        return NextResponse.json({ message: "User ID not provided" }, { status: 400 });
    }

    try {
        const [userXP]: any = await db.query("SELECT xp FROM users WHERE id = ?", [id]);

        if (userXP.length === 0) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ xp: userXP[0].xp });  // Return the XP value
    } catch (error) {
        console.error("Error fetching user XP:", error);
        return NextResponse.json({ message: "Failed to fetch user XP." }, { status: 500 });
    }
}
