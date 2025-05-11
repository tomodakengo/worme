import React, { useState } from 'react';
import { useTimer } from '../context/TimerContext';
import { PlusIcon, CheckIcon, XIcon } from 'lucide-react';

const AddTaskButton: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [taskName, setTaskName] = useState('');
  const { addTask } = useTimer();

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleSave = () => {
    if (taskName.trim()) {
      addTask(taskName.trim());
      setTaskName('');
    }
    setIsAdding(false);
  };

  const handleCancel = () => {
    setTaskName('');
    setIsAdding(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isAdding) {
    return (
      <div className="relative flex items-center p-2 w-full rounded-lg border-2 border-dashed border-gray-300 bg-white">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Task name"
          autoFocus
          className="flex-1 p-2 outline-none"
        />
        <button 
          onClick={handleSave}
          className="p-2 text-teal-600 hover:text-teal-800"
        >
          <CheckIcon size={20} />
        </button>
        <button 
          onClick={handleCancel}
          className="p-2 text-gray-600 hover:text-gray-800"
        >
          <XIcon size={20} />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleAddClick}
      className="flex items-center justify-center p-5 w-full rounded-lg border-2 border-dashed border-gray-300 text-gray-500 hover:border-teal-500 hover:text-teal-600 transition-colors"
    >
      <PlusIcon size={24} />
    </button>
  );
};

export default AddTaskButton;