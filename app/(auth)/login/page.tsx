"use client";
import { useState } from "react";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import Link from "next/link";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.status === 200) {
        localStorage.setItem("token", data.token);  // Store token in local storage
        localStorage.setItem("user", JSON.stringify(data.user));  // Store user in local storage
        window.location.href = "/";  // Redirect to home or dashboard
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-yellow-400 text-center">Login</h2>
        <p className="text-gray-400 text-center mt-2">Access your account</p>

        <form className="mt-6" onSubmit={handleSubmit}>
          <Input label="Email" type="email" name="email" placeholder="Enter your email" value={form.email} onChange={handleChange} />
          <Input label="Password" type="password" name="password" placeholder="Enter your password" value={form.password} onChange={handleChange} />

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}

          <Button className="w-full bg-yellow-400 text-gray-900 py-2 mt-4 font-semibold" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          Don't have an account? <Link href="/register" className="text-yellow-400">Register</Link>
        </p>
      </div>
    </main>
  );
}
