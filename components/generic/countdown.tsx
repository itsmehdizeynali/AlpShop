import { useEffect, useState } from "react";
import Text from "./text";
import type { CountdownTimerPropsType } from "./types";
import clsx from "clsx";
import CountdownTimeBox from "./countdownTimeBox";

type TimeLeftType = {
  hours: number;
  minutes: number;
  seconds: number;
};

export default function Countdown({
  endDate,
  className = "",
  color="neutral"
}: CountdownTimerPropsType) {
  const [timeLeft, setTimeLeft] = useState<TimeLeftType>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeftType => {
      const difference = new Date(endDate).getTime() - Date.now();

      if (difference <= 0) {
        return {
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }

      return {
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const isFinished =
    timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  if (isFinished) {
    return <Text color="danger">sale has ended</Text>;
  }

  return (
    <div className={clsx("flex items-center gap-2", className)}>
      <CountdownTimeBox color={color} value={timeLeft.hours} label="Hours" />
      <CountdownTimeBox color={color} value={timeLeft.minutes} label="Mins" />
      <CountdownTimeBox color={color} value={timeLeft.seconds} label="Secs" />
    </div>
  );
}
