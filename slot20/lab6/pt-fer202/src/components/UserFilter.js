import React from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';

const UserFilter = ({ searchTerm, setSearchTerm, roleFilter, setRoleFilter, statusFilter, setStatusFilter }) => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Search Username or Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Filter by Role</Form.Label>
              <Form.Select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Filter by Status</Form.Label>
              <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="locked">Locked</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default UserFilter;
