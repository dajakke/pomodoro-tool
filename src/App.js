import React, { useState } from 'react';
import styled from 'styled-components';
import TaskManager from './components/TaskManager';
import TimerManager from './components/TimerManager';

// Main container for the application
const AppContainer = styled.div`
  font-family: 'Roboto', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #F5F5F5;
`;

// Global styles
const GlobalStyle = styled.div`
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
    background-color: #F5F5F5;
  }
`;

// App header
const Header = styled.header`
  background-color: #D95550;
  color: white;
  padding: 20px;
  text-align: center;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  h1 {
    margin: 0;
    font-size: 2rem;
  }
`;

// Main content area
const MainContent = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 20px 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Footer
const Footer = styled.footer`
  background-color: #333;
  color: white;
  padding: 15px;
  text-align: center;
  border-radius: 0 0 8px 8px;
  margin-top: auto;
`;

// App component
const App = () => {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
  };

  return (
    <GlobalStyle>
      <AppContainer>
        <Header>
          <h1>Pomodoro Tool</h1>
        </Header>
        
        <MainContent>
          <TaskManager onTaskSelect={handleTaskSelect} />
          <TimerManager currentTask={selectedTask} />
        </MainContent>
        
        <Footer>
          <p>© 2025 Pomodoro Tool - Manage your time effectively</p>
        </Footer>
      </AppContainer>
    </GlobalStyle>
  );
};

export default App;
