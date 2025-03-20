import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BreakManager from '../components/BreakManager';

describe('BreakManager Component', () => {
  const mockProps = {
    phase: 'shortBreak',
    timeLeft: 240, // 4 minutes left
    totalTime: 300, // 5 minutes total
    onSkipBreak: jest.fn(),
    onExtendBreak: jest.fn()
  };

  test('renders short break content correctly', () => {
    render(<BreakManager {...mockProps} />);
    
    // Check for short break title
    expect(screen.getByText('Short Break')).toBeInTheDocument();
    
    // Check for short break tips
    expect(screen.getByText('Quick break time!')).toBeInTheDocument();
    expect(screen.getByText('Stand up and stretch')).toBeInTheDocument();
    
    // Check for progress bar (indirectly)
    expect(screen.getByText('Break progress:')).toBeInTheDocument();
    
    // Check for action buttons
    expect(screen.getByText('Skip Break')).toBeInTheDocument();
    expect(screen.getByText('Extend Break (+5 min)')).toBeInTheDocument();
  });
  
  test('renders long break content correctly', () => {
    const longBreakProps = {
      ...mockProps,
      phase: 'longBreak',
      timeLeft: 1200, // 20 minutes left
      totalTime: 1200 // 20 minutes total
    };
    
    render(<BreakManager {...longBreakProps} />);
    
    // Check for long break title
    expect(screen.getByText('Long Break')).toBeInTheDocument();
    
    // Check for long break tips
    expect(screen.getByText(/You've completed 4 Pomodoro sessions/)).toBeInTheDocument();
    expect(screen.getByText('Step away from your computer completely')).toBeInTheDocument();
  });
  
  test('skip break button calls handler', () => {
    render(<BreakManager {...mockProps} />);
    
    const skipButton = screen.getByText('Skip Break');
    fireEvent.click(skipButton);
    
    expect(mockProps.onSkipBreak).toHaveBeenCalled();
  });
  
  test('extend break button calls handler', () => {
    render(<BreakManager {...mockProps} />);
    
    const extendButton = screen.getByText('Extend Break (+5 min)');
    fireEvent.click(extendButton);
    
    expect(mockProps.onExtendBreak).toHaveBeenCalled();
  });
  
  test('does not render when not in break phase', () => {
    const workPhaseProps = {
      ...mockProps,
      phase: 'work'
    };
    
    const { container } = render(<BreakManager {...workPhaseProps} />);
    
    // Component should not render anything
    expect(container).toBeEmptyDOMElement();
  });
});
