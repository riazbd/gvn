
import React, { useState } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import DescriptionIcon from '@mui/icons-material/Description';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ApartmentIcon from '@mui/icons-material/Apartment';
import SendIcon from '@mui/icons-material/Send';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';

const services = [
    {
      icon: <BusinessCenterIcon fontSize="large" color="primary" />,
      title: 'EU Work Permit Visa',
      description: 'Complete support for authentic EU work permit visas in Serbia & Slovenia.',
      bgImage: 'https://picsum.photos/seed/work-visa/1920/1080'
    },
    {
      icon: <FlightTakeoffIcon fontSize="large" color="primary" />,
      title: 'Skilled Migration Support',
      description: 'Assisting professionals with genuine opportunities that match their qualifications.',
      bgImage: 'https://picsum.photos/seed/migration/1920/1080'
    },
    {
      icon: <AirplanemodeActiveIcon fontSize="large" color="primary" />,
      title: 'Visit Visa Assistance',
      description: 'Professional guidance to prepare and process visit visa applications.',
      bgImage: 'https://picsum.photos/seed/visit-visa/1920/1080'
    },
    {
      icon: <ApartmentIcon fontSize="large" color="primary" />,
      title: 'Employer Matching',
      description: 'Connecting applicants with verified employers in Europe across various sectors.',
      bgImage: 'https://picsum.photos/seed/employer/1920/1080'
    },
    {
      icon: <DescriptionIcon fontSize="large" color="primary" />,
      title: 'Document Preparation',
      description: 'We prepare, verify, and organize all necessary documentation for you.',
      bgImage: 'https://picsum.photos/seed/documents/1920/1080'
    },
    {
      icon: <SendIcon fontSize="large" color="primary" />,
      title: 'Visa Application Submission',
      description: 'Managing the full submission process to prevent delays or errors.',
      bgImage: 'https://picsum.photos/seed/submission/1920/1080'
    },
    {
      icon: <HowToRegIcon fontSize="large" color="primary" />,
      title: 'Pre & Post-Visa Guidance',
      description: 'Guidance on travel, accommodation, and cultural orientation for a smooth transition.',
      bgImage: 'https://picsum.photos/seed/guidance/1920/1080'
    },
];

const Services = () => {
        const [bgImage, setBgImage] = useState(services[0].bgImage);

    const handleSlideChange = (swiper) => {
        setBgImage(services[swiper.realIndex].bgImage);
    };

  return (
    <Box
        id="services" className="section"
        sx={{
            py: 12,
            position: 'relative',
            overflow: 'hidden',
        }}
    >
      <div className="parallax-layer absolute inset-0 bg-gradient-to-r from-cyan-900/70 to-purple-900/70" />
      <div className="parallax-layer absolute inset-0" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.3, filter: 'brightness(0.3)' }} />

      <Container maxWidth="lg" sx={{position: 'relative', zIndex: 1}}>
        <Typography variant="h2" component="h2" align="center" gutterBottom color="white">
          Our Services
        </Typography>
        {/* Mobile Version - Card List */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {services.map((service, index) => (
              <Paper
                key={index}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 5px 10px -6px rgba(0, 0, 0, 0.1)',
                  }
                }}
              >
                <Box sx={{ mb: 1.5 }}>{service.icon}</Box>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    {service.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                    {service.description}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>

        {/* Desktop Version - Swiper */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={3}
              coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2,
                  slideShadows: true,
              }}
              pagination={{ clickable: true }}
              modules={[EffectCoverflow, Pagination, Autoplay]}
              autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
              }}
              loop={true}
              className="mySwiper"
              onSlideChange={handleSlideChange}
              style={{padding: '2rem 0'}}
          >
            {services.map((service, index) => (
              <SwiperSlide key={index}>
                  <Paper
                      sx={{
                          p: 4,
                          textAlign: 'center',
                          height: '350px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'transform 0.3s',
                          '&:hover': {
                              transform: 'translateY(-10px)',
                          }
                      }}
                  >
                      <Box sx={{ mb: 2 }}>{service.icon}</Box>
                      <Typography variant="h4" component="h3" gutterBottom sx={{ fontSize: '1.5rem' }}>
                          {service.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                          {service.description}
                      </Typography>
                  </Paper>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Container>
    </Box>
  );
};

export default Services;