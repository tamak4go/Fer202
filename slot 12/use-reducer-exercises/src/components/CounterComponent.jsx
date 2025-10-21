import React, { useReducer } from 'react';
import { Button, Card } from 'react-bootstrap';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

function CounterComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Card className="p-4 mt-3 text-center">
      <h3>Bộ Đếm Đa Năng</h3>
      <h4>{state.count}</h4>
      <div className="mt-3">
        <Button variant="primary" onClick={() => dispatch({ type: 'increment' })}>
          Tăng (+1)
        </Button>{' '}
        <Button variant="warning" onClick={() => dispatch({ type: 'decrement' })}>
          Giảm (-1)
        </Button>{' '}
        <Button variant="danger" onClick={() => dispatch({ type: 'reset' })}>
          Reset
        </Button>
      </div>
    </Card>
  );
}

export default CounterComponent;
