import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';
import { Box, CssBaseline } from '@mui/material';
import Header from '../components/Header.jsx';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import MissionVision from '../components/MissionVision.jsx';
import Services from '../components/Services.jsx';
import Gallery from '../components/Gallery.jsx';
import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';
import Loading from '../components/Loading.jsx';

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const target = location.hash.substring(1);
      // Ensure the page has had time to render before trying to scroll
      setTimeout(() => {
        scroller.scrollTo(target, {
          smooth: 'linear',
          duration: 500,
          offset: -70,
        });
      }, 100); // A short delay can help
    }
  }, [location]);

  return (
    <>
      <CssBaseline />
      <Loading isLoading={loading} />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #dbeafe 0%, #e5e7eb 50%, #ffffff 100%)',
          color: 'text.primary'
        }}
      >
        <Header />
        <Box sx={{ flex: 1 }}>
          <main>
            <section id="hero" className="section">
              <Hero />
            </section>
            <section id="about" className="section">
              <About />
            </section>
            <section id="services" className="section">
              <Services />
            </section>
            <section id="gallery" className="section">
              <Gallery />
            </section>
            <section id="mission" className="section">
              <MissionVision />
            </section>
            <section id="contact" className="section">
              <Contact />
            </section>
          </main>
        </Box>
        <Footer />
      </Box>
    </>
  );
}
