import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaCog, FaBell, FaBellSlash } from 'react-icons/fa';

const SettingsContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const SettingsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h3 {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const SettingsForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 0.9rem;
  color: #555;
`;

const NumberInput = styled.input.attrs({ type: 'number' })`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: #D95550;
  }
`;

const ToggleGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ToggleLabel = styled.span`
  font-size: 0.9rem;
`;

const Toggle = styled.div`
  position: relative;
  width: 50px;
  height: 24px;
  background-color: ${props => props.checked ? '#4C9195' : '#e0e0e0'};
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: white;
    top: 2px;
    left: ${props => props.checked ? '28px' : '2px'};
    transition: left 0.3s;
  }
`;

const SaveButton = styled.button`
  background-color: #D95550;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 10px;
  
  &:hover {
    background-color: #c94540;
  }
`;

const TimerSettings = () => {
  // Timer duration settings
  const [workDuration, setWorkDuration] = useState(25);
  const [shortBreakDuration, setShortBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(20);
  
  // Notification settings
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoStartBreaks, setAutoStartBreaks] = useState(true);
  
  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('pomodoro-settings');
    if (savedSettings) {
      const { work, shortBreak, longBreak, sound, autoStart } = JSON.parse(savedSettings);
      setWorkDuration(work);
      setShortBreakDuration(shortBreak);
      setLongBreakDuration(longBreak);
      setSoundEnabled(sound);
      setAutoStartBreaks(autoStart);
    }
  }, []);
  
  // Save settings to localStorage
  const saveSettings = (e) => {
    e.preventDefault();
    
    const settings = {
      work: workDuration,
      shortBreak: shortBreakDuration,
      longBreak: longBreakDuration,
      sound: soundEnabled,
      autoStart: autoStartBreaks
    };
    
    localStorage.setItem('pomodoro-settings', JSON.stringify(settings));
    
    // You could add a success notification here
  };
  
  return (
    <SettingsContainer>
      <SettingsHeader>
        <h3><FaCog /> Timer Settings</h3>
      </SettingsHeader>
      
      <SettingsForm onSubmit={saveSettings}>
        <FormGroup>
          <Label htmlFor="work-duration">Work Duration (minutes)</Label>
          <NumberInput 
            id="work-duration"
            min="1"
            max="60"
            value={workDuration}
            onChange={(e) => setWorkDuration(parseInt(e.target.value, 10) || 25)}
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="short-break">Short Break Duration (minutes)</Label>
          <NumberInput 
            id="short-break"
            min="1"
            max="15"
            value={shortBreakDuration}
            onChange={(e) => setShortBreakDuration(parseInt(e.target.value, 10) || 5)}
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="long-break">Long Break Duration (minutes)</Label>
          <NumberInput 
            id="long-break"
            min="5"
            max="30"
            value={longBreakDuration}
            onChange={(e) => setLongBreakDuration(parseInt(e.target.value, 10) || 20)}
          />
        </FormGroup>
        
        <ToggleGroup>
          <ToggleLabel>
            {soundEnabled ? <FaBell /> : <FaBellSlash />} Sound Notifications
          </ToggleLabel>
          <Toggle 
            checked={soundEnabled}
            onClick={() => setSoundEnabled(!soundEnabled)}
          />
        </ToggleGroup>
        
        <ToggleGroup>
          <ToggleLabel>Auto-start Breaks</ToggleLabel>
          <Toggle 
            checked={autoStartBreaks}
            onClick={() => setAutoStartBreaks(!autoStartBreaks)}
          />
        </ToggleGroup>
        
        <SaveButton type="submit">Save Settings</SaveButton>
      </SettingsForm>
    </SettingsContainer>
  );
};

export default TimerSettings;
