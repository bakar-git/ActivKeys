import React, { useState, useEffect, useRef } from 'react';
import { Target, Cloud, CreditCard, Phone, ArrowRight, Sparkles } from 'lucide-react';

const Services = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  const services = [
    {
      icon: <Target className="h-8 w-8 text-blue-400" />,
      title: "Custom Solutions",
      description: "Tailored integrations with your internal tools, workflows, or automation systems for seamless operation.",
      gradient: "from-blue-500/20 to-cyan-500/20",
      hoverGradient: "from-blue-500/30 to-cyan-500/30",
      iconBg: "bg-blue-500/10 border-blue-500/20"
    },
    {
      icon: <Cloud className="h-8 w-8 text-purple-400" />,
      title: "API Access / VPS Setup",
      description: "Secure API access from our servers with optional full self-hosted setup and dedicated support.",
      gradient: "from-purple-500/20 to-pink-500/20",
      hoverGradient: "from-purple-500/30 to-pink-500/30",
      iconBg: "bg-purple-500/10 border-purple-500/20"
    },
    {
      icon: <CreditCard className="h-8 w-8 text-green-400" />,
      title: "Flexible Pricing",
      description: "Monthly subscription with updates and support, or full-code ownership option for complete control.",
      gradient: "from-green-500/20 to-emerald-500/20",
      hoverGradient: "from-green-500/30 to-emerald-500/30",
      iconBg: "bg-green-500/10 border-green-500/20"
    },
    {
      icon: <Phone className="h-8 w-8 text-orange-400" />,
      title: "Live Demo & Support",
      description: "Real-time demo available before purchase with dedicated support for integration and troubleshooting.",
      gradient: "from-orange-500/20 to-red-500/20",
      hoverGradient: "from-orange-500/30 to-red-500/30",
      iconBg: "bg-orange-500/10 border-orange-500/20"
    }
  ];

  // Track mouse movement within the section
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
      style={{
        background: `
          linear-gradient(to bottom, 
            rgb(17, 24, 39) 0%,
            rgb(31, 41, 55) 50%,
            rgb(17, 24, 39) 100%
          )
        `
      }}
    >
      {/* Interactive Grid Background */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0 transition-all duration-300 ease-out"
          style={{
            backgroundImage: `
              radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                rgba(59, 130, 246, 0.4) 0%, 
                rgba(59, 130, 246, 0.2) 25%, 
                rgba(147, 51, 234, 0.1) 50%, 
                transparent 70%
              ),
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: `
              100% 100%,
              40px 40px,
              40px 40px
            `,
            backgroundPosition: `
              0 0,
              ${mousePosition.x * 0.5}px ${mousePosition.y * 0.5}px,
              ${mousePosition.x * 0.5}px ${mousePosition.y * 0.5}px
            `
          }}
        />
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              transform: `translate(${(mousePosition.x - 50) * 0.1}px, ${(mousePosition.y - 50) * 0.1}px)`
            }}
          />
        ))}
      </div>

      {/* Gradient Transitions */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-900 to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4 mr-2" />
            Our Services
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
              Services We Offer
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              For Your Success
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive solutions and support to meet your organization's unique needs and requirements
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${service.gradient.replace('/20', '/10')})`,
                backdropFilter: 'blur(10px)'
              }}
            >
              {/* Interactive Glow Effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${service.hoverGradient.replace('from-', '').replace('to-', '').split(' ')[0]} 0%, transparent 70%)`
                }}
              />

              {/* Content */}
              <div className="relative z-10 p-8 h-full flex flex-col">
                {/* Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-4 rounded-xl border ${service.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <ArrowRight className="h-5 w-5 text-white/60" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-100 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed flex-grow">
                  {service.description}
                </p>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.hoverGradient} blur-xl`}></div>
                </div>
              </div>

              {/* Mouse Follow Effect */}
              <div 
                className="absolute w-32 h-32 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${service.gradient.split(' ')[0].replace('from-', '').replace('/20', '/40')} 0%, transparent 70%)`,
                  left: `${mousePosition.x}%`,
                  top: `${mousePosition.y}%`,
                  transform: 'translate(-50%, -50%)',
                  filter: 'blur(20px)'
                }}
              />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg">
              Get Started Today
            </button>
            <button className="border border-gray-600 hover:border-gray-500 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 bg-gray-900/50 backdrop-blur-sm">
              Schedule Consultation
            </button>
          </div>
          <p className="text-gray-400 mt-4 text-sm">
            ✓ Free consultation • ✓ Custom quote • ✓ 24/7 support
          </p>
        </div>

        {/* Service Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "500+", label: "Custom Integrations", color: "text-blue-400" },
            { value: "99.9%", label: "API Uptime", color: "text-purple-400" },
            { value: "24/7", label: "Support Available", color: "text-green-400" },
            { value: "< 5min", label: "Response Time", color: "text-orange-400" }
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div 
                className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300`}
                style={{
                  transform: `translateY(${Math.sin((mousePosition.x + mousePosition.y + index * 25) * 0.02) * 2}px)`
                }}
              >
                {stat.value}
              </div>
              <div className="text-gray-400 group-hover:text-gray-300 transition-colors text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Corner Effects */}
      <div 
        className="absolute top-0 left-0 w-96 h-96 opacity-20 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)`,
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-96 h-96 opacity-20 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%)`,
          transform: `translate(${-mousePosition.x * 0.5}px, ${-mousePosition.y * 0.5}px)`
        }}
      />
    </section>
  );
};

export default Services;