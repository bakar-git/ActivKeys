import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Play } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "IT Director",
      company: "TechCorp Solutions",
      content: "ActivKeys has transformed our license management process. The real-time validation saves us hours of manual work every week. The bulk checking feature is absolutely incredible.",
      rating: 5,
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      stats: { saved: "40 hours/week", efficiency: "300%" }
    },
    {
      name: "Mike Chen",
      role: "Software Reseller",
      company: "Digital Keys Pro",
      content: "The bulk checking feature is incredible. We can validate thousands of keys in minutes, not hours. Game-changer for our business operations and customer satisfaction.",
      rating: 5,
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      stats: { processed: "50K+ keys", time: "90% faster" }
    },
    {
      name: "Emma Rodriguez",
      role: "System Administrator",
      company: "Global Enterprises",
      content: "Security and privacy are top priorities for us. ActivKeys keeps our data local while providing enterprise-grade features. The API integration was seamless.",
      rating: 5,
      image: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      stats: { security: "100% local", compliance: "SOC2 ready" }
    },
    {
      name: "David Park",
      role: "License Manager",
      company: "Enterprise Solutions Inc",
      content: "The historical tracking and analytics have given us insights we never had before. We can now predict our license needs and optimize our inventory management.",
      rating: 5,
      image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      stats: { insights: "Real-time", optimization: "45% cost reduction" }
    },
    {
      name: "Lisa Thompson",
      role: "IT Operations Manager",
      company: "CloudTech Innovations",
      content: "ActivKeys has streamlined our entire key management workflow. The categorized stock management feature alone has saved us countless hours of manual organization.",
      rating: 5,
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      stats: { organization: "100% automated", productivity: "250% increase" }
    },
    {
      name: "Robert Kim",
      role: "Technical Director",
      company: "SecureIT Solutions",
      content: "The API access and VPS setup options gave us the flexibility we needed. The support team was exceptional throughout the integration process.",
      rating: 5,
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      stats: { integration: "Seamless", support: "24/7 available" }
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Floating Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          animation: 'gridMove 30s linear infinite'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-400 text-sm font-medium mb-4">
            <Star className="h-4 w-4 mr-2 fill-current" />
            Customer Stories
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-yellow-100 to-orange-100 bg-clip-text text-transparent">
              Trusted by Thousands of
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              IT Professionals
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            See how organizations worldwide are transforming their key management with ActivKeys
          </p>
        </div>

        {/* 3D Testimonials Carousel */}
        <div className="relative">
          {/* Main Testimonial Display */}
          <div className="relative h-[600px] perspective-1000">
            <div className="absolute inset-0 flex items-center justify-center">
              {testimonials.map((testimonial, index) => {
                const offset = index - currentIndex;
                const absOffset = Math.abs(offset);
                const isActive = offset === 0;
                const isVisible = absOffset <= 2;

                if (!isVisible) return null;

                return (
                  <div
                    key={index}
                    className={`absolute transition-all duration-700 ease-out transform-gpu ${
                      isActive 
                        ? 'z-30 scale-100 opacity-100 translate-x-0 rotate-y-0' 
                        : absOffset === 1
                        ? `z-20 scale-75 opacity-60 ${offset > 0 ? 'translate-x-80 rotate-y-45' : '-translate-x-80 -rotate-y-45'}`
                        : `z-10 scale-50 opacity-30 ${offset > 0 ? 'translate-x-96 rotate-y-60' : '-translate-x-96 -rotate-y-60'}`
                    }`}
                    style={{
                      transform: `
                        translateX(${offset * 320}px) 
                        scale(${isActive ? 1 : 0.75 - absOffset * 0.15}) 
                        rotateY(${offset * 25}deg)
                        translateZ(${isActive ? 0 : -absOffset * 100}px)
                      `
                    }}
                  >
                    <div className="w-80 lg:w-96 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden">
                      {/* Video/Image Header */}
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                        
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                          <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 p-4 rounded-full transition-all duration-300 transform hover:scale-110">
                            <Play className="h-6 w-6 text-white ml-1" />
                          </button>
                        </div>

                        {/* Stats Overlay */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex justify-between text-xs text-white/80">
                            {Object.entries(testimonial.stats).map(([key, value]) => (
                              <div key={key} className="bg-black/30 backdrop-blur-sm px-2 py-1 rounded">
                                <span className="font-semibold">{value}</span>
                                <div className="text-white/60 capitalize">{key}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8">
                        {/* Rating */}
                        <div className="flex items-center mb-4">
                          <div className="flex">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <Quote className="h-6 w-6 text-blue-400 ml-auto" />
                        </div>

                        {/* Quote */}
                        <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                          "{testimonial.content}"
                        </p>

                        {/* Author Info */}
                        <div className="border-t border-gray-700/50 pt-6">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                              {testimonial.name.charAt(0)}
                            </div>
                            <div className="ml-4">
                              <p className="font-semibold text-white text-lg">{testimonial.name}</p>
                              <p className="text-gray-400">{testimonial.role}</p>
                              <p className="text-gray-500 text-sm">{testimonial.company}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center mt-12 space-x-6">
            <button
              onClick={prevTestimonial}
              className="p-3 bg-gray-800/80 hover:bg-gray-700/80 backdrop-blur-sm rounded-full border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 transform hover:scale-110"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-blue-500 scale-125' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 bg-gray-800/80 hover:bg-gray-700/80 backdrop-blur-sm rounded-full border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 transform hover:scale-110"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </div>

          {/* Auto-play Toggle */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                isAutoPlaying 
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                  : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:border-gray-600/50'
              }`}
            >
              {isAutoPlaying ? 'Auto-playing' : 'Paused'}
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 text-center">
          <p className="text-gray-400 mb-8">Trusted by leading organizations worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            {['Microsoft Partner', 'SOC2 Compliant', 'ISO 27001', 'GDPR Ready', '99.9% SLA'].map((badge, index) => (
              <div key={index} className="px-4 py-2 bg-gray-800/30 rounded-lg border border-gray-700/30 text-gray-400 text-sm">
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .rotate-y-45 {
          transform: rotateY(45deg);
        }
        .-rotate-y-45 {
          transform: rotateY(-45deg);
        }
        .rotate-y-60 {
          transform: rotateY(60deg);
        }
        .-rotate-y-60 {
          transform: rotateY(-60deg);
        }
        .rotate-y-0 {
          transform: rotateY(0deg);
        }
      `}</style>
    </section>
  );
};

export default Testimonials;