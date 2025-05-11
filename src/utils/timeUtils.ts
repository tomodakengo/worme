/**
 * Format seconds into HH:MM format
 */
export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  return `${hours}:${minutes.toString().padStart(2, '0')}`;
};

/**
 * Format seconds into H:MM format
 */
export const formatHoursMinutes = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  return `${hours}:${minutes.toString().padStart(2, '0')}`;
};

/**
 * Get current date in YYYY-MM-DD format
 */
export const getCurrentDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Format timestamp to HH:MM format
 */
export const formatTimeFromTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  return `${hours}:${minutes}`;
};

/**
 * Calculate duration between timestamps in seconds
 */
export const calculateDuration = (startTime: number, endTime: number): number => {
  return Math.floor((endTime - startTime) / 1000);
};

/**
 * Format time range for display in timeline
 */
export const formatTimeRange = (startTime: number, endTime: number): string => {
  return `${formatTimeFromTimestamp(startTime)}~${formatTimeFromTimestamp(endTime)}`;
};