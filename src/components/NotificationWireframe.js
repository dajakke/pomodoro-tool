import React from 'react';
import styled from 'styled-components';

// Main container for the notification
const NotificationContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: ${props => props.type === 'break' ? '#4C9195' : '#D95550'};
  color: white;
  padding: 15px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  min-width: 300px;
  z-index: 1000;
  animation: slideIn 0.3s ease-out;
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  
  h3 {
    margin: 0;
    font-size: 1.2rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0;
`;

const NotificationMessage = styled.p`
  margin: 0 0 15px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  background-color: ${props => props.primary ? 'white' : 'rgba(255, 255, 255, 0.2)'};
  color: ${props => props.primary ? props.type === 'break' ? '#4C9195' : '#D95550' : 'white'};
  cursor: pointer;
  font-weight: ${props => props.primary ? 'bold' : 'normal'};
  
  &:hover {
    opacity: 0.9;
  }
`;

// Notification wireframe component
const NotificationWireframe = ({ type = 'pomodoro' }) => {
  const isBreak = type === 'break';
  
  return (
    <NotificationContainer type={type}>
      <NotificationHeader>
        <h3>{isBreak ? 'Break Time!' : 'Pomodoro Complete!'}</h3>
        <CloseButton>&times;</CloseButton>
      </NotificationHeader>
      
      <NotificationMessage>
        {isBreak 
          ? 'Time to take a 5-minute break. Step away from your work and relax.' 
          : 'You\'ve completed a Pomodoro session. Great job!'}
      </NotificationMessage>
      
      <ButtonGroup>
        <Button type={type}>{isBreak ? 'Skip Break' : 'Continue Working'}</Button>
        <Button primary type={type}>{isBreak ? 'Start Break' : 'Take a Break'}</Button>
      </ButtonGroup>
    </NotificationContainer>
  );
};

export default NotificationWireframe;
