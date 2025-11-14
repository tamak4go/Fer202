import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice';
import { loginUser } from '../services/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    const result = await loginUser(username, password);
    
    if (result.success) {
      dispatch(loginSuccess(result.user));
      navigate('/home');
    } else {
      setErrors({ form: result.message });
    }
    
    setLoading(false);
  };

  return (
    <Container 
      className="d-flex justify-content-center align-items-center" 
      style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
    >
      <Card style={{ width: '450px' }} className="shadow-lg">
        <Card.Body className="p-5">
          <div className="text-center mb-4">
            <h2 className="text-primary mb-2">💰 Personal Budget</h2>
            <p className="text-muted">Sign in to manage your expenses</p>
          </div>

          {errors.form && <Alert variant="danger">{errors.form}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 py-2"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </Form>

          <div className="mt-4 p-3 bg-light rounded">
            <small className="text-muted d-block mb-2"><strong>Demo Accounts:</strong></small>
            <small className="d-block">👤 john_doe / password123</small>
            <small className="d-block">👤 jane_smith / securepass456</small>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;