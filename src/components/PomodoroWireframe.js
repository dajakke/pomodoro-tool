import React from 'react';
import styled from 'styled-components';

// Main container for the wireframe
const Container = styled.div`
  font-family: 'Arial', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

// Header component
const Header = styled.header`
  background-color: #D95550;
  color: white;
  padding: 15px;
  text-align: center;
  border-radius: 5px 5px 0 0;
`;

// Main content area with responsive layout
const MainContent = styled.main`
  display: flex;
  flex-direction: row;
  flex: 1;
  gap: 20px;
  margin: 20px 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// Task list section
const TaskListSection = styled.section`
  flex: 1;
  background-color: #f5f5f5;
  border-radius: 5px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Timer section
const TimerSection = styled.section`
  flex: 1;
  background-color: #f5f5f5;
  border-radius: 5px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Timer display
const TimerDisplay = styled.div`
  font-size: 4rem;
  font-family: monospace;
  margin: 20px 0;
  color: #D95550;
`;

// Status indicator
const StatusIndicator = styled.div`
  background-color: #D95550;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  margin-bottom: 20px;
`;

// Control buttons container
const ControlButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

// Button component
const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: ${props => props.primary ? '#D95550' : '#e0e0e0'};
  color: ${props => props.primary ? 'white' : 'black'};
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    opacity: 0.9;
  }
`;

// Task list
const TaskList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

// Task item
const TaskItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  
  &:last-child {
    border-bottom: none;
  }
`;

// Checkbox for task completion
const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 10px;
`;

// Task text
const TaskText = styled.span`
  flex: 1;
`;

// Task action buttons
const TaskActions = styled.div`
  display: flex;
  gap: 5px;
`;

// Footer
const Footer = styled.footer`
  background-color: #f5f5f5;
  padding: 15px;
  text-align: center;
  border-radius: 0 0 5px 5px;
`;

// Add task input group
const AddTaskGroup = styled.div`
  display: flex;
  margin-top: 15px;
  gap: 10px;
`;

// Text input
const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
`;

// Wireframe component
const PomodoroWireframe = () => {
  return (
    <Container>
      <Header>
        <h1>Pomodoro Tool</h1>
      </Header>
      
      <MainContent>
        <TaskListSection>
          <h2>Tasks</h2>
          <TaskList>
            <TaskItem>
              <Checkbox />
              <TaskText>Complete project requirements</TaskText>
              <TaskActions>
                <Button>Edit</Button>
                <Button>Delete</Button>
              </TaskActions>
            </TaskItem>
            <TaskItem>
              <Checkbox />
              <TaskText>Design user interface</TaskText>
              <TaskActions>
                <Button>Edit</Button>
                <Button>Delete</Button>
              </TaskActions>
            </TaskItem>
            <TaskItem>
              <Checkbox />
              <TaskText>Implement core features</TaskText>
              <TaskActions>
                <Button>Edit</Button>
                <Button>Delete</Button>
              </TaskActions>
            </TaskItem>
          </TaskList>
          
          <AddTaskGroup>
            <Input placeholder="Add a new task..." />
            <Button primary>Add</Button>
          </AddTaskGroup>
        </TaskListSection>
        
        <TimerSection>
          <StatusIndicator>
            Work Phase (1/4)
          </StatusIndicator>
          
          <TimerDisplay>
            25:00
          </TimerDisplay>
          
          <ControlButtons>
            <Button primary>Start</Button>
            <Button>Reset</Button>
            <Button>Skip</Button>
          </ControlButtons>
          
          <Button>Settings</Button>
        </TimerSection>
      </MainContent>
      
      <Footer>
        Pomodoro Tool - Manage your time effectively
      </Footer>
    </Container>
  );
};

export default PomodoroWireframe;
