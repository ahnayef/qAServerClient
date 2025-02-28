"use client";

import { useState } from "react";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";

const CreateQuiz = () => {
    const router = useRouter();

    // States for quiz title and description
    const [quizTitle, setQuizTitle] = useState("");
    const [quizDescription, setQuizDescription] = useState("");

    // States for questions and options
    const [questions, setQuestions] = useState([
        { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);

    const [error, setError] = useState("");

    const handleQuestionChange = (index: number, field: string, value: string) => {
        const updatedQuestions: any = [...questions];
        updatedQuestions[index][field] = value;
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (
        index: number,
        optionIndex: number,
        value: string
    ) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].options[optionIndex] = value;
        setQuestions(updatedQuestions);
    };

    const addQuestion = () => {
        setQuestions([
            ...questions,
            { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
        ]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!quizTitle || !quizDescription) {
            setError("Please fill in both title and description!");
            return;
        }

        if (questions.some((q) => !q.questionText || !q.correctAnswer)) {
            setError("Please fill in all questions and select a correct answer!");
            return;
        }

        const quizData = {
            title: quizTitle,
            description: quizDescription,
            questions: questions.map((q) => ({
                questionText: q.questionText,
                options: q.options,
                correctAnswer: q.correctAnswer,
            })),
        };

        try {
            const response = await fetch("/api/quiz/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(quizData),
            });

            if (response.ok) {
                router.push("/"); // Redirect to home page after successful quiz creation
            } else {
                setError("Failed to create quiz. Please try again.");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white px-6">
            <section className="max-w-3xl w-full text-center">
                <h1 className="text-4xl font-extrabold text-yellow-400">Create New Quiz</h1>
                {error && <p className="text-red-500 mt-4">{error}</p>}
                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Quiz Title"
                        value={quizTitle}
                        onChange={(e) => setQuizTitle(e.target.value)}
                        className="px-4 py-2 rounded-lg bg-gray-800 text-white"
                    />
                    <textarea
                        placeholder="Quiz Description"
                        value={quizDescription}
                        onChange={(e) => setQuizDescription(e.target.value)}
                        className="px-4 py-2 rounded-lg bg-gray-800 text-white"
                    />

                    {/* Dynamic Question Form */}
                    {questions.map((q, index) => (
                        <div key={index} className="mt-6">
                            <input
                                type="text"
                                placeholder={`Question ${index + 1}`}
                                value={q.questionText}
                                onChange={(e) => handleQuestionChange(index, "questionText", e.target.value)}
                                className="px-4 py-2 rounded-lg bg-gray-800 text-white mb-2"
                            />

                            {/* Options */}
                            {q.options.map((option, optionIndex) => (
                                <div key={optionIndex} className="flex gap-4 mb-2">
                                    <input
                                        type="text"
                                        placeholder={`Option ${optionIndex + 1}`}
                                        value={option}
                                        onChange={(e) =>
                                            handleOptionChange(index, optionIndex, e.target.value)
                                        }
                                        className="px-4 py-2 rounded-lg bg-gray-800 text-white w-full"
                                    />
                                </div>
                            ))}

                            {/* Correct Answer */}
                            <select
                                value={q.correctAnswer}
                                onChange={(e) => handleQuestionChange(index, "correctAnswer", e.target.value)}
                                className="px-4 py-2 rounded-lg bg-gray-800 text-white w-full mt-2"
                            >
                                <option value="">Select Correct Answer</option>
                                {q.options.map((option, optionIndex) => (
                                    <option key={optionIndex} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addQuestion}
                        className="bg-gray-700 text-white px-6 py-3 font-semibold mt-4"
                    >
                        Add Question
                    </button>

                    <Button className="bg-yellow-400 text-gray-900 px-6 py-3 font-semibold mt-6">
                        Create Quiz
                    </Button>
                </form>
            </section>
        </main>
    );
};

export default CreateQuiz;
