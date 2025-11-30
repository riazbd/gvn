import React from 'react';
import { Container, Grid, Typography, Box, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const About = () => {

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <Box id="about" className="section" sx={{ py: 12, backgroundColor: 'background.default', position: 'relative', overflow: 'hidden' }}>
      <div className="parallax-layer absolute inset-0 bg-gradient-to-br from-blue-100/50 to-gray-100/50" />
      <div className="parallax-layer absolute inset-0 bg-[url('/world-map.svg')] opacity-5 bg-cover bg-center" />

      <Container maxWidth="lg" sx={{position: 'relative'}}>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Grid container spacing={6} alignItems="center">
            <Grid sx={{ flexBasis: { xs: '100%', md: '50%' }, flexGrow: 0, maxWidth: { xs: '100%', md: '50%' } }}>
              <motion.div variants={itemVariants}>
                <Typography variant="h2" component="h2" gutterBottom>
                  About GVN Consortium
                </Typography>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Typography variant="body1" paragraph>
                  GVN Consortium (Global Visa Network) is a trusted EU work visa consultancy based in Dhaka, Bangladesh. Since 2019, we have been helping skilled and semi-skilled professionals secure legitimate employment opportunities in Serbia and Slovenia.
                </Typography>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Typography variant="body1" paragraph>
                  Our team follows a transparent, ethical, and documentation-accurate approach to ensure that every client receives professional guidance and a smooth visa experience. Your journey begins with trust.
                </Typography>
              </motion.div>
            </Grid>
            <Grid sx={{ flexBasis: { xs: '100%', md: '50%' }, flexGrow: 0, maxWidth: { xs: '100%', md: '50%' } }}>
              <motion.div variants={itemVariants}>
                <Paper
                  sx={{
                    p: 4,
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h1" component="h1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    350+
                  </Typography>
                  <Typography variant="h5" component="p" color="text.secondary">
                    Successful EU Work Visas Processed
                  </Typography>
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