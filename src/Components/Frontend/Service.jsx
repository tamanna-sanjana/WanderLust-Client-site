import React, { useEffect, useState } from "react";
import {
  FaPlane,
  FaHotel,
  FaSuitcaseRolling,
  FaPassport,
  FaShieldAlt,
  FaCarSide,
} from "react-icons/fa";
import { motion } from "framer-motion";

const iconMap = {
  FaPlane: FaPlane,
  FaHotel: FaHotel,
  FaSuitcaseRolling: FaSuitcaseRolling,
  FaPassport: FaPassport,
  FaShieldAlt: FaShieldAlt,
  FaCarSide: FaCarSide,
};

const cardVariants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 0.8,
    },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 15px 30px rgba(0,255,255,0.4)",
    backgroundColor: "#0e7490", // cyan-900 hex color approximation
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const Service = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/service.json")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
      })
      .catch((err) => console.error("Failed to fetch services:", err));
  }, []);

  return (
    <div className="p-10 bg-blue-950 text-white text-center">
      <div className="text-center my-25">
        <h2 className="text-7xl md:text-[120px] font-extrabold text-blue-300 leading-none opacity-10">
          SERVICES
        </h2>

        <h3 className="text-3xl font-semibold md:-mt-16 -mt-14 relative z-10">
          What We Do?
          <div className="w-16 h-1 bg-blue-700 mx-auto mt-2"></div>
        </h3>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {services.map((service) => {
          const IconComponent = iconMap[service.icon];
          return (
            <motion.div
              key={service.id}
              className="card bg-gray-400 shadow-xl text-black"
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              whileHover="hover"
            >
              <div className="card-body items-center text-center">
                <div className="text-4xl text-blue-950 mb-4">
                  {IconComponent && <IconComponent />}
                </div>
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <p className="text-lg">{service.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Service;
