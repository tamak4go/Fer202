import React from 'react';
import './App.css';
import Exercise1to5 from './components/ex1';
import Exercise6to8 from './components/ex2';

function App() {
  return (
    <div className="App">
      <Exercise1to5 />
      <hr style={{margin: '40px 0', border: 'none', height: '2px', background: '#ccc'}} />
      <Exercise6to8 />
    </div>
  );
}

export default App;