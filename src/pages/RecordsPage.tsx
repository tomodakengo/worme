import React, { useMemo, useState } from 'react';
import { useTimer } from '../context/TimerContext';
import TaskSummary from '../components/TaskSummary';
import TimelineItem from '../components/TimelineItem';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { formatTime, getCurrentDate } from '../utils/timeUtils';

const RecordsPage: React.FC = () => {
  const { dailyRecords, tasks, deleteTimeRecord, updateTimeRecord } = useTimer();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  
  const dailyTotals = useMemo(() => {
    return Object.entries(dailyRecords)
      .map(([date, record]) => {
        const total = record.records.reduce((sum, r) => 
          sum + (r.duration || 0), 0
        );
        return { date, total };
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [dailyRecords]);

  const taskSummaries = useMemo(() => {
    const date = selectedDate || getCurrentDate();
    const records = dailyRecords[date]?.records || [];
    
    const summaries: { [taskId: string]: { name: string; duration: number } } = {};
    
    tasks.forEach(task => {
      summaries[task.id] = { name: task.name, duration: 0 };
    });
    
    records.forEach(record => {
      if (record.duration !== null && summaries[record.taskId]) {
        summaries[record.taskId].duration += record.duration;
      }
    });
    
    return Object.values(summaries)
      .filter(summary => summary.duration > 0)
      .sort((a, b) => b.duration - a.duration);
  }, [dailyRecords, tasks, selectedDate]);
  
  const totalTime = useMemo(() => {
    return taskSummaries.reduce((total, summary) => total + summary.duration, 0);
  }, [taskSummaries]);

  const handleDateClick = (date: string) => {
    setSelectedDate(date === selectedDate ? null : date);
  };
  
  return (
    <div className="container max-w-md mx-auto p-4 pb-20">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Records</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3">Daily Totals</h2>
        <div className="bg-white rounded-lg shadow-md divide-y divide-gray-100">
          {dailyTotals.map(({ date, total }) => (
            <div key={date} className="p-4">
              <button
                onClick={() => handleDateClick(date)}
                className="w-full flex items-center justify-between"
              >
                <span className="font-medium">{date}</span>
                <div className="flex items-center">
                  <span className="mr-2">{formatTime(total)}</span>
                  {selectedDate === date ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>
              
              {selectedDate === date && (
                <div className="mt-4">
                  {taskSummaries.length > 0 ? (
                    <>
                      <div className="mb-4">
                        {taskSummaries.map((summary, index) => (
                          <TaskSummary 
                            key={index}
                            name={summary.name}
                            duration={summary.duration}
                          />
                        ))}
                      </div>
                      
                      <div className="mt-4">
                        <h3 className="font-medium mb-2">Timeline</h3>
                        <div className="space-y-2">
                          {dailyRecords[date].records
                            .slice()
                            .sort((a, b) => b.startTime - a.startTime)
                            .map(record => (
                              <TimelineItem 
                                key={record.id} 
                                record={record}
                                onDelete={() => deleteTimeRecord(date, record.id)}
                                onUpdate={(updates) => updateTimeRecord(date, record.id, updates)}
                              />
                            ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-500 text-center py-2">No records for this day.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecordsPage;