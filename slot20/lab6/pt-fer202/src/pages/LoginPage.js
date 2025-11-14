import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getUsers } from '../services/api';
import ConfirmModal from '../components/ConfirmModal';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [successUser, setSuccessUser] = useState(null);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!username.trim()) {
      newErrors.username = 'Username or Email is required.';
    }
    
    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertMessage('');
    
    if (!validateForm()) {
      return;
    }

    try {
      const response = await getUsers();
      const users = response.data;
      
      const user = users.find(
        (u) => (u.username === username || u.email === username) && u.password === password
      );

      if (!user) {
        setAlertMessage('Invalid username/email or password!');
        return;
      }

      // Check if user is admin and active
      if (user.role !== 'admin' || user.status !== 'active') {
        setAlertMessage('Tài khoản bị khóa hoặc bạn không có quyền truy cập!');
        return;
      }

      setSuccessUser(user);
      setShowModal(true);
    } catch (error) {
      setAlertMessage('An error occurred. Please try again.');
    }
  };

  const handleModalConfirm = () => {
    login(successUser);
    setShowModal(false);
    navigate('/home');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '400px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">TuitionTracker</h2>
          <h5 className="text-center mb-4">Login</h5>
          
          {alertMessage && <Alert variant="danger">{alertMessage}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username or Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username or email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
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

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <ConfirmModal
        show={showModal}
        title="Login Successful"
        message={`Welcome, ${successUser?.fullName}! Login successful.`}
        onConfirm={handleModalConfirm}
        onCancel={() => setShowModal(false)}
      />
    </Container>
  );
};

export default LoginPage;