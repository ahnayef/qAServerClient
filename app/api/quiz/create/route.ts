import { NextResponse } from "next/server";
import mysql2 from "mysql2";
import { v4 as uuidv4 } from "uuid";
import db from "@/lib/db";

export async function POST(req: Request) {
    const { title, description, questions } = await req.json();

    if (!title || !description || !questions || questions.length === 0) {
        return NextResponse.json({ message: "All fields are required!" }, { status: 400 });
    }

    const quizId = uuidv4();  // Generate a unique quizId
    const query = "INSERT INTO quizzes (id, title, description) VALUES (?, ?, ?)";

    try {


        await db.query(query, [quizId, title, description]);

        // Insert questions into database
        for (const question of questions) {
            const questionId = uuidv4();
            const questionQuery = "INSERT INTO questions (id, quiz_id, question_text, options, correct_answer) VALUES (?, ?, ?, ?, ?)";
            await db.query(questionQuery, [
                questionId,
                quizId,
                question.questionText,
                JSON.stringify(question.options),
                question.correctAnswer,
            ]);
        }

        return NextResponse.json({ message: "Quiz created successfully!" }, { status: 200 });
    } catch (error) {
        console.error("Error creating quiz:", error);
        return NextResponse.json({ message: "Failed to create quiz." }, { status: 500 });
    }
}
