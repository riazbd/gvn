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

export const login = ({ email, password }) => {
  return apiClient.post('/login', { email, password });
};

export const logout = () => {
  return apiClient.post('/logout');
};
