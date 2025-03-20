import React, { useState } from 'react';
import styled from 'styled-components';
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';

const TaskListContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: 100%;
`;

const TaskListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h2 {
    margin: 0;
    color: #333;
  }
`;

const TaskCount = styled.span`
  background-color: #f0f0f0;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.9rem;
  color: #666;
`;

const TaskItems = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-height: 400px;
  overflow-y: auto;
`;

const TaskItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 15px;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f9f9f9;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const Checkbox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid ${props => props.checked ? '#4C9195' : '#ddd'};
  background-color: ${props => props.checked ? '#4C9195' : 'transparent'};
  margin-right: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.2s;
`;

const TaskText = styled.span`
  flex: 1;
  font-size: 1rem;
  color: #333;
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
  color: ${props => props.completed ? '#888' : '#333'};
`;

const TaskActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 1rem;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
  
  &:hover {
    color: ${props => props.delete ? '#D95550' : '#4C9195'};
  }
`;

const AddTaskForm = styled.form`
  display: flex;
  margin-top: 20px;
  border-top: 1px solid #f0f0f0;
  padding-top: 20px;
`;

const TaskInput = styled.input`
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4C9195;
  }
`;

const AddButton = styled.button`
  background-color: #D95550;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  padding: 0 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #c94540;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 30px 0;
  color: #888;
  
  p {
    margin: 10px 0;
  }
`;

const TaskList = ({ tasks, onAddTask, onUpdateTask, onDeleteTask }) => {
  const [newTaskText, setNewTaskText] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editText, setEditText] = useState('');
  
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskText.trim() === '') return;
    
    const newTask = {
      id: Date.now(),
      text: newTaskText,
      completed: false
    };
    
    onAddTask(newTask);
    setNewTaskText('');
  };
  
  const handleToggleComplete = (taskId) => {
    const taskToUpdate = tasks.find(task => task.id === taskId);
    if (taskToUpdate) {
      onUpdateTask({ ...taskToUpdate, completed: !taskToUpdate.completed });
    }
  };
  
  const handleDeleteTask = (taskId) => {
    onDeleteTask(taskId);
  };
  
  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find(task => task.id === taskId);
    setEditingTaskId(taskId);
    setEditText(taskToEdit.text);
  };
  
  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (editText.trim() === '') return;
    
    const taskToUpdate = tasks.find(task => task.id === editingTaskId);
    if (taskToUpdate) {
      onUpdateTask({ ...taskToUpdate, text: editText });
    }
    
    setEditingTaskId(null);
    setEditText('');
  };
  
  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditText('');
  };
  
  const completedCount = tasks.filter(task => task.completed).length;
  
  return (
    <TaskListContainer>
      <TaskListHeader>
        <h2>Tasks</h2>
        <TaskCount>{completedCount}/{tasks.length} completed</TaskCount>
      </TaskListHeader>
      
      {tasks.length > 0 ? (
        <TaskItems>
          {tasks.map(task => (
            <TaskItem key={task.id}>
              {editingTaskId === task.id ? (
                <form onSubmit={handleSaveEdit} style={{ display: 'flex', flex: 1 }}>
                  <TaskInput 
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    autoFocus
                  />
                  <AddButton type="submit">Save</AddButton>
                  <ActionButton type="button" onClick={handleCancelEdit}>
                    Cancel
                  </ActionButton>
                </form>
              ) : (
                <>
                  <Checkbox 
                    checked={task.completed}
                    onClick={() => handleToggleComplete(task.id)}
                  >
                    {task.completed && <FaCheck size={12} />}
                  </Checkbox>
                  <TaskText completed={task.completed}>{task.text}</TaskText>
                  <TaskActions>
                    <ActionButton onClick={() => handleEditTask(task.id)}>
                      <FaEdit />
                    </ActionButton>
                    <ActionButton delete onClick={() => handleDeleteTask(task.id)}>
                      <FaTrash />
                    </ActionButton>
                  </TaskActions>
                </>
              )}
            </TaskItem>
          ))}
        </TaskItems>
      ) : (
        <EmptyState>
          <p>No tasks yet. Add your first task below!</p>
        </EmptyState>
      )}
      
      <AddTaskForm onSubmit={handleAddTask}>
        <TaskInput 
          type="text"
          placeholder="Add a new task..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
        <AddButton type="submit">Add</AddButton>
      </AddTaskForm>
    </TaskListContainer>
  );
};

export default TaskList;
