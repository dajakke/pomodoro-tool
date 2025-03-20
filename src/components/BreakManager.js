import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaCoffee, FaWalking } from 'react-icons/fa';

const BreakManagerContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
`;

const BreakHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  
  h3 {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${props => props.isLongBreak ? '#457CA3' : '#4C9195'};
  }
`;

const BreakInfo = styled.div`
  background-color: ${props => props.isLongBreak ? '#eef4f8' : '#eef6f6'};
  border-left: 4px solid ${props => props.isLongBreak ? '#457CA3' : '#4C9195'};
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 15px;
`;

const BreakTips = styled.ul`
  padding-left: 20px;
  margin: 10px 0;
  
  li {
    margin-bottom: 8px;
  }
`;

const BreakProgress = styled.div`
  margin: 20px 0;
`;

const ProgressBar = styled.div`
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  margin-top: 8px;
  position: relative;
  overflow: hidden;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.progress}%;
    background-color: ${props => props.isLongBreak ? '#457CA3' : '#4C9195'};
    transition: width 1s linear;
  }
`;

const BreakActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const BreakButton = styled.button`
  background-color: ${props => props.primary ? (props.isLongBreak ? '#457CA3' : '#4C9195') : '#f0f0f0'};
  color: ${props => props.primary ? 'white' : '#333'};
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 1rem;
  cursor: pointer;
  flex: ${props => props.fullWidth ? '1' : 'initial'};
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    background-color: #f0f0f0;
    color: #999;
    cursor: not-allowed;
  }
`;

const BreakManager = ({ phase, timeLeft, totalTime, onSkipBreak, onExtendBreak }) => {
  const [progress, setProgress] = useState(0);
  const isLongBreak = phase === 'longBreak';
  const isBreakActive = phase === 'shortBreak' || phase === 'longBreak';
  
  // Calculate progress percentage
  useEffect(() => {
    if (isBreakActive && totalTime > 0) {
      const progressPercent = ((totalTime - timeLeft) / totalTime) * 100;
      setProgress(progressPercent);
    } else {
      setProgress(0);
    }
  }, [timeLeft, totalTime, isBreakActive]);
  
  // If not in a break phase, don't render the component
  if (!isBreakActive) {
    return null;
  }
  
  const getBreakTips = () => {
    if (isLongBreak) {
      return [
        "Step away from your computer completely",
        "Take a short walk outside if possible",
        "Do some light stretching or exercise",
        "Hydrate and have a healthy snack",
        "Practice deep breathing or meditation"
      ];
    } else {
      return [
        "Stand up and stretch",
        "Rest your eyes by looking at something distant",
        "Take a few deep breaths",
        "Drink some water"
      ];
    }
  };
  
  return (
    <BreakManagerContainer>
      <BreakHeader isLongBreak={isLongBreak}>
        <h3>
          {isLongBreak ? <FaWalking /> : <FaCoffee />}
          {isLongBreak ? 'Long Break' : 'Short Break'}
        </h3>
      </BreakHeader>
      
      <BreakInfo isLongBreak={isLongBreak}>
        <p>
          {isLongBreak 
            ? "You've completed 4 Pomodoro sessions! Take a well-deserved longer break to recharge."
            : "Quick break time! Step away briefly to refresh your mind before the next Pomodoro session."}
        </p>
        
        <h4>Break Tips:</h4>
        <BreakTips>
          {getBreakTips().map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </BreakTips>
      </BreakInfo>
      
      <BreakProgress>
        <p>Break progress:</p>
        <ProgressBar progress={progress} isLongBreak={isLongBreak} />
      </BreakProgress>
      
      <BreakActions>
        <BreakButton onClick={onSkipBreak}>
          Skip Break
        </BreakButton>
        <BreakButton 
          primary 
          isLongBreak={isLongBreak} 
          fullWidth
          onClick={onExtendBreak}
        >
          Extend Break (+5 min)
        </BreakButton>
      </BreakActions>
    </BreakManagerContainer>
  );
};

export default BreakManager;
