import React from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';

const FilterBar = ({ searchTerm, setSearchTerm, sortBy, setSortBy }) => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Search by Semester or Course Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Sort By</Form.Label>
              <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="">Select sorting</option>
                <option value="courseAsc">Course Name A→Z</option>
                <option value="courseDesc">Course Name Z→A</option>
                <option value="dateAsc">Date Ascending</option>
                <option value="dateDesc">Date Descending</option>
                <option value="amountAsc">Amount Ascending</option>
                <option value="amountDesc">Amount Descending</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default FilterBar;