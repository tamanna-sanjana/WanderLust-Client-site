import React from 'react';
import Slider from '../../Components/FrontEnd/Slider';
import Service from '../../Components/FrontEnd/Service';
import AboutUs from '../../Components/FrontEnd/AboutUs';
import GuideSection from '../../Components/FrontEnd/GuideSection';
import Packages from '../../Components/FrontEnd/Packages';
import TestimonialSection from '../../Components/FrontEnd/TestimonialSection';
import BookingSection from './BookingSection';

const Home = () => {
     return (
          <>

          <Slider></Slider>
          <AboutUs></AboutUs>
          <Service></Service>
          <Packages></Packages>
          <BookingSection></BookingSection>
          <GuideSection></GuideSection>
          <TestimonialSection></TestimonialSection>
          
               
          </>
     );
};

export default Home;