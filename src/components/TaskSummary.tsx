import React from 'react';
import { formatTime } from '../utils/timeUtils';

interface TaskSummaryProps {
  name: string;
  duration: number;
}

const TaskSummary: React.FC<TaskSummaryProps> = ({ name, duration }) => {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100">
      <div className="font-medium">{name}</div>
      <div className="text-gray-600">{formatTime(duration)}</div>
    </div>
  );
};

export default TaskSummary;