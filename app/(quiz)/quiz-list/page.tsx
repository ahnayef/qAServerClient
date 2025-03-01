"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/app/components/Button";

interface Quiz {
  id: string;
  title: string;
  description: string;
}

const QuizList = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await fetch("/api/quiz/list");
      if (response.ok) {
        const data = await response.json();
        setQuizzes(data.quizzes);
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <section className="text-center max-w-3xl w-full">
        <h1 className="text-4xl font-extrabold text-yellow-400">All Quizzes</h1>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-yellow-400">{quiz.title}</h3>
              <p className="text-gray-300 mt-2">{quiz.description}</p>
              <Link href={`/quiz/${quiz.id}`} passHref>
                <Button className="bg-yellow-400 text-gray-900 px-6 py-3 font-semibold mt-4">
                  Take Quiz
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default QuizList;
