// SearchAccount - Search accounts by username and display as cards
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';

const accounts = [
  { 
    id: 1, 
    username: 'john_doe', 
    password: 'pass123', 
    avatar: 'https://i.pravatar.cc/150?img=1' 
  },
  { 
    id: 2, 
    username: 'jane_smith', 
    password: 'pass456', 
    avatar: 'https://i.pravatar.cc/150?img=2' 
  },
  { 
    id: 3, 
    username: 'bob_wilson', 
    password: 'pass789', 
    avatar: 'https://i.pravatar.cc/150?img=3' 
  },
  { 
    id: 4, 
    username: 'alice_brown', 
    password: 'pass321', 
    avatar: 'https://i.pravatar.cc/150?img=4' 
  },
  { 
    id: 5, 
    username: 'charlie_davis', 
    password: 'pass654', 
    avatar: 'https://i.pravatar.cc/150?img=5' 
  },
];

function SearchAccount() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter accounts based on username
  const filteredAccounts = accounts.filter(account =>
    account.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-4">
      <h3 className="text-center mb-4">Tìm kiếm tài khoản</h3>
      
      <Form.Group className="mb-4">
        <Form.Control
          type="text"
          placeholder="Nhập username để tìm kiếm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: '500px', margin: '0 auto' }}
        />
      </Form.Group>

      <Row>
        {filteredAccounts.length > 0 ? (
          filteredAccounts.map(account => (
            <Col md={4} sm={6} key={account.id} className="mb-4">
              <Card>
                <Card.Img 
                  variant="top" 
                  src={account.avatar} 
                  alt={account.username}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{account.username}</Card.Title>
                  <Card.Text>
                    <strong>ID:</strong> {account.id}<br />
                    <strong>Password:</strong> {'*'.repeat(account.password.length)}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col className="text-center">
            <p className="text-muted" style={{ fontSize: '18px', marginTop: '40px' }}>
              Không tìm thấy kết quả
            </p>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default SearchAccount;