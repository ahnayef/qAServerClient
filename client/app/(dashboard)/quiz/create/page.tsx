"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import { useAuth } from "@/app/context/AuthContext";


interface Question {
  text: string;
  options: string[];
  correctAnswer: string;
}

export default function CreateQuizPage() {
  useAuth(); // Ensure user is logged in
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = () => {
    setQuestions([...questions, { text: "", options: ["", "", "", ""], correctAnswer: "" }]);
  };

  const updateQuestion = (index: number, field: keyof Question, value: string | string[]) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  };

  const handleCreateQuiz = async () => {
    const response = await fetch("/api/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, questions, ownerId: "1" }), // Replace with real user ID later
    });
    if (response.ok) {
      alert("Quiz Created!");
      router.push("/dashboard");
    } else {
      alert("Error creating quiz.");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold">Create Quiz</h2>
      <Input label="Quiz Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      
      {questions.map((q, i) => (
        <div key={i} className="border p-4 mt-4 w-full max-w-lg">
          <Input label="Question" value={q.text} onChange={(e) => updateQuestion(i, "text", e.target.value)} />
          {q.options.map((option, j) => (
            <Input key={j} label={`Option ${j + 1}`} value={option} onChange={(e) => {
              const newOptions = [...q.options];
              newOptions[j] = e.target.value;
              updateQuestion(i, "options", newOptions);
            }} />
          ))}
          <Input label="Correct Answer" value={q.correctAnswer} onChange={(e) => updateQuestion(i, "correctAnswer", e.target.value)} />
        </div>
      ))}

      <Button text="Add Question" onClick={addQuestion} className="mt-4" />
      <Button text="Create Quiz" onClick={handleCreateQuiz} variant="primary" className="mt-4" />
    </div>
  );
}
