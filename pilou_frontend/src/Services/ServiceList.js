// api.js
import axios from 'axios';
import serverURL from './ServerURL';

const BASE_URL = serverURL;

const api = axios.create({
  baseURL: BASE_URL,
});

export const login = async (data) => {
  try {
    const response = await api.post('/user/login', {email: data.email, password: data.password});
    return response.data;
  } catch (error) {
    throw error;
  }
};