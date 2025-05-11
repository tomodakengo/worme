import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task, TimeRecord, AppData } from '../types';
import { getCurrentDate, calculateDuration } from '../utils/timeUtils';
import useLocalStorage from '../hooks/useLocalStorage';

interface TimerContextType {
  // State
  tasks: Task[];
  activeTaskId: string | null;
  dailyRecords: { [date: string]: TimeRecord[] };
  currentTimer: TimeRecord | null;
  
  // Actions
  addTask: (name: string) => void;
  removeTask: (id: string) => void;
  renameTask: (id: string, newName: string) => void;
  startTimer: (taskId: string) => void;
  stopCurrentTimer: () => void;
  resetData: () => void;
  getTodayRecords: () => TimeRecord[];
  getTaskTotalTime: (taskId: string) => number;
  deleteTimeRecord: (date: string, recordId: string) => void;
  updateTimeRecord: (date: string, recordId: string, updates: Partial<TimeRecord>) => void;
}

const initialAppData: AppData = {
  tasks: [],
  dailyRecords: {},
};

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appData, setAppData] = useLocalStorage<AppData>('worme-app-data', initialAppData);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [currentTimer, setCurrentTimer] = useState<TimeRecord | null>(null);

  const startTimer = (taskId: string) => {
    if (currentTimer) {
      stopCurrentTimer();
    }
    
    const task = appData.tasks.find(t => t.id === taskId);
    if (!task) return;
    
    const newTimer: TimeRecord = {
      id: uuidv4(),
      taskId,
      taskName: task.name,
      startTime: Date.now(),
      endTime: null,
      duration: null
    };
    
    setCurrentTimer(newTimer);
    setActiveTaskId(taskId);
  };

  const stopCurrentTimer = () => {
    if (!currentTimer) return;
    
    const endTime = Date.now();
    const duration = calculateDuration(currentTimer.startTime, endTime);
    
    const completedTimer: TimeRecord = {
      ...currentTimer,
      endTime,
      duration
    };
    
    const today = getCurrentDate();
    const todayRecords = appData.dailyRecords[today]?.records || [];
    
    setAppData(prevData => ({
      ...prevData,
      dailyRecords: {
        ...prevData.dailyRecords,
        [today]: {
          date: today,
          records: [...todayRecords, completedTimer]
        }
      }
    }));
    
    setCurrentTimer(null);
    setActiveTaskId(null);
  };

  const addTask = (name: string) => {
    const newTask: Task = {
      id: uuidv4(),
      name
    };
    
    setAppData(prevData => ({
      ...prevData,
      tasks: [...prevData.tasks, newTask]
    }));
  };

  const removeTask = (id: string) => {
    if (activeTaskId === id) {
      stopCurrentTimer();
    }
    
    setAppData(prevData => ({
      ...prevData,
      tasks: prevData.tasks.filter(task => task.id !== id)
    }));
  };

  const renameTask = (id: string, newName: string) => {
    setAppData(prevData => ({
      ...prevData,
      tasks: prevData.tasks.map(task => 
        task.id === id ? { ...task, name: newName } : task
      )
    }));
  };

  const deleteTimeRecord = (date: string, recordId: string) => {
    setAppData(prevData => ({
      ...prevData,
      dailyRecords: {
        ...prevData.dailyRecords,
        [date]: {
          date,
          records: prevData.dailyRecords[date].records.filter(r => r.id !== recordId)
        }
      }
    }));
  };

  const updateTimeRecord = (date: string, recordId: string, updates: Partial<TimeRecord>) => {
    setAppData(prevData => ({
      ...prevData,
      dailyRecords: {
        ...prevData.dailyRecords,
        [date]: {
          date,
          records: prevData.dailyRecords[date].records.map(record =>
            record.id === recordId ? { ...record, ...updates } : record
          )
        }
      }
    }));
  };

  const resetData = () => {
    if (currentTimer) {
      stopCurrentTimer();
    }
    setAppData(initialAppData);
  };

  const getTodayRecords = (): TimeRecord[] => {
    const today = getCurrentDate();
    return appData.dailyRecords[today]?.records || [];
  };

  const getTaskTotalTime = (taskId: string): number => {
    const todayRecords = getTodayRecords();
    return todayRecords
      .filter(record => record.taskId === taskId && record.duration !== null)
      .reduce((total, record) => total + (record.duration || 0), 0);
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (currentTimer) {
        stopCurrentTimer();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [currentTimer]);

  return (
    <TimerContext.Provider value={{
      tasks: appData.tasks,
      activeTaskId,
      dailyRecords: appData.dailyRecords,
      currentTimer,
      addTask,
      removeTask,
      renameTask,
      startTimer,
      stopCurrentTimer,
      resetData,
      getTodayRecords,
      getTaskTotalTime,
      deleteTimeRecord,
      updateTimeRecord,
    }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};