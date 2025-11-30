
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

  const numSlides = galleryImages.length;

  const goToPrev = useCallback(() => setActiveIndex((prev) => (prev === 0 ? numSlides - 1 : prev - 1)), [numSlides]);
  const goToNext = useCallback(() => setActiveIndex((prev) => (prev === numSlides - 1 ? 0 : prev + 1)), [numSlides]);
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
    <Box id="gallery" className="section" sx={{ py: 12, backgroundColor: 'background.default', position: 'relative', overflow: 'hidden' }}>
      <div className="parallax-layer absolute inset-0 bg-gradient-to-r from-blue-300/60 to-gray-200/60" />
      <Container maxWidth="lg">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <Typography variant="h2" align="center" gutterBottom sx={{ color: 'text.primary', fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>
            Our Global Reach
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 8, maxWidth: '600px', mx: 'auto', fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}>
            Explore the destinations and opportunities we connect you with.
          </Typography>
        </motion.div>
        <Box ref={sliderRef} className="flex justify-center items-center gap-6 h-[500px] perspective-[1200px]">
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
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 0.5, fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' } }}>{image.alt.split(',')[0]}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' } }}>{image.alt}</Typography>
                </div>
              </motion.div>
            );
          })}
          <IconButton onClick={goToPrev} className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800/50 hover:bg-blue-500/80 text-white border border-gray-600 p-3 rounded-full shadow-lg">
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton onClick={goToNext} className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800/50 hover:bg-blue-500/80 text-white border border-gray-600 p-3 rounded-full shadow-lg">
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Gallery;
