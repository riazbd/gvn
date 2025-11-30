import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link as ScrollLink } from 'react-scroll';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import required modules
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';

const heroImages = [
    'https://picsum.photos/seed/hero-europe-city/1920/1080',
    'https://picsum.photos/seed/hero-slovenia-nature/1920/1080',
    'https://picsum.photos/seed/hero-serbia-culture/1920/1080',
    'https://picsum.photos/seed/hero-success-pro/1920/1080',
    'https://picsum.photos/seed/hero-travel-journey/1920/1080',
];

const Hero = () => {
    const theme = useTheme();
    const [activeIndex, setActiveIndex] = useState(0);
    const intervalRef = useRef(null);

    const headline = "Building Your Future in Europe";
    const sentence = { hidden: { opacity: 1 }, visible: { opacity: 1, transition: { delay: 0.5, staggerChildren: 0.04 } } };
    const letter = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(intervalRef.current);
    }, []);

    const handleDotClick = (index) => {
        setActiveIndex(index);
        clearInterval(intervalRef.current); // Reset autoplay on manual navigation
        intervalRef.current = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % heroImages.length);
        }, 5000);
    };

    return (
        <Box id="hero" sx={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', backgroundColor: 'background.default' }}>
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    slidesPerView={1.3} // Adjusted slides per view
                    coverflowEffect={{
                        rotate: 20, // Adjusted rotate
                        stretch: 25, // Increased stretch
                        depth: 80, // Adjusted depth
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                    className="mySwiper"
                    style={{ width: '100%', height: 'calc(100vh - 64px)', '--swiper-navigation-color': theme.palette.primary.main, '--swiper-pagination-color': theme.palette.primary.main }} // Adjusted height
                >
                    {heroImages.map((image, index) => (
                        <SwiperSlide key={index} sx={{ position: 'relative', paddingBottom: '125%', overflow: 'hidden' }}> {/* Responsive aspect ratio */}
                            <img src={image} alt={`Hero Image ${index + 1}`} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>

            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center', color: 'text.primary' }}>
                <motion.div variants={sentence} initial="hidden" animate="visible" style={{ margin: '0 0 1rem 0' }}>
                    <Typography variant="h1" component="h1" sx={{ fontSize: { xs: '2.5rem', sm: '3rem', md: '3.8rem' }, fontWeight: theme.typography.h1.fontWeight }}>
                        {headline.split("").map((char, index) => (
                            <motion.span key={char + "-" + index} variants={letter}>{char}</motion.span>
                        ))}
                    </Typography>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.5 }}>
                    <Typography variant="subtitle1" component="p" sx={{ mb: 4, fontWeight: 400, maxWidth: '80%', mx: 'auto', fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' } }}>
                        A trusted EU work visa consultancy helping skilled professionals secure employment in Serbia and Slovenia.
                    </Typography>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.8 }}>
                    <ScrollLink to="services" spy={true} smooth={true} offset={-70} duration={500}>
                        <Button variant="contained" color="primary" size="large" endIcon={<ArrowForwardIcon />}>
                            Explore Our Services
                        </Button>
                    </ScrollLink>
                </motion.div>
            </Container>
        </Box>
    );
};

export default Hero;