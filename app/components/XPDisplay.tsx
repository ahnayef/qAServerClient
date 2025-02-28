import React from "react";

type XPDisplayProps = {
  xp: number;
};

const XPDisplay: React.FC<XPDisplayProps> = ({ xp }) => {
  return <div className="text-lg font-semibold text-yellow-500">XP: {xp}</div>;
};

export default XPDisplay;
