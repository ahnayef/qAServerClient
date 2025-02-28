"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import Button from "@/app/components/Button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the token exists in localStorage
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-yellow-400">
          QuizMaster
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6">
          <Link href="/" className="hover:text-yellow-400">Home</Link>
          {/* Add Listing Link in Navbar */}
          <Link href="/quiz-list" className="hover:text-yellow-400">Quizzes</Link>
          {isLoggedIn ? (
            <>
              <Link href="/profile" className="hover:text-yellow-400">Profile</Link>
              <Button
                onClick={handleLogout}
                className="bg-gray-700 px-6 py-3 font-semibold hover:bg-gray-600"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-yellow-400">Login</Link>
              <Link href="/register" className="hover:text-yellow-400">Register</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-2xl">
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col items-center bg-gray-800 p-4 rounded-lg">
          <Link href="/" className="py-2 w-full text-center hover:text-yellow-400" onClick={() => setIsOpen(false)}>Home</Link>
          {/* Add Listing Link in Mobile Menu */}
          <Link href="/listing" className="py-2 w-full text-center hover:text-yellow-400" onClick={() => setIsOpen(false)}>Quizzes</Link>
          {isLoggedIn ? (
            <>
              <Link href="/profile" className="py-2 w-full text-center hover:text-yellow-400" onClick={() => setIsOpen(false)}>Profile</Link>
              <Button
                onClick={handleLogout}
                className="bg-gray-700 py-2 w-full text-center font-semibold hover:bg-gray-600"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="py-2 w-full text-center hover:text-yellow-400" onClick={() => setIsOpen(false)}>Login</Link>
              <Link href="/register" className="py-2 w-full text-center hover:text-yellow-400" onClick={() => setIsOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
