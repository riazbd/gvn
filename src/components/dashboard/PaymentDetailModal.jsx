import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  Box, 
  Typography, 
  IconButton, 
  Alert,
  CircularProgress,
  Button,
  Link
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { getPayment } from '../../api/paymentService';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: '600px' },
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto',
  borderRadius: 3,
};

const PaymentDetailModal = ({ open, onClose, payment }) => {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open && payment) {
      fetchPaymentDetails();
    }
  }, [open, payment]);

  const fetchPaymentDetails = async () => {
    if (!payment?.slug) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await getPayment(payment.slug);
      // Handle both cases: when response includes a "payment" object or when it's directly the payment object
      if (response.data.payment) {
        setPaymentDetails(response.data.payment);
      } else if (response.data.payments) {
        // If payments is an object (not array), use it directly
        setPaymentDetails(response.data.payments);
      } else {
        setPaymentDetails(response.data); // Fallback for direct response
      }
    } catch (err) {
      console.error('Error fetching payment details:', err);
      setError(err.response?.data?.message || 'Failed to fetch payment details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPaymentDetails(null);
    setError('');
    onClose();
  };

  if (!payment) return null;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="payment-detail-modal-title"
      aria-describedby="payment-detail-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, pb: 2, borderBottom: '2px solid #eee' }}>
          <Typography id="payment-detail-modal-title" variant="h5" component="h2" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            Payment Details: {payment.payment_segment}
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : paymentDetails ? (
          <Box>
            <Box sx={{ mb: 3, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                {paymentDetails.payment_segment} Details
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
                <Box sx={{ p: 2, backgroundColor: '#fafafa', borderRadius: 1 }}>
                  <Typography variant="body2" color="text.secondary">Payment ID</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{paymentDetails.id}</Typography>
                </Box>
                <Box sx={{ p: 2, backgroundColor: '#fafafa', borderRadius: 1 }}>
                  <Typography variant="body2" color="text.secondary">Amount</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {paymentDetails.amount ? `$${parseFloat(paymentDetails.amount).toLocaleString()}` : 'Not Specified'}
                  </Typography>
                </Box>
                <Box sx={{ p: 2, backgroundColor: '#fafafa', borderRadius: 1 }}>
                  <Typography variant="body2" color="text.secondary">Payment Status</Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 'bold' }}
                    color={paymentDetails.status === "1" ? "success.main" :
                          paymentDetails.status === "0" ? "warning.main" : "info.main"}
                  >
                    {paymentDetails.status === "1" ? "Confirmed & Paid" :
                     paymentDetails.status === "0" ? "Sent & Pending Approval" : "Not Initiated"}
                  </Typography>
                </Box>
                <Box sx={{ p: 2, backgroundColor: '#fafafa', borderRadius: 1 }}>
                  <Typography variant="body2" color="text.secondary">Admin Approval</Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 'bold' }}
                    color={paymentDetails.is_approved === 1 ? "success.main" :
                          paymentDetails.is_approved === 0 ? "error.main" : "warning.main"}
                  >
                    {paymentDetails.is_approved === 1 ? "Approved" :
                     paymentDetails.is_approved === 0 ? "Awaiting Review" : "Not Yet Evaluated"}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
                <Box sx={{ p: 2, backgroundColor: '#fafafa', borderRadius: 1 }}>
                  <Typography variant="body2" color="text.secondary">Record Created</Typography>
                  <Typography variant="body2">{new Date(paymentDetails.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</Typography>
                </Box>
                <Box sx={{ p: 2, backgroundColor: '#fafafa', borderRadius: 1 }}>
                  <Typography variant="body2" color="text.secondary">Last Updated</Typography>
                  <Typography variant="body2">{new Date(paymentDetails.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</Typography>
                </Box>
              </Box>
            </Box>

            {paymentDetails.image && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                  Payment Proof
                </Typography>
                <Link
                  href={paymentDetails.image.startsWith('data:') ? paymentDetails.image : `${paymentDetails.image}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                >
                  <Box
                    component="img"
                    src={paymentDetails.image.startsWith('data:') ? paymentDetails.image : `${paymentDetails.image}`}
                    alt="Payment proof"
                    sx={{
                      maxWidth: '100%',
                      maxHeight: '300px',
                      objectFit: 'contain',
                      border: '2px solid #e0e0e0',
                      borderRadius: '8px',
                      p: 1,
                      backgroundColor: 'white'
                    }}
                  />
                </Link>
              </Box>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" onClick={handleClose}>
                Close
              </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6">No payment details available.</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              The payment information could not be loaded.
            </Typography>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default PaymentDetailModal;