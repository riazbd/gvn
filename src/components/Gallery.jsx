import { useState, useEffect, useRef, useCallback } from 'react';
import { Container, Typography, Box, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const galleryImages = [
  { seed: 'serbia-city', alt: 'Cityscape of Belgrade, Serbia' },
  { seed: 'slovenia-lake', alt: 'Lake Bled, Slovenia' },
  { seed: 'business-meeting', alt: 'Professional business meeting' },
  { seed: 'construction-worker', alt: 'Skilled construction worker' },
  { seed: 'europe-travel', alt: 'Traveling in Europe' },
  { seed: 'job-success', alt: 'Person celebrating job success' },
  { seed: 'passport-visa', alt: 'Passport with visa stamps' },
  { seed: 'data-analytics', alt: 'Data analytics dashboard' },
];

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);
  const cardsRef = useRef([]);

  const numImages = galleryImages.length;

  const goToPrev = useCallback(() => setActiveIndex((prev) => (prev === 0 ? numImages - 1 : prev - 1)), [numImages]);
  const goToNext = useCallback(() => setActiveIndex((prev) => (prev === numImages - 1 ? 0 : prev + 1)), [numImages]);
  const handleCardClick = (index) => setActiveIndex(index);

  // Autoplay
  useEffect(() => {
    let interval = setInterval(goToNext, 4000);
    const slider = sliderRef.current;
    const pause = () => clearInterval(interval);
    const resume = () => interval = setInterval(goToNext, 4000);
    slider?.addEventListener('mouseenter', pause);
    slider?.addEventListener('mouseleave', resume);
    return () => {
      pause();
      slider?.removeEventListener('mouseenter', pause);
      slider?.removeEventListener('mouseleave', resume);
    };
  }, [goToNext]);

  return (
    <Box 
      id="gallery" 
      className="section" 
      sx={{ 
        py: 12, 
        backgroundColor: 'background.default', 
        position: 'relative', 
        overflow: 'hidden' 
      }}
    >
      <div className="parallax-layer absolute inset-0 bg-gradient-to-r from-blue-300/60 to-gray-200/60" />
      <Container maxWidth="lg">
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8 }}
        >
          <Typography 
            variant="h2" 
            align="center" 
            gutterBottom 
            sx={{ 
              color: 'text.primary', 
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } 
            }}
          >
            Our Global Reach
          </Typography>
          <Typography 
            variant="body1" 
            align="center" 
            color="text.secondary" 
            sx={{ 
              mb: 8, 
              maxWidth: '600px', 
              mx: 'auto',
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } 
            }}
          >
            Explore the destinations and opportunities we connect you with.
          </Typography>
        </motion.div>
        
        {/* Mobile Version - Simple Grid */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 4 }}>
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative rounded-2xl overflow-hidden cursor-pointer shadow-lg"
                style={{
                  aspectRatio: '4/3',
                }}
              >
                <img
                  src={`https://picsum.photos/seed/${image.seed}/600/450`}
                  alt={image.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                    {image.alt.split(',')[0]}
                  </Typography>
                </div>
              </motion.div>
            ))}
          </Box>
        </Box>
        
        {/* Desktop Version - 3D Carousel */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Box 
            ref={sliderRef} 
            className="flex justify-center items-center gap-6 h-[500px] perspective-[1200px]"
            sx={{ position: 'relative' }}
          >
            {galleryImages.map((image, i) => {
              const distance = Math.abs(i - activeIndex);
              const opacity = Math.max(0, 1 - distance * 0.2);
              const scale = 1 - distance * 0.1;
              const rotateY = (i - activeIndex) * 15;
              const translateX = (i - activeIndex) * 120;

              return (
                <motion.div
                  key={i}
                  ref={(el) => (cardsRef.current[i] = el)}
                  className="card relative w-[350px] h-[450px] rounded-3xl overflow-hidden cursor-pointer border border-gray-300 hover:border-blue-500 shadow-lg hover:shadow-blue-200 transition-all duration-500 bg-white backdrop-blur-xl"
                  style={{
                    opacity,
                    scale,
                    transform: `translateX(${translateX}px) rotateY(${rotateY}deg)`,
                    zIndex: 100 - distance,
                  }}
                  onClick={() => handleCardClick(i)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity, scale }}
                  transition={{ duration: 0.6 }}
                >
                  <img
                    src={`https://picsum.photos/seed/${image.seed}/800/600`}
                    alt={image.alt}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>
              );
            })}
            <IconButton
              onClick={goToPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800/50 hover:bg-blue-500/80 text-white border border-gray-600 p-3 rounded-full shadow-lg"
              sx={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(59, 130, 246, 0.8)',
                }
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <IconButton
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800/50 hover:bg-blue-500/80 text-white border border-gray-600 p-3 rounded-full shadow-lg"
              sx={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(59, 130, 246, 0.8)',
                }
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Gallery;