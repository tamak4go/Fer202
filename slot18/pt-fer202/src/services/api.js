import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const getUsers = () => axios.get(`${API_URL}/users`);
export const getPayments = () => axios.get(`${API_URL}/payments`);
export const createPayment = (payload) => axios.post(`${API_URL}/payments`, payload);
export const updateUser = (id, data) => axios.patch(`${API_URL}/users/${id}`, data);