import { NextResponse } from "next/server";
import mysql2 from "mysql2";
import db from "@/lib/db";
import React from "react";

export async function GET({ params }: { params: { id: string } }) {
    const { id } = params;

    try {


        // Fetch quiz data
        const [quizData]: any = await db.query("SELECT * FROM quizzes WHERE id = ?", [id]);
        const [questions]: any = await db.query("SELECT * FROM questions WHERE quiz_id = ?", [id]);

        if (quizData.length === 0) {
            return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
        }

        const quiz = {
            id: quizData[0].id,
            title: quizData[0].title,
            description: quizData[0].description,
            questions: questions.map((q: any) => ({
                id: q.id,
                questionText: q.question_text,
                options: JSON.parse(q.options),
            })),
        };

        return NextResponse.json({ quiz });
    } catch (error) {
        console.error("Error fetching quiz:", error);
        return NextResponse.json({ message: "Failed to fetch quiz." }, { status: 500 });
    }
}
