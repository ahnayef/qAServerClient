"use client";

import { useState } from "react";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import Link from "next/link";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-yellow-400 text-center">Login</h2>
        <p className="text-gray-400 text-center mt-2">Access your account</p>

        <form className="mt-6">
          <Input label="Email" type="email" name="email" placeholder="Enter your email" value={form.email} onChange={handleChange} />
          <Input label="Password" type="password" name="password" placeholder="Enter your password" value={form.password} onChange={handleChange} />

          <Button className="w-full bg-yellow-400 text-gray-900 py-2 mt-4 font-semibold">Login</Button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          Don't have an account? <Link href="/register" className="text-yellow-400">Register</Link>
        </p>
      </div>
    </main>
  );
}
