import { useEffect, useState } from "react";

interface TimerProps {
  initialTime: number;
  isRunning: boolean;
  onTimeout?: () => void;
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

const Timer = ({ initialTime, isRunning, onTimeout }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1 && onTimeout) onTimeout();
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, timeLeft, onTimeout]);

  return <div className="text-xl font-mono text-white">{formatTime(timeLeft)}</div>;
};

export default Timer;
