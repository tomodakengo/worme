import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TimerProvider } from './context/TimerContext';
import RecordsPage from './pages/RecordsPage';
import TimerPage from './pages/TimerPage';
import SettingsPage from './pages/SettingsPage';
import NavBar from './components/NavBar';

function App() {
  return (
    <TimerProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 pb-20">
          <Routes>
            <Route path="/" element={<RecordsPage />} />
            <Route path="/timer" element={<TimerPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
          <NavBar />
        </div>
      </Router>
    </TimerProvider>
  );
}

export default App;