import React from "react";

interface InputProps {
  label?: string;
  type?: "text" | "password" | "email" | "number";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ label, type = "text", value, onChange, placeholder, required = false }) => {
  return (
    <div className="flex flex-col">
      {label && <label className="mb-1 text-sm font-medium">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default Input;
