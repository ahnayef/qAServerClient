import { NextResponse } from "next/server";
import mysql2 from "mysql2";
import db from "@/lib/db";

export async function GET() {
    try {
        const [rows]: any = await db.query("SELECT * FROM quizzes");

        return NextResponse.json({ quizzes: rows });
    } catch (error) {
        console.error("Error fetching quizzes:", error);
        return NextResponse.json({ message: "Failed to fetch quizzes." }, { status: 500 });
    }
}
