import axios from 'axios';

export const loginApi = axios.create({
  baseURL: process.env.REACT_APP_LOGIN_API_URL || 'http://localhost:5001',
});

export const infoApi = axios.create({
  baseURL: process.env.REACT_APP_INFO_API_URL || 'http://localhost:5002',
});

export const paymentApi = axios.create({
  baseURL: process.env.REACT_APP_PAYMENT_API_URL || 'http://localhost:5003',
});
