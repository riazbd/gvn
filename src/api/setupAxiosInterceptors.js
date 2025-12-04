import apiClient from './index';

export const setupAxiosInterceptors = (navigate) => {
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        console.warn('Unauthorized request (401). Token remains in localStorage as per user instruction.');
      }
      return Promise.reject(error);
    }
  );
};