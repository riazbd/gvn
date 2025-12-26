import React from 'react';
import { Container, Grid, Typography, Box, Paper, TextField, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { motion } from 'framer-motion';

const contactDetails = {
  address: 'SS Tower, House-36, Block-A, Aftabnagar Main Road, Badda, Dhaka-1212, Bangladesh',
  phone: '02226602021',
  email: 'info@gvnconsortium.com',
};

const Contact = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
      email: data.get('email'),
      subject: data.get('subject'),
      message: data.get('message'),
    });
    alert('Thank you for your message! We will get back to you shortly.');
    event.target.reset();
  };


  return (
    <Box
      id="contact"
      className="section"
      sx={{
        py: 8,
        position: 'relative',
        overflow: 'hidden',
        background: theme => theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, rgba(10, 15, 35, 0.7), rgba(15, 25, 55, 0.7))'
          : 'linear-gradient(135deg, rgba(240, 242, 245, 0.7), rgba(230, 233, 239, 0.7))',
      }}
    >
      {/* Decorative background elements */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.05,
        backgroundImage: 'url("/world-map.svg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h2"
              component="h2"
              sx={{
                color: theme => theme.palette.mode === 'dark' ? 'white' : 'black',
                fontWeight: 'bold',
                mb: 2,
                textShadow: theme => theme.palette.mode === 'dark'
                  ? '0 2px 10px rgba(0, 0, 0, 0.5)'
                  : '0 2px 10px rgba(0, 0, 0, 0.1)',
                fontSize: { xs: '2rem', md: '2.5rem' }
              }}
            >
              Contact Us
            </Typography>
            <Typography
              variant="h6"
              sx={{
                maxWidth: '600px',
                mx: 'auto',
                color: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)',
              }}
            >
              Have questions? We'd love to hear from you.
            </Typography>
          </motion.div>
        </Box>

        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            backgroundColor: theme => theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(200, 200, 255, 0.03))'
              : 'linear-gradient(135deg, rgba(0, 0, 0, 0.02), rgba(100, 100, 100, 0.01))',
            backdropFilter: 'blur(10px)',
            border: theme => theme.palette.mode === 'dark'
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : '1px solid rgba(0, 0, 0, 0.05)',
            borderRadius: 2,
            boxShadow: theme => theme.palette.mode === 'dark'
              ? '0 10px 40px rgba(0, 0, 0, 0.3)'
              : '0 10px 40px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            position: 'relative',
            overflow: 'hidden',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: theme => theme.palette.mode === 'dark'
                ? '0 15px 50px rgba(0, 0, 0, 0.4)'
                : '0 15px 50px rgba(0, 0, 0, 0.15)',
            }
          }}
        >
          <Grid container spacing={4}>
            {/* Contact Information - now centered */}
            <Grid item xs={12}>
              {/* Contact Info Cards in a stunning 3-column grid layout */}
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                gap: 4,
                mt: 5
              }}>
                {/* Address Card */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  whileHover={{ y: -12 }}
                  style={{ height: '100%' }}
                >
                  <Paper
                    sx={{
                      p: 4,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      background: theme => theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.05))'
                        : 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.02))',
                      backdropFilter: 'blur(10px)',
                      border: theme => theme.palette.mode === 'dark'
                        ? '1px solid rgba(59, 130, 246, 0.3)'
                        : '1px solid rgba(59, 130, 246, 0.2)',
                      borderRadius: 3,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '5px',
                        background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 3s linear infinite',
                      },
                      '@keyframes shimmer': {
                        '0%': { backgroundPosition: '200% 0' },
                        '100%': { backgroundPosition: '-200% 0' },
                      },
                      '&:hover': {
                        borderColor: theme => theme.palette.mode === 'dark'
                          ? 'rgba(59, 130, 246, 0.6)'
                          : 'rgba(59, 130, 246, 0.4)',
                        boxShadow: theme => theme.palette.mode === 'dark'
                          ? '0 20px 60px rgba(59, 130, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.2)'
                          : '0 20px 60px rgba(59, 130, 246, 0.2), 0 0 40px rgba(139, 92, 246, 0.1)',
                        transform: 'translateY(-8px)',
                      }
                    }}
                  >
                    <Box sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      position: 'relative',
                      '&:before': {
                        content: '""',
                        position: 'absolute',
                        inset: -3,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        opacity: 0.3,
                        filter: 'blur(10px)',
                      }
                    }}>
                      <LocationOnIcon sx={{ fontSize: 42, color: 'white', position: 'relative', zIndex: 1 }} />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: theme => theme.palette.mode === 'dark' ? 'white' : 'black',
                        mb: 2,
                        fontSize: '1.1rem',
                        letterSpacing: '0.5px'
                      }}
                    >
                      Our Location
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.75)',
                        lineHeight: 1.7,
                        fontSize: '0.95rem'
                      }}
                    >
                      {contactDetails.address}
                    </Typography>
                  </Paper>
                </motion.div>

                {/* Phone Card */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ y: -12 }}
                  style={{ height: '100%' }}
                >
                  <Paper
                    sx={{
                      p: 4,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      background: theme => theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))'
                        : 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(5, 150, 105, 0.02))',
                      backdropFilter: 'blur(10px)',
                      border: theme => theme.palette.mode === 'dark'
                        ? '1px solid rgba(16, 185, 129, 0.3)'
                        : '1px solid rgba(16, 185, 129, 0.2)',
                      borderRadius: 3,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '5px',
                        background: 'linear-gradient(90deg, #10b981, #059669, #047857)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 3s linear infinite',
                      },
                      '&:hover': {
                        borderColor: theme => theme.palette.mode === 'dark'
                          ? 'rgba(16, 185, 129, 0.6)'
                          : 'rgba(16, 185, 129, 0.4)',
                        boxShadow: theme => theme.palette.mode === 'dark'
                          ? '0 20px 60px rgba(16, 185, 129, 0.3), 0 0 40px rgba(5, 150, 105, 0.2)'
                          : '0 20px 60px rgba(16, 185, 129, 0.2), 0 0 40px rgba(5, 150, 105, 0.1)',
                        transform: 'translateY(-8px)',
                      }
                    }}
                  >
                    <Box sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      position: 'relative',
                      '&:before': {
                        content: '""',
                        position: 'absolute',
                        inset: -3,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        opacity: 0.3,
                        filter: 'blur(10px)',
                      }
                    }}>
                      <PhoneIcon sx={{ fontSize: 42, color: 'white', position: 'relative', zIndex: 1 }} />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: theme => theme.palette.mode === 'dark' ? 'white' : 'black',
                        mb: 2,
                        fontSize: '1.1rem',
                        letterSpacing: '0.5px'
                      }}
                    >
                      Call Us
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.75)',
                        lineHeight: 1.7,
                        fontSize: '1.05rem',
                        fontWeight: 500
                      }}
                    >
                      {contactDetails.phone}
                    </Typography>
                  </Paper>
                </motion.div>

                {/* Email Card */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={{ y: -12 }}
                  style={{ height: '100%' }}
                >
                  <Paper
                    sx={{
                      p: 4,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      background: theme => theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(217, 119, 6, 0.05))'
                        : 'linear-gradient(135deg, rgba(245, 158, 11, 0.05), rgba(217, 119, 6, 0.02))',
                      backdropFilter: 'blur(10px)',
                      border: theme => theme.palette.mode === 'dark'
                        ? '1px solid rgba(245, 158, 11, 0.3)'
                        : '1px solid rgba(245, 158, 11, 0.2)',
                      borderRadius: 3,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '5px',
                        background: 'linear-gradient(90deg, #f59e0b, #d97706, #b45309)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 3s linear infinite',
                      },
                      '&:hover': {
                        borderColor: theme => theme.palette.mode === 'dark'
                          ? 'rgba(245, 158, 11, 0.6)'
                          : 'rgba(245, 158, 11, 0.4)',
                        boxShadow: theme => theme.palette.mode === 'dark'
                          ? '0 20px 60px rgba(245, 158, 11, 0.3), 0 0 40px rgba(217, 119, 6, 0.2)'
                          : '0 20px 60px rgba(245, 158, 11, 0.2), 0 0 40px rgba(217, 119, 6, 0.1)',
                        transform: 'translateY(-8px)',
                      }
                    }}
                  >
                    <Box sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      position: 'relative',
                      '&:before': {
                        content: '""',
                        position: 'absolute',
                        inset: -3,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                        opacity: 0.3,
                        filter: 'blur(10px)',
                      }
                    }}>
                      <EmailIcon sx={{ fontSize: 42, color: 'white', position: 'relative', zIndex: 1 }} />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: theme => theme.palette.mode === 'dark' ? 'white' : 'black',
                        mb: 2,
                        fontSize: '1.1rem',
                        letterSpacing: '0.5px'
                      }}
                    >
                      Email Us
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.75)',
                        lineHeight: 1.7,
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        wordBreak: 'break-word'
                      }}
                    >
                      {contactDetails.email}
                    </Typography>
                  </Paper>
                </motion.div>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Contact;