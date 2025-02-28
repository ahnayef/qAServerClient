"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ResultPage = () => {
  const [result, setResult] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchResult = async () => {
      const response = await fetch("/api/quiz/results");
      if (response.ok) {
        const data = await response.json();
        setResult(data.result);
      } else {
        router.push("/"); // Redirect to homepage or error page if result not found
      }
    };

    fetchResult();
  }, []);

  if (!result) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <h1 className="text-4xl font-bold text-yellow-400">{result.quizTitle}</h1>
      <p className="mt-4 text-lg text-gray-300">{result.quizDescription}</p>

      <div className="mt-6 text-lg text-gray-300">
        <p>Your Score: {result.score} / 10</p>
        <p className="mt-2">{result.score === 10 ? "Perfect! 🎉" : "Great Job! Keep Learning!"}</p>
      </div>

      <div className="mt-8">
        <button
          onClick={() => router.push("/")}
          className="bg-yellow-400 text-gray-900 px-6 py-3 font-semibold"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
