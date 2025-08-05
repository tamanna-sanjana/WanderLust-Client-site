import React, { useEffect, useState, useRef } from 'react';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0); // zero-based index
  const carouselRef = useRef(null);
  const slideCount = 4;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: slideWidth * currentSlide,
        behavior: 'smooth',
      });
    }
  }, [currentSlide]);

  return (
    <div
      className="carousel w-full overflow-x-auto scroll-smooth scrollbar-hide"
      ref={carouselRef}
      style={{ scrollSnapType: 'x mandatory', scrollBehavior: 'smooth' }}
    >
      <div
        id="slide1"
        className="carousel-item relative w-full flex-shrink-0 scroll-snap-align-start"
      >
        <img
          src="https://i.ibb.co.com/DDdX1j0r/Whats-App-Image-2025-08-05-at-11-35-28-c9f87a6d.jpg"
          className="w-full"
          alt="Slide 1"
        />
      </div>

      <div
        id="slide2"
        className="carousel-item relative w-full flex-shrink-0 scroll-snap-align-start"
      >
        <img
          src="https://i.ibb.co.com/PsRjwYHM/Whats-App-Image-2025-08-05-at-11-35-28-79169a2b.jpg"
          className="w-full"
          alt="Slide 2"
        />
      </div>

      <div
        id="slide3"
        className="carousel-item relative w-full flex-shrink-0 scroll-snap-align-start"
      >
        <img
          src="https://i.ibb.co.com/4gKqhQSC/Whats-App-Image-2025-08-05-at-11-35-28-b47b1eb8.jpg"
          className="w-full"
          alt="Slide 3"
        />
      </div>

      <div
        id="slide4"
        className="carousel-item relative w-full flex-shrink-0 scroll-snap-align-start"
      >
        <img
          src="https://i.ibb.co/Dgz3dmv4/Travel-Banner-4.jpg"
          className="w-full"
          alt="Slide 4"
        />
      </div>
    </div>
  );
};

export default Slider;
