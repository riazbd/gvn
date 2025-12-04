import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Container, Box, Typography, Paper, Avatar, Alert, InputAdornment } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../context/AuthContext.jsx';
import { checkUser, setPassword as apiSetPassword } from '../api/authService';

import Header from '../components/Header.jsx'; // Use the universal Header
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import UsernameStep from '../components/auth/UsernameStep.jsx';
import PasswordStep from '../components/auth/PasswordStep.jsx';
import SetPasswordStep from '../components/auth/SetPasswordStep.jsx';

const pageVariants = {
  initial: {
    opacity: 0,
    x: '-50px',
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: '50px',
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};


const LoginPage = () => {
  const [step, setStep] = useState('PROMPT_USERNAME');
  const [username, setUsername] = useState('');
  const [password, setPasswordState] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const location = useLocation();
  const [redirectMessage, setRedirectMessage] = useState('');

  useEffect(() => {
    if (location.state && location.state.message) {
      setRedirectMessage(location.state.message);
      // Clear the message after it's displayed once
      // This is a common pattern to avoid showing the message again on subsequent renders
      // You might need to adjust this if you want the message to persist on refresh
      window.history.replaceState({}, document.title); // Clears the state from history
    }
  }, [location.state]);


  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setRedirectMessage(''); // Clear redirect message on new attempt
    try {
      const { data } = await checkUser(username);
      setEmail(data.client.email);
      if (data.status === 409) {
        setStep('PROMPT_PASSWORD');
      } else {
        setStep('SET_PASSWORD');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setRedirectMessage(''); // Clear redirect message on new attempt
    try {
      await login({ email, password });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleSetPasswordSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setError('');
    setRedirectMessage(''); // Clear redirect message on new attempt
    try {
      await apiSetPassword({ username, password, password_confirmation: confirmPassword });
      setStep('PROMPT_PASSWORD');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not set password.');
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const textFieldSx = {
    borderRadius: 2,
    '& .MuiOutlinedInput-root': { borderRadius: 2 },
  };

  const usernameAdornment = (
    <InputAdornment position="start">
      <PersonIcon />
    </InputAdornment>
  );

  const passwordAdornment = (
    <InputAdornment position="start">
      <KeyIcon />
    </InputAdornment>
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        backgroundSize: '200% 200%',
        animation: 'gradientAnimation 10s ease infinite',
      }}
    >
      <Header />
      <Container component="main" maxWidth="sm" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Paper
          elevation={12} // Increased elevation
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 4, // Increased border radius
            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)', // Added shadow
            width: '100%',
            maxWidth: 450,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          {(error || redirectMessage) && (
            <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
              {error || redirectMessage}
            </Alert>
          )}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={pageVariants}
              initial="initial"
              animate="in"
              exit="out"
              transition={pageTransition}
              style={{ width: '100%' }}
            >
              {step === 'PROMPT_USERNAME' && (
                <UsernameStep
                  onUsernameSubmit={handleUsernameSubmit}
                  username={username}
                  setUsername={setUsername}
                  loading={loading}
                  inputAdornment={usernameAdornment}
                  textFieldSx={textFieldSx}
                />
              )}
              {step === 'PROMPT_PASSWORD' && (
                <PasswordStep
                  onPasswordSubmit={handlePasswordSubmit}
                  username={username}
                  password={password}
                  setPassword={setPasswordState}
                  loading={loading}
                  inputAdornment={passwordAdornment}
                  textFieldSx={textFieldSx}
                />
              )}
              {step === 'SET_PASSWORD' && (
                <SetPasswordStep
                  onSetPasswordSubmit={handleSetPasswordSubmit}
                  username={username}
                  password={password}
                  setPassword={setPasswordState}
                  confirmPassword={confirmPassword}
                  setConfirmPassword={setConfirmPassword}
                  loading={loading}
                  passwordInputAdornment={passwordAdornment}
                  confirmPasswordInputAdornment={passwordAdornment} // Reusing for consistency
                  textFieldSx={textFieldSx}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;


