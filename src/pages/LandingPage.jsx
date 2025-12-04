import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <CssBaseline />
      <Loading isLoading={loading} />
      <Box className="min-h-screen bg-gradient-to-br from-blue-100 via-gray-100 to-white text-gray-800 relative">
        <Header />
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
        <Footer />
      </Box>
    </>
  );
}
