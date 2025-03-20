import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PomodoroTimer from './PomodoroTimer';
import TimerSettings from './TimerSettings';
import TimerNotification from './TimerNotification';
import BreakManager from './BreakManager';

const TimerManagerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const TimerManager = ({ currentTask }) => {
  // Timer state
  const [currentPhase, setCurrentPhase] = useState('work');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [totalTime, setTotalTime] = useState(25 * 60);
  
  // Notification state
  const [showNotification, setShowNotification] = useState(false);
  const [notificationPhase, setNotificationPhase] = useState('work');
  
  // Settings state
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoStartBreaks, setAutoStartBreaks] = useState(true);
  
  // Timer ref for accessing timer methods
  const timerRef = useRef(null);
  
  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('pomodoro-settings');
    if (savedSettings) {
      const { sound, autoStart } = JSON.parse(savedSettings);
      setSoundEnabled(sound);
      setAutoStartBreaks(autoStart);
    }
  }, []);
  
  // Handle timer phase change
  const handlePhaseChange = (phase, time, total) => {
    setCurrentPhase(phase);
    setTimeLeft(time);
    setTotalTime(total);
  };
  
  // Handle timer completion
  const handleTimerComplete = (phase) => {
    setNotificationPhase(phase);
    setShowNotification(true);
    
    // Auto-start breaks if enabled
    if (autoStartBreaks && phase !== 'work') {
      // The timer will auto-start the break
      setShowNotification(false);
    }
  };
  
  // Handle notification actions
  const handleCloseNotification = () => {
    setShowNotification(false);
  };
  
  const handleStartBreak = () => {
    // The timer will handle the break timing
    setShowNotification(false);
  };
  
  const handleSkipBreak = () => {
    // Skip to work phase
    setShowNotification(false);
    if (timerRef.current && timerRef.current.skipToNextPhase) {
      timerRef.current.skipToNextPhase();
    }
  };
  
  const handleContinueWork = () => {
    // Continue with work phase
    setShowNotification(false);
    if (timerRef.current && timerRef.current.startTimer) {
      timerRef.current.startTimer();
    }
  };
  
  // Handle break extension
  const handleExtendBreak = () => {
    if (timerRef.current && timerRef.current.extendBreak) {
      timerRef.current.extendBreak(5 * 60); // Extend by 5 minutes
    }
  };
  
  return (
    <TimerManagerContainer>
      <PomodoroTimer 
        ref={timerRef}
        onTimerComplete={handleTimerComplete}
        onPhaseChange={handlePhaseChange}
        currentTask={currentTask}
      />
      
      {(currentPhase === 'shortBreak' || currentPhase === 'longBreak') && (
        <BreakManager 
          phase={currentPhase}
          timeLeft={timeLeft}
          totalTime={totalTime}
          onSkipBreak={handleSkipBreak}
          onExtendBreak={handleExtendBreak}
        />
      )}
      
      <TimerSettings />
      
      {showNotification && (
        <TimerNotification 
          phase={notificationPhase}
          onClose={handleCloseNotification}
          onStartBreak={handleStartBreak}
          onSkipBreak={handleSkipBreak}
          onContinueWork={handleContinueWork}
          soundEnabled={soundEnabled}
        />
      )}
    </TimerManagerContainer>
  );
};

export default TimerManager;
