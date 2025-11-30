
import React, { useState, useEffect, useContext } from 'react';
import { AppBar, Toolbar, Box, Button, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link as ScrollLink } from 'react-scroll';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeContext } from '../context/ThemeContext.js';

const navItems = [
  { label: 'Home', to: 'hero' },
  { label: 'About', to: 'about' },
  { label: 'Services', to: 'services' },
  { label: 'Gallery', to: 'gallery' },
  { label: 'Contact', to: 'contact' },
];

const Header = () => {
  const muiTheme = useTheme();
  const { theme: themeMode, toggleTheme } = useContext(ThemeContext);
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <img src="/logo.svg" alt="GVN Logo" style={{ margin: '1rem 0', height: '30px' }} />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ScrollLink to={item.to} spy={true} smooth={true} offset={-70} duration={500} style={{ textDecoration: 'none', width: '100%' }}>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ScrollLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <style>{`
        .nav-link.active {
          color: ${muiTheme.palette.primary.main} !important;
        }
        .nav-link.active button::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 50%;
            transform: translateX(-50%);
            width: 40%;
            height: 2px;
            background-color: ${muiTheme.palette.primary.main};
            transition: width 0.3s;
        }
      `}</style>
      <AppBar
        position="sticky"
        component="nav"
        sx={{
          py: scrolled ? 1 : 2,
          transition: 'padding 0.3s ease, background-color 0.3s ease',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <ScrollLink to="hero" spy={true} smooth={true} offset={-70} duration={500} style={{cursor: 'pointer'}}>
            <img src="/logo.svg" alt="GVN Logo" style={{ height: scrolled ? '30px' : '35px', transition: 'height 0.3s ease', display: 'block' }} />
          </ScrollLink>
          
          {isMobile ? (
            <Box>
                <IconButton onClick={toggleTheme} color="inherit">
                    {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={handleDrawerToggle}>
                    <MenuIcon />
                </IconButton>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {navItems.map((item) => (
                <ScrollLink key={item.label} to={item.to} spy={true} smooth={true} offset={-70} duration={500} className="nav-link" activeClass="active">
                  <Button sx={{ color: 'text.primary', fontWeight: 500, mx: 1.5, position: 'relative' }}>{item.label}</Button>
                </ScrollLink>
              ))}
              <IconButton onClick={toggleTheme} color="inherit" sx={{ ml: 1 }}>
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
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240,  bgcolor: 'background.default' },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
};

export default Header;
