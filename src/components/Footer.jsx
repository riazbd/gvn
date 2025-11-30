import React, { useState } from 'react';
import { Container, Typography, Box, IconButton, Modal, Paper, Fade, Backdrop, Grid } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import CloseIcon from '@mui/icons-material/Close';

const privacyPolicyContent = `
<h3 style="text-align: center; color: #26A69A;">Privacy Policy</h3>
<p style="color: rgba(255, 255, 255, 0.7);"><strong>Last Updated: 2025</strong></p>
<p style="color: rgba(255, 255, 255, 0.7);">GVN Consortium (“we”, “our”, “us”) is committed to protecting your personal information and maintaining full transparency in how your data is collected, stored, and used. By using our website and services, you agree to the practices described in this Privacy Policy.</p>
<h4 style="color: rgba(255, 255, 255, 0.87);">1. Information We Collect</h4>
<p style="color: rgba(255, 255, 255, 0.7);">We may collect the following personal information: Full Name, Phone Number, Email Address, Passport Copy & Information, CV/Resume, Employment History, Country Preference, and any documents required for visa assessment or employer verification.</p>
<h4 style="color: rgba(255, 255, 255, 0.87);">2. How We Use Your Information</h4>
<p style="color: rgba(255, 255, 255, 0.7);">Your data is used to assess eligibility, connect you with employers, process visa applications, communicate updates, send promotional emails (with consent), and improve our services.</p>
<h4 style="color: rgba(255, 255, 255, 0.87);">3. Data Sharing</h4>
<p style="color: rgba(255, 255, 255, 0.7);">We do not sell client information. Data may be shared with verified EU employers, licensed partners, or government authorities when legally required.</p>
<h4 style="color: rgba(255, 255, 255, 0.87);">4. Data Security</h4>
<p style="color: rgba(255, 255, 255, 0.7);">We use industry-standard security measures like SSL, encrypted storage, and restricted internal access.</p>
<h4 style="color: rgba(255, 255, 255, 0.87);">5. Your Rights</h4>
<p style="color: rgba(255, 255, 255, 0.7);">You have the right to request a copy, correction, or deletion of your personal data.</p>
`;

const Footer = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <>
        <Box
            component="footer"
            sx={{
                py: 6,
                backgroundColor: 'background.paper',
                borderTop: '1px solid rgba(255, 255, 255, 0.12)'
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="space-between" alignItems="center">
                    <Grid item xs={12} sm={4} sx={{textAlign: {xs: 'center', sm: 'left'}}}>
                        <Typography variant="h6">
                            GVN Consortium
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Your Journey Begins with Trust.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{textAlign: 'center'}}>
                        <IconButton href="https://facebook.com" target="_blank" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                            <FacebookIcon />
                        </IconButton>
                        <IconButton href="https://linkedin.com" target="_blank" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                            <LinkedInIcon />
                        </IconButton>
                        <IconButton href="https://twitter.com" target="_blank" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                            <TwitterIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{textAlign: {xs: 'center', sm: 'right'}}}>
                        <Typography onClick={handleOpen} sx={{cursor: 'pointer', textDecoration: 'underline', display: 'inline-block', my: 2}}>
                            Privacy Policy
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            © {new Date().getFullYear()} GVN Consortium.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Paper sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    maxWidth: 800,
                    bgcolor: '#272727',
                    boxShadow: 24,
                    p: 4,
                    maxHeight: '80vh',
                    overflowY: 'auto',
                }}>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: 'grey.500'
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <div dangerouslySetInnerHTML={{ __html: privacyPolicyContent }} />
                </Paper>
            </Fade>
      </Modal>
    </>
  );
};

export default Footer;