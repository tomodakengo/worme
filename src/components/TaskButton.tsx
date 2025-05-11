import React, { useState } from 'react';
import { useTimer } from '../context/TimerContext';
import { formatHoursMinutes } from '../utils/timeUtils';
import { Pencil, Trash2, Check, X } from 'lucide-react';

interface TaskButtonProps {
  taskId: string;
  name: string;
}

const TaskButton: React.FC<TaskButtonProps> = ({ taskId, name }) => {
  const { activeTaskId, startTimer, stopCurrentTimer, getTaskTotalTime, removeTask, renameTask } = useTimer();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);
  const isActive = activeTaskId === taskId;
  const totalTime = getTaskTotalTime(taskId);
  
  const handleClick = () => {
    if (isActive) {
      stopCurrentTimer();
    } else {
      startTimer(taskId);
    }
  };

  const handleRename = () => {
    if (newName.trim() && newName !== name) {
      renameTask(taskId, newName.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRename();
    } else if (e.key === 'Escape') {
      setNewName(name);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className={`relative flex items-center p-4 w-full rounded-lg bg-white shadow-md`}>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="flex-1 bg-transparent outline-none"
        />
        <button 
          onClick={handleRename}
          className="p-1 text-teal-600 hover:text-teal-800 ml-2"
        >
          <Check size={16} />
        </button>
        <button 
          onClick={() => {
            setNewName(name);
            setIsEditing(false);
          }}
          className="p-1 text-gray-600 hover:text-gray-800 ml-1"
        >
          <X size={16} />
        </button>
      </div>
    );
  }
  
  return (
    <div className="relative group">
      <button
        onClick={handleClick}
        className={`relative flex items-center justify-center p-5 w-full rounded-lg transition-all duration-300 shadow-md hover:shadow-lg ${
          isActive 
            ? 'bg-teal-600 text-white' 
            : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
        }`}
      >
        <div className="text-lg font-medium">{name}</div>
        {isActive && (
          <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
        )}
        {totalTime > 0 && (
          <div className={`absolute bottom-2 right-2 text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
            {formatHoursMinutes(totalTime)}
          </div>
        )}
      </button>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
          className="p-1 text-gray-500 hover:text-teal-600 bg-white rounded-full shadow-md"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeTask(taskId);
          }}
          className="p-1 text-gray-500 hover:text-red-600 bg-white rounded-full shadow-md"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};

export default TaskButton;