"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ResultPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [result, setResult] = useState<any>(null);
  const router = useRouter();
  const { id } = use(params);
  const user_id = JSON.parse(localStorage.getItem("user") || "{}").id;

  useEffect(() => {
    const fetchResult = async () => {
      const response = await fetch(`/api/quiz/results?id=${id}&user_id=${user_id}`);
      if (response.ok) {
        const data = await response.json();
        setResult(data.result);
      } else {
        router.push("/");
      }
    };

    fetchResult();
  }, [id, user_id]);

  if (!result) return <div className="loading">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg ">
        <h1 className="text-4xl font-bold text-yellow-400">{result.quizTitle}</h1>
        <p className="mt-4 text-lg text-gray-300">{result.quizDescription}</p>

        <div className="mt-6 text-lg text-gray-300">
          <p>Your Score: <span className="text-yellow-400">{result.score}</span></p>
          {result.score > 0 && (
            <p className="mt-2 text-green-400">Great Job! Keep Learning!</p>
          )}
        </div>

        <div className="mt-8 flex space-x-4">
          <button
            onClick={() => router.push(`/quiz/${id}`)}
            className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold cursor-pointer transform transition-transform hover:scale-105"
          >
            Try Again
          </button>

          <button
            onClick={() => router.push("/")}
            className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold cursor-pointer transform transition-transform hover:scale-105"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
