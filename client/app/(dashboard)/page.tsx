"use client";

import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { useProtectedRoute } from "../hooks/useProtectedRoute";


export default function DashboardPage() {
    useProtectedRoute(); // Redirect if not logged in
    const { user, logout } = useAuth();

    return (
        <div className="flex flex-col items-center mt-10">
            <h2 className="text-2xl font-bold">Welcome, {user?.email}!</h2>
            <p className="text-gray-500">This is your dashboard.</p>
            <Button text="Logout" onClick={logout} variant="danger" className="mt-4" />
        </div>
    );
}
