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
    <div className="bg-white text-blue-950 overflow-x-hidden">
      {/* Hero Slider */}
      <Slider />

      {/* About Us Section */}
      <AboutUs />

      {/* Services Section */}
      <Service />

      {/* Travel Packages */}
      <Packages />

      {/* Booking Section */}
      <BookingSection />

      {/* Guide Section */}
      <GuideSection />

      {/* Testimonials */}
      <TestimonialSection />
    </div>
  );
};

export default Home;