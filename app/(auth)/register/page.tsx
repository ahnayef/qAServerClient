"use client";
import { useState } from "react";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import Link from "next/link";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await res.json();

      if (res.status === 201) {
        window.location.href = "/login";  // Redirect to login after successful registration
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
        <h2 className="text-2xl font-bold text-yellow-400 text-center">Register</h2>
        <p className="text-gray-400 text-center mt-2">Create a new account</p>

        <form className="mt-6" onSubmit={handleSubmit}>
          <Input label="Email" type="email" name="email" placeholder="Enter your email" value={form.email} onChange={handleChange} />
          <Input label="Password" type="password" name="password" placeholder="Enter your password" value={form.password} onChange={handleChange} />
          <Input label="Confirm Password" type="password" name="confirmPassword" placeholder="Confirm your password" value={form.confirmPassword} onChange={handleChange} />

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}

          <Button className="w-full bg-yellow-400 text-gray-900 py-2 mt-4 font-semibold" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          Already have an account? <Link href="/login" className="text-yellow-400">Login</Link>
        </p>
      </div>
    </main>
  );
}
