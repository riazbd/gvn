'use client';

import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link as ScrollLink } from 'react-scroll';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// Duplicate images for smoother infinite loop (minimum 6 slides recommended for loop)
const heroImages = [
  '/slider1.jpg',
  '/slider2.jpg',
  '/slider3.jpg',
  '/slider1.jpg',
  '/slider2.jpg',
  '/slider3.jpg',
];

const Hero = () => {
  const theme = useTheme();
  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down('md')); // Use 'md' breakpoint for consistency

  return (
    <Box sx={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#000' }}>
      <Swiper
        effect={isTabletOrMobile ? "slide" : "coverflow"} // Use slide effect on mobile to eliminate blank spaces
        grabCursor={true}
        centeredSlides={isTabletOrMobile ? false : true} // Disable centered slides on mobile
        slidesPerView={isTabletOrMobile ? 1 : "auto"} // Show 1 slide on mobile
        loop={true}
        loopedSlides={6}
        loopAdditionalSlides={2}
        initialSlide={0}
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        {...(isTabletOrMobile ? {} : {
          coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 400,
            modifier: 1,
            slideShadows: false,
          }
        })}
        pagination={{
          clickable: true,
          el: '.swiper-pagination', // Ensure pagination element is properly referenced
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="hero-swiper"
      >
        {heroImages.map((src, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <Box
                sx={{
                  height: isTabletOrMobile ? '100dvh' : '100vh',  // Use dvh (dynamic viewport height) for mobile to avoid address bar issues
                  width: isTabletOrMobile ? '100vw' : '60vw', // Full width on mobile, 60% on desktop
                  position: 'relative',
                  borderRadius: { xs: '0px', md: '20px' }, // No border radius on mobile for full fill
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'radial-gradient(ellipse at center, #2c2c2c 0%, #1a1a1a 70%, #0d0d0d 100%)', // Using a radial gradient to make bars less noticeable
                  boxShadow: !isTabletOrMobile && isActive
                    ? '0 50px 140px rgba(0,0,0,0.9)'
                    : !isTabletOrMobile && isActive
                      ? '0 20px 80px rgba(0,0,0,0.5)'
                      : 'none', // Disable shadows on mobile
                  transform: !isTabletOrMobile && isActive ? 'scale(1.05)' : 'scale(1)', // Disable scale effect on mobile
                  opacity: isActive ? 1 : isTabletOrMobile ? 1 : 0.5, // On mobile, inactive slides are also fully opaque
                  transition: isTabletOrMobile ? 'none' : 'all 1s cubic-bezier(0.22, 1, 0.36, 1)', // Remove transition on mobile
                }}
              >
                <img
                  src={src}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: isTabletOrMobile ? 'cover' : 'contain',      // Changed to cover for mobile, contain for desktop
                    objectPosition: 'center',
                    display: 'block',
                  }}
                />
                {/* Subtle overlay to add visual depth without cluttering */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, transparent 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
                    pointerEvents: 'none',
                    zIndex: 1,
                  }}
                />

                {/* Subtle dark scrim at the bottom of the CENTER slide */}
                {isActive && (
                  <Box
                    sx={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: 0,
                      height: '40%',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                      pointerEvents: 'none',
                    }}
                  />
                )}
                {/* Decorative corner elements for visual interest */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: { xs: '15px', md: '20px' },
                    left: { xs: '15px', md: '20px' },
                    width: { xs: '40px', md: '60px' },
                    height: { xs: '40px', md: '60px' },
                    borderLeft: '2px solid rgba(255,255,255,0.1)',
                    borderTop: '2px solid rgba(255,255,255,0.1)',
                    pointerEvents: 'none',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: { xs: '15px', md: '20px' },
                    right: { xs: '15px', md: '20px' },
                    width: { xs: '40px', md: '60px' },
                    height: { xs: '40px', md: '60px' },
                    borderRight: '2px solid rgba(255,255,255,0.1)',
                    borderTop: '2px solid rgba(255,255,255,0.1)',
                    pointerEvents: 'none',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: { xs: '15px', md: '20px' },
                    left: { xs: '15px', md: '20px' },
                    width: { xs: '40px', md: '60px' },
                    height: { xs: '40px', md: '60px' },
                    borderLeft: '2px solid rgba(255,255,255,0.1)',
                    borderBottom: '2px solid rgba(255,255,255,0.1)',
                    pointerEvents: 'none',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: { xs: '15px', md: '20px' },
                    right: { xs: '15px', md: '20px' },
                    width: { xs: '40px', md: '60px' },
                    height: { xs: '40px', md: '60px' },
                    borderRight: '2px solid rgba(255,255,255,0.1)',
                    borderBottom: '2px solid rgba(255,255,255,0.1)',
                    pointerEvents: 'none',
                  }}
                />
              </Box>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Minimal, elegant text - only button */}
      <Container
        maxWidth="lg"
        sx={{
          position: 'absolute',
          bottom: { xs: '20%', md: '25%' }, // Positioned higher for better balance
          left: 0,
          right: 0,
          zIndex: 10,
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <ScrollLink to="services" smooth={true} offset={-80} duration={800}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                color: '#fff',
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderColor: '#fff',
                borderWidth: 2,
                borderRadius: '50px',
                px: 6,
                py: 1.8,
                fontWeight: 700,
                fontSize: '1.1rem',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
                },
              }}
            >
              Explore Services
            </Button>
          </ScrollLink>
        </motion.div>
      </Container>

      {/* Pagination for mobile and desktop */}
      <div className="swiper-pagination"></div>

      {/* Clean custom styles */}
      <style jsx global>{`
        .hero-swiper {
          padding: 0 !important;
          width: 100%;
        }
        .hero-swiper .swiper-wrapper {
          align-items: center;
          transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1) !important;
        }
        .hero-swiper .swiper-slide {
          background: transparent;
          width: 60vw !important;
        }
        @media (max-width: 768px) {
          .hero-swiper .swiper-slide {
            width: 100vw !important; // Full width on mobile
            margin: 0 !important; // Remove any margins that might cause blank spaces
          }
          .hero-swiper .swiper-pagination {
            bottom: 20px !important; // Adjust position for mobile
          }
        }
        .hero-swiper .swiper-pagination {
          bottom: 30px !important;
          z-index: 10;
        }
        .hero-swiper .swiper-pagination-bullet {
          background: rgba(255,255,255,0.4);
          width: 10px;
          height: 10px;
          transition: all 0.3s ease;
        }
        .swiper-pagination {
          bottom: 30px !important;
        }
        .swiper-pagination-bullet {
          background: rgba(255,255,255,0.4);
          width: 10px;
          height: 10px;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background: #fff;
          transform: scale(1.3);
        }
      `}</style>
    </Box>
  );
};

export default Hero;