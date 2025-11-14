import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createExpense, modifyExpense } from '../features/expenses/expensesSlice';
import { CATEGORIES } from '../constants/categories';

const ExpenseForm = ({ editingExpense, onCancelEdit }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: '',
    date: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingExpense) {
      setFormData(editingExpense);
    } else {
      resetForm();
    }
  }, [editingExpense]);

  const resetForm = () => {
    setFormData({
      name: '',
      amount: '',
      category: '',
      date: '',
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const expenseData = {
      ...formData,
      amount: parseFloat(formData.amount),
      userId: user.id,
    };

    if (editingExpense) {
      dispatch(modifyExpense({ id: editingExpense.id, data: expenseData }));
      onCancelEdit();
    } else {
      dispatch(createExpense(expenseData));
    }

    resetForm();
  };

  const handleCancel = () => {
    resetForm();
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <Card.Title className="mb-3">
          {editingExpense ? '✏️ Edit Expense' : '➕ Add Expense'}
        </Card.Title>
        
        {Object.keys(errors).length > 0 && (
          <Alert variant="danger">
            Please fix the errors below
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Expense name"
                  value={formData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Amount (VND)</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  placeholder="0"
                  value={formData.amount}
                  onChange={handleChange}
                  isInvalid={!!errors.amount}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.amount}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  isInvalid={!!errors.category}
                >
                  <option value="">Select category</option>
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.category}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Date (DD/MM/YYYY)</Form.Label>
                <Form.Control
                  type="text"
                  name="date"
                  placeholder="15/11/2024"
                  value={formData.date}
                  onChange={handleChange}
                  isInvalid={!!errors.date}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.date}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex gap-2">
            <Button variant="primary" type="submit">
              {editingExpense ? '💾 Save Changes' : '➕ Add Expense'}
            </Button>
            {editingExpense && (
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            )}
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ExpenseForm;