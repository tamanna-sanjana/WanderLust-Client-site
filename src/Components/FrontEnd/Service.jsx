import React, { useEffect, useState, useRef } from "react";
import {
  FaPlane,
  FaBus,
  FaTrain,
  FaCarSide,
  FaShieldAlt,
  FaSuitcaseRolling,
} from "react-icons/fa";
import { motion, useInView } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";

// Icon mapping
const iconMap = {
  FaPlane: FaPlane,
  FaBus: FaBus,
  FaTrain: FaTrain,
  FaCarSide: FaCarSide,
  FaShieldAlt: FaShieldAlt,
  FaSuitcaseRolling: FaSuitcaseRolling,
};

// Animation Variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 0.2, scale: 1, transition: { duration: 1 } },
};

const subheadingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.8 } },
};

const underlineVariants = {
  hidden: { scaleX: 0, opacity: 0, originX: 0 },
  visible: { scaleX: 1, opacity: 1, transition: { duration: 0.7, delay: 0.8 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const Service = () => {
  const [services, setServices] = useState([]);

  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-100px" });

  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: "-100px" });

  // Fetch all services on mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/services");
        setServices(data);
      } catch (err) {
        console.error("Failed to fetch services", err);
        Swal.fire("Error", "Could not load services", "error");
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="p-10 bg-white text-blue-950 text-center">
      {/* Heading Section */}
      <motion.div
        className="text-center my-5"
        ref={headingRef}
        initial="hidden"
        animate={headingInView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.3 },
          },
        }}
      >
        <motion.h2
          className="text-7xl md:text-[120px] font-extrabold text-black leading-none opacity-20"
          variants={headingVariants}
        >
          SERVICES
        </motion.h2>

        <motion.h3
          className="text-3xl font-semibold md:-mt-16 -mt-14 relative z-10"
          variants={subheadingVariants}
        >
          What We Do?
          <motion.div
            className="w-16 h-1 bg-blue-700 mx-auto mt-2"
            variants={underlineVariants}
          />
        </motion.h3>
      </motion.div>

      {/* Service Cards */}
      <motion.div
        className="grid gap-6 md:grid-cols-3 mt-30"
        ref={cardsRef}
        variants={containerVariants}
        initial="hidden"
        animate={cardsInView ? "visible" : "hidden"}
      >
        {services.map((service) => {
          const IconComponent = iconMap[service.icon];
          return (
            <motion.div
              key={service.id}
              className="card bg-gray-400 shadow-xl text-black transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-cyan-900"
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 20px rgba(0,0,0,0.4)",
              }}
            >
  <div className="card-body items-center text-center">
  {service.iconUrl && (
    <img
      src={service.iconUrl}
      alt={service.title}
      className="w-24 h-24 object-cover rounded-full mb-4"
    />
  )}
  <div className="text-4xl text-blue-950 mb-4">
    {IconComponent && <IconComponent />}
  </div>
  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
  <p className="text-lg">{service.subtitle}</p>
</div>


            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Service;
