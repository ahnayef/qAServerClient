"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/app/components/Button";
import { use } from "react"; // Import the `use` function from React

interface Question {
  id: string;
  questionText: string;
  options: string[];
}

const QuizDetail = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes timer

  const { id } = use(params);

  useEffect(() => {
    const fetchQuiz = async () => {
      const response = await fetch(`/api/quiz/${id}`);
      if (response.ok) {
        const data = await response.json();
        setQuiz(data.quiz);
      }
    };
    fetchQuiz();

    // Timer logic
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          // Automatically submit the quiz if time runs out
          handleSubmit();
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [id]);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async () => {
    const response = await fetch(`/api/quiz/${id}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        answers,
        user_id: JSON.parse(localStorage.getItem("user") || '{}').id,
      }),
    });

    if (response.ok) {
      router.push(`/results/${id}`);
    }
  };


  if (!quiz) return <div>Loading...</div>;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <section className="max-w-3xl w-full text-center">
        <h1 className="text-4xl font-extrabold text-yellow-400">{quiz.title}</h1>
        <p className="text-lg text-gray-300 mt-4">{quiz.description}</p>

        <div className="mt-6">
          {quiz.questions.map((question: Question) => (
            <div key={question.id} className="mt-6">
              <h3 className="text-xl font-semibold">{question.questionText}</h3>
              <div className="mt-4">
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      type="radio"
                      name={question.id}
                      value={option}
                      checked={answers[question.id] === option}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      className="text-yellow-400"
                    />
                    <label>{option}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div className="text-lg text-gray-300">
            Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}
          </div>
          <Button
            className="bg-yellow-400 text-gray-900 px-6 py-3 font-semibold"
            onClick={handleSubmit}
          >
            Submit Quiz
          </Button>
        </div>
      </section>
    </main>
  );
};

export default QuizDetail;