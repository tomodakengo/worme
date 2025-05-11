export interface Task {
  id: string;
  name: string;
  color?: string;
}

export interface TimeRecord {
  id: string;
  taskId: string;
  taskName: string;
  startTime: number; // timestamp
  endTime: number | null; // timestamp
  duration: number | null; // seconds, calculated when endTime is set
}

export interface DailyRecord {
  date: string; // YYYY-MM-DD
  records: TimeRecord[];
}

export interface AppData {
  tasks: Task[];
  dailyRecords: {
    [date: string]: DailyRecord;
  };
}