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
        primary: "bg-[var(--primary)] text-[var(--foreground)] hover:bg-[var(--primary-hover)]",
        secondary: "bg-[var(--secondary)] text-[var(--foreground)] hover:bg-[var(--secondary-hover)]",
        danger: "bg-[var(--error)] text-[var(--foreground)] hover:bg-[var(--error-hover)]",
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