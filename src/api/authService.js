import axios from 'axios';
import apiClient from './index';

export const checkUser = (username) => {
  return apiClient.get(`/username?username=${username}`);
};

export const setPassword = ({ username, password, password_confirmation }) => {
  return apiClient.put('/set-password', {
    username,
    password,
    password_confirmation,
  });
};

export const login = async ({ email, password }) => {
  // Use global axios for the CSRF cookie request to the absolute URL, as it's not under the /api prefix
  await axios.get('https://back.gvnconsortium.com/sanctum/csrf-cookie', {
    withCredentials: true,
  });

  // Then, proceed with the login POST request using apiClient, which will be proxied in dev
  return apiClient.post('/login', { email, password });
};

export const logout = () => {
  return apiClient.post('/logout');
};
