import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FaBell, FaTimes } from 'react-icons/fa';

const NotificationOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const NotificationCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 400px;
  padding: 20px;
  animation: slideUp 0.3s ease-out;
  
  @keyframes slideUp {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  
  h2 {
    margin: 0;
    color: ${props => props.phase === 'work' ? '#D95550' : props.phase === 'shortBreak' ? '#4C9195' : '#457CA3'};
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #999;
  font-size: 1.2rem;
  cursor: pointer;
  
  &:hover {
    color: #333;
  }
`;

const NotificationContent = styled.div`
  margin-bottom: 20px;
  
  p {
    margin: 0 0 10px 0;
    font-size: 1.1rem;
    color: #555;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  
  background-color: ${props => props.primary ? 
    (props.phase === 'work' ? '#D95550' : props.phase === 'shortBreak' ? '#4C9195' : '#457CA3') : 
    '#f0f0f0'};
  color: ${props => props.primary ? 'white' : '#333'};
  
  &:hover {
    opacity: 0.9;
  }
`;

// Audio for notification sound
const notificationSound = new Audio('/notification.mp3');

const TimerNotification = ({ phase, onClose, onStartBreak, onSkipBreak, onContinueWork, soundEnabled }) => {
  useEffect(() => {
    // Play sound when notification appears if enabled
    if (soundEnabled) {
      notificationSound.play().catch(error => {
        console.error('Error playing notification sound:', error);
      });
    }
    
    // Add escape key listener to close notification
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose, soundEnabled]);
  
  const isWorkComplete = phase !== 'work';
  
  const getTitle = () => {
    if (isWorkComplete) {
      return (
        <>
          <FaBell /> Break Time!
        </>
      );
    } else {
      return (
        <>
          <FaBell /> Pomodoro Complete!
        </>
      );
    }
  };
  
  const getMessage = () => {
    if (isWorkComplete) {
      if (phase === 'shortBreak') {
        return "You've completed a Pomodoro session! Time for a short 5-minute break.";
      } else {
        return "Great job completing 4 Pomodoro sessions! Take a well-deserved 20-minute break.";
      }
    } else {
      return "Your break is over. Ready to focus on your next task?";
    }
  };
  
  return (
    <NotificationOverlay onClick={onClose}>
      <NotificationCard onClick={e => e.stopPropagation()}>
        <NotificationHeader phase={phase}>
          <h2>{getTitle()}</h2>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </NotificationHeader>
        
        <NotificationContent>
          <p>{getMessage()}</p>
        </NotificationContent>
        
        <ButtonGroup>
          {isWorkComplete ? (
            <>
              <Button onClick={onSkipBreak}>
                Skip Break
              </Button>
              <Button primary phase={phase} onClick={onStartBreak}>
                Start Break
              </Button>
            </>
          ) : (
            <Button primary phase={phase} onClick={onContinueWork}>
              Start Working
            </Button>
          )}
        </ButtonGroup>
      </NotificationCard>
    </NotificationOverlay>
  );
};

export default TimerNotification;
