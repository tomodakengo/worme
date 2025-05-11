import React, { useState } from 'react';
import { TimeRecord } from '../types';
import { formatTimeFromTimestamp } from '../utils/timeUtils';
import { Pencil, Trash2, Check, X } from 'lucide-react';

interface TimelineItemProps {
  record: TimeRecord;
  onDelete?: () => void;
  onUpdate?: (updates: Partial<TimeRecord>) => void;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ record, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(record.taskName);
  const [editedStartTime, setEditedStartTime] = useState(
    new Date(record.startTime).toTimeString().slice(0, 5)
  );
  const [editedEndTime, setEditedEndTime] = useState(
    record.endTime ? new Date(record.endTime).toTimeString().slice(0, 5) : ''
  );

  if (!record.endTime) return null;

  const handleSave = () => {
    if (!onUpdate) return;

    const startDate = new Date(record.startTime);
    const endDate = new Date(record.endTime!);
    
    const [startHours, startMinutes] = editedStartTime.split(':').map(Number);
    const [endHours, endMinutes] = editedEndTime.split(':').map(Number);
    
    startDate.setHours(startHours, startMinutes);
    endDate.setHours(endHours, endMinutes);
    
    onUpdate({
      taskName: editedName,
      startTime: startDate.getTime(),
      endTime: endDate.getTime(),
      duration: Math.floor((endDate.getTime() - startDate.getTime()) / 1000)
    });
    
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
        <input
          type="time"
          value={editedStartTime}
          onChange={(e) => setEditedStartTime(e.target.value)}
          className="p-1 border rounded"
        />
        <span>~</span>
        <input
          type="time"
          value={editedEndTime}
          onChange={(e) => setEditedEndTime(e.target.value)}
          className="p-1 border rounded"
        />
        <input
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          className="flex-1 p-1 border rounded"
        />
        <button
          onClick={handleSave}
          className="p-1 text-teal-600 hover:text-teal-800"
        >
          <Check size={16} />
        </button>
        <button
          onClick={() => setIsEditing(false)}
          className="p-1 text-gray-600 hover:text-gray-800"
        >
          <X size={16} />
        </button>
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg group">
      <div className="flex items-center space-x-4">
        <div className="text-sm text-gray-600">
          {formatTimeFromTimestamp(record.startTime)}~{formatTimeFromTimestamp(record.endTime)}
        </div>
        <div className="font-medium">
          {record.taskName}
        </div>
      </div>
      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {onUpdate && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-400 hover:text-teal-500 transition-colors"
          >
            <Pencil size={16} />
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default TimelineItem;