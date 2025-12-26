import React from 'react';
import { Container, Grid, Typography, Box, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VerifiedIcon from '@mui/icons-material/Verified';
import PublicIcon from '@mui/icons-material/Public';
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';

const About = () => {

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const floatingAnimation = {
    y: [0, -12, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const pulseAnimation = {
    scale: [1, 1.03, 1],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <Box
      id="about"
      className="section"
      sx={{
        py: 10,
        position: 'relative',
        overflow: 'hidden',
        background: theme => theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, rgba(10, 15, 35, 0.95), rgba(20, 30, 60, 0.95))'
          : 'linear-gradient(135deg, rgba(245, 247, 250, 0.95), rgba(235, 240, 248, 0.95))',
      }}
    >
      {/* Elegant Decorative background */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.04,
        backgroundImage: 'url("/world-map.svg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }} />

      {/* Floating Gradient Orbs */}
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '15%',
          left: '8%',
          width: '280px',
          height: '280px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12), transparent)',
          borderRadius: '50%',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }}
      />
      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, 80, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          bottom: '12%',
          right: '10%',
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12), transparent)',
          borderRadius: '50%',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Enhanced Header */}
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  color: theme => theme.palette.mode === 'dark' ? 'white' : 'black',
                  fontWeight: 800,
                  mb: 2,
                  textShadow: theme => theme.palette.mode === 'dark'
                    ? '0 4px 20px rgba(59, 130, 246, 0.25)'
                    : '0 4px 20px rgba(0, 0, 0, 0.08)',
                  fontSize: { xs: '2.2rem', md: '3rem' },
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  position: 'relative',
                  display: 'inline-block',
                  letterSpacing: '-0.02em',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '100px',
                    height: '4px',
                    background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)',
                    borderRadius: '10px',
                    boxShadow: '0 2px 15px rgba(59, 130, 246, 0.4)'
                  }
                }}
              >
                About GVN Consortium
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Typography
                variant="h6"
                sx={{
                  maxWidth: '650px',
                  mx: 'auto',
                  mt: 4,
                  color: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.75)',
                  fontSize: '1.15rem',
                  fontWeight: 500,
                  lineHeight: 1.6
                }}
              >
                Trusted EU work visa consultancy since 2019
              </Typography>
            </motion.div>
          </Box>

          <Grid container spacing={4} alignItems="stretch">
            {/* Enhanced Text Content */}
            <Grid item xs={12} md={7} >
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <Paper
                  sx={{
                    p: 5,
                    height: '100%',
                    minHeight: { xs: 'auto', md: '520px' },
                    background: theme => theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.09), rgba(59, 130, 246, 0.04))'
                      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(59, 130, 246, 0.03))',
                    backdropFilter: 'blur(16px)',
                    border: theme => theme.palette.mode === 'dark'
                      ? '1px solid rgba(59, 130, 246, 0.25)'
                      : '1px solid rgba(59, 130, 246, 0.15)',
                    borderRadius: 4,
                    boxShadow: theme => theme.palette.mode === 'dark'
                      ? '0 20px 50px rgba(0, 0, 0, 0.4), 0 0 30px rgba(59, 130, 246, 0.08)'
                      : '0 20px 50px rgba(0, 0, 0, 0.12), 0 0 30px rgba(59, 130, 246, 0.04)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(135deg, transparent, rgba(59, 130, 246, 0.03))',
                      opacity: 0,
                      transition: 'opacity 0.4s ease',
                    },
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: theme => theme.palette.mode === 'dark'
                        ? '0 25px 60px rgba(0, 0, 0, 0.5), 0 0 50px rgba(59, 130, 246, 0.15)'
                        : '0 25px 60px rgba(0, 0, 0, 0.15), 0 0 50px rgba(59, 130, 246, 0.08)',
                      '&:before': {
                        opacity: 1,
                      }
                    }
                  }}
                >
                  {/* Animated Side Accent */}
                  <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '6px',
                    height: '100%',
                    background: 'linear-gradient(to bottom, #3b82f6, #8b5cf6, #ec4899)',
                    backgroundSize: '100% 200%',
                    animation: 'gradientFlow 4s ease infinite',
                    '@keyframes gradientFlow': {
                      '0%, 100%': { backgroundPosition: '0% 0%' },
                      '50%': { backgroundPosition: '0% 100%' },
                    }
                  }} />

                  <Box sx={{ pl: 3, position: 'relative', zIndex: 1 }}>
                    {/* Floating Icon Badge */}
                    <motion.div
                      animate={floatingAnimation}
                      style={{ display: 'inline-block', marginBottom: '24px' }}
                    >
                      <Box sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 72,
                        height: 72,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3), 0 0 0 8px rgba(59, 130, 246, 0.1)',
                      }}>
                        <PublicIcon sx={{ fontSize: 36, color: 'white' }} />
                      </Box>
                    </motion.div>

                    <Typography
                      variant="h4"
                      component="h3"
                      sx={{
                        color: theme => theme.palette.mode === 'dark' ? 'white' : 'black',
                        fontWeight: 800,
                        mb: 3,
                        fontSize: '2rem',
                        letterSpacing: '-0.02em'
                      }}
                    >
                      Our Story
                    </Typography>

                    <Typography
                      variant="body1"
                      paragraph
                      sx={{
                        color: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)',
                        lineHeight: 1.9,
                        fontSize: '1.125rem',
                        mb: 3,
                        fontWeight: 400
                      }}
                    >
                      GVN Consortium (Global Visa Network) is a <Box component="span" sx={{ color: '#3b82f6', fontWeight: 600 }}>premier EU work visa consultancy</Box> based in Dhaka, Bangladesh. Since 2019, we have been facilitating legitimate employment opportunities for skilled and semi-skilled professionals in Serbia and Slovenia.
                    </Typography>

                    <Typography
                      variant="body1"
                      paragraph
                      sx={{
                        color: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)',
                        lineHeight: 1.9,
                        fontSize: '1.125rem',
                        mb: 3,
                        fontWeight: 400
                      }}
                    >
                      Our approach is built on <Box component="span" sx={{ color: '#8b5cf6', fontWeight: 600 }}>transparency, ethics, and meticulous documentation accuracy</Box>. Every client receives professional guidance and a streamlined visa experience. Your journey begins with trust.
                    </Typography>

                    {/* Trust Badges */}
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 4 }}>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                        <Box sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          px: 3,
                          py: 1.5,
                          borderRadius: 3,
                          background: theme => theme.palette.mode === 'dark'
                            ? 'rgba(16, 185, 129, 0.15)'
                            : 'rgba(16, 185, 129, 0.1)',
                          border: '2px solid rgba(16, 185, 129, 0.3)',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          '&:hover': {
                            borderColor: 'rgba(16, 185, 129, 0.5)',
                            boxShadow: '0 4px 15px rgba(16, 185, 129, 0.2)'
                          }
                        }}>
                          <VerifiedIcon sx={{ color: '#10b981', fontSize: 24 }} />
                          <Typography sx={{ color: '#10b981', fontWeight: 700, fontSize: '0.95rem' }}>
                            Verified Partner
                          </Typography>
                        </Box>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                        <Box sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          px: 3,
                          py: 1.5,
                          borderRadius: 3,
                          background: theme => theme.palette.mode === 'dark'
                            ? 'rgba(245, 158, 11, 0.15)'
                            : 'rgba(245, 158, 11, 0.1)',
                          border: '2px solid rgba(245, 158, 11, 0.3)',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          '&:hover': {
                            borderColor: 'rgba(245, 158, 11, 0.5)',
                            boxShadow: '0 4px 15px rgba(245, 158, 11, 0.2)'
                          }
                        }}>
                          <StarIcon sx={{ color: '#f59e0b', fontSize: 24 }} />
                          <Typography sx={{ color: '#f59e0b', fontWeight: 700, fontSize: '0.95rem' }}>
                            Top Rated
                          </Typography>
                        </Box>
                      </motion.div>
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>

            {/* Enhanced Stats Section */}
            <Grid item xs={12} md={5}>
              <motion.div variants={itemVariants} style={{ margin: '0 auto' }}>
                <Paper
                  sx={{
                    p: 5,
                    height: '100%',
                    minHeight: { xs: 'auto', md: '520px' },
                    background: theme => theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.09), rgba(236, 72, 153, 0.04))'
                      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(139, 92, 246, 0.03))',
                    backdropFilter: 'blur(16px)',
                    border: theme => theme.palette.mode === 'dark'
                      ? '1px solid rgba(139, 92, 246, 0.25)'
                      : '1px solid rgba(139, 92, 246, 0.15)',
                    borderRadius: 4,
                    boxShadow: theme => theme.palette.mode === 'dark'
                      ? '0 20px 50px rgba(0, 0, 0, 0.4), 0 0 30px rgba(139, 92, 246, 0.08)'
                      : '0 20px 50px rgba(0, 0, 0, 0.12), 0 0 30px rgba(139, 92, 246, 0.04)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: theme => theme.palette.mode === 'dark'
                        ? '0 25px 60px rgba(0, 0, 0, 0.5), 0 0 50px rgba(139, 92, 246, 0.15)'
                        : '0 25px 60px rgba(0, 0, 0, 0.15), 0 0 50px rgba(139, 92, 246, 0.08)',
                    }
                  }}
                >
                  {/* Animated Side Accent */}
                  <Box sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '6px',
                    height: '100%',
                    background: 'linear-gradient(to bottom, #8b5cf6, #ec4899, #f59e0b)',
                    backgroundSize: '100% 200%',
                    animation: 'gradientFlow 4s ease infinite',
                  }} />

                  <Box sx={{ pr: 2, position: 'relative', zIndex: 1 }}>
                    {/* Floating Icon Badge */}
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                      <motion.div
                        animate={floatingAnimation}
                        style={{ display: 'inline-block' }}
                      >
                        <Box sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 72,
                          height: 72,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                          boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3), 0 0 0 8px rgba(139, 92, 246, 0.1)',
                        }}>
                          <TrendingUpIcon sx={{ fontSize: 36, color: 'white' }} />
                        </Box>
                      </motion.div>
                    </Box>

                    <Typography
                      variant="h4"
                      component="h3"
                      sx={{
                        color: theme => theme.palette.mode === 'dark' ? 'white' : 'black',
                        fontWeight: 800,
                        textAlign: 'center',
                        mb: 5,
                        fontSize: '2rem',
                        letterSpacing: '-0.02em'
                      }}
                    >
                      Our Impact
                    </Typography>

                    {/* Enhanced Stats Grid */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 3, mb: 4 }}>
                      <motion.div
                        whileHover={{ scale: 1.08, y: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Box sx={{
                          textAlign: 'center',
                          p: 3,
                          borderRadius: 3,
                          background: theme => theme.palette.mode === 'dark'
                            ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(59, 130, 246, 0.05))'
                            : 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.02))',
                          border: '2px solid rgba(59, 130, 246, 0.25)',
                          boxShadow: '0 6px 20px rgba(59, 130, 246, 0.08)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: '0 10px 30px rgba(59, 130, 246, 0.2)',
                            borderColor: 'rgba(59, 130, 246, 0.4)',
                          }
                        }}>
                          <EmojiEventsIcon sx={{ fontSize: 32, color: '#3b82f6', mb: 1 }} />
                          <Typography
                            variant="h3"
                            component="h2"
                            sx={{
                              fontWeight: 900,
                              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                              backgroundClip: 'text',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              mb: 1,
                              fontSize: '2.2rem'
                            }}
                          >
                            350+
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.75)',
                              fontSize: '0.9rem',
                              fontWeight: 600
                            }}
                          >
                            Successful Visas
                          </Typography>
                        </Box>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.08, y: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Box sx={{
                          textAlign: 'center',
                          p: 3,
                          borderRadius: 3,
                          background: theme => theme.palette.mode === 'dark'
                            ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.05))'
                            : 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.02))',
                          border: '2px solid rgba(16, 185, 129, 0.25)',
                          boxShadow: '0 6px 20px rgba(16, 185, 129, 0.08)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: '0 10px 30px rgba(16, 185, 129, 0.2)',
                            borderColor: 'rgba(16, 185, 129, 0.4)',
                          }
                        }}>
                          <StarIcon sx={{ fontSize: 32, color: '#10b981', mb: 1 }} />
                          <Typography
                            variant="h3"
                            component="h2"
                            sx={{
                              fontWeight: 900,
                              background: 'linear-gradient(135deg, #10b981, #059669)',
                              backgroundClip: 'text',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              mb: 1,
                              fontSize: '2.2rem'
                            }}
                          >
                            4.9★
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.75)',
                              fontSize: '0.9rem',
                              fontWeight: 600
                            }}
                          >
                            Client Rating
                          </Typography>
                        </Box>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.08, y: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Box sx={{
                          textAlign: 'center',
                          p: 3,
                          borderRadius: 3,
                          background: theme => theme.palette.mode === 'dark'
                            ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.05))'
                            : 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.02))',
                          border: '2px solid rgba(245, 158, 11, 0.25)',
                          boxShadow: '0 6px 20px rgba(245, 158, 11, 0.08)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: '0 10px 30px rgba(245, 158, 11, 0.2)',
                            borderColor: 'rgba(245, 158, 11, 0.4)',
                          }
                        }}>
                          <VerifiedIcon sx={{ fontSize: 32, color: '#f59e0b', mb: 1 }} />
                          <Typography
                            variant="h3"
                            component="h2"
                            sx={{
                              fontWeight: 900,
                              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                              backgroundClip: 'text',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              mb: 1,
                              fontSize: '2.2rem'
                            }}
                          >
                            5+
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.75)',
                              fontSize: '0.9rem',
                              fontWeight: 600
                            }}
                          >
                            Years Experience
                          </Typography>
                        </Box>
                      </motion.div>
                    </Box>

                    {/* Featured Box */}
                    <motion.div animate={pulseAnimation}>
                      <Box sx={{
                        textAlign: 'center',
                        p: 4,
                        borderRadius: 3,
                        background: theme => theme.palette.mode === 'dark'
                          ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.18), rgba(236, 72, 153, 0.08))'
                          : 'linear-gradient(135deg, rgba(139, 92, 246, 0.12), rgba(236, 72, 153, 0.06))',
                        border: '2px solid rgba(139, 92, 246, 0.3)',
                        boxShadow: '0 12px 35px rgba(139, 92, 246, 0.15)',
                        position: 'relative',
                        overflow: 'hidden',
                        '&:before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: '-100%',
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent)',
                          animation: 'shine 3s infinite',
                        },
                        '@keyframes shine': {
                          '0%': { left: '-100%' },
                          '100%': { left: '100%' },
                        }
                      }}>
                        <GroupsIcon sx={{ fontSize: 40, color: '#8b5cf6', mb: 2 }} />
                        <Typography
                          variant="h5"
                          component="h4"
                          sx={{
                            fontWeight: 800,
                            color: theme => theme.palette.mode === 'dark' ? 'white' : 'black',
                            mb: 2,
                            fontSize: '1.4rem'
                          }}
                        >
                          Trusted by Thousands
                        </Typography>

                        <Typography
                          variant="body1"
                          sx={{
                            color: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.75)',
                            fontSize: '1rem',
                            lineHeight: 1.7,
                            fontWeight: 500
                          }}
                        >
                          Connecting skilled professionals with opportunities in Europe since 2019
                        </Typography>
                      </Box>
                    </motion.div>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default About;