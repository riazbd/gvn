import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { getPaymentSegments } from '../api/paymentService';
import SnakeTimeline from '../components/dashboard/SnakeTimeline';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { AccountBalance, Receipt, Checklist, Verified } from '@mui/icons-material';

const DashboardPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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

  // Calculate summary data for dashboard cards
  const summaryData = React.useMemo(() => {
    if (!paymentSegments) return { total: 0, completed: 0, pending: 0, amount: 0 };

    const total = paymentSegments.length;
    const completed = paymentSegments.filter(segment => segment.status === "1").length;
    const pending = paymentSegments.filter(segment => segment.status === "0").length;
    const amount = paymentSegments
      .filter(segment => segment.amount)
      .reduce((sum, segment) => sum + parseFloat(segment.amount || 0), 0);

    return { total, completed, pending, amount };
  }, [paymentSegments]);

  if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '70vh',
        background: theme => theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #0a0f23 0%, #0f1937 100%)'
          : 'linear-gradient(135deg, #f0f2f5 0%, #e6e9ef 100%)'
      }}>
        <CircularProgress size={60} thickness={4} sx={{ color: theme => theme.palette.primary.main }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error"
          sx={{
            borderRadius: 0,
            boxShadow: 2,
            background: theme => theme.palette.mode === 'dark'
              ? 'rgba(239, 68, 68, 0.2)'
              : 'rgba(239, 68, 68, 0.1)',
            backdropFilter: 'blur(10px)',
            color: theme => theme.palette.mode === 'dark' ? '#fff' : '#000'
          }}
        >
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: theme => theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #0a0f23 0%, #0f1937 100%)'
          : 'linear-gradient(135deg, #f0f2f5 0%, #e6e9ef 100%)',
      }}>
        <Header />
        <Box sx={{ flex: 1 }}>

          <Container maxWidth="lg" sx={{ mt: 4 }}>
            {/* Welcome Section */}
            <Box sx={{
              textAlign: 'center',
              mb: 4,
              background: theme => theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: 0,
              p: 4,
              boxShadow: theme => theme.palette.mode === 'dark'
                ? '0 10px 40px rgba(0, 0, 0, 0.3)'
                : '0 10px 40px rgba(0, 0, 0, 0.1)',
            }}>
              <Typography
                variant={isMobile ? "h4" : "h3"}
                component="h1"
                gutterBottom
                sx={{
                  color: theme => theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  fontWeight: 700,
                  textShadow: theme => theme.palette.mode === 'dark'
                    ? '0 2px 10px rgba(0, 0, 0, 0.5)'
                    : '0 2px 10px rgba(0, 0, 0, 0.1)',
                }}
              >
                Your Payment Journey
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  maxWidth: 600,
                  mx: 'auto',
                  color: theme => theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.85)'
                    : 'rgba(0, 0, 0, 0.8)',
                  fontSize: '1rem',
                  mt: 1
                }}
              >
                Track your payment progress and manage your payment segments efficiently
              </Typography>
            </Box>

            {/* Summary Cards */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    height: 120,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    background: theme => theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(200, 200, 255, 0.05))'
                      : 'linear-gradient(135deg, rgba(0, 0, 0, 0.03), rgba(100, 100, 100, 0.02))',
                    backdropFilter: 'blur(10px)',
                    boxShadow: theme => theme.palette.mode === 'dark'
                      ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                      : '0 8px 32px rgba(0, 0, 0, 0.08)',
                    borderRadius: 2,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    border: theme => theme.palette.mode === 'dark'
                      ? '1px solid rgba(255, 255, 255, 0.1)'
                      : '1px solid rgba(0, 0, 0, 0.05)',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: theme => theme.palette.mode === 'dark'
                        ? '0 12px 40px rgba(0, 0, 0, 0.4)'
                        : '0 12px 40px rgba(0, 0, 0, 0.15)',
                    }
                  }}
                >
                  <CardContent sx={{ p: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                    <Avatar sx={{
                      width: 48,
                      height: 48,
                      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                      mr: 2,
                      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                    }}>
                      <AccountBalance sx={{ fontSize: 24, color: 'white' }} />
                    </Avatar>
                    <Box sx={{ flex: 1, textAlign: 'left' }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme => theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.8)'
                            : 'rgba(0, 0, 0, 0.7)',
                          fontSize: '0.8rem',
                          mb: 0.5,
                          fontWeight: 500,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                      >
                        Total Payments
                      </Typography>
                      <Typography variant="h5" component="div" sx={{ fontWeight: 700, color: theme => theme.palette.mode === 'dark' ? '#ffffff' : '#000000', lineHeight: 1.2, fontSize: '1.5rem' }}>
                        {summaryData.total}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    height: 120,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    background: theme => theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(200, 255, 200, 0.05))'
                      : 'linear-gradient(135deg, rgba(0, 0, 0, 0.03), rgba(100, 200, 100, 0.02))',
                    backdropFilter: 'blur(10px)',
                    boxShadow: theme => theme.palette.mode === 'dark'
                      ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                      : '0 8px 32px rgba(0, 0, 0, 0.08)',
                    borderRadius: 2,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    border: theme => theme.palette.mode === 'dark'
                      ? '1px solid rgba(255, 255, 255, 0.1)'
                      : '1px solid rgba(0, 0, 0, 0.05)',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: theme => theme.palette.mode === 'dark'
                        ? '0 12px 40px rgba(0, 0, 0, 0.4)'
                        : '0 12px 40px rgba(0, 0, 0, 0.15)',
                    }
                  }}
                >
                  <CardContent sx={{ p: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                    <Avatar sx={{
                      width: 48,
                      height: 48,
                      background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                      mr: 2,
                      boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
                    }}>
                      <Verified sx={{ fontSize: 24, color: 'white' }} />
                    </Avatar>
                    <Box sx={{ flex: 1, textAlign: 'left' }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme => theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.8)'
                            : 'rgba(0, 0, 0, 0.7)',
                          fontSize: '0.8rem',
                          mb: 0.5,
                          fontWeight: 500,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                      >
                        Completed
                      </Typography>
                      <Typography variant="h5" component="div" sx={{ fontWeight: 700, color: theme => theme.palette.mode === 'dark' ? '#22c55e' : '#16a34a', lineHeight: 1.2, fontSize: '1.5rem' }}>
                        {summaryData.completed}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    height: 120,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    background: theme => theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 220, 150, 0.05))'
                      : 'linear-gradient(135deg, rgba(0, 0, 0, 0.03), rgba(200, 150, 50, 0.02))',
                    backdropFilter: 'blur(10px)',
                    boxShadow: theme => theme.palette.mode === 'dark'
                      ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                      : '0 8px 32px rgba(0, 0, 0, 0.08)',
                    borderRadius: 2,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    border: theme => theme.palette.mode === 'dark'
                      ? '1px solid rgba(255, 255, 255, 0.1)'
                      : '1px solid rgba(0, 0, 0, 0.05)',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: theme => theme.palette.mode === 'dark'
                        ? '0 12px 40px rgba(0, 0, 0, 0.4)'
                        : '0 12px 40px rgba(0, 0, 0, 0.15)',
                    }
                  }}
                >
                  <CardContent sx={{ p: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                    <Avatar sx={{
                      width: 48,
                      height: 48,
                      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                      mr: 2,
                      boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
                    }}>
                      <Receipt sx={{ fontSize: 24, color: 'white' }} />
                    </Avatar>
                    <Box sx={{ flex: 1, textAlign: 'left' }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme => theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.8)'
                            : 'rgba(0, 0, 0, 0.7)',
                          fontSize: '0.8rem',
                          mb: 0.5,
                          fontWeight: 500,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                      >
                        Pending
                      </Typography>
                      <Typography variant="h5" component="div" sx={{ fontWeight: 700, color: theme => theme.palette.mode === 'dark' ? '#f59e0b' : '#d97706', lineHeight: 1.2, fontSize: '1.5rem' }}>
                        {summaryData.pending}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    height: 120,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    background: theme => theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(200, 230, 255, 0.05))'
                      : 'linear-gradient(135deg, rgba(0, 0, 0, 0.03), rgba(100, 180, 255, 0.02))',
                    backdropFilter: 'blur(10px)',
                    boxShadow: theme => theme.palette.mode === 'dark'
                      ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                      : '0 8px 32px rgba(0, 0, 0, 0.08)',
                    borderRadius: 2,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    border: theme => theme.palette.mode === 'dark'
                      ? '1px solid rgba(255, 255, 255, 0.1)'
                      : '1px solid rgba(0, 0, 0, 0.05)',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: theme => theme.palette.mode === 'dark'
                        ? '0 12px 40px rgba(0, 0, 0, 0.4)'
                        : '0 12px 40px rgba(0, 0, 0, 0.15)',
                    }
                  }}
                >
                  <CardContent sx={{ p: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                    <Avatar sx={{
                      width: 48,
                      height: 48,
                      background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                      mr: 2,
                      boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)'
                    }}>
                      <Checklist sx={{ fontSize: 24, color: 'white' }} />
                    </Avatar>
                    <Box sx={{ flex: 1, textAlign: 'left' }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme => theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.8)'
                            : 'rgba(0, 0, 0, 0.7)',
                          fontSize: '0.8rem',
                          mb: 0.5,
                          fontWeight: 500,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                      >
                        Total Amount
                      </Typography>
                      <Typography variant="h5" component="div" sx={{ fontWeight: 700, color: theme => theme.palette.mode === 'dark' ? '#ffffff' : '#000000', lineHeight: 1.2, fontSize: '1.5rem' }}>
                        ${summaryData.amount.toLocaleString()}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Timeline Section */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: 2,
                p: 4,
                background: theme => theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(200, 200, 255, 0.03))'
                  : 'linear-gradient(135deg, rgba(0, 0, 0, 0.02), rgba(100, 100, 200, 0.01))',
                backdropFilter: 'blur(10px)',
                boxShadow: theme => theme.palette.mode === 'dark'
                  ? '0 10px 40px rgba(0, 0, 0, 0.3)'
                  : '0 10px 40px rgba(0, 0, 0, 0.1)',
                mb: 4,
                border: theme => theme.palette.mode === 'dark'
                  ? '1px solid rgba(255, 255, 255, 0.1)'
                  : '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                sx={{
                  textAlign: 'center',
                  mb: 3,
                  color: theme => theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  fontWeight: 700,
                  fontSize: '1.4rem',
                  textShadow: theme => theme.palette.mode === 'dark'
                    ? '0 2px 4px rgba(0, 0, 0, 0.5)'
                    : '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
              >
                Payment Progress Timeline
              </Typography>
              <SnakeTimeline paymentSegments={paymentSegments} />
            </Paper>
          </Container>
        </Box> {/* This closes the flex: 1 Box */}
      </Box>
      <Footer />
    </>
  );
};

export default DashboardPage;
