import apiClient from './index';

export const getPaymentSegments = () => {
  return apiClient.get('/payment-segment');
};

export const getPayment = (slug) => {
  return apiClient.get(`/payment-segment/payment/${slug}`);
};

export const updatePayment = ({ slug, data }) => {
  return apiClient.put(`/payment-segment/payment/${slug}`, data);
};
