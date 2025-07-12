"use client";
import React from 'react';
import Header from "./components/header/index";
import HomePageSection1 from "./components/homePage/homePageSection1";
import HomePageSection2 from "./components/homePage/homePageSection2";
import HomePageSection5 from "./components/homePage/homePageSection5";
import HomePageSection6 from './components/homePage/homePageSection6';
import HomePageSection7 from './components/homePage/homePageSection7';
import { Box } from '@mui/material';

const Index = () => {
  return (
    <Box sx={{ bgcolor: "#FAFBFC" }}>
      <Header />
      <HomePageSection1 />
      <HomePageSection2 />
      <HomePageSection5 />
      <HomePageSection6 />
      <HomePageSection7 />
    </Box>
  )
}

export default Index;