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

export const getUserList = async (data) => {
  try {
    const token = data.token;
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };  
    
    const response = await api.get('/user/list_users', config);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUserInfo = async (user_id) => {
  try {
    const response = await api.get('/user/user_data/'+user_id);
    return response;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (data) => {
  try {
    const response = await api.post('/user/register', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};