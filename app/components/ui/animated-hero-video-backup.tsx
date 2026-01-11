"use client";
import { TypewriterEffectSmooth } from "./typewriter-effect";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const AnimatedHero = () => {
  const services = [
    [
      { text: "We" },
      { text: "build" },
      { text: "websites", className: "font-bold" },
    ],
    [
      { text: "We" },
      { text: "launch" },
      { text: "online" },
      { text: "stores", className: "font-bold" },
    ],
    [
      { text: "We" },
      { text: "manage" },
      { text: "social" },
      { text: "media", className: "font-bold" },
    ],
    [
      { text: "We" },
      { text: "create" },
      { text: "content", className: "font-bold" },
    ],
    [
      { text: "We" },
      { text: "list" },
      { text: "on" },
      { text: "Takealot", className: "font-bold" },
    ],
    [
      { text: "We" },
      { text: "build" },
      { text: "businesses", className: "font-bold" },
    ],
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % services.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen pt-20 px-6 overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/banner-video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl w-full text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-white text-sm sm:text-base tracking-wide uppercase mb-8"
        >
          Complete Business Solutions
        </motion.p>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TypewriterEffectSmooth words={services[index]} cursorClassName="bg-white" />
          </motion.div>
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-12 text-base sm:text-lg text-white max-w-2xl mx-auto leading-relaxed"
        >
          From your first website to marketplace onboarding—everything you need to launch and grow your business.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mt-12 justify-center"
        >
          <button className="px-8 py-3.5 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-[1.02]">
            Start Your Business
          </button>
          <button className="px-8 py-3.5 bg-transparent text-white border-2 border-white text-sm font-medium rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:scale-[1.02]">
            View Services
          </button>
        </motion.div>
      </div>
    </div>
  );
};