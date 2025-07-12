"use client"
import React from 'react';
import Header from "./components/header/index";
import HomePageSection1 from "./components/homePage/homePageSection1";
import HomePageSection2 from "./components/homePage/homePageSection2";
import HomePageSection3 from './components/homePage/homePageSection3';
import HomePageSection4 from './components/homePage/homePageSection4';
import HomePageSection5 from "./components/homePage/homePageSection5"
import HomePageSection6 from './components/homePage/homePageSection6';
import HomePageSection7 from './components/homePage/homePageSection7';


const Index = () => {
  return (
    <div>
      <Header />
      <HomePageSection1 />
      <HomePageSection2 />
       {/* <HomePageSection3 />
      <HomePageSection4 /> */}
      <HomePageSection5 />
      <HomePageSection6 />
      <HomePageSection7 />
      
    </div>
  )
}

export default Index