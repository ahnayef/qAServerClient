"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
          <Link href="/login" className="hover:text-yellow-400">Login</Link>
          <Link href="/register" className="hover:text-yellow-400">Register</Link>
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
          <Link href="/login" className="py-2 w-full text-center hover:text-yellow-400" onClick={() => setIsOpen(false)}>Login</Link>
          <Link href="/register" className="py-2 w-full text-center hover:text-yellow-400" onClick={() => setIsOpen(false)}>Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
