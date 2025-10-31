import React, { useReducer, useMemo } from 'react';
import { Form, Button, Card, Container, Row, Col, Modal, Toast } from 'react-bootstrap';

// ============================================
// BƯỚC 1: KHỞI TẠO TRẠNG THÁI BAN ĐẦU
// ============================================
const initialState = {
  form: {
    username: '',
    email: '',
    password: '',
    confirm: '',
  },
  errors: {},
  showModal: false,
  showToast: false,
};

// ============================================
// BƯỚC 2: ĐỊNH NGHĨA HÀM REDUCER
// ============================================
function signUpReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      // Cập nhật giá trị của một trường trong form
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value,
        },
      };

    case 'SET_ERROR':
      // Cập nhật lỗi cho một trường cụ thể
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.error,
        },
      };

    case 'SET_ALL_ERRORS':
      // Cập nhật tất cả các lỗi (dùng khi submit)
      return {
        ...state,
        errors: action.errors,
      };

    case 'SHOW_MODAL':
      // Hiển thị modal và toast khi submit thành công
      return {
        ...state,
        showModal: true,
        showToast: true,
      };

    case 'HIDE_MODAL':
      // Ẩn modal
      return {
        ...state,
        showModal: false,
      };

    case 'HIDE_TOAST':
      // Ẩn toast
      return {
        ...state,
        showToast: false,
      };

    case 'RESET_FORM':
      // Reset toàn bộ form về trạng thái ban đầu
      return initialState;

    default:
      return state;
  }
}

// ============================================
// VALIDATION HELPERS
// ============================================
const isEmail = (v) => /\S+@\S+\.[A-Za-z]{2,}/.test(v);
const isUsername = (v) => /^[A-Za-z0-9._]{3,}$/.test(v.trim());
const isStrongPassword = (v) =>
  /[A-Z]/.test(v) &&        // có chữ hoa
  /[a-z]/.test(v) &&        // có chữ thường
  /\d/.test(v) &&           // có số
  /[^A-Za-z0-9]/.test(v) && // có ký tự đặc biệt
  v.length >= 8;            // độ dài

const validate = (field, value, password = '') => {
  switch (field) {
    case 'username':
      if (!value.trim()) return 'Username is required';
      if (!isUsername(value)) return '≥ 3 chars, letters/numbers/._ only, no spaces';
      return '';
    case 'email':
      if (!value.trim()) return 'Email is required';
      if (!isEmail(value)) return 'Invalid email format';
      return '';
    case 'password':
      if (!value) return 'Password is required';
      if (!isStrongPassword(value)) return '≥8 chars, upper, lower, number, special';
      return '';
    case 'confirm':
      if (!value) return 'Please confirm password';
      if (value !== password) return 'Passwords do not match';
      return '';
    default:
      return '';
  }
};

// ============================================
// COMPONENT CHÍNH
// ============================================
function SignUpFormWithReducer() {
  // BƯỚC 3: SỬ DỤNG useReducer ĐỂ QUẢN LÝ TRẠNG THÁI
  const [state, dispatch] = useReducer(signUpReducer, initialState);
  const { form, errors, showModal, showToast } = state;

  // Memo hóa lỗi cho toàn bộ form
  const formErrors = useMemo(() => {
    const e = {};
    Object.keys(form).forEach((field) => {
      const err = validate(field, form[field], form.password);
      if (err) e[field] = err;
    });
    return e;
  }, [form]);

  // Form hợp lệ khi không có lỗi
  const isValid = Object.keys(formErrors).length === 0;

  // ============================================
  // ACTION HANDLERS
  // ============================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Cập nhật giá trị
    dispatch({ type: 'UPDATE_FIELD', field: name, value });
    
    // Validate và cập nhật lỗi
    const error = validate(name, value, name === 'confirm' ? form.password : '');
    dispatch({ type: 'SET_ERROR', field: name, error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Kiểm tra lại toàn bộ lỗi
    const newErrors = {};
    Object.keys(form).forEach((field) => {
      const err = validate(field, form[field], form.password);
      if (err) newErrors[field] = err;
    });
    
    dispatch({ type: 'SET_ALL_ERRORS', errors: newErrors });
    
    if (Object.keys(newErrors).length === 0) {
      dispatch({ type: 'SHOW_MODAL' });
    }
  };

  const handleCancel = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  const handleCloseModal = () => {
    dispatch({ type: 'HIDE_MODAL' });
  };

  const handleCloseToast = () => {
    dispatch({ type: 'HIDE_TOAST' });
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={7}>
          <Card>
            <Card.Header>
              <h3 className="text-center">Sign Up (useReducer)</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                    placeholder="Enter username"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    placeholder="Enter email"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    placeholder="Enter password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="confirm" className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirm"
                    value={form.confirm}
                    onChange={handleChange}
                    isInvalid={!!errors.confirm}
                    placeholder="Confirm password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirm}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button variant="primary" type="submit" disabled={!isValid} className="w-100">
                    Submit
                  </Button>
                  <Button variant="outline-secondary" type="button" onClick={handleCancel} className="w-100">
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Toast thông báo submit thành công */}
      <Toast
        show={showToast}
        onClose={handleCloseToast}
        delay={2000}
        autohide
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          minWidth: 220,
          zIndex: 9999,
        }}
      >
        <Toast.Header>
          <strong className="me-auto text-success">Success</strong>
        </Toast.Header>
        <Toast.Body>Submitted successfully!</Toast.Body>
      </Toast>

      {/* Modal hiển thị thông tin đã submit */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <p><strong>Username:</strong> {form.username}</p>
              <p><strong>Email:</strong> {form.email}</p>
              <p><strong>Password:</strong> {form.password}</p>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default SignUpFormWithReducer;