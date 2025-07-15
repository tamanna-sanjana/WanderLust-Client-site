import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Ahmed",
    location: "Dhaka, Bangladesh",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "WanderLust made our dream vacation come true! The team handled everything from start to finish with amazing professionalism.",
  },
  {
    name: "Tanvir Hossain",
    location: "Sylhet, Bangladesh",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "I loved every moment of the Sajek tour. From food to hotel, everything was well-arranged. Highly recommended!",
  },
  {
    name: "Nusrat Jahan",
    location: "Chittagong, Bangladesh",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    quote:
      "As a solo traveler, I felt safe and cared for the entire time. WanderLust is truly the best travel partner!",
  },
];

// Animation variants
const headingVariant = {
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

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.6,
    },
  }),
};

const TestimonialSection = () => {
  return (
    <section className="bg-white py-20 px-4 text-blue-950">
      <div className="max-w-7xl mx-auto text-center">
        {/* Animated Heading */}
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.3 } },
          }}
        >
          <motion.h2
            className="text-7xl md:text-[120px] font-extrabold text-black leading-none"
            variants={headingVariant}
          >
            Testimonials
          </motion.h2>

          <motion.h3
            className="text-3xl font-semibold md:-mt-16 -mt-14 relative z-10"
            variants={subheadingVariants}
          >
            What Our Travelers Say
            <motion.div
              className="w-16 h-1 bg-blue-800 mx-auto mt-2"
              variants={underlineVariants}
            />
          </motion.h3>
        </motion.div>

        {/* Animated Testimonial Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              className="bg-indigo-200 shadow-xl rounded-xl p-6 flex flex-col items-center text-center transition transform hover:scale-[1.02]"
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={index}
            >
              <FaQuoteLeft className="text-blue-500 text-3xl mb-4" />
              <p className="text-gray-700 italic mb-6">"{t.quote}"</p>
              <img
                src={t.photo}
                alt={t.name}
                className="w-20 h-20 rounded-full border-4 border-blue-500 mb-3"
              />
              <h4 className="font-bold text-lg">{t.name}</h4>
              <p className="text-sm text-blue-700">{t.location}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
