import React, { useState } from 'react';
import { Container, Typography, Box, IconButton, Modal, Paper, Fade, Backdrop, Grid } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YoutubeIcon from '@mui/icons-material/Youtube';
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
                background: theme => theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, rgba(10, 15, 35, 0.95) 0%, rgba(15, 25, 55, 0.95) 100%)'
                  : 'linear-gradient(135deg, rgba(240, 242, 245, 0.95) 0%, rgba(230, 233, 239, 0.95) 100%)',
                borderTop: theme => theme.palette.mode === 'dark'
                  ? '1px solid rgba(255, 255, 255, 0.12)'
                  : '1px solid rgba(0, 0, 0, 0.12)',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                zIndex: 100,
                mt: 'auto' // Pushes footer to the bottom
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="space-between" alignItems="center">
                    <Grid item xs={12} sm={4} sx={{textAlign: {xs: 'center', sm: 'left'}}}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 'bold',
                                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 1
                            }}
                        >
                            GVN Consortium
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                                fontStyle: 'italic'
                            }}
                        >
                            Your Journey Begins with Trust.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{textAlign: 'center'}}>
                        <IconButton
                            href="https://www.facebook.com/GVN.GlobalVisaNetwork"
                            target="_blank"
                            sx={{
                                color: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                                backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                                borderRadius: '50%',
                                width: 45,
                                height: 45,
                                mx: 0.5,
                                '&:hover': {
                                    color: theme => theme.palette.primary.main,
                                    backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
                                }
                            }}
                        >
                            <FacebookIcon />
                        </IconButton>
                        <IconButton
                            href="https://www.youtube.com/@GlobalVisaNetworkb "
                            target="_blank"
                            sx={{
                                color: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                                backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                                borderRadius: '50%',
                                width: 45,
                                height: 45,
                                mx: 0.5,
                                '&:hover': {
                                    color: theme => theme.palette.primary.main,
                                    backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
                                }
                            }}
                        >
                            <YoutubeIcon />
                        </IconButton>
                        {/* <IconButton
                            href="https://twitter.com"
                            target="_blank"
                            sx={{
                                color: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                                backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                                borderRadius: '50%',
                                width: 45,
                                height: 45,
                                mx: 0.5,
                                '&:hover': {
                                    color: theme => theme.palette.primary.main,
                                    backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
                                }
                            }}
                        >
                            <TwitterIcon />
                        </IconButton> */}
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{textAlign: {xs: 'center', sm: 'right'}}}>
                        <Typography
                            onClick={handleOpen}
                            sx={{
                                cursor: 'pointer',
                                textDecoration: 'none',
                                color: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                                display: 'inline-block',
                                my: 2,
                                position: 'relative',
                                '&:after': {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: '-5px',
                                    left: 0,
                                    width: 0,
                                    height: '2px',
                                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                                    transition: 'width 0.3s ease',
                                },
                                '&:hover:after': {
                                    width: '100%',
                                    opacity: 1,
                                },
                                '&:hover': {
                                    color: theme => theme.palette.mode === 'dark' ? 'white' : 'black',
                                }
                            }}
                        >
                            Privacy Policy
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                color: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)',
                                mt: 1
                            }}
                        >
                            © {new Date().getFullYear()} GVN Consortium. All rights reserved.
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
                    bgcolor: theme => theme.palette.mode === 'dark' ? '#272727' : '#ffffff',
                    boxShadow: 24,
                    p: 4,
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    borderRadius: 2,
                    border: theme => theme.palette.mode === 'dark'
                      ? '1px solid rgba(255, 255, 255, 0.1)'
                      : '1px solid rgba(0, 0, 0, 0.1)',
                }}>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.5)',
                            backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                            borderRadius: '50%',
                            width: 36,
                            height: 36,
                            '&:hover': {
                                color: theme => theme.palette.mode === 'dark' ? 'white' : 'black',
                                backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                            }
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