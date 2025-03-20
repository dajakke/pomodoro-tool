import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const TaskPriorityContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
`;

const PriorityHeader = styled.div`
  margin-bottom: 15px;
  
  h3 {
    margin: 0;
    color: #333;
  }
  
  p {
    margin: 5px 0 0;
    color: #666;
    font-size: 0.9rem;
  }
`;

const PriorityList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const PriorityItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 15px;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  margin-bottom: 10px;
  background-color: ${props => props.isNext ? '#fff9f0' : 'white'};
  border-left: ${props => props.isNext ? '4px solid #D95550' : '1px solid #f0f0f0'};
`;

const TaskNumber = styled.span`
  background-color: ${props => props.isNext ? '#D95550' : '#f0f0f0'};
  color: ${props => props.isNext ? 'white' : '#666'};
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  margin-right: 15px;
`;

const PriorityText = styled.span`
  flex: 1;
  font-size: 1rem;
  color: #333;
`;

const PriorityActions = styled.div`
  display: flex;
  gap: 5px;
`;

const PriorityButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #333;
  }
  
  &:disabled {
    color: #ddd;
    cursor: not-allowed;
  }
`;

const NextTaskButton = styled.button`
  background-color: #D95550;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 1rem;
  margin-top: 15px;
  cursor: pointer;
  width: 100%;
  
  &:hover {
    background-color: #c94540;
  }
  
  &:disabled {
    background-color: #f0f0f0;
    color: #999;
    cursor: not-allowed;
  }
`;

const TaskPriority = ({ tasks, onSelectNextTask }) => {
  const [prioritizedTasks, setPrioritizedTasks] = useState([]);
  const [nextTaskIndex, setNextTaskIndex] = useState(0);
  
  // Filter out completed tasks and update prioritized tasks when tasks change
  useEffect(() => {
    const incompleteTasks = tasks.filter(task => !task.completed);
    setPrioritizedTasks(incompleteTasks);
  }, [tasks]);
  
  const handleMoveUp = (index) => {
    if (index === 0) return;
    
    const newPrioritizedTasks = [...prioritizedTasks];
    const temp = newPrioritizedTasks[index];
    newPrioritizedTasks[index] = newPrioritizedTasks[index - 1];
    newPrioritizedTasks[index - 1] = temp;
    
    setPrioritizedTasks(newPrioritizedTasks);
    
    // Adjust next task index if needed
    if (index === nextTaskIndex) {
      setNextTaskIndex(index - 1);
    } else if (index - 1 === nextTaskIndex) {
      setNextTaskIndex(index);
    }
  };
  
  const handleMoveDown = (index) => {
    if (index === prioritizedTasks.length - 1) return;
    
    const newPrioritizedTasks = [...prioritizedTasks];
    const temp = newPrioritizedTasks[index];
    newPrioritizedTasks[index] = newPrioritizedTasks[index + 1];
    newPrioritizedTasks[index + 1] = temp;
    
    setPrioritizedTasks(newPrioritizedTasks);
    
    // Adjust next task index if needed
    if (index === nextTaskIndex) {
      setNextTaskIndex(index + 1);
    } else if (index + 1 === nextTaskIndex) {
      setNextTaskIndex(index);
    }
  };
  
  const handleSelectNextTask = () => {
    if (prioritizedTasks.length > 0) {
      onSelectNextTask(prioritizedTasks[nextTaskIndex]);
    }
  };
  
  return (
    <TaskPriorityContainer>
      <PriorityHeader>
        <h3>Task Priority</h3>
        <p>Reorder tasks to set your priorities</p>
      </PriorityHeader>
      
      {prioritizedTasks.length > 0 ? (
        <>
          <PriorityList>
            {prioritizedTasks.map((task, index) => (
              <PriorityItem key={task.id} isNext={index === nextTaskIndex}>
                <TaskNumber isNext={index === nextTaskIndex}>{index + 1}</TaskNumber>
                <PriorityText>{task.text}</PriorityText>
                <PriorityActions>
                  <PriorityButton 
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                  >
                    <FaArrowUp />
                  </PriorityButton>
                  <PriorityButton 
                    onClick={() => handleMoveDown(index)}
                    disabled={index === prioritizedTasks.length - 1}
                  >
                    <FaArrowDown />
                  </PriorityButton>
                </PriorityActions>
              </PriorityItem>
            ))}
          </PriorityList>
          
          <NextTaskButton onClick={handleSelectNextTask}>
            Start Working on Next Task
          </NextTaskButton>
        </>
      ) : (
        <p>No tasks to prioritize. Add some tasks to get started!</p>
      )}
    </TaskPriorityContainer>
  );
};

export default TaskPriority;
