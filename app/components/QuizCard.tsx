import React from "react";

type QuizCardProps = {
  title: string;
  description: string;
  onClick: () => void;
};

const QuizCard: React.FC<QuizCardProps> = ({ title, description, onClick }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-yellow-500 transition-all duration-200 cursor-pointer" onClick={onClick}>
      <h3 className="text-xl font-bold text-yellow-400">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default QuizCard;
