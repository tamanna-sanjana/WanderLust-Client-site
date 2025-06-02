import React from 'react';
import Slider from '../../Components/Frontend/Slider';
import About from '../../Components/Frontend/AboutUs';
import Service from '../../Components/Frontend/Service';
import GuideSection from '../../Components/Frontend/GuideSection';

const Home = () => {
    return (
        <>
        <Slider></Slider>
        <About></About>
        <Service></Service>
        <GuideSection></GuideSection>
            
        </>
    );
};

export default Home;