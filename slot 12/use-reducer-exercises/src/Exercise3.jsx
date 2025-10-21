import { useState } from 'react';

function Exercise3() {
  // Bước 2: Khởi tạo state
  const [count, setCount] = useState(0);

  // Bước 3: Tạo hàm tăng
  const increment = () => {
    setCount(count + 1);
  };

  // Bước 4: Tạo hàm giảm
  const decrement = () => {
    setCount(count - 1);
  };

  // Bước 5: Render UI
  return (
    <div style={{ padding: '20px', border: '2px solid #ddd', margin: '10px' }}>
      <h2>Exercise 3: Counter</h2>
      <h1>Count: {count}</h1>
      <button onClick={increment} style={{ margin: '5px', padding: '10px' }}>
        Increment
      </button>
      <button onClick={decrement} style={{ margin: '5px', padding: '10px' }}>
        Decrement
      </button>
    </div>
  );
}

export default Exercise3;