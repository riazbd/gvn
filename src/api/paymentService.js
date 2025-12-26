import apiClient from './index';

export const getPaymentSegments = () => {
  return apiClient.get('/payment-segment');
};

export const getPayment = (slug) => {
  return apiClient.get(`/payment-segment/payment/${slug}`);
};

export const updatePayment = ({ slug, data }) => {
  // Use POST method instead of PUT
  // Send actual file in multipart/form-data format
  const formData = new FormData();

  // Append amount if present
  if (data.amount) {
    formData.append('amount', data.amount);
  }

  // Append file if present
  if (data.image) {
    formData.append('image', data.image);
  }

  // Explicitly set status to 0 for pending
  formData.append('status', '0');

  return apiClient.post(`/payment-segment/payment/${slug}`, formData);
};
