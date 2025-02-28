import { FC } from "react";

interface InputProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({ label, type, name, placeholder, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-300 text-sm mb-1">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
      />
    </div>
  );
};

export default Input;
