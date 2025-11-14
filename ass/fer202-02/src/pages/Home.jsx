import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExpenses } from '../features/expenses/expensesSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FilterCard from '../components/FilterCard';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { filteredItems } = useSelector((state) => state.expenses);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    if (user) {
      dispatch(fetchExpenses(user.id));
    }
  }, [dispatch, user]);

  const totalExpenses = filteredItems.reduce(
    (sum, expense) => sum + parseFloat(expense.amount),
    0
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  return (
    <>
      <Header />
      <Container className="my-4">
        <Row>
          <Col lg={8} className="mb-4">
            {/* Total Expenses Card */}
            <Card className="shadow-sm mb-4 bg-primary text-white">
              <Card.Body>
                <Card.Title className="mb-2">💰 Total of Expenses</Card.Title>
                <h2 className="mb-0 display-4">{formatCurrency(totalExpenses)}</h2>
              </Card.Body>
            </Card>

            {/* Add/Edit Expense Form */}
            <ExpenseForm 
              editingExpense={editingExpense}
              onCancelEdit={handleCancelEdit}
            />

            {/* Expense Table */}
            <ExpenseTable onEdit={handleEdit} />
          </Col>

          <Col lg={4}>
            {/* Filter Card */}
            <FilterCard />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Home;