"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import XPDisplay from "./XPDisplay"; // Import XPDisplay component

const Navigation = () => {
  const router = useRouter();
  const [userXP, setUserXP] = useState<number>(0); // State to hold user's XP
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // State for authentication status

  useEffect(() => {
    // Check if the user is logged in by looking for user data in localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user && user.id) {
      setIsLoggedIn(true);

      // Fetch user's XP if logged in
      const fetchUserXP = async () => {
        const response = await fetch(`/api/user/xp?id=${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setUserXP(data.xp);
        } else {
          console.error("Failed to fetch user XP");
        }
      };

      fetchUserXP();
    } else {
      setIsLoggedIn(false);
    }
  }, []); // Runs once on mount

  const handleLogout = () => {
    // Clear user data from localStorage and update state
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/"); // Redirect to the homepage or login page
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="text-2xl font-semibold cursor-pointer" onClick={() => router.push("/")}>
        QuizApp
      </div>

      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <XPDisplay xp={userXP} /> {/* Display XP if logged in */}
            <button
              onClick={() => router.push("/quiz")}
              className="text-white hover:text-yellow-400 cursor-pointer"
            >
              Quizzes
            </button>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-300 cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => router.push("/register")}
            className="bg-yellow-400 text-gray-900 px-6 py-3 font-semibold cursor-pointer"
          >
            Get Started
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;