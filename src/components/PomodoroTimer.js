import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { FaPlay, FaPause, FaRedo, FaStepForward } from 'react-icons/fa';

// Styled components
const TimerContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatusIndicator = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${props => 
    props.phase === 'work' ? '#D95550' : 
    props.phase === 'shortBreak' ? '#4C9195' : '#457CA3'};
  margin-bottom: 15px;
`;

const TimerDisplay = styled.div`
  font-size: 5rem;
  font-weight: bold;
  color: ${props => 
    props.phase === 'work' ? '#D95550' : 
    props.phase === 'shortBreak' ? '#4C9195' : '#457CA3'};
  margin: 20px 0;
  text-align: center;
`;

const TimerControls = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  justify-content: center;
`;

const ControlButton = styled.button`
  background-color: ${props => props.primary ? '#D95550' : '#f0f0f0'};
  color: ${props => props.primary ? 'white' : '#333'};
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;

const PomodoroCount = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`;

const PomodoroCircle = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${props => props.completed ? '#D95550' : '#f0f0f0'};
  border: 1px solid ${props => props.completed ? '#D95550' : '#ddd'};
`;

// PomodoroTimer component with forwardRef
const PomodoroTimer = forwardRef(function PomodoroTimer({ onTimerComplete, onPhaseChange }, ref) {
  // Timer states
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState('work'); // 'work', 'shortBreak', 'longBreak'
  const [pomodoroCount, setPomodoroCount] = useState(0);
  
  // Timer settings
  const [workDuration, setWorkDuration] = useState(25 * 60); // 25 minutes in seconds
  const [shortBreakDuration, setShortBreakDuration] = useState(5 * 60); // 5 minutes in seconds
  const [longBreakDuration, setLongBreakDuration] = useState(20 * 60); // 20 minutes in seconds
  
  // Ref for interval
  const timerInterval = useRef(null);
  
  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    startTimer,
    pauseTimer,
    resetTimer,
    skipToNextPhase,
    extendBreak: (additionalSeconds) => {
      if (phase === 'shortBreak' || phase === 'longBreak') {
        setTimeLeft(prevTime => prevTime + additionalSeconds);
      }
    }
  }));
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Start timer
  const startTimer = () => {
    setIsRunning(true);
  };
  
  // Pause timer
  const pauseTimer = () => {
    setIsRunning(false);
  };
  
  // Reset timer
  const resetTimer = () => {
    setIsRunning(false);
    
    if (phase === 'work') {
      setTimeLeft(workDuration);
    } else if (phase === 'shortBreak') {
      setTimeLeft(shortBreakDuration);
    } else {
      setTimeLeft(longBreakDuration);
    }
  };
  
  // Skip to next phase
  const skipToNextPhase = () => {
    setIsRunning(false);
    
    if (phase === 'work') {
      // Skip to short break or long break
      const newCount = pomodoroCount + 1;
      setPomodoroCount(newCount);
      
      if (newCount % 4 === 0) {
        setPhase('longBreak');
        setTimeLeft(longBreakDuration);
      } else {
        setPhase('shortBreak');
        setTimeLeft(shortBreakDuration);
      }
    } else {
      // Skip to work
      setPhase('work');
      setTimeLeft(workDuration);
    }
  };
  
  // Notify parent component of phase changes
  useEffect(() => {
    if (onPhaseChange) {
      let totalTime;
      if (phase === 'work') {
        totalTime = workDuration;
      } else if (phase === 'shortBreak') {
        totalTime = shortBreakDuration;
      } else {
        totalTime = longBreakDuration;
      }
      onPhaseChange(phase, timeLeft, totalTime);
    }
  }, [phase, timeLeft, workDuration, shortBreakDuration, longBreakDuration, onPhaseChange]);

  // Timer effect
  useEffect(() => {
    if (isRunning) {
      timerInterval.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            // Timer complete
            clearInterval(timerInterval.current);
            setIsRunning(false);
            
            // Notify parent component
            if (onTimerComplete) {
              onTimerComplete(phase);
            }
            
            // Auto transition to next phase
            if (phase === 'work') {
              const newCount = pomodoroCount + 1;
              setPomodoroCount(newCount);
              
              if (newCount % 4 === 0) {
                setPhase('longBreak');
                return longBreakDuration;
              } else {
                setPhase('shortBreak');
                return shortBreakDuration;
              }
            } else {
              setPhase('work');
              return workDuration;
            }
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }
    
    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    };
  }, [isRunning, phase, pomodoroCount, workDuration, shortBreakDuration, longBreakDuration, onTimerComplete]);
  
  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('pomodoro-settings');
    if (savedSettings) {
      const { work, shortBreak, longBreak } = JSON.parse(savedSettings);
      setWorkDuration(work * 60);
      setShortBreakDuration(shortBreak * 60);
      setLongBreakDuration(longBreak * 60);
      
      // Update timeLeft based on current phase
      if (phase === 'work') {
        setTimeLeft(work * 60);
      } else if (phase === 'shortBreak') {
        setTimeLeft(shortBreak * 60);
      } else {
        setTimeLeft(longBreak * 60);
      }
    }
  }, [phase]);
  
  // Get phase label
  const getPhaseLabel = () => {
    switch (phase) {
      case 'shortBreak':
        return 'Short Break';
      case 'longBreak':
        return 'Long Break';
      default:
        return 'Work Phase';
    }
  };
  
  return (
    <TimerContainer>
      <StatusIndicator phase={phase}>
        {getPhaseLabel()} {phase === 'work' && `(${pomodoroCount % 4 + 1}/4)`}
      </StatusIndicator>
      
      <PomodoroCount>
        {[...Array(4)].map((_, index) => (
          <PomodoroCircle 
            key={index} 
            completed={index < pomodoroCount % 4} 
          />
        ))}
      </PomodoroCount>
      
      <TimerDisplay phase={phase}>
        {formatTime(timeLeft)}
      </TimerDisplay>
      
      <TimerControls>
        {!isRunning ? (
          <ControlButton primary onClick={startTimer}>
            <FaPlay />
          </ControlButton>
        ) : (
          <ControlButton onClick={pauseTimer}>
            <FaPause />
          </ControlButton>
        )}
        <ControlButton onClick={resetTimer}>
          <FaRedo />
        </ControlButton>
        <ControlButton onClick={skipToNextPhase}>
          <FaStepForward />
        </ControlButton>
      </TimerControls>
    </TimerContainer>
  );
});

export default PomodoroTimer;
