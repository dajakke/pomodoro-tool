import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TaskContextContainer = styled.div`
  margin-top: 20px;
`;

const TaskContext = ({ selectedTask }) => {
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    setCurrentTask(selectedTask);
  }, [selectedTask]);

  return (
    <TaskContextContainer>
      {currentTask ? (
        <div>
          <h3>Current Focus:</h3>
          <p>{currentTask.text}</p>
        </div>
      ) : (
        <div>
          <h3>No Task Selected</h3>
          <p>Select a task from your priority list to start working</p>
        </div>
      )}
    </TaskContextContainer>
  );
};

export default TaskContext;
