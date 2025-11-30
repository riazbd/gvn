
import { createTheme } from '@mui/material/styles';

const baseConfig = {
    typography: {
        fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 700, fontSize: '3.8rem', letterSpacing: '-1px' },
        h2: { fontWeight: 700, fontSize: '3rem', letterSpacing: '-0.5px' },
        h3: { fontWeight: 600, fontSize: '2.2rem' },
        h4: { fontWeight: 600, fontSize: '1.5rem' },
        body1: { fontSize: '1.1rem', lineHeight: 1.7 },
        button: { textTransform: 'none', fontWeight: 600, fontSize: '1rem' },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 30,
                    padding: '12px 30px',
                },
            },
        },
    },
};

export const darkTheme = createTheme({
    ...baseConfig,
    palette: {
        mode: 'dark',
        primary: { main: '#1976d2' }, // A standard, professional blue
        secondary: { main: '#dc004e' }, // A standard, professional red/pink for accent
        background: { default: '#121212', paper: '#1e1e1e' },
        text: { primary: 'rgba(255, 255, 255, 0.9)', secondary: 'rgba(255, 255, 255, 0.7)' },
    },
    components: {
        ...baseConfig.components,
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 8, // Softer corners
                    border: '1px solid rgba(70, 70, 70, 0.5)', // Subtle gray border
                    background: '#2c2c2c', // Solid, slightly lighter background
                    backdropFilter: 'none', // Remove glassmorphism
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1a1a1a', // Solid background
                    backdropFilter: 'none', // Remove blur
                    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)', // Standard shadow
                    borderBottom: '1px solid rgba(70, 70, 70, 0.5)', // Subtle border
                },
            },
        },
    },
});

export const lightTheme = createTheme({
    ...baseConfig,
    palette: {
        mode: 'light',
        primary: { main: '#1976d2' }, // A standard, professional blue
        secondary: { main: '#dc004e' }, // A standard, professional red/pink for accent
        background: { default: '#f5f5f5', paper: '#ffffff' },
        text: { primary: '#212121', secondary: '#757575' },
    },
    components: {
        ...baseConfig.components,
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    border: '1px solid rgba(200, 200, 200, 0.5)',
                    background: '#ffffff',
                    backdropFilter: 'none',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ffffff',
                    backdropFilter: 'none',
                    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
                    borderBottom: '1px solid rgba(200, 200, 200, 0.5)',
                },
            },
        },
    },
});
