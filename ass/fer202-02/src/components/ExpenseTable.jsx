import React, { useState } from 'react';
import { Card, Table, Button, Modal, Alert, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { removeExpense } from '../features/expenses/expensesSlice';

const ExpenseTable = ({ onEdit }) => {
  const dispatch = useDispatch();
  const { filteredItems, loading } = useSelector((state) => state.expenses);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  const handleDeleteClick = (expense) => {
    setExpenseToDelete(expense);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (expenseToDelete) {
      dispatch(removeExpense(expenseToDelete.id));
    }
    setShowDeleteModal(false);
    setExpenseToDelete(null);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setExpenseToDelete(null);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  if (loading) {
    return (
      <Card className="shadow-sm">
        <Card.Body className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading expenses...</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="mb-3">📊 Expense Management</Card.Title>
          
          {filteredItems.length === 0 ? (
            <Alert variant="info">
              No expenses found. Add your first expense above!
            </Alert>
          ) : (
            <Table striped bordered hover responsive>
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th style={{ width: '150px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.name}</td>
                    <td className="text-end">{formatCurrency(expense.amount)}</td>
                    <td>
                      <span className="badge bg-primary">{expense.category}</span>
                    </td>
                    <td>{expense.date}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => onEdit(expense)}
                      >
                        ✏️ Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDeleteClick(expense)}
                      >
                        🗑️ Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>⚠️ Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>"{expenseToDelete?.name}"</strong>?
          <Alert variant="warning" className="mt-3 mb-0">
            <small>This action cannot be undone!</small>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ExpenseTable;