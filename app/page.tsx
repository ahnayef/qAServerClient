"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@/app/components/Button";
import { FaLightbulb, FaChartLine, FaAward } from "react-icons/fa";
import Navbar from "@/app/components/Navbar"; // Import Navbar component
import { isAuthenticated } from "@/lib/auth";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedIn = isAuthenticated();
        setIsLoggedIn(loggedIn);
    }, []);

  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        {/* Hero Section */}
        <section className="text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400">
            Welcome to QuizMaster
          </h1>
          <p className="text-lg text-gray-300 mt-4">
            Challenge yourself, test your knowledge, and earn rewards!
          </p>
          <div className="mt-6 flex gap-4 justify-center">
            {isLoggedIn ? (
              <>
                <Link href="/create-quiz">
                  <Button className="bg-yellow-400 text-gray-900 px-6 py-3 font-semibold">
                    Create Quiz
                  </Button>
                </Link>
                {/* Add Listing Page Link */}
                <Link href="/quiz-list">
                  <Button className="bg-gray-700 px-6 py-3 font-semibold">
                    View Quizzes
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button className="bg-yellow-400 text-gray-900 px-6 py-3 font-semibold">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-gray-700 px-6 py-3 font-semibold">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl text-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center">
            <FaLightbulb className="text-yellow-400 text-4xl" />
            <h3 className="text-xl font-semibold mt-4">Create & Share</h3>
            <p className="text-gray-300 mt-2">Design your own quizzes and share them with others.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center">
            <FaChartLine className="text-yellow-400 text-4xl" />
            <h3 className="text-xl font-semibold mt-4">Track Progress</h3>
            <p className="text-gray-300 mt-2">Monitor scores, review answers, and retake quizzes anytime.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center">
            <FaAward className="text-yellow-400 text-4xl" />
            <h3 className="text-xl font-semibold mt-4">Earn XP</h3>
            <p className="text-gray-300 mt-2">Gain XP as you complete quizzes and level up!</p>
          </div>
        </section>
      </main>
    </>
  );
}
