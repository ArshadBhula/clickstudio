"use client";
import { motion } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import { useState, useEffect } from "react";

export const ClickReveal = ({ onComplete }: { onComplete: () => void }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const sequence = [
      setTimeout(() => setStage(1), 300),   // Show button
      setTimeout(() => setStage(2), 1000),  // Cursor appears
      setTimeout(() => setStage(3), 1800),  // Cursor moves to button
      setTimeout(() => setStage(4), 2400),  // Click happens
      setTimeout(() => setStage(5), 2900),  // Expansion
      setTimeout(() => setStage(6), 3700),  // Grid reveals
      setTimeout(() => setStage(7), 4500),  // Text slides in
      setTimeout(() => onComplete(), 7500), // Exit
    ];

    return () => sequence.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      animate={{ opacity: stage === 7 ? 0 : 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: stage === 7 ? 2 : 0 }}
      className="fixed inset-0 z-50 bg-white flex items-center justify-center"
    >
      {/* Initial button + cursor scene */}
      {stage < 5 && (
        <>
          {/* Button */}
          {stage >= 1 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: stage >= 4 ? 0.95 : 1,
                opacity: 1 
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative px-16 py-5 bg-white text-black border-2 border-black rounded-full text-xl font-semibold hover:bg-black hover:text-white transition-colors shadow-lg"
            >
              Your Business
              {stage >= 4 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 border-2 border-black rounded-full"
                />
              )}
            </motion.div>
          )}

          {/* Cursor - moved to click INSIDE the button */}
          {stage >= 2 && (
            <motion.div
              initial={{ x: -200, y: -200, opacity: 0 }}
              animate={{ 
                x: stage >= 3 ? 20 : -200,   // Adjusted to be inside button
                y: stage >= 3 ? -10 : -200,  // Adjusted to be inside button
                opacity: 1,
                scale: stage >= 4 ? 0.9 : 1,
              }}
              transition={{ 
                x: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                y: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.3 },
                scale: { duration: 0.1 }
              }}
              className="absolute pointer-events-none"
            >
              <MousePointer2 className="w-8 h-8 text-black" strokeWidth={2} />
            </motion.div>
          )}

          {/* Click ripple - positioned where cursor clicks inside button */}
          {stage >= 4 && (
            <>
              <motion.div
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute w-20 h-20 border-2 border-black rounded-full"
                style={{ left: "calc(50% + 20px)", top: "calc(50% - 10px)", transform: "translate(-50%, -50%)" }}
              />
              <motion.div
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{ scale: 5, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                className="absolute w-20 h-20 border border-gray-400 rounded-full"
                style={{ left: "calc(50% + 20px)", top: "calc(50% - 10px)", transform: "translate(-50%, -50%)" }}
              />
            </>
          )}
        </>
      )}

      {/* Expansion dot */}
      {stage >= 5 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ 
            scale: stage >= 6 ? 80 : 1,
            opacity: stage >= 6 ? 0 : 1,
          }}
          transition={{ 
            scale: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.4 }
          }}
          className="absolute w-3 h-3 bg-black rounded-full"
        />
      )}

      {/* Animated grid */}
      {stage >= 6 && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`h-${i}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: i * 0.03,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="absolute left-0 right-0 h-[1px] bg-gray-200"
              style={{ top: `${i * 5}%`, transformOrigin: 'center' }}
            />
          ))}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`v-${i}`}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: i * 0.03,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="absolute top-0 bottom-0 w-[1px] bg-gray-200"
              style={{ left: `${i * 5}%`, transformOrigin: 'center' }}
            />
          ))}
        </div>
      )}

      {/* Text reveal - with white background box to hide grid lines */}
      {stage >= 7 && (
        <motion.div className="relative z-10 text-center">
          {/* White background box to cover grid lines */}
          <div className="absolute inset-0 -m-20 bg-white" />
          
          <div className="relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-7xl md:text-9xl font-bold tracking-tighter"
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                CLICK
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block ml-4 md:ml-6"
              >
                STUDIO
              </motion.span>
            </motion.h1>
            
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-[2px] bg-black mt-8 origin-center"
            />
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-sm md:text-base text-gray-600 mt-6 tracking-widest uppercase"
            >
              Making People Click On Your Business
            </motion.p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};