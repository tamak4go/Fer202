import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import MovieManager from './pages/MovieManager';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Route mặc định chuyển đến login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Route đăng nhập */}
            <Route path="/login" element={<Login />} />
            
            {/* Route quản lý phim - được bảo vệ */}
            <Route 
              path="/movies" 
              element={
                <ProtectedRoute>
                  <MovieManager />
                </ProtectedRoute>
              } 
            />
            
            {/* Route không tồn tại */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;