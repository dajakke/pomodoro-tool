import React from 'react';
import styled from 'styled-components';

// Modal component for settings
const SettingsModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 80%;
  max-width: 500px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h2 {
    margin: 0;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
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
`;

const NumberInput = styled.input.attrs({ type: 'number' })`
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
`;

const ToggleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Toggle = styled.input.attrs({ type: 'checkbox' })`
  width: 40px;
  height: 20px;
  appearance: none;
  background-color: #e0e0e0;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  
  &:checked {
    background-color: #4C9195;
  }
  
  &:before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    top: 2px;
    left: 2px;
    background-color: white;
    transition: 0.3s;
  }
  
  &:checked:before {
    left: 22px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: ${props => props.primary ? '#D95550' : '#e0e0e0'};
  color: ${props => props.primary ? 'white' : 'black'};
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;

const SettingsWireframe = () => {
  return (
    <SettingsModal>
      <ModalContent>
        <ModalHeader>
          <h2>Settings</h2>
          <CloseButton>&times;</CloseButton>
        </ModalHeader>
        
        <SettingsForm>
          <FormGroup>
            <Label htmlFor="pomodoro-duration">Pomodoro Duration (minutes)</Label>
            <NumberInput id="pomodoro-duration" min="1" max="60" defaultValue="25" />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="short-break">Short Break Duration (minutes)</Label>
            <NumberInput id="short-break" min="1" max="15" defaultValue="5" />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="long-break">Long Break Duration (minutes)</Label>
            <NumberInput id="long-break" min="5" max="30" defaultValue="20" />
          </FormGroup>
          
          <FormGroup>
            <ToggleGroup>
              <Toggle id="sound-notifications" defaultChecked />
              <Label htmlFor="sound-notifications">Sound Notifications</Label>
            </ToggleGroup>
          </FormGroup>
          
          <FormGroup>
            <ToggleGroup>
              <Toggle id="auto-start-breaks" defaultChecked />
              <Label htmlFor="auto-start-breaks">Auto-start Breaks</Label>
            </ToggleGroup>
          </FormGroup>
          
          <ButtonGroup>
            <Button>Cancel</Button>
            <Button primary>Save</Button>
          </ButtonGroup>
        </SettingsForm>
      </ModalContent>
    </SettingsModal>
  );
};

export default SettingsWireframe;
