import React, { useMemo } from 'react';
import { Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterCategory } from '../features/expenses/expensesSlice';

const FilterCard = () => {
  const dispatch = useDispatch();
  const filterCategory = useSelector((state) => state.expenses.filterCategory);
  const items = useSelector((state) => state.expenses.items);

  // Get unique categories from expenses
  const availableCategories = useMemo(() => {
    const categories = [...new Set(items.map(expense => expense.category))];
    return categories.sort();
  }, [items]);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    dispatch(setFilterCategory(value === 'all' ? '' : value));
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <Card.Title className="mb-3">🔍 Filter</Card.Title>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Select
            value={filterCategory === '' ? 'all' : filterCategory}
            onChange={handleFilterChange}
          >
            <option value="all">All categories</option>
            {availableCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

export default FilterCard;