import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>TuitionTracker</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="me-3">
            <Nav.Link onClick={() => navigate('/home')}>Payments</Nav.Link>
            {user?.role === 'admin' && (
              <Nav.Link onClick={() => navigate('/users')}>User Management</Nav.Link>
            )}
          </Nav>
          <Navbar.Text className="me-3">
            Signed in as <strong>{user?.fullName}</strong>
          </Navbar.Text>
          <Button variant="outline-light" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;