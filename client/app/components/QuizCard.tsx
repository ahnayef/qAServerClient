import React from "react";
import Link from "next/link";

interface QuizCardProps {
  id: string;
  title: string;
  questions: number;
}

const QuizCard: React.FC<QuizCardProps> = ({ id, title, questions }) => {
  return (
    <div className="p-4 border rounded shadow-sm hover:shadow-md transition bg-[var(--card-bg)] border-[var(--border)]">
      <h3 className="text-lg font-bold text-[var(--foreground)]">{title}</h3>
      <p className="text-sm text-[var(--muted)]">{questions} Questions</p>
      <Link href={`/quiz/${id}`} className="text-[var(--primary)] hover:text-[var(--primary-hover)] hover:underline">Start Quiz</Link>
    </div>
  );
};

export default QuizCard;