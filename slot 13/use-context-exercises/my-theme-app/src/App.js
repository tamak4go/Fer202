import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import CounterComponent from './components/CounterComponent';
import LightSwitch from './components/LightSwitch';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <ThemeProvider>
      <div style={{ minHeight: '100vh', padding: '24px', transition: 'all 0.25s ease' }}>
        <CounterComponent />
        <LightSwitch />
      </div>
    </ThemeProvider>
  );
}

export default App;
