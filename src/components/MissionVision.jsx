import React from 'react';
import { Container, Grid, Typography, Box, Paper } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import VisibilityIcon from '@mui/icons-material/Visibility';
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
    <Box id="mission" className="section" sx={{ py: 12, backgroundColor: 'background.paper', position: 'relative', overflow: 'hidden' }}>
      <div className="parallax-layer absolute inset-0 bg-gradient-to-b from-blue-100/60 to-gray-200/60" />
      <Container maxWidth="lg">
                                      <Grid container spacing={4}>
                                        {/* Mission Card */}
                                        <Grid sx={{ flexBasis: { xs: '100%', md: '50%' }, flexGrow: 0, maxWidth: { xs: '100%', md: '50%' } }}>
                                          <motion.div
                                            initial="offscreen"
                                            whileInView="onscreen"
                                            viewport={{ once: true, amount: 0.5 }}
                                            variants={cardVariants}
                                          >
                                            <Paper sx={{ p: 4, height: '100%', backgroundColor: 'background.default' }}>
                                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                <RocketLaunchIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                                                <Typography variant="h3" component="h3">
                                                  Our Mission
                                                </Typography>
                                              </Box>
                                              <Typography variant="body1">
                                                To provide transparent, ethical, and reliable EU work visa solutions that help Bangladeshi professionals access genuine employment opportunities in Serbia and Slovenia, supported by fast processing, accurate documentation, and premium client service.
                                              </Typography>
                                            </Paper>
                                          </motion.div>
                                        </Grid>
                            
                                        {/* Vision Card */}
                                        <Grid sx={{ flexBasis: { xs: '100%', md: '50%' }, flexGrow: 0, maxWidth: { xs: '100%', md: '50%' } }}>
                                          <motion.div
                                            initial="offscreen"
                                            whileInView="onscreen"
                                            viewport={{ once: true, amount: 0.5 }}
                                            variants={cardVariants}
                                          >
                                            <Paper sx={{ p: 4, height: '100%', backgroundColor: 'background.default' }}>
                                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                <VisibilityIcon color="secondary" sx={{ fontSize: 40, mr: 2 }} />
                                                <Typography variant="h3" component="h3">
                                                  Our Vision
                                                </Typography>
                                              </Box>
                                              <Typography variant="body1">
                                                To become Bangladesh’s most trusted and professional EU visa consultancy by delivering high-quality services, ensuring client confidence, and creating a seamless bridge between skilled workers and European employers.
                                              </Typography>
                                            </Paper>
                                          </motion.div>
                                        </Grid>
                                      </Grid>      </Container>
    </Box>
  );
};

export default MissionVision;