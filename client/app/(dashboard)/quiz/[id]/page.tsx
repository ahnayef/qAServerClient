"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";


interface Question {
    text: string;
    options: string[];
    correctAnswer: string;
}

export default function TakeQuizPage({ params }: { params: { id: string } }) {
    const [quiz, setQuiz] = useState<{ title: string; questions: Question[] } | null>(null);
    const [answers, setAnswers] = useState<string[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetch(`/api/quiz/${params.id}`)
            .then((res) => res.json())
            .then((data) => {
                setQuiz(data);
                setAnswers(new Array(data.questions.length).fill(""));
            });
    }, [params.id]);

    const handleSubmit = () => {
        const correctCount = quiz?.questions.filter((q, i) => q.correctAnswer === answers[i]).length;
        alert(`You scored ${correctCount}/${quiz?.questions.length}!`);
        router.push("/dashboard/quiz");
    };

    return quiz ? (
        <div className="flex flex-col items-center mt-10">
            <h2 className="text-2xl font-bold">{quiz.title}</h2>
            {quiz.questions.map((q, i) => (
                <div key={i} className="border p-4 mt-4 w-full max-w-lg">
                    <p className="font-bold">{q.text}</p>
                    {q.options.map((option, j) => (
                        <label key={j} className="block">
                            <input type="radio" name={`q${i}`} value={option} onChange={() => {
                                const newAnswers = [...answers];
                                newAnswers[i] = option;
                                setAnswers(newAnswers);
                            }} />
                            {option}
                        </label>
                    ))}
                </div>
            ))}
            <Button text="Submit Quiz" onClick={handleSubmit} className="mt-4" />
        </div>
    ) : (
        <p>Loading...</p>
    );
}
