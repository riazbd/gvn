import React, { useState, useEffect, useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Avatar,
  Typography
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon
} from '@mui/icons-material';
import { Link as ScrollLink } from 'react-scroll';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeContext } from '../context/ThemeContext.js';
import { useAuth } from '../context/AuthContext.jsx';

const navItems = [
  { label: 'Home', to: 'hero', isScrollLink: true },
  { label: 'About', to: 'about', isScrollLink: true },
  { label: 'Services', to: 'services', isScrollLink: true },
  { label: 'Gallery', to: 'gallery', isScrollLink: true },
  { label: 'Contact', to: 'contact', isScrollLink: true },
];

const Header = () => {
  const muiTheme = useTheme();
  const { theme: themeMode, toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated, logout, user } = useAuth();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // Removed notifications

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          py: 2,
          background: 'linear-gradient(135deg, #0a0f23, #0f1937)',
          color: 'white'
        }}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              background: 'white',
              color: '#1e3a8a',
              fontWeight: 'bold',
              fontSize: 16
            }}
          >
            G
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
            GVN Consortium
          </Typography>
        </Box>
      </Link>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            {location.pathname === '/' ? (
              <ScrollLink
                to={item.to}
                spy={true}
                smooth="linear"
                offset={-70}
                duration={500}
                activeClass="active"
                style={{ textDecoration: 'none', width: '100%', color: 'inherit' }}
                onClick={handleDrawerToggle}
              >
                <ListItemButton
                  sx={{
                    textAlign: 'center',
                    borderRadius: '12px',
                    mx: 2,
                    my: 1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: theme => theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(0, 0, 0, 0.1)',
                      transform: 'translateX(8px)',
                    }
                  }}
                >
                  <ListItemText primary={item.label} sx={{ color: theme => theme.palette.mode === 'dark' ? 'white' : 'black' }} />
                </ListItemButton>
              </ScrollLink>
            ) : (
              <Link
                to={`/#${item.to}`}
                style={{ textDecoration: 'none', width: '100%', color: 'inherit' }}
                onClick={handleDrawerToggle}
              >
                <ListItemButton
                  sx={{
                    textAlign: 'center',
                    borderRadius: '12px',
                    mx: 2,
                    my: 1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: theme => theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(0, 0, 0, 0.1)',
                      transform: 'translateX(8px)',
                    }
                  }}
                >
                  <ListItemText primary={item.label} sx={{ color: theme => theme.palette.mode === 'dark' ? 'white' : 'black' }} />
                </ListItemButton>
              </Link>
            )}
          </ListItem>
        ))}
        {!isAuthenticated ? (
          <ListItem key="Login" disablePadding>
            <Link to="/login" style={{ textDecoration: 'none', width: '100%', color: 'inherit' }} onClick={handleDrawerToggle}>
              <ListItemButton
                sx={{
                  textAlign: 'center',
                  borderRadius: '12px', // Add border radius
                  mx: 2,
                  my: 1,
                  background: theme => theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.15)'
                    : 'rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: theme => theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.25)'
                      : 'rgba(0, 0, 0, 0.2)',
                    transform: 'translateX(8px)',
                  }
                }}
              >
                <ListItemText primary="Login" sx={{ color: theme => theme.palette.mode === 'dark' ? 'white' : 'black' }} />
              </ListItemButton>
            </Link>
          </ListItem>
        ) : (
          <>
            <ListItem key="Dashboard" disablePadding>
              <Link to="/dashboard" style={{ textDecoration: 'none', width: '100%', color: 'inherit' }} onClick={handleDrawerToggle}>
                <ListItemButton
                  sx={{
                    textAlign: 'center',
                    borderRadius: '12px', // Add border radius
                    mx: 2,
                    my: 1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: theme => theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(0, 0, 0, 0.1)',
                      transform: 'translateX(8px)',
                    }
                  }}
                >
                  <ListItemText primary="Dashboard" sx={{ color: theme => theme.palette.mode === 'dark' ? 'white' : 'black' }} />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem key="Logout" disablePadding>
              <ListItemButton
                onClick={() => { handleLogout(); handleDrawerToggle(); }}
                sx={{
                  textAlign: 'center',
                  borderRadius: '12px', // Add border radius
                  mx: 2,
                  my: 1,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: theme => theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(0, 0, 0, 0.1)',
                    transform: 'translateX(8px)',
                  }
                }}
              >
                <ListItemText primary="Logout" sx={{ color: theme => theme.palette.mode === 'dark' ? 'white' : 'black' }} />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <style>{`
        .nav-link.active {
          color: #3b82f6 !important;
        }
        .nav-link.active button::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 50%;
            transform: translateX(-50%);
            width: 40%;
            height: 2px;
            background-color: #3b82f6;
            transition: width 0.3s;
        }
      `}</style>
      <AppBar
        position="sticky"
        component="nav"
        sx={{
          py: scrolled ? 1 : 2,
          transition: 'padding 0.3s ease, background-color 0.3s ease',
          background: theme => theme.palette.mode === 'dark'
            ? (scrolled
              ? 'linear-gradient(135deg, rgba(10, 15, 35, 0.98) 0%, rgba(15, 25, 55, 0.98) 100%)'
              : 'linear-gradient(135deg, rgba(10, 15, 35, 0.92) 0%, rgba(15, 25, 55, 0.92) 100%)')
            : (scrolled
              ? `linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(245, 245, 245, 0.98) 100%)`
              : `linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(245, 245, 245, 0.92) 100%)`),
          backdropFilter: 'blur(10px)',
          boxShadow: theme => theme.palette.mode === 'dark'
            ? '0 4px 30px rgba(0, 0, 0, 0.3)'
            : '0 4px 30px rgba(0, 0, 0, 0.1)',
          borderRadius: 0,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              component="img"
              src="/gvn-logo.png"
              alt="GVN Consortium Logo"
              sx={{
                width: scrolled ? '140px' : '160px',
                height: 'auto',
                transition: 'width 0.3s ease',
                filter: theme => theme.palette.mode === 'dark' ? 'brightness(0) invert(1)' : 'none',
              }}
            />
          </Link>

          {isMobile ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton onClick={toggleTheme} color="inherit" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 0 }}>
                {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={handleDrawerToggle} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 0 }}>
                <MenuIcon />
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {navItems.map((item) => (
                location.pathname === '/' ? (
                  <ScrollLink
                    key={item.label}
                    to={item.to}
                    spy={true}
                    smooth="linear"
                    offset={-70}
                    duration={500}
                    activeClass="active"
                    style={{ textDecoration: 'none' }}
                  >
                    <Button
                      sx={{
                        color: theme => theme.palette.mode === 'dark' ? 'white' : 'black',
                        fontWeight: 500,
                        mx: 1,
                        position: 'relative',
                        textTransform: 'none',
                        borderRadius: '8px',
                        px: 2,
                        py: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': theme => ({
                          backgroundColor: theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'rgba(0, 0, 0, 0.1)',
                          transform: 'translateY(-2px)',
                        })
                      }}
                    >
                      {item.label}
                    </Button>
                  </ScrollLink>
                ) : (
                  <Link
                    key={item.label}
                    to={`/#${item.to}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Button
                      sx={{
                        color: theme => theme.palette.mode === 'dark' ? 'white' : 'black',
                        fontWeight: 500,
                        mx: 1,
                        position: 'relative',
                        textTransform: 'none',
                        borderRadius: '8px',
                        px: 2,
                        py: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': theme => ({
                          backgroundColor: theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'rgba(0, 0, 0, 0.1)',
                          transform: 'translateY(-2px)',
                        })
                      }}
                    >
                      {item.label}
                    </Button>
                  </Link>
                )
              ))}
              {!isAuthenticated ? (
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <Button
                    sx={{
                      color: theme => theme.palette.mode === 'dark' ? 'white' : 'black',
                      fontWeight: 500,
                      mx: 1,
                      textTransform: 'none',
                      borderRadius: '8px', // Add border radius
                      px: 2,
                      py: 1,
                      background: theme => theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.15)'
                        : 'rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': theme => ({
                        background: theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.25)'
                          : 'rgba(0, 0, 0, 0.2)',
                        transform: 'translateY(-2px)',
                      })
                    }}
                  >
                    Login
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                    <Button
                      sx={{
                        color: theme => theme.palette.mode === 'dark' ? 'white' : 'black',
                        fontWeight: 500,
                        mx: 1,
                        textTransform: 'none',
                        borderRadius: '8px', // Add border radius
                        px: 2,
                        py: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': theme => ({
                          backgroundColor: theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'rgba(0, 0, 0, 0.1)',
                          transform: 'translateY(-2px)',
                        })
                      }}
                    >
                      Dashboard
                    </Button>
                  </Link>

                  <Button
                    onClick={handleLogout}
                    sx={{
                      color: theme => theme.palette.mode === 'dark' ? 'white' : 'black',
                      fontWeight: 500,
                      mx: 1,
                      textTransform: 'none',
                      borderRadius: '8px', // Add border radius
                      px: 2,
                      py: 1,
                      transition: 'all 0.3s ease',
                      '&:hover': theme => ({
                        backgroundColor: theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.1)'
                          : 'rgba(0, 0, 0, 0.1)',
                        transform: 'translateY(-2px)',
                      })
                    }}
                  >
                    Logout
                  </Button>
                </>
              )}
              <IconButton
                onClick={toggleTheme}
                color="inherit"
                sx={{
                  backgroundColor: theme => theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px', // Add border radius
                  ml: 1,
                  transition: 'all 0.3s ease',
                  '&:hover': theme => ({
                    backgroundColor: theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.2)'
                      : 'rgba(0, 0, 0, 0.2)',
                    transform: 'translateY(-2px)',
                  })
                }}
              >
                {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          anchor="right"
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 280,
              background: theme => theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #0a0f23 0%, #0f1937 100%)'
                : 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
              backdropFilter: 'blur(10px)',
              color: theme => theme.palette.mode === 'dark' ? 'white' : 'black',
              overflow: 'hidden',
              borderRadius: 0
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
};

export default Header;