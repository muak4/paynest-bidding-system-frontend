import React from 'react';
import Countdown from 'react-countdown';

interface CountdownTimerProps {
  duration: number;
  onComplete: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  duration,
  onComplete,
}) => {
  const timeInSeconds = duration;

  const renderer = ({ hours, minutes, seconds, completed }: any) => {
    if (completed) {
      onComplete();
      return <span>Auction Closed</span>;
    }

    return (
      <span>
        {hours}h {minutes}m {seconds}s
      </span>
    );
  };

  return (
    <div className="text-sm text-white mb-4 flex items-center">
      <p className="mr-2">Time Remaining:</p>
      <Countdown date={Date.now() + timeInSeconds * 1000} renderer={renderer} />
    </div>
  );
};

export default CountdownTimer;
