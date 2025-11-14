import React, { useState, useEffect, useMemo } from 'react';
import { Container, Table, Card, Alert, Spinner, Badge, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import FilterBar from '../components/FilterBar';
import { useAuth } from '../contexts/AuthContext';
import {
  fetchPayments,
  selectPayments,
  selectPaymentsError,
  selectPaymentsLoading,
  selectSuccessfulPayments,
} from '../features/payments/paymentsSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const payments = useSelector(selectPayments);
  const successfulPayments = useSelector(selectSuccessfulPayments);
  const isLoading = useSelector(selectPaymentsLoading);
  const error = useSelector(selectPaymentsError);
  const { user } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  const filteredPayments = useMemo(() => {
    let result = [...payments];

    if (searchTerm) {
      result = result.filter(
        (p) =>
          p.semester.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.courseName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortBy) {
      case 'courseAsc':
        result.sort((a, b) => a.courseName.localeCompare(b.courseName));
        break;
      case 'courseDesc':
        result.sort((a, b) => b.courseName.localeCompare(a.courseName));
        break;
      case 'dateAsc':
        result.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'dateDesc':
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'amountAsc':
        result.sort((a, b) => a.amount - b.amount);
        break;
      case 'amountDesc':
        result.sort((a, b) => b.amount - a.amount);
        break;
      default:
        break;
    }

    return result;
  }, [payments, searchTerm, sortBy]);

  return (
    <>
      <Header />
      <Container className="mt-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
          <h2 className="mb-3 mb-md-0">Payment List</h2>
          {user && (
            <Badge bg="secondary" className="fs-6">
              Welcome back, {user.username}
            </Badge>
          )}
        </div>

        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <Row className="mt-3">
          <Col md={6}>
            <Card>
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title>Total Payments</Card.Title>
                  <Card.Text className="fs-3 fw-bold">{payments.length}</Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mt-3 mt-md-0">
            <Card>
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title>Successful Payments</Card.Title>
                  <Card.Text className="fs-3 fw-bold text-success">{successfulPayments.length}</Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}

        <Card className="mt-3">
          <Card.Body>
            {isLoading ? (
              <div className="d-flex justify-content-center align-items-center py-4">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Semester</th>
                    <th>Course Name</th>
                    <th>Amount (VND)</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id}>
                      <td>{payment.id}</td>
                      <td>{payment.semester}</td>
                      <td>{payment.courseName}</td>
                      <td>{payment.amount.toLocaleString()}</td>
                      <td>{new Date(payment.date).toLocaleDateString()}</td>
                      <td>
                        <Badge bg={payment.status === 'SUCCESS' ? 'success' : 'warning'}>{payment.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default HomePage;
