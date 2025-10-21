import { useState } from 'react';

function Exercise4() {
  // Bước 1: Khởi tạo state boolean
  const [isVisible, setIsVisible] = useState(true);

  // Bước 2: Tạo hàm toggle
  const toggleVisibility = () => {
    setIsVisible(!isVisible);  // Đảo ngược giá trị: true -> false, false -> true
  };

  // Bước 3: Render với điều kiện
  return (
    <div style={{ padding: '20px', border: '2px solid #ddd', margin: '10px' }}>
      <h2>Exercise 4: Toggle Text</h2>
      
      {/* Button text thay đổi theo state */}
      <button onClick={toggleVisibility} style={{ padding: '10px' }}>
        {isVisible ? 'Hide' : 'Show'} Text
      </button>
      
      {/* Chỉ hiển thị text khi isVisible = true */}
      {isVisible && (
        <p style={{ marginTop: '10px', padding: '10px', background: '#f0f0f0' }}>
          This is some text that can be toggled!
        </p>
      )}
    </div>
  );
}

export default Exercise4;