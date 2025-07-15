import React from 'react';

const Details = () => {
  return (
    <>
      <div className="bg-white text-blue-950 min-h-screen py-24 px-4">
        {/* Heading Section */}
        <div className="text-center mb-20">
          <h2 className="text-7xl md:text-[120px] font-extrabold text-black leading-none opacity-25">
            Packages
          </h2>
          <h3 className="text-xl md:text-4xl font-bold -mt-16 relative z-10">
            Your Selected Destinations
            <div className="w-20 h-1 bg-blue-500 mx-auto mt-3"></div>
          </h3>
        </div>

        {/* Card Section */}
        <div className="flex justify-center items-start">
          <div className="card bg-indigo-200 w-full max-w-3xl shadow-3xl rounded-lg overflow-hidden">
            <figure className="w-full">
              <img
                src="https://i.ibb.co/R4Z4VYXD/sajekbanner.jpg"
                alt="Destination"
                className="w-full h-80 object-cover"
              />
            </figure>
            <div className="card-body p-8">
              <h2 className="card-title text-xl font-bold text-gray-800 mb-3">
                Sajek Tour Package
              </h2>
              <p className="text-gray-600 mb-4 text-base">
                Explore the stunning hills of Sajek Valley. Our tour includes transport, accommodation, meals, and guided sightseeing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
