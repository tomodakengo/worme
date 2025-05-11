import React, { useState, useEffect } from 'react';
import { useTimer } from '../context/TimerContext';
import { formatTimeFromTimestamp } from '../utils/timeUtils';

const CurrentTimer: React.FC = () => {
  const { currentTimer, activeTaskId } = useTimer();
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  
  useEffect(() => {
    if (!currentTimer) {
      setElapsedTime(0);
      return;
    }
    
    // Update elapsed time initially
    setElapsedTime(Math.floor((Date.now() - currentTimer.startTime) / 1000));
    
    // Set up interval to update elapsed time
    const intervalId = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - currentTimer.startTime) / 1000));
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, [currentTimer]);
  
  if (!currentTimer || !activeTaskId) {
    return null;
  }
  
  // Format elapsed time
  const hours = Math.floor(elapsedTime / 3600);
  const minutes = Math.floor((elapsedTime % 3600) / 60);
  const seconds = elapsedTime % 60;
  
  const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-lg font-medium text-teal-700 mb-1">Currently Working On</h3>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xl font-bold">{currentTimer.taskName}</p>
          <p className="text-sm text-gray-500">
            Started at {formatTimeFromTimestamp(currentTimer.startTime)}
          </p>
        </div>
        <div className="text-2xl font-bold tabular-nums">{formattedTime}</div>
      </div>
    </div>
  );
};

export default CurrentTimer;