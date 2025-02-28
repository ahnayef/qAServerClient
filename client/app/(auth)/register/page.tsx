"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    alert("Account created! You can now log in.");
    router.push("/(auth)/login");
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-10">
      <h2 className="text-2xl font-bold">Register</h2>
      <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button text="Register" onClick={handleRegister} />
    </div>
  );
}
