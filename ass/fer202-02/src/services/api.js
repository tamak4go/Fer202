import axios from 'axios';

const API_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth API
export const loginUser = async (username, password) => {
  try {
    const response = await api.get('/users');
    const users = response.data;
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      const { password, ...userWithoutPassword } = user;
      return { success: true, user: userWithoutPassword };
    }
    return { success: false, message: 'Invalid username or password' };
  } catch (error) {
    return { success: false, message: 'Server error' };
  }
};

// Expenses API
export const getExpensesByUserId = async (userId) => {
  const response = await api.get(`/expenses?userId=${userId}`);
  return response.data;
};

export const addExpense = async (expense) => {
  const response = await api.post('/expenses', expense);
  return response.data;
};

export const updateExpense = async (id, data) => {
  const response = await api.put(`/expenses/${id}`, data);
  return response.data;
};

export const deleteExpense = async (id) => {
  await api.delete(`/expenses/${id}`);
};

export default api;