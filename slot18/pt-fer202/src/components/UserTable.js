import React, { useState } from 'react';
import { Table, Button, Badge, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { toggleAdminStatus, updateUserStatus } from '../features/users/usersSlice';

const UserTable = ({ users = [] }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleBanAccount = async (user) => {
    const newStatus = user.status === 'active' ? 'locked' : 'active';
    try {
      await dispatch(updateUserStatus({ userId: user.id, status: newStatus })).unwrap();
      alert(`Account ${newStatus === 'locked' ? 'banned' : 'activated'} successfully!`);
    } catch (error) {
      const message = typeof error === 'string' ? error : 'Failed to update user status';
      alert(message);
    }
  };

  const handleToggleAdmin = (user) => {
    dispatch(toggleAdminStatus(user.id));
  };

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <img 
                  src={user.avatar} 
                  alt={user.username}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }}
                />
              </td>
              <td>{user.username}</td>
              <td>{user.fullName}</td>
              <td>
                <Badge bg={user.role === 'admin' ? 'primary' : 'secondary'}>
                  {user.role}
                </Badge>
              </td>
              <td>
                <Badge bg={user.status === 'active' ? 'success' : 'danger'}>
                  {user.status}
                </Badge>
              </td>
              <td>
                <Button 
                  variant="info" 
                  size="sm" 
                  className="me-2"
                  onClick={() => handleViewDetails(user)}
                >
                  View Details
                </Button>
                <Button 
                  variant={user.status === 'active' ? 'danger' : 'success'}
                  size="sm"
                  onClick={() => handleBanAccount(user)}
                >
                  {user.status === 'active' ? 'Ban Account' : 'Activate'}
                </Button>
                <Button
                  variant="warning"
                  size="sm"
                  className="ms-2"
                  onClick={() => handleToggleAdmin(user)}
                >
                  Toggle Admin
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              <p><strong>ID:</strong> {selectedUser.id}</p>
              <p><strong>Username:</strong> {selectedUser.username}</p>
              <p><strong>Full Name:</strong> {selectedUser.fullName}</p>
              <p><strong>Role:</strong> {selectedUser.role}</p>
              <p><strong>Status:</strong> {selectedUser.status}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Back to close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserTable;