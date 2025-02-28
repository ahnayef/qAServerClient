import React from "react";
import Link from "next/link";

interface QuizCardProps {
  id: string;
  title: string;
  questions: number;
}

const QuizCard: React.FC<QuizCardProps> = ({ id, title, questions }) => {
  return (
    <div className="p-4 border rounded shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm text-gray-500">{questions} Questions</p>
      <Link href={`/quiz/${id}`} className="text-blue-500 hover:underline">Start Quiz</Link>
    </div>
  );
};

export default QuizCard;
