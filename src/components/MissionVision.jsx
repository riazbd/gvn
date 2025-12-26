import React from 'react';
import { Container, Grid, Typography, Box, Paper } from '@mui/material';
import { RocketLaunch, Visibility } from '@mui/icons-material';
import { motion } from 'framer-motion';

const MissionVision = () => {

  const cardVariants = {
    offscreen: {
      y: 100,
      opacity: 0
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 1
      }
    }
  };

  return (
    <Box id="mission" className="section"
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
              Our Mission & Vision
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                maxWidth: '600px',
                mx: 'auto',
                color: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)',
              }}
            >
              Understanding our core purpose and long-term aspirations in connecting talent with opportunities
            </Typography>
          </motion.div>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {/* Mission Card */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
            >
              <Paper
                sx={{
                  p: 4,
                  height: '100%',
                  background: theme => theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(200, 200, 255, 0.03))'
                    : 'linear-gradient(135deg, rgba(0, 0, 0, 0.02), rgba(100, 100, 100, 0.01))',
                  backdropFilter: 'blur(10px)',
                  border: theme => theme.palette.mode === 'dark'
                    ? '1px solid rgba(255, 255, 255, 0.1)'
                    : '1px solid rgba(0, 0, 0, 0.05)',
                  borderRadius: 2,
                  boxShadow: theme => theme.palette.mode === 'dark'
                    ? '0 10px 30px rgba(0, 0, 0, 0.3)'
                    : '0 10px 30px rgba(0, 0, 0, 0.08)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme => theme.palette.mode === 'dark'
                      ? '0 15px 40px rgba(0, 0, 0, 0.4)'
                      : '0 15px 40px rgba(0, 0, 0, 0.15)',
                  }
                }}
              >
                {/* Left decorative accent */}
                <Box sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '4px',
                  height: '100%',
                  background: 'linear-gradient(to bottom, #3b82f6, #8b5cf6)'
                }} />

                <Box sx={{ pl: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                      mr: 3,
                      boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)'
                    }}>
                      <RocketLaunch sx={{ fontSize: 32, color: 'white' }} />
                    </Box>

                    <Typography
                      variant="h4"
                      component="h3"
                      sx={{
                        color: theme => theme.palette.mode === 'dark' ? 'white' : 'black',
                        fontWeight: 'bold',
                        fontSize: '1.8rem'
                      }}
                    >
                      Our Mission
                    </Typography>
                  </Box>

                  <Typography
                    variant="body1"
                    sx={{
                      color: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)',
                      lineHeight: 1.8,
                      fontSize: '1.1rem',
                    }}
                  >
                    To provide transparent, ethical, and reliable EU work visa solutions that help Bangladeshi professionals access genuine employment opportunities in Serbia and Slovenia, supported by fast processing, accurate documentation, and premium client service.
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          {/* Vision Card */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
            >
              <Paper
                sx={{
                  p: 4,
                  height: '100%',
                  background: theme => theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(200, 220, 255, 0.03))'
                    : 'linear-gradient(135deg, rgba(0, 0, 0, 0.02), rgba(100, 120, 200, 0.01))',
                  backdropFilter: 'blur(10px)',
                  border: theme => theme.palette.mode === 'dark'
                    ? '1px solid rgba(255, 255, 255, 0.1)'
                    : '1px solid rgba(0, 0, 0, 0.05)',
                  borderRadius: 2,
                  boxShadow: theme => theme.palette.mode === 'dark'
                    ? '0 10px 30px rgba(0, 0, 0, 0.3)'
                    : '0 10px 30px rgba(0, 0, 0, 0.08)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme => theme.palette.mode === 'dark'
                      ? '0 15px 40px rgba(0, 0, 0, 0.4)'
                      : '0 15px 40px rgba(0, 0, 0, 0.15)',
                  }
                }}
              >
                {/* Right decorative accent */}
                <Box sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '4px',
                  height: '100%',
                  background: 'linear-gradient(to bottom, #8b5cf6, #ec4899)'
                }} />

                <Box sx={{ pr: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                      mr: 3,
                      boxShadow: '0 8px 20px rgba(139, 92, 246, 0.3)'
                    }}>
                      <Visibility sx={{ fontSize: 32, color: 'white' }} />
                    </Box>

                    <Typography
                      variant="h4"
                      component="h3"
                      sx={{
                        color: theme => theme.palette.mode === 'dark' ? 'white' : 'black',
                        fontWeight: 'bold',
                        fontSize: '1.8rem'
                      }}
                    >
                      Our Vision
                    </Typography>
                  </Box>

                  <Typography
                    variant="body1"
                    sx={{
                      color: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)',
                      lineHeight: 1.8,
                      fontSize: '1.1rem',
                    }}
                  >
                    To emerge as the most trusted and ethical pathway for skilled professionals seeking employment opportunities in Europe, setting industry benchmarks for transparency, client satisfaction, and successful placements in the EU job market.
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MissionVision;