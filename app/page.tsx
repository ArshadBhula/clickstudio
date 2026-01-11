"use client";
import { Navbar } from "./components/ui/navbar";
import { ClickReveal } from "./components/ui/click-reveal";
import { AnimatedHero } from "./components/ui/animated-hero";
import { ServicesStack } from "./components/ui/services-stack";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div>
      <AnimatePresence>
        {showIntro && <ClickReveal onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>
      
      <Navbar />
      <AnimatedHero />
      <ServicesStack />
    </div>
  );
}