import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    const user_id = url.searchParams.get("user_id");

    if (!id || !user_id) {
        return NextResponse.json({ message: "Quiz ID or user ID not provided" }, { status: 400 });
    }

    try {
        const [result]: any = await db.query(
            "SELECT score FROM attempts WHERE quiz_id = ? AND user_id = ? ORDER BY created_at DESC LIMIT 1",
            [id, user_id]
        );

        if (result.length === 0) {
            return NextResponse.json({ message: "No results found" }, { status: 404 });
        }

        return NextResponse.json({ result: result[0] });
    } catch (error) {
        console.error("Error fetching result:", error);
        return NextResponse.json({ message: "Failed to fetch result." }, { status: 500 });
    }
}
