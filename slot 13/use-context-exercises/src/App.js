// src/App.js
// Áp dụng ThemeProvider để bao bọc toàn bộ ứng dụng
import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import LightSwitch from './components/LightSwitch';
import CounterComponent from './components/CounterComponent';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <ThemeProvider>
      <div style={{ 
        minHeight: '100vh', 
        transition: 'all 0.3s ease',
        padding: '20px'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
          Exercise 1: useContext Demo
        </h1>
        <CounterComponent />
        <br />
        <LightSwitch />
      </div>
    </ThemeProvider>
  );
}

export default App;