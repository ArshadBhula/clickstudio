"use client";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointer2, Menu, X } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    
    setClicks((prev) => [...prev, { id, x, y }]);
    
    setTimeout(() => {
      setClicks((prev) => prev.filter((click) => click.id !== id));
    }, 1000);
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div 
            className="relative cursor-pointer group"
            onClick={handleClick}
          >
            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: -15 }}
                transition={{ duration: 0.2 }}
              >
                <MousePointer2 className="w-6 h-6 text-black" strokeWidth={2} />
              </motion.div>
              <h1 className="text-2xl font-bold tracking-tight text-black">
                <span className="group-hover:text-gray-600 transition-colors">Click</span>
                <span className="ml-1">Studio</span>
              </h1>
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-gray-700 mt-0.5 hidden sm:block font-medium"
            >
              Making people click on your business
            </motion.p>

            {clicks.map((click) => (
              <motion.div
                key={click.id}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute w-3 h-3 border-2 border-black rounded-full pointer-events-none"
                style={{ left: click.x - 6, top: click.y - 6 }}
              />
            ))}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#services" className="text-black font-medium hover:text-gray-600 transition-colors">
              Services
            </a>
            <a href="#about" className="text-black font-medium hover:text-gray-600 transition-colors">
              About
            </a>
            <a href="#team" className="text-black font-medium hover:text-gray-600 transition-colors">
              Team
            </a>
            <a href="#contact" className="px-6 py-2 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors">
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-black" strokeWidth={2.5} /> : <Menu className="w-6 h-6 text-black" strokeWidth={2.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[73px] left-0 right-0 z-40 bg-white border-b border-gray-200 md:hidden overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              <a 
                href="#services" 
                className="text-lg py-2 text-black font-semibold hover:text-gray-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </a>
              <a 
                href="#about" 
                className="text-lg py-2 text-black font-semibold hover:text-gray-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#team" 
                className="text-lg py-2 text-black font-semibold hover:text-gray-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Team
              </a>
              <a 
                href="#contact" 
                className="text-lg py-2 px-6 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-colors text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};