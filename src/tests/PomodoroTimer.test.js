import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import PomodoroTimer from '../components/PomodoroTimer';

describe('PomodoroTimer Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders timer display with correct initial time', () => {
    render(<PomodoroTimer />);
    
    // Check for timer display showing 25:00
    expect(screen.getByText('25:00')).toBeInTheDocument();
    
    // Check for work phase indicator
    expect(screen.getByText(/Work Phase/)).toBeInTheDocument();
  });
  
  test('timer counts down when started', () => {
    render(<PomodoroTimer />);
    
    // Find start button and timer display
    const startButton = screen.getByRole('button', { name: '' }); // Play button
    
    // Start the timer
    fireEvent.click(startButton);
    
    // Advance time by 5 seconds
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    
    // Check if time has decreased to 24:55
    expect(screen.getByText('24:55')).toBeInTheDocument();
  });
  
  test('timer can be paused and resumed', () => {
    render(<PomodoroTimer />);
    
    // Find start button
    const startButton = screen.getByRole('button', { name: '' }); // Play button
    
    // Start the timer
    fireEvent.click(startButton);
    
    // Advance time by 5 seconds
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    
    // Now the pause button should be visible
    const pauseButton = screen.getByRole('button', { name: '' }); // Pause button
    
    // Pause the timer
    fireEvent.click(pauseButton);
    
    // Get the current time
    const timeAfterPause = screen.getByText(/\d{2}:\d{2}/).textContent;
    
    // Advance time by 5 more seconds
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    
    // Time should not have changed
    expect(screen.getByText(timeAfterPause)).toBeInTheDocument();
    
    // Find start button again and resume
    const resumeButton = screen.getByRole('button', { name: '' }); // Play button again
    fireEvent.click(resumeButton);
    
    // Advance time by 5 more seconds
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    
    // Time should have decreased
    expect(screen.queryByText(timeAfterPause)).not.toBeInTheDocument();
  });
  
  test('timer can be reset', () => {
    render(<PomodoroTimer />);
    
    // Find start button and reset button
    const startButton = screen.getByRole('button', { name: '' }); // Play button
    const resetButton = screen.getAllByRole('button', { name: '' })[1]; // Reset button
    
    // Start the timer
    fireEvent.click(startButton);
    
    // Advance time by 10 seconds
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    
    // Reset the timer
    fireEvent.click(resetButton);
    
    // Check if time has been reset to 25:00
    expect(screen.getByText('25:00')).toBeInTheDocument();
  });
  
  test('timer notifies when completed', () => {
    const mockTimerComplete = jest.fn();
    render(<PomodoroTimer onTimerComplete={mockTimerComplete} />);
    
    // Find start button
    const startButton = screen.getByRole('button', { name: '' }); // Play button
    
    // Start the timer
    fireEvent.click(startButton);
    
    // Advance time to complete the timer (25 minutes = 1500 seconds)
    act(() => {
      jest.advanceTimersByTime(1500000);
    });
    
    // Check if onTimerComplete was called
    expect(mockTimerComplete).toHaveBeenCalledWith('work');
  });
});
