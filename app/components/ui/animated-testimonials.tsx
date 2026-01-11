"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const AnimatedHero = () => {
  const words = [
    "build websites",
    "launch stores", 
    "manage socials",
    "create content",
    "list on Takealot"
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-6 bg-white">
      <div className="max-w-4xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-black leading-[1.1]">
            We don't just{" "}
            <span className="inline-block min-w-[300px] md:min-w-[400px] text-left">
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  {words[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-black leading-[1.1] mt-2">
            We build businesses.
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-8 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Complete solutions from website to working store,
          <br className="hidden md:block" /> social media to marketplace listings.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-10"
        >
          <button className="px-8 py-3 bg-black text-white text-base font-medium rounded-full hover:bg-gray-800 transition-colors duration-200">
            Get started
          </button>
        </motion.div>
      </div>
    </section>
  );
};