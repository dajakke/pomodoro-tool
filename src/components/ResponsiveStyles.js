import React from 'react';
import styled from 'styled-components';

// Global styles
const GlobalStyles = styled.div`
  font-family: 'Roboto', sans-serif;
  color: #333333;
  
  * {
    box-sizing: border-box;
  }
`;

// Responsive container
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

// Responsive grid layout
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Card component for sections
const Card = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: 100%;
`;

// Header styles
const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
  
  h1 {
    color: #D95550;
    font-size: 2.5rem;
    margin-bottom: 10px;
  }
  
  p {
    color: #666;
    font-size: 1.1rem;
  }
`;

// Section title
const SectionTitle = styled.h2`
  color: #333;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
  margin-top: 0;
`;

// Responsive CSS for the main components
const ResponsiveStyles = () => {
  return (
    <GlobalStyles>
      <Container>
        <Header>
          <h1>Pomodoro Tool - Responsive Design</h1>
          <p>Responsive layout examples for different screen sizes</p>
        </Header>
        
        <Grid>
          <Card>
            <SectionTitle>Desktop Layout (>768px)</SectionTitle>
            <ul>
              <li>Two-column grid layout</li>
              <li>Task list on the left</li>
              <li>Timer and controls on the right</li>
              <li>Full width header and footer</li>
              <li>Settings modal centered on screen</li>
              <li>Notifications in bottom right corner</li>
            </ul>
            
            <pre>
{`
+-----------------------------------------------+
|                  Header                       |
+-----------------------------------------------+
|                                               |
|  +-------------------+  +------------------+  |
|  |                   |  |                  |  |
|  |   Task List View  |  |  Timer Display   |  |
|  |                   |  |                  |  |
|  |                   |  |  Status Indicator|  |
|  |                   |  |                  |  |
|  |                   |  |  Control Buttons |  |
|  |                   |  |                  |  |
|  +-------------------+  +------------------+  |
|                                               |
+-----------------------------------------------+
|                  Footer                       |
+-----------------------------------------------+
`}
            </pre>
          </Card>
          
          <Card>
            <SectionTitle>Mobile Layout (≤768px)</SectionTitle>
            <ul>
              <li>Single-column stacked layout</li>
              <li>Timer and controls at the top</li>
              <li>Task list below the timer</li>
              <li>Full width header and footer</li>
              <li>Settings modal takes up most of the screen</li>
              <li>Notifications in bottom center</li>
            </ul>
            
            <pre>
{`
+-------------------+
|      Header       |
+-------------------+
|                   |
|   Timer Display   |
|                   |
| Status Indicator  |
|                   |
|  Control Buttons  |
+-------------------+
|                   |
|  Task List View   |
|                   |
+-------------------+
|      Footer       |
+-------------------+
`}
            </pre>
          </Card>
        </Grid>
        
        <div style={{ marginTop: '30px' }}>
          <SectionTitle>Responsive Design Principles</SectionTitle>
          <ul>
            <li>Fluid layouts that adapt to different screen sizes</li>
            <li>Mobile-first approach with progressive enhancement</li>
            <li>Appropriate touch targets for mobile users (min 44px)</li>
            <li>Readable typography at all screen sizes</li>
            <li>Consistent spacing and alignment</li>
            <li>Optimized performance for all devices</li>
          </ul>
        </div>
      </Container>
    </GlobalStyles>
  );
};

export default ResponsiveStyles;
