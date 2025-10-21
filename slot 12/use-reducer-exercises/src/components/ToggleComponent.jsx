import React, { useReducer } from 'react';
import { Button, Card } from 'react-bootstrap';

const initialState = { isOn: false };

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
      return { isOn: !state.isOn };
    default:
      return state;
  }
}

function ToggleComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Card className="p-4 mt-3 text-center">
      <h3>Bật / Tắt Trạng Thái</h3>
      <h4 style={{ color: state.isOn ? 'green' : 'red' }}>
        {state.isOn ? 'ON 🔆' : 'OFF 🌙'}
      </h4>
      <Button
        variant={state.isOn ? 'danger' : 'success'}
        onClick={() => dispatch({ type: 'TOGGLE' })}
      >
        {state.isOn ? 'Tắt' : 'Bật'}
      </Button>
    </Card>
  );
}

export default ToggleComponent;
