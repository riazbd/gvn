import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = ({ isLoading }) => (
  <AnimatePresence>
    {isLoading && (
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black/90 backdrop-blur-md z-[9999] flex-col text-center p-8"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="mb-6"
          style={{ width: 120, height: 120 }}
        >
          <CircularProgress size={120} thickness={2} sx={{ color: 'primary.main' }} />
          <CircularProgress size={120} thickness={2} sx={{ color: 'secondary.main', position: 'absolute', animation: 'spin-slow' }} />
        </motion.div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Typography variant="h4" className="mb-2">
            GVN Loading...
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Immersive experience initializing
          </Typography>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default Loading;
