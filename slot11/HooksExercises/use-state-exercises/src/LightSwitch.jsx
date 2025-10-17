// LightSwitch component using useState to toggle light on and off
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

function LightSwitch() {
  // Initialize state: isLightOn is boolean, initial value is false (off)
  // setIsLightOn is the function to update isLightOn
  const [isLightOn, setIsLightOn] = useState(false);

  // Function to toggle light state
  const toggleLight = () => setIsLightOn(!isLightOn); // Toggle current state

  // Common style for button
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
      <h2>Công Tắc Đèn</h2>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
        Đèn hiện đang: {isLightOn ? 'Bật' : 'Tắt'}
      </p>
      
      <Button
        onClick={toggleLight}
        style={{
          ...buttonStyle,
          background: isLightOn ? 'red' : 'green',
          color: 'white'
        }}
      >
        {isLightOn ? 'Tắt Đèn' : 'Bật Đèn'}
      </Button>
    </div>
  );
}

export default LightSwitch;