"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";

const LogoutButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the token exists in localStorage
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Remove token from localStorage and redirect to login page
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login"); // Redirect to the login page
  };

  return (
    isLoggedIn && (
      <Button
        onClick={handleLogout}
        className="bg-yellow-400 text-gray-900 py-2 mt-4 font-semibold"
      >
        Logout
      </Button>
    )
  );
};

export default LogoutButton;
