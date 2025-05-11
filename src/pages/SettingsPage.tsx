import React, { useState } from 'react';
import { useTimer } from '../context/TimerContext';
import { Trash2, Github } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { resetData } = useTimer();
  
  const handleReset = () => {
    setShowConfirm(true);
  };
  
  const confirmReset = () => {
    resetData();
    setShowConfirm(false);
  };
  
  const cancelReset = () => {
    setShowConfirm(false);
  };
  
  return (
    <div className="container max-w-md mx-auto p-4 pb-20">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Settings</h1>
      
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-lg font-medium mb-4">Data Management</h2>
        
        {!showConfirm ? (
          <button
            onClick={handleReset}
            className="flex items-center justify-center w-full p-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
          >
            <Trash2 size={18} className="mr-2" />
            Reset All Data
          </button>
        ) : (
          <div className="border border-red-200 rounded-lg p-4 bg-red-50">
            <p className="text-red-700 mb-4">Are you sure you want to reset all data? This action cannot be undone.</p>
            <div className="flex space-x-3">
              <button
                onClick={confirmReset}
                className="flex-1 p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Yes, Reset Data
              </button>
              <button
                onClick={cancelReset}
                className="flex-1 p-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-medium mb-4">Links</h2>
        <a
          href="https://github.com/stackblitz/worme"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Github size={18} className="mr-2" />
          View on GitHub
        </a>
      </div>
      
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>Worme - Time Tracking App</p>
        <p className="mt-1">Version 1.0.0</p>
      </div>
    </div>
  );
};

export default SettingsPage;