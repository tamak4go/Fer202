import { useState } from 'react';

function Exercise6() {
  // Bước 1: Khởi tạo state cho màu nền
  const [bgColor, setBgColor] = useState('white');

  // Bước 2: Tạo các hàm đổi màu
  const changeToRed = () => {
    setBgColor('red');
  };

  const changeToBlue = () => {
    setBgColor('blue');
  };

  const changeToGreen = () => {
    setBgColor('green');
  };

  const changeToYellow = () => {
    setBgColor('yellow');
  };

  const reset = () => {
    setBgColor('white');
  };

  // Bước 3: Apply màu nền động
  return (
    <div 
      style={{ 
        backgroundColor: bgColor,  // Màu nền thay đổi theo state
        padding: '20px', 
        border: '2px solid #ddd', 
        margin: '10px',
        minHeight: '200px',
        transition: 'background-color 0.3s'  // Hiệu ứng chuyển màu mượt
      }}
    >
      <h2>Exercise 6: Background Color Changer</h2>
      <p>Current Color: <strong>{bgColor}</strong></p>
      
      <div style={{ marginTop: '10px' }}>
        <button 
          onClick={changeToRed} 
          style={{ margin: '5px', padding: '10px', backgroundColor: 'red', color: 'white' }}
        >
          Red
        </button>
        <button 
          onClick={changeToBlue} 
          style={{ margin: '5px', padding: '10px', backgroundColor: 'blue', color: 'white' }}
        >
          Blue
        </button>
        <button 
          onClick={changeToGreen} 
          style={{ margin: '5px', padding: '10px', backgroundColor: 'green', color: 'white' }}
        >
          Green
        </button>
        <button 
          onClick={changeToYellow} 
          style={{ margin: '5px', padding: '10px', backgroundColor: 'yellow' }}
        >
          Yellow
        </button>
        <button 
          onClick={reset} 
          style={{ margin: '5px', padding: '10px', backgroundColor: 'gray', color: 'white' }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Exercise6;