"use client";
import { useState } from "react";
import { MorphingCardStack } from "./morphing-card-stack";
import { Globe, Instagram, Video, Package, Megaphone, Server, X, ArrowRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { CardData } from "./morphing-card-stack";

const servicesData = [
  {
    id: "websites",
    title: "Website Development",
    description: "Professional websites that turn visitors into customers with custom design and SEO optimization",
    icon: <Globe className="w-6 h-6" strokeWidth={2} />,
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
    title: "Social Media Management",
    description: "Grow your audience with strategic content, daily posting, and community engagement across all platforms",
    icon: <Instagram className="w-6 h-6" strokeWidth={2} />,
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
    title: "Content Creation",
    description: "High-quality photos, videos, and graphics that capture attention and tell your brand story",
    icon: <Video className="w-6 h-6" strokeWidth={2} />,
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
    title: "Web Hosting",
    description: "Fast, reliable hosting with 99.9% uptime, daily backups, and 24/7 monitoring for your peace of mind",
    icon: <Server className="w-6 h-6" strokeWidth={2} />,
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
    title: "Paid Advertising",
    description: "Data-driven ad campaigns on Google, Facebook & Instagram that maximize your ROI with optimization",
    icon: <Megaphone className="w-6 h-6" strokeWidth={2} />,
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
    title: "Marketplace Listing",
    description: "Complete onboarding for Takealot, Makro & Leroy Merlin with product optimization and inventory management",
    icon: <Package className="w-6 h-6" strokeWidth={2} />,
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

  const cards: CardData[] = servicesData.map(service => ({
    id: service.id,
    title: service.title,
    description: service.description,
    icon: service.icon
  }));

  const handleCardClick = (card: CardData) => {
    setSelectedService(card.id);
  };

  const selected = servicesData.find(s => s.id === selectedService);

  return (
    <section className="min-h-screen bg-white flex flex-col items-center justify-center py-12 md:py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 md:mb-12"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 text-black">
  Our Services
</h2>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          Swipe through our services or switch views to explore what we offer
        </p>
      </motion.div>

      <MorphingCardStack
        cards={cards}
        defaultLayout="stack"
        onCardClick={handleCardClick}
      />

      {/* Modal */}
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
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <div className="inline-flex p-4 bg-black/5 rounded-2xl mb-6">
                {selected.icon}
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 pr-8">
                {selected.title}
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-6 md:mb-8 leading-relaxed">
                {selected.fullDesc}
              </p>
              
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">What's Included:</h3>
              <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                {selected.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 p-1 bg-black rounded-full flex-shrink-0">
                      <Check className="w-3 h-3 md:w-4 md:h-4 text-white stroke-[3]" />
                    </div>
                    <span className="text-base md:text-lg text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full md:w-auto px-6 md:px-8 py-3 md:py-4 bg-black text-white rounded-full text-base md:text-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 md:gap-3 group">
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