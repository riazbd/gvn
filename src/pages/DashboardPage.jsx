import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { getPaymentSegments } from '../api/paymentService';
import SerpentTimeline from '../components/dashboard/SerpentTimeline';
import Header from '../components/Header.jsx';


const DashboardPage = () => {
  const [paymentSegments, setPaymentSegments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPaymentSegments = async () => {
      try {
        const { data } = await getPaymentSegments();
        setPaymentSegments(data.payments);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch payment segments.');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentSegments();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <>
      <Header />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Your Dashboard
        </Typography>
        <SerpentTimeline paymentSegments={paymentSegments} />
      </Container>
    </>
  );
};

export default DashboardPage;
