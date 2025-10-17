// CounterComponent.jsx - Counter with increment, decrement, and reset buttons
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

function CounterComponent() {
  // Initialize state: count is an integer, initial value is 0
  // setCount is the function to update count
  const [count, setCount] = useState(0);

  // Functions to increment, decrement, and reset count
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  // Common style for buttons
  const buttonStyle = {
    margin: '5px',
    padding: '10px 20px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px'
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Bộ Đếm Đa Năng</h2>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
        Giá trị hiện tại: {count}
      </p>
      
      <Button
        onClick={increment}
        style={{ ...buttonStyle, background: '#007bff', color: 'white' }}
      >
        Tăng (+1)
      </Button>
      
      <Button
        onClick={decrement}
        style={{ ...buttonStyle, background: '#ffc107', color: '#333' }}
      >
        Giảm (-1)
      </Button>
      
      <Button
        onClick={reset}
        style={{ ...buttonStyle, background: 'red', color: 'white' }}
      >
        Reset
      </Button>
    </div>
  );
}

export default CounterComponent;