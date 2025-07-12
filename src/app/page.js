"use client";
import React from 'react';
import { Box } from '@mui/material';
import Header from "./components/header/Header";
import HeroSection from "./components/sections/HeroSection";
import EquipmentSection from "./components/sections/EquipmentSection";
import ServicesSection from "./components/sections/ServicesSection";
import WhyChooseUsSection from './components/sections/WhyChooseUsSection';
import FAQSection from './components/sections/FAQSection';

const HomePage = () => {
  return (
    <Box sx={{ bgcolor: "#FAFBFC" }}>
      <Header />
      <HeroSection />
      <EquipmentSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <FAQSection />
    </Box>
  )
}

export default HomePage;