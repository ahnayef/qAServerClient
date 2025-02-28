import React, { useEffect, useState } from "react";

type TimerProps = {
  initialTime: number;
  onTimeUp: () => void;
};

const Timer: React.FC<TimerProps> = ({ initialTime, onTimeUp }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time <= 0) {
      onTimeUp();
      return;
    }
    const timer = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(timer);
  }, [time, onTimeUp]);

  return <div className="text-xl font-bold text-red-400">{time}s</div>;
};

export default Timer;
