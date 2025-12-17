import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import video from "../assets/video.mp4";

const HeroSection = () => {
  const scrollToSignup = () => {
    const section = document.getElementById("signup-form");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 py-16 overflow-hidden bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">


      {/* Left Section - Text */}
      <motion.div
        className="flex-1 max-w-xl text-center lg:text-left z-10"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
          Welcome to the{" "}
<<<<<<< HEAD
          <span className="text-blue-500">NurseMoves Beta Experience</span> —{" "}
          <br />
          You’re Shaping the Future of{" "}
          <span className="text-blue-500">Nurse Wellness & Preventing Burnout.</span>
=======
          <span className="text-blue-700">NurseMoves Beta Experience</span> —{" "}
          <br />
          You’re Shaping the Future of{" "}
          <span className="text-blue-600">Nurse Wellness.</span>
>>>>>>> 8678a27dbd5e92fea84c27e92521586b01983622
        </h1>

        <p className="mt-6 text-lg text-gray-700 leading-relaxed">
          Join <span className="font-semibold text-blue-700">100 handpicked nurses</span> testing
          the world’s first all-in-one mental, physical, and spiritual wellness
          app designed just for nurses.
        </p>

        <motion.button
          onClick={scrollToSignup}
          className="mt-8 px-8 py-3 bg-blue-700 text-white rounded-full shadow-md hover:bg-blue-800 transition-all duration-300 hover:scale-105 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Join the Beta
        </motion.button>
      </motion.div>

      {/* Right Section - Video */}
      <motion.div
        className="flex-1 flex items-center justify-center relative mt-12 lg:mt-0"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Soft Glow Background */}
        <div className="absolute w-[450px] h-[450px] bg-blue-300/30 rounded-full blur-3xl -z-10"></div>

        {/* Video */}
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          className="max-h-[500px] lg:max-h-[600px] w-auto rounded-2xl shadow-lg border mt-5 border-blue-200"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
