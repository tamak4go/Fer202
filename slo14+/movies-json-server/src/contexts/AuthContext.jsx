import React, { createContext, useContext, useState, useEffect } from 'react';
import movieApi from '../api/movieAPI';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Kiểm tra user từ localStorage khi app khởi động
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Hàm đăng nhập
  const login = async (username, password) => {
    try {
      // Lấy danh sách accounts từ API
      const response = await movieApi.get('/accounts');
      const accounts = response.data;

      // Tìm user khớp với username và password
      const foundUser = accounts.find(
        acc => acc.username === username && acc.password === password
      );

      if (foundUser) {
        // Loại bỏ password trước khi lưu
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        return { success: true, user: userWithoutPassword };
      } else {
        return { success: false, message: 'Tên đăng nhập hoặc mật khẩu không đúng!' };
      }
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error);
      return { success: false, message: 'Đã xảy ra lỗi khi đăng nhập!' };
    }
  };

  // Hàm đăng xuất
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};