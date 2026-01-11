"use client";
import { useState } from "react";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";
import { Globe, Instagram, Video, Package, X, ArrowRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ShapeBlur from "./shape-blur";

const services = [
  {
    icon: Globe,
    title: "Website Development",
    shortDesc: "Professional websites that turn visitors into customers",
    highlights: [
      "Custom design tailored to your brand",
      "Mobile-first responsive layouts",
      "Lightning-fast page speeds",
      "SEO optimized from day one"
    ],
    stats: { label: "Average speed", value: "<2s load" },
    fullDesc: "We build professional, responsive websites tailored to your business needs. From simple landing pages to complex e-commerce platforms, we deliver solutions that drive results. Our websites are optimized for speed, SEO, and user experience.",
    features: [
      "Custom design & development",
      "Mobile-responsive layouts",
      "SEO optimization",
      "Fast loading speeds",
      "Easy content management"
    ]
  },
  {
    icon: Instagram,
    title: "Social Media Management",
    shortDesc: "Grow your audience with strategic content",
    highlights: [
      "Daily content creation & posting",
      "Community engagement & growth",
      "Analytics & performance tracking",
      "Multi-platform management"
    ],
    stats: { label: "Avg growth", value: "+40% reach" },
    fullDesc: "We handle your social media presence from strategy to execution. Our team creates engaging content, manages your profiles, and grows your audience across all major platforms.",
    features: [
      "Content strategy & planning",
      "Daily posting & engagement",
      "Community management",
      "Analytics & reporting",
      "Platform-specific optimization"
    ]
  },
  {
    icon: Video,
    title: "Content Creation",
    shortDesc: "High-quality visuals that tell your story",
    highlights: [
      "Professional photography & videography",
      "Product showcases & demos",
      "Brand storytelling content",
      "Social media ready formats"
    ],
    stats: { label: "Projects", value: "200+ delivered" },
    fullDesc: "High-quality photos, videos, and graphics that capture attention. We create content that resonates with your audience and showcases your products or services in the best light.",
    features: [
      "Professional photography",
      "Video production & editing",
      "Graphic design",
      "Product showcases",
      "Brand storytelling"
    ]
  },
  {
    icon: Package,
    title: "Marketplace Listing",
    shortDesc: "Get your products on SA's biggest platforms",
    highlights: [
      "Complete Takealot onboarding",
      "Makro & Leroy Merlin setup",
      "Product listing optimization",
      "Inventory management integration"
    ],
    stats: { label: "Marketplaces", value: "3 platforms" },
    fullDesc: "We handle the complete onboarding process for Takealot, Makro, and Leroy Merlin. From account setup to product listings, we ensure your products are optimized for maximum visibility and sales.",
    features: [
      "Takealot onboarding",
      "Makro marketplace setup",
      "Leroy Merlin integration",
      "Product optimization",
      "Inventory management setup"
    ]
  }
];

export const ServicesStack = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <>
      <ScrollStack itemDistance={300} itemStackDistance={50}>
        {services.map((service, index) => {
          const Icon = service.icon;
          const isHovered = hoveredCard === index;
          
          return (
            <ScrollStackItem key={index}>
              <div 
                className="h-full min-h-[600px] md:min-h-[700px] flex flex-col relative overflow-hidden group cursor-pointer bg-white"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setSelectedService(index)}
                style={{
                  transform: isHovered ? 'translateZ(50px)' : 'translateZ(0)',
                  transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                {/* ShapeBlur effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <ShapeBlur
                    variation={0}
                    pixelRatioProp={typeof window !== 'undefined' ? window.devicePixelRatio : 2}
                    shapeSize={0.8}
                    roundness={0.5}
                    borderSize={0.08}
                    circleSize={0.4}
                    circleEdge={0.8}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full p-6 md:p-10 lg:p-12">
                  {/* Top section */}
                  <div className="flex items-start justify-between mb-8 md:mb-10">
                    <div className="flex-1">
                      <div className="inline-flex p-3 md:p-4 bg-black/5 rounded-2xl mb-6">
                        <Icon className="w-10 h-10 md:w-12 md:h-12 stroke-[1.5]" />
                      </div>
                      
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 leading-tight">
                        {service.title}
                      </h3>
                      
                      <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                        {service.shortDesc}
                      </p>
                    </div>

                    {/* Stats badge */}
                    <div className="hidden md:flex flex-col items-end text-right ml-6">
                      <div className="text-3xl lg:text-4xl font-bold">{service.stats.value}</div>
                      <div className="text-sm text-gray-500 uppercase tracking-wide">{service.stats.label}</div>
                    </div>
                  </div>

                  {/* Features list */}
                  <div className="flex-1 space-y-3 md:space-y-4 mb-8">
                    {service.highlights.map((highlight, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-1 p-1 bg-black rounded-full flex-shrink-0">
                          <Check className="w-3 h-3 md:w-4 md:h-4 text-white stroke-[3]" />
                        </div>
                        <span className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
                          {highlight}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Bottom CTA */}
                  <div className="flex items-center justify-between pt-6 border-t border-black/10">
                    <button className="flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-black text-white rounded-full text-sm md:text-base font-medium hover:bg-gray-800 transition-all group/btn">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-black/[0.03] select-none">
                      0{index + 1}
                    </div>
                  </div>
                </div>

                {/* 3D shadow effect */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    boxShadow: isHovered 
                      ? '0 50px 100px rgba(0,0,0,0.25), 0 20px 40px rgba(0,0,0,0.15)'
                      : '0 20px 60px rgba(0,0,0,0.15)',
                    transition: 'box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                />
              </div>
            </ScrollStackItem>
          );
        })}
      </ScrollStack>

      {/* Modal */}
      <AnimatePresence>
        {selectedService !== null && (
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

              {(() => {
                const service = services[selectedService];
                const Icon = service.icon;
                return (
                  <>
                    <div className="inline-flex p-4 bg-black/5 rounded-2xl mb-6">
                      <Icon className="w-12 h-12 md:w-16 md:h-16 stroke-[1.5]" />
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 pr-8">
                      {service.title}
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-6 md:mb-8 leading-relaxed">
                      {service.fullDesc}
                    </p>
                    
                    <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">What's Included:</h3>
                    <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                      {service.features.map((feature, i) => (
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
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};