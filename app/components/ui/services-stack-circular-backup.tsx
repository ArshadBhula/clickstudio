"use client";
import { useState, useEffect } from "react";
import { Component as CircularMenu } from "./circular-command-menu";
import { Globe, Instagram, Video, Package, Megaphone, Server, X, ArrowRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { CommandItem } from "./circular-command-menu";

const services = [
  {
    id: "websites",
    icon: <Globe className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />,
    label: "Websites",
    title: "Website Development",
    description: "Professional websites that turn visitors into customers",
    fullDesc: "We build professional, responsive websites tailored to your business needs. From simple landing pages to complex e-commerce platforms, we deliver solutions that drive results.",
    features: [
      "Custom design & development",
      "Mobile-responsive layouts",
      "SEO optimization",
      "Fast loading speeds",
      "Easy content management"
    ]
  },
  {
    id: "social",
    icon: <Instagram className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />,
    label: "Social Media",
    title: "Social Media Management",
    description: "Grow your audience with strategic content",
    fullDesc: "We handle your social media presence from strategy to execution. Our team creates engaging content, manages your profiles, and grows your audience across all major platforms.",
    features: [
      "Content strategy & planning",
      "Daily posting & engagement",
      "Community management",
      "Analytics & reporting",
      "Multi-platform coverage"
    ]
  },
  {
    id: "content",
    icon: <Video className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />,
    label: "Content Creation",
    title: "Content Creation",
    description: "High-quality visuals that tell your story",
    fullDesc: "Professional photos, videos, and graphics that capture attention. We create content that resonates with your audience and showcases your brand in the best light.",
    features: [
      "Professional photography",
      "Video production & editing",
      "Graphic design",
      "Product showcases",
      "Brand storytelling"
    ]
  },
  {
    id: "hosting",
    icon: <Server className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />,
    label: "Hosting",
    title: "Web Hosting",
    description: "Fast, reliable hosting for your business",
    fullDesc: "Secure and scalable hosting solutions with 99.9% uptime guarantee. We handle all the technical aspects so you can focus on your business.",
    features: [
      "99.9% uptime guarantee",
      "Daily backups",
      "SSL certificates included",
      "24/7 monitoring",
      "Scalable infrastructure"
    ]
  },
  {
    id: "ads",
    icon: <Megaphone className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />,
    label: "Paid Ads",
    title: "Paid Advertising",
    description: "Data-driven campaigns that deliver ROI",
    fullDesc: "Strategic paid advertising across Google, Facebook, and Instagram. We create, manage, and optimize campaigns to maximize your return on investment.",
    features: [
      "Google Ads management",
      "Facebook & Instagram ads",
      "Campaign optimization",
      "Detailed analytics",
      "A/B testing"
    ]
  },
  {
    id: "marketplaces",
    icon: <Package className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />,
    label: "Marketplaces",
    title: "Marketplace Listing",
    description: "Get on Takealot, Makro & Leroy Merlin",
    fullDesc: "Complete onboarding for SA's biggest marketplaces. From account setup to product optimization, we ensure maximum visibility and sales.",
    features: [
      "Takealot onboarding",
      "Makro marketplace setup",
      "Leroy Merlin integration",
      "Product optimization",
      "Inventory management"
    ]
  }
];

export const ServicesStack = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [radius, setRadius] = useState(180);

  useEffect(() => {
    const updateRadius = () => {
      const width = window.innerWidth;
      if (width < 375) {
        // Very small phones (iPhone SE)
        setRadius(90);
      } else if (width < 430) {
        // Small to medium phones (iPhone XR, 11, 12, 13)
        setRadius(100);
      } else if (width < 768) {
        // Large phones
        setRadius(120);
      } else if (width < 1024) {
        // Tablets
        setRadius(160);
      } else {
        // Desktop
        setRadius(180);
      }
    };

    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  const menuItems: CommandItem[] = services.map(service => ({
    id: service.id,
    icon: service.icon,
    label: service.label,
    onClick: () => setSelectedService(service.id)
  }));

  const selected = services.find(s => s.id === selectedService);
  const containerHeight = radius * 2 + 100; // Dynamic height based on radius

  return (
    <section className="min-h-screen bg-white flex flex-col items-center justify-center py-8 sm:py-12 md:py-20 px-4 relative overflow-hidden">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 sm:mb-12 md:mb-16 z-10"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 px-4">
          Our Services
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
          Tap any service to learn more
        </p>
      </motion.div>

      {/* Circular Menu Container */}
      <div 
        className="relative w-full flex items-center justify-center" 
        style={{ minHeight: `${containerHeight}px` }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="absolute"
          style={{ 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)'
          }}
        >
          <CircularMenu
            items={menuItems}
            radius={radius}
            onSelect={(item) => setSelectedService(item.id)}
            defaultOpen={true}
          />
        </motion.div>
      </div>

      {/* Service Details Modal */}
      <AnimatePresence>
        {selectedService && selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-12 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <div className="inline-flex p-3 md:p-4 bg-black/5 rounded-2xl mb-4 md:mb-6">
                <div className="text-black">{selected.icon}</div>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-6 pr-8">
                {selected.title}
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-4 md:mb-8 leading-relaxed">
                {selected.fullDesc}
              </p>
              
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 md:mb-4">What's Included:</h3>
              <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                {selected.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 md:gap-3">
                    <div className="mt-0.5 md:mt-1 p-0.5 md:p-1 bg-black rounded-full flex-shrink-0">
                      <Check className="w-3 h-3 md:w-4 md:h-4 text-white stroke-[3]" />
                    </div>
                    <span className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full md:w-auto px-6 md:px-8 py-3 md:py-4 bg-black text-white rounded-full text-sm sm:text-base md:text-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 md:gap-3 group">
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};