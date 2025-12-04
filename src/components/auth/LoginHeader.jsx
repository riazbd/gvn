import React, { useContext } from 'react';
import { AppBar, Toolbar, Box, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeContext } from '../../context/ThemeContext.js';

const LoginHeader = () => {
  const { theme: themeMode, toggleTheme } = useContext(ThemeContext);

  return (
    <AppBar position="sticky" component="nav" sx={{ py: 2 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Link to="/">
          <img src="/logo.svg" alt="GVN Logo" style={{ height: '35px', display: 'block' }} />
        </Link>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button sx={{ color: 'text.primary', fontWeight: 500, mx: 1.5 }}>Home</Button>
          </Link>
          <IconButton onClick={toggleTheme} color="inherit" sx={{ ml: 1 }}>
            {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default LoginHeader;
