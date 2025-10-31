import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Tạo context với giá trị mặc định
export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {}
});

// 2. Provider bọc toàn app
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () =>
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  // Optional: cập nhật background body để dễ thấy theme thay đổi
  useEffect(() => {
    document.body.style.backgroundColor = theme === 'light' ? '#f8f9fa' : '#1e1e1e';
    document.body.style.color = theme === 'light' ? '#000' : '#fff';
  }, [theme]);

  const value = { theme, toggleTheme };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// 3. Custom hook dùng ở component
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
};
