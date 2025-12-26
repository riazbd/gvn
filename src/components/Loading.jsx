import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = ({ isLoading }) => {
  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* Dual-ring spinner with counter rotation */}
          <Box sx={{ position: 'relative', mb: 6 }}>
            <CircularProgress
              size={100}
              thickness={3.5}
              sx={{ color: 'primary.main' }}
            />

            <CircularProgress
              size={100}
              thickness={3.5}
              sx={{
                color: 'secondary.main',
                position: 'absolute',
                left: 0,
                top: 0,
                animation: 'spin-reverse 4s linear infinite',
              }}
            />

            {/* GVN Logo in center */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 44,
                height: 44,
                bgcolor: 'background.paper',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '1.3rem',
                color: 'primary.main',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
              }}
            >
              GVN
            </Box>
          </Box>

          {/* Text */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ textAlign: 'center' }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
              }}
            >
              GVN Loading...
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255, 255, 255, 0.75)',
                fontWeight: 400,
                letterSpacing: '0.8px',
              }}
            >
              Immersive experience initializing
            </Typography>
          </motion.div>

          {/* CSS Animation for reverse spin */}
          <style jsx global>{`
            @keyframes spin-reverse {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(-360deg);
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loading;