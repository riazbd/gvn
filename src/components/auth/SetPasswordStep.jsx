import React from 'react';
import { TextField, Button, Typography, CircularProgress } from '@mui/material';

const SetPasswordStep = ({ onSetPasswordSubmit, username, password, setPassword, confirmPassword, setConfirmPassword, loading, passwordInputAdornment, confirmPasswordInputAdornment, textFieldSx }) => {
  return (
    <form onSubmit={onSetPasswordSubmit}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Create Your Password
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        This will be used to access your account.
      </Typography>
      <TextField
        label="Username/Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        disabled
        sx={textFieldSx}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        InputProps={{
          startAdornment: passwordInputAdornment,
        }}
        sx={textFieldSx}
      />
      <TextField
        label="Confirm Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        InputProps={{
          startAdornment: confirmPasswordInputAdornment,
        }}
        sx={textFieldSx}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{ mt: 2, py: 1.5 }}>
        {loading ? <CircularProgress size={24} /> : 'Set Password and Login'}
      </Button>
    </form>
  );
};

export default SetPasswordStep;
