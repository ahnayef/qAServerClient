import { NextResponse } from "next/server";
import db from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
export async function POST(request: Request, context: { params: { id: string } }) {
    const { id } = await context.params; // Await the params here
    const { answers, user_id } = await request.json();

    if (!id || !answers || !user_id) {
        return NextResponse.json({ message: "Quiz ID or answers not provided" }, { status: 400 });
    }

    try {
        // Fetch quiz and questions data to validate the answers
        const [quizData]: any = await db.query("SELECT * FROM quizzes WHERE id = ?", [id]);
        const [questions]: any = await db.query("SELECT * FROM questions WHERE quiz_id = ?", [id]);

        if (quizData.length === 0) {
            return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
        }

        // Calculate the score based on the answers
        let score = 0;
        questions.forEach((question: any) => {
            const correctAnswer = question.correct_answer;
            const userAnswer = answers[question.id];

            // Check if the user's answer is correct
            if (userAnswer === correctAnswer) {
                score++;
            }
        });

        // Store the attempt result in the database
        const attemptId = uuidv4();
        await db.query(
            "INSERT INTO attempts (id, quiz_id, user_id, score) VALUES (?, ?, ?, ?)",
            [attemptId, id, user_id, score] 
        );

        return NextResponse.json({ message: "Quiz submitted successfully", score });
    } catch (error) {
        console.error("Error submitting quiz:", error);
        return NextResponse.json({ message: "Failed to submit quiz." }, { status: 500 });
    }
}
