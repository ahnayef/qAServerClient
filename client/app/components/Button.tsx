import React from "react";

interface ButtonProps {
    text: string;
    onClick?: () => void;
    type?: "button" | "submit";
    variant?: "primary" | "secondary" | "danger";
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, type = "button", variant = "primary", className = "" }) => {
    const baseStyles = "px-4 py-2 rounded font-medium";
    const variants = {
        primary: "bg-blue-500 text-white hover:bg-blue-600",
        secondary: "bg-gray-500 text-white hover:bg-gray-600",
        danger: "bg-red-500 text-white hover:bg-red-600",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {text}
        </button>
    );
};

export default Button;
