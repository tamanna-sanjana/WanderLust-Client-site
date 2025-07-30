import React from 'react';
import Packages from '../../Components/FrontEnd/Packages';

const PackagePage = () => {
    return (
        <>
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center text-center bg-blue-500">
  {/* Image with opacity ABOVE background */}
  <img
    src="https://i.ibb.co/60rYM9wZ/subscribe-img.jpg"
    alt="About Us"
    className="absolute inset-0 w-full h-full object-cover opacity-70"
  />

  {/* Text on top */}
  <div className="relative z-10 text-white">
    <h1 className="text-4xl font-bold">Package</h1>
    <a href="/" className="text-blue-800 hover:underline">Home</a>
  </div>
</div>
                <Packages></Packages>
            
        </>
    );
};

export default PackagePage;