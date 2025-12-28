import React from 'react';
import { TextField, Button, Typography, CircularProgress } from '@mui/material';

const PasswordStep = ({ onPasswordSubmit, username, password, setPassword, loading, inputAdornment, textFieldSx }) => {
  return (
    <form onSubmit={onPasswordSubmit}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Welcome Back, {username}!
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Please enter your password to continue.
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
          startAdornment: inputAdornment,
        }}
        sx={textFieldSx}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{ mt: 2, py: 1.5 }}>
        {loading ? <CircularProgress size={24} /> : 'Login'}
      </Button>
    </form>
  );
};

export default PasswordStep;
