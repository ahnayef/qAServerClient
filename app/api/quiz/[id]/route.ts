import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    if (!id) {
        return NextResponse.json({ message: "Quiz ID not provided" }, { status: 400 });
    }

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