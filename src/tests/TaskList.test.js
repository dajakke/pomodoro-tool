import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskList from '../components/TaskList';

describe('TaskList Component', () => {
  const mockTasks = [
    { id: 1, text: 'Test task 1', completed: false },
    { id: 2, text: 'Test task 2', completed: true }
  ];
  
  const mockHandlers = {
    onAddTask: jest.fn(),
    onUpdateTask: jest.fn(),
    onDeleteTask: jest.fn()
  };

  test('renders all tasks', () => {
    render(<TaskList tasks={mockTasks} {...mockHandlers} />);
    
    expect(screen.getByText('Test task 1')).toBeInTheDocument();
    expect(screen.getByText('Test task 2')).toBeInTheDocument();
    expect(screen.getByText('1/2 completed')).toBeInTheDocument();
  });
  
  test('adds a new task', () => {
    render(<TaskList tasks={mockTasks} {...mockHandlers} />);
    
    const input = screen.getByPlaceholderText('Add a new task...');
    const addButton = screen.getByText('Add');
    
    fireEvent.change(input, { target: { value: 'New test task' } });
    fireEvent.click(addButton);
    
    expect(mockHandlers.onAddTask).toHaveBeenCalledWith(
      expect.objectContaining({
        text: 'New test task',
        completed: false
      })
    );
  });
  
  test('toggles task completion', () => {
    render(<TaskList tasks={mockTasks} {...mockHandlers} />);
    
    // Find the first task's checkbox
    const firstTaskText = screen.getByText('Test task 1');
    const firstTaskCheckbox = firstTaskText.previousSibling;
    
    fireEvent.click(firstTaskCheckbox);
    
    expect(mockHandlers.onUpdateTask).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        text: 'Test task 1',
        completed: true
      })
    );
  });
  
  test('deletes a task', () => {
    render(<TaskList tasks={mockTasks} {...mockHandlers} />);
    
    // Find delete buttons
    const deleteButtons = screen.getAllByRole('button', { name: '' });
    
    // Click the delete button for the first task
    // This is a bit fragile as it depends on the order of buttons
    fireEvent.click(deleteButtons[1]); // Assuming second button is delete
    
    expect(mockHandlers.onDeleteTask).toHaveBeenCalledWith(1);
  });
  
  test('edits a task', () => {
    render(<TaskList tasks={mockTasks} {...mockHandlers} />);
    
    // Find edit buttons
    const editButtons = screen.getAllByRole('button', { name: '' });
    
    // Click the edit button for the first task
    fireEvent.click(editButtons[0]); // Assuming first button is edit
    
    // Now there should be an input field with the task text
    const editInput = screen.getByDisplayValue('Test task 1');
    const saveButton = screen.getByText('Save');
    
    // Change the text and save
    fireEvent.change(editInput, { target: { value: 'Updated task 1' } });
    fireEvent.click(saveButton);
    
    expect(mockHandlers.onUpdateTask).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        text: 'Updated task 1'
      })
    );
  });
});
