import React from 'react';
import { TextField, Button, Typography, CircularProgress } from '@mui/material';

const UsernameStep = ({ onUsernameSubmit, username, setUsername, loading, inputAdornment, textFieldSx }) => {
  return (
    <form onSubmit={onUsernameSubmit}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Welcome!
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Enter your phone mumber or email to log in or get started.
      </Typography>
      <TextField
        label="Phone/Email"
        placeholder="Phone/Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        InputProps={{
          startAdornment: inputAdornment,
        }}
        sx={textFieldSx}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{ mt: 2, py: 1.5 }}>
        {loading ? <CircularProgress size={24} /> : 'Continue'}
      </Button>
    </form>
  );
};

export default UsernameStep;
