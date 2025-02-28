"use client";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "test@example.com" && password === "password") {
      login({ id: "1", email });
      router.push("/dashboard"); // Redirect after login
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-10">
      <h2 className="text-2xl font-bold">Login</h2>
      <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button text="Login" onClick={handleLogin} />
    </div>
  );
}
