import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  IconButton, 
  Alert,
  CircularProgress,
  FormControlLabel,
  Switch
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { updatePayment } from '../../api/paymentService';

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

const PaymentUpdateModal = ({ open, onClose, payment, onSuccess }) => {
  const [amount, setAmount] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Update form fields when payment prop changes
  useEffect(() => {
    if (payment) {
      setAmount(payment.amount || '');
    } else {
      setAmount('');
    }
  }, [payment]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.match('image.*')) {
        setError('Please select an image file (JPEG, PNG, etc.)');
        return;
      }
      
      // Validate file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size exceeds 5MB limit');
        return;
      }
      
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      setError('');
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!amount && !imageFile) {
      setError('Please provide either amount or payment proof image');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Send the actual file and amount to the backend
      // The status will be set to 0 by default on the server
      const updateData = {
        amount: amount || undefined,
        image: imageFile  // Send the actual file object
      };

      await updatePayment({ slug: payment.slug, data: updateData });
      onSuccess();
      handleClose();
    } catch (err) {
      console.error('Error submitting payment:', err);
      setError(err.response?.data?.message || 'Failed to submit payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    // Reset form
    setAmount('');
    setImageFile(null);
    setImagePreview(null);
    setStatus('0');
    setError('');
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="payment-update-modal-title"
      aria-describedby="payment-update-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, pb: 2, borderBottom: '2px solid #eee' }}>
          <Typography id="payment-update-modal-title" variant="h5" component="h2" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            Update Payment: {payment?.payment_segment || 'Payment'}
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {payment && (
          <Box sx={{ mb: 3, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
            <Typography id="payment-update-modal-description" variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
              {payment.payment_segment}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Update payment information for this segment
            </Typography>
            {payment.amount && (
              <Box sx={{ mt: 1, pt: 1, borderTop: '1px solid #ddd' }}>
                <Typography variant="body2" color="text.secondary">
                  Current amount: <strong>{payment.amount}</strong>
                  {payment.status === "1" ? " (Verified)" : " (Pending)"}
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            helperText="Enter the payment amount"
            placeholder={payment?.amount || "Enter amount"}
          />

          {/* Status will be set to 0 by default when submitted, indicating payment is sent and pending approval */}

          <Box sx={{ mt: 2, mb: 2 }}>
            <input
              accept="image/*"
              id="image-upload"
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <label htmlFor="image-upload">
              <Button variant="outlined" component="span" fullWidth>
                {imageFile ? "Change Payment Proof" : "Upload Payment Proof"}
              </Button>
            </label>
            {imagePreview && (
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="body2" sx={{ mb: 1 }}>Preview:</Typography>
                <Box
                  component="img"
                  src={imagePreview}
                  alt="Payment proof preview"
                  sx={{
                    maxWidth: '100%',
                    maxHeight: '200px',
                    objectFit: 'contain',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                />
              </Box>
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? 'Updating...' : 'Update Payment'}
            </Button>
            <Button 
              variant="outlined" 
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default PaymentUpdateModal;