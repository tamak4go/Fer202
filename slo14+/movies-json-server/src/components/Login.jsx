import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate
    if (!username || !password) {
      setError('Vui lòng nhập đầy đủ thông tin!');
      setLoading(false);
      return;
    }

    // Gọi hàm login từ AuthContext
    const result = await login(username, password);
    
    if (result.success) {
      // Đăng nhập thành công, chuyển hướng đến trang movies
      navigate('/movies');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '400px' }} className="shadow">
        <Card.Body className="p-4">
          <div className="text-center mb-4">
            <h2 className="text-primary">🎬 Movie Manager</h2>
            <p className="text-muted">Đăng nhập để quản lý phim</p>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Tên đăng nhập</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100"
              disabled={loading}
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>
          </Form>

          <div className="mt-4 p-3 bg-light rounded">
            <small className="text-muted d-block mb-2"><strong>Tài khoản demo:</strong></small>
            <small className="d-block">👤 Admin: <code>admin / admin123</code></small>
            <small className="d-block">👤 User: <code>user / user123</code></small>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;