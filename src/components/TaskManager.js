import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TaskList from './TaskList';
import TaskPriority from './TaskPriority';
import TaskContext from './TaskContext';

const TaskManagerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const TaskManager = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Complete project requirements', completed: true },
    { id: 2, text: 'Design user interface', completed: false },
    { id: 3, text: 'Implement core features', completed: false },
    { id: 4, text: 'Test application', completed: false },
  ]);
  
  const [selectedTask, setSelectedTask] = useState(null);
  
  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('pomodoro-tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);
  
  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('pomodoro-tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };
  
  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    
    // Update selected task if it was the one that changed
    if (selectedTask && selectedTask.id === updatedTask.id) {
      setSelectedTask(updatedTask);
    }
  };
  
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    
    // Clear selected task if it was deleted
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask(null);
    }
  };
  
  const handleSelectNextTask = (task) => {
    setSelectedTask(task);
  };
  
  return (
    <TaskManagerContainer>
      <TaskList 
        tasks={tasks}
        onAddTask={handleAddTask}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
      />
      <TaskPriority 
        tasks={tasks}
        onSelectNextTask={handleSelectNextTask}
      />
      <TaskContext 
        selectedTask={selectedTask}
      />
    </TaskManagerContainer>
  );
};

export default TaskManager;
