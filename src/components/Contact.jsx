import React from 'react';
import { Container, Grid, Typography, Box, Paper, TextField, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { motion } from 'framer-motion';

const contactDetails = {
  address: 'SS Tower, House-36, Block-A, Aftabnagar Main Road, Badda, Dhaka-1212, Bangladesh',
  phone: '+880 123 456 7890',
  email: 'contact@gvnconsortium.com',
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
    <Box id="contact" className="section" sx={{ py: 12, backgroundColor: 'background.paper', position: 'relative', overflow: 'hidden' }}>
      <div className="parallax-layer absolute inset-0 bg-gradient-to-r from-green-100/50 via-blue-100/50 to-purple-100/50" />
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.05, background: 'url(/world-map.svg)', backgroundSize: 'cover' }} />
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <motion.div initial={{opacity: 0}} whileInView={{opacity: 1}} viewport={{once: true}} transition={{duration: 1}}>
            <Typography variant="h2" component="h2" align="center" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 6 }}>
              Have questions? We'd love to hear from you.
            </Typography>
        </motion.div>
        <Paper elevation={3} sx={{ p: {xs: 2, md: 4}, backgroundColor: 'background.default', backdropFilter: 'none' }}>
          <Grid container spacing={4}>
            {/* Contact Information */}
            <Grid sx={{ flexBasis: { xs: '100%', md: 'calc(5 / 12 * 100%)' }, flexGrow: 0, maxWidth: { xs: '100%', md: 'calc(5 / 12 * 100%)' } }}>
              <motion.div initial={{opacity: 0, x: -50}} whileInView={{opacity: 1, x: 0}} viewport={{once: true}} transition={{duration: 0.8, delay: 0.2}}>
                <Typography variant="h4" component="h3" gutterBottom>
                  Get in Touch
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'start', my: 3 }}>
                  <LocationOnIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
                  <Typography variant="body1">{contactDetails.address}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
                  <PhoneIcon color="primary" sx={{ mr: 2 }} />
                  <Typography variant="body1">{contactDetails.phone}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
                  <EmailIcon color="primary" sx={{ mr: 2 }} />
                  <Typography variant="body1">{contactDetails.email}</Typography>
                </Box>
              </motion.div>
            </Grid>

            {/* Contact Form */}
            <Grid sx={{ flexBasis: { xs: '100%', md: 'calc(7 / 12 * 100%)' }, flexGrow: 0, maxWidth: { xs: '100%', md: 'calc(7 / 12 * 100%)' } }}>
             <motion.div initial={{opacity: 0, x: 50}} whileInView={{opacity: 1, x: 0}} viewport={{once: true}} transition={{duration: 0.8, delay: 0.4}}>
                <Typography variant="h4" component="h3" gutterBottom>
                  Send a Message
                </Typography>
                <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid sx={{ flexBasis: { xs: '100%', sm: '50%' }, flexGrow: 0, maxWidth: { xs: '100%', sm: '50%' } }}>
                      <TextField name="name" label="Full Name" variant="filled" fullWidth required />
                    </Grid>
                    <Grid sx={{ flexBasis: { xs: '100%', sm: '50%' }, flexGrow: 0, maxWidth: { xs: '100%', sm: '50%' } }}>
                      <TextField name="email" label="Email Address" variant="filled" fullWidth required type="email" />
                    </Grid>
                    <Grid sx={{ flexBasis: '100%', flexGrow: 0, maxWidth: '100%' }}>
                      <TextField name="subject" label="Subject" variant="filled" fullWidth required />
                    </Grid>
                    <Grid sx={{ flexBasis: '100%', flexGrow: 0, maxWidth: '100%' }}>
                      <TextField name="message" label="Your Message" variant="filled" fullWidth required multiline rows={5}/>
                    </Grid>
                    <Grid sx={{ flexBasis: '100%', flexGrow: 0, maxWidth: '100%' }}>
                      <Button type="submit" variant="contained" color="primary" size="large">
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Contact;