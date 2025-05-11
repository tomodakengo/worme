import React from 'react';
import { useTimer } from '../context/TimerContext';
import TaskButton from '../components/TaskButton';
import AddTaskButton from '../components/AddTaskButton';
import CurrentTimer from '../components/CurrentTimer';
import TimelineItem from '../components/TimelineItem';

const TimerPage: React.FC = () => {
  const { tasks, getTodayRecords } = useTimer();
  const todayRecords = getTodayRecords();
  
  return (
    <div className="container max-w-md mx-auto p-4 pb-20">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Worme</h1>
      
      <CurrentTimer />
      
      <div className="grid grid-cols-2 gap-3 mb-6">
        {tasks.map(task => (
          <TaskButton 
            key={task.id} 
            taskId={task.id} 
            name={task.name} 
          />
        ))}
        <AddTaskButton />
      </div>
      
      {todayRecords.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-3">Today Timeline</h2>
          <div className="bg-white rounded-lg shadow-md p-4">
            {todayRecords
              .slice()
              .sort((a, b) => b.startTime - a.startTime)
              .map(record => (
                <TimelineItem key={record.id} record={record} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimerPage;